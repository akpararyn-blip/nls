# План: PHP-handler для форм, ERP-дубликат, скрытие токенов

## Текущая ситуация (важно)

Да, **сейчас токен Telegram-бота и chat_id попадают в JS-сборку** — они проброшены через `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_*` в `src/services/telegramApi.ts` и любой посетитель может вытащить их из бандла и слать что угодно от вашего имени. Это надо устранять.

## Структура на хостинге

```text
/ (root аккаунта)
├── private/
│   ├── config.php          # секреты + ERP url + список путей логов
│   └── logs/
│       └── leads-YYYY-MM.log
└── httpdocs/               # сюда заливается итоговая сборка SPA (dist/*)
    ├── index.html, assets/…
    ├── handler.php         # принимает заявки от SPA
    └── blacklist.php       # отдаёт публичный JSON {blacklist:[…]}
```

`config.php` — обычный PHP-массив, который `require_once` тянет из `handler.php`. Ничего секретного в `httpdocs/` нет. SPA на репозитории содержит только шаблоны `handler.php` / `blacklist.php` / `config.example.php` в `public/`, Vite копирует их в `dist/`. Реальный `config.php` руками лежит в `../private/` на сервере и в git не попадает.

## Что делает `handler.php`

Эндпоинт: `POST /handler.php`, принимает JSON от SPA (`Content-Type: application/json`).

1. **CORS / метод**: только POST, `Origin` из белого списка в `config.php` (`nls.kz` и поддомены), иначе 403.
2. **Парсинг и валидация** входящего JSON:
   - обязательные: `formName`, `action`, `target` (`sales`|`hr`), `fields` (object), `recaptchaToken`.
   - опциональные: `phone`, `city`, `iin`, `isSpam`, `pageTitle`, `pageUrl`, `referrer`, `utm` (object), `formKey` (по умолчанию `consultation`).
3. **Санитизация против инъекций** (ответ на ваш вопрос — да, чистим именно на бэке, фронту доверять нельзя):
   - все строковые поля: `trim`, ограничение длины (имя 100, телефон 20, comment-поля 2000, остальные 500), `mb_substr` по UTF-8;
   - удаление управляющих символов `\x00-\x08\x0B\x0C\x0E-\x1F`;
   - перевод переносов строк в `|` для ERP-comment, для Telegram оставляем `\n`;
   - вырезание `http(s)://…` ссылок из comment-строки (regex);
   - для Telegram (HTML parse mode) — `htmlspecialchars($v, ENT_QUOTES, 'UTF-8')`;
   - телефон нормализуем к `77XXXXXXXXX` (убираем `+`, скобки, пробелы, дефисы; ведущая `8` → `7`); если не 11 цифр — отдаём 422.
   - SQL-инъекции нам не угрожают (нет БД), XSS закрыт `htmlspecialchars` в Telegram и тем, что в SPA эти данные обратно не показываются.
4. **Анти-спам**:
   - проверка телефона по списку из `config.php` (массив `BLACKLIST`); если в списке — отвечаем `{ok:true, spam:true}` и **ничего не шлём** (тихий ответ, чтобы фронт сделал редирект на `/spam`);
   - reCAPTCHA: handler проверяет `recaptchaToken` через `https://www.google.com/recaptcha/api/siteverify` секретом из `config.php` (`RECAPTCHA_SECRET`), score < 0.3 → `isSpam=true`;
   - простой rate-limit по IP (файл-счётчик в `../private/logs/ratelimit/`): не больше N заявок/минуту с одного IP.
5. **Отправка в Telegram** (то, что сейчас делает `telegramApi.ts`):
   - токен и chat_id берутся из `config.php` (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_SALES`, `TELEGRAM_CHAT_HR`);
   - сообщение собирается на PHP по тому же шаблону, что сейчас в `src/lib/submitLead.ts` (шапка, поля, город, UTM, ссылка);
   - если `isSpam` — префикс «🚨 ДАННАЯ ЗАЯВКА УЛИЧЕНА КАК СПАМ 🚨».
6. **Дубликат в ERP** `https://dev.erp.nlskz.com/api/v1/erp/lead`, `multipart/form-data`:
   - `name`, `phone` (`77XXXXXXXXX`), `form_key=consultation`, `comment`, `tracking` (JSON-строка);
   - `comment` собирается из: страница заявки (title + url), город, адрес, «Компания/БИН», message — в одну строку через `| `, без дублей `name/phone/city`, без переносов, без http-ссылок;
   - `tracking` — строгий объект (см. ниже), `json_encode($tracking, JSON_UNESCAPED_UNICODE)`;
   - таймаут 8 сек, ошибка ERP **не** валит ответ пользователю (Telegram уже ушёл) — просто пишется в лог.
7. **Логирование** в `../private/logs/leads-YYYY-MM.log`, append, plain text, одна заявка = одна строка JSON:
   - **успех** (TG ok и ERP 2xx): `{ts, ip, form, target, tg:"ok", erp:200}` — **без данных заявки**;
   - **ошибка** (TG не ok, или ERP != 2xx, или сеть упала): `{ts, ip, form, tg:"ok|err:<code>", erp:<code|null>, error:"…", fields:{…}}` — с полным телом заявки, чтобы можно было вручную дослать;
   - файл создаётся с правами `0640`, директория `0750`.
8. **Ответ SPA**: `{ok:true}` / `{ok:true, spam:true}` / `{ok:false, error:"…", code:"…"}`. Никаких токенов, никаких внутренних деталей.

## Объект `tracking`

Собирается на бэке (PHP), не на фронте — так надёжнее. Фронт пробрасывает только `pageUrl`, `referrer`, `utm` как они есть.

```php
$tracking = [
  'website_domain'   => 'nls.kz',
  'landing_page_url' => $pageUrl,           // из запроса
  'ft_utm_source'    => null,
  'ft_utm_medium'    => null,
  'ft_utm_campaign'  => null,
  'ft_utm_term'      => null,
  'ft_utm_content'   => null,
  'ft_referrer'      => null,
  'lt_utm_source'    => $utm['utm_source']   ?? null,
  'lt_utm_medium'    => $utm['utm_medium']   ?? null,
  'lt_utm_campaign'  => $utm['utm_campaign'] ?? null,
  'lt_utm_term'      => $utm['utm_term']     ?? null,
  'lt_utm_content'   => $utm['utm_content']  ?? null,
  'lt_referrer'      => null,
  'channel_grouping' => channel_grouping($utm), // см. ниже
];
```

`channel_grouping($utm)` — простая эвристика (без GA, чисто по меткам):
- `utm_medium ∈ {cpc, ppc, paid, paidsearch, cpm}` → `Paid Search`
- `utm_medium ∈ {social, paid-social}` → `Paid Social`
- `utm_medium ∈ {email}` → `Email`
- `utm_medium ∈ {organic}` → `Organic Search`
- `utm_medium ∈ {referral}` → `Referral`
- если есть любой `utm_*` без medium → `Other`
- если utm-меток нет вообще → `Direct`

Заводить полноценную классификацию как в GA4 (по доменам referrer) сейчас смысла нет — это +200 строк хардкода и всё равно неточно. Если потом понадобится — добавим.

## Что меняется во фронте

- **`src/services/telegramApi.ts`** → удалить.
- **`src/lib/submitLead.ts`** → больше не собирает Telegram-сообщение и не дёргает Telegram. Делает `fetch('/handler.php', {method:'POST', body: JSON.stringify({...})})`, обрабатывает `{ok, spam}` и кидает ошибку при `ok:false`. reCAPTCHA-токен берём из `executeRecaptcha(action)` и кладём в `recaptchaToken`.
- **`src/lib/phone-blacklist.ts`** → читать `/blacklist.php` вместо `/config.php` (переименование на хостинге).
- **`public/config.php`** → переименовать в **`public/blacklist.php`** (тот же контент, без секретов).
- Удалить из репо `VITE_TELEGRAM_BOT_TOKEN`, `VITE_TELEGRAM_CHAT_SALES`, `VITE_TELEGRAM_CHAT_HR` из `.env.example`. `VITE_RECAPTCHA_SITE_KEY` остаётся (он публичный).
- На уровне форм (`LeadForm`, `HrApplyForm`) логика не меняется — они и так зовут `submitLead`.

## Новые файлы

- `public/handler.php` — основной обработчик (всё что выше).
- `public/blacklist.php` — публичный список (переименование текущего `config.php`).
- `public/config.example.php` — шаблон секретов (для подсказки, что класть в `../private/config.php`), с TODO-комментариями. Реальный `config.php` пользователь руками создаёт на хостинге.
- `docs/HOSTING.md` — короткая инструкция: куда класть `config.php`, какие права на `private/logs/`, как пополнять blacklist, как смотреть логи.

## Тонкости / решения

- **Vite копирует `public/`** в `dist/` как есть, так что PHP-файлы окажутся рядом с `index.html` без дополнительной настройки.
- **SPA-роутинг и `handler.php`**: ваш веб-сервер должен отдавать `*.php` напрямую (не заворачивать в `index.html`). У вас уже работает `config.php` тем же способом — значит правило фолбэка корректное.
- **CORS**: SPA и handler на одном домене → `Same-Origin`, CORS заголовки нужны только для поддоменов (`internet.nls.kz` и т.д.) → разрешаем в `config.php` массивом доменов.
- **Секреты в Lovable**: ничего добавлять в Lovable-секреты не нужно — все боевые значения живут только в `../private/config.php` на хостинге.

## Что НЕ делаем

- Не трогаем формы, валидацию ввода в React, blacklist UX, GTM, дизайн.
- Не добавляем БД и Lovable Cloud — не нужно.
- Не пытаемся имитировать GA-классификацию каналов глубже описанной эвристики.
