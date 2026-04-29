## Цель

Все формы сайта должны:
1. Отправлять заявки в Telegram через `services/telegramApi` (sales — для всех бизнес-форм, hr — для отклика на вакансию).
2. Защищаться **Google reCAPTCHA v3** (невидимая, токен на каждый submit).
3. Передавать в сообщение: **название услуги/формы, заголовок страницы и URL**, с которого пришла заявка.

## Что сделаю

### 1. Инфраструктура

- Переименую `src/services/telegramApi.js` → `src/services/telegramApi.ts` (внутри уже TS-синтаксис, иначе не соберётся).
- Обновлю `.env.example`: исправлю комментарий с v2 на **v3** для `VITE_RECAPTCHA_SITE_KEY` (ключ остаётся тот же).
- Добавлю в `src/routes/__root.tsx` подгрузку скрипта reCAPTCHA v3:
  `https://www.google.com/recaptcha/api.js?render=<VITE_RECAPTCHA_SITE_KEY>` через `links`/`scripts` секции `head()`.
- Создам два хелпера в `src/lib/`:
  - `recaptcha.ts` — `executeRecaptcha(action: string): Promise<string>` (ждёт `window.grecaptcha.ready`, вызывает `execute` с site key и action).
  - `submitLead.ts` — общая функция `submitLead({ formName, fields, target })`:
    - получает токен reCAPTCHA,
    - формирует HTML-сообщение в формате:
      ```
      🔔 <b>{formName}</b>
      📄 Страница: {document.title}
      🔗 URL: {window.location.href}

      <b>Поля:</b>
      • Компания: ...
      • ФИО: ...
      • Телефон: ...
      • Сообщение: ...

      🤖 reCAPTCHA score: token sent
      ```
    - вызывает `sendToTelegram(text, target)` (`'sales'` по умолчанию).
- Создам глобальный тип `src/types/grecaptcha.d.ts` для `window.grecaptcha`.

### 2. Подключу `submitLead` ко всем формам

Каждый `onSubmit` сделаю `async`, добавлю состояние `submitting` (блокировка кнопки), `try/catch`, `toast`/`alert` об успехе/ошибке. Поля собираю через `FormData`.

| Файл | Имя формы (передаётся в TG) | target |
|---|---|---|
| `src/routes/index.tsx` → `FinalCTA` | "Главная — заявка на IT-решение" | sales |
| `src/routes/it-sks.tsx` → `FinalCTA` | "СКС — заявка на проект" | sales |
| `src/routes/internet.tsx` → `FinalCTA` | "Интернет — заявка на подключение" | sales |
| `src/routes/colocation.tsx` → `FinalCTA` | "Colocation — заявка на размещение" | sales |
| `src/routes/colocation-full.tsx` → `FinalCTA` | "Аренда стойки — запрос расчёта" | sales |
| `src/components/nls/Modals.tsx` → консультация | "Модальное окно — консультация" + `consultation.subject` (если есть) | sales |
| `src/routes/hr.tsx` → `ApplyForm` | "HR — отклик на вакансию" | **hr** |

### 3. UX и безопасность

- Кнопка submit — `disabled={!consent || submitting}`, текст меняется на «Отправка…».
- При ошибке reCAPTCHA или Telegram — показываем понятное сообщение, форма не очищается.
- Под каждой формой добавлю мелкий disclaimer: «Защищено reCAPTCHA. Применяются [Политика конфиденциальности](https://policies.google.com/privacy) и [Условия использования](https://policies.google.com/terms) Google.» (требование Google для v3).
- Никаких токенов в коде — только через `import.meta.env.VITE_*`. Если переменные не заданы — `submitLead` пишет понятную ошибку в консоль и показывает alert.

### 4. Технические детали

- reCAPTCHA v3 загружается один раз, глобально, через тег `<script async defer>` в shell. Action для каждой формы — слаг (`home_cta`, `sks_cta`, `hr_apply` и т.п.) — пригодится в админке reCAPTCHA для аналитики.
- Серверной верификации токена пока не делаем (соответствует «временной заглушке» с прямой отправкой в Telegram). Это можно добавить позже как server function.
- Все вызовы `fetch` к Telegram идут с клиента — токен бота попадает в бандл. Это намеренный временный вариант (как в `.env.example`); в плане отмечу: на следующем шаге желательно вынести в server function `/api/public/lead` и хранить токен как runtime secret.

## Файлы, которые буду создавать/менять

**Новые:**
- `src/services/telegramApi.ts` (переименование)
- `src/lib/recaptcha.ts`
- `src/lib/submitLead.ts`
- `src/types/grecaptcha.d.ts`

**Изменения:**
- `.env.example` (комментарий v2 → v3)
- `src/routes/__root.tsx` (загрузка скрипта reCAPTCHA + disclaimer-friendly)
- `src/routes/index.tsx`
- `src/routes/it-sks.tsx`
- `src/routes/internet.tsx`
- `src/routes/colocation.tsx`
- `src/routes/colocation-full.tsx`
- `src/routes/hr.tsx`
- `src/components/nls/Modals.tsx`

**Удаление:** `src/services/telegramApi.js`

## Чего НЕ делаю

- Не настраиваю серверную верификацию reCAPTCHA secret (нужен бэкенд + secret key — отдельная задача).
- Не добавляю отдельную UI-кнопку для reCAPTCHA — v3 невидимая, токен запрашивается под капотом при submit.
- Не трогаю дизайн форм.