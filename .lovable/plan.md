## Чёрный список телефонов

### 1. Файл на хостинге

Создаём `public/config.php` (попадёт в собранный сайт как есть, его можно будет править прямо на хостинге):

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

// Чёрный список номеров. Только 11 цифр, формат 77XXXXXXXXX.
// Добавляйте новые номера в массив ниже.
echo json_encode([
  'blacklist' => [
    // '77001234567',
    // '77019998877',
  ],
], JSON_UNESCAPED_UNICODE);
```

URL после деплоя: `https://<домен>/config.php`.

### 2. Загрузка списка во фронте

Новый модуль `src/lib/phone-blacklist.ts`:
- Функция `fetchPhoneBlacklist()`: fetch `/config.php`, парсит JSON, нормализует каждый номер (`replace(/\D/g, "")`, ведущая `8` → `7`), оставляет только 11-значные. Кэш в памяти на время сессии + защита от ошибок (если файл недоступен — пустой список, форма продолжает работать).
- Функция `isPhoneBlacklisted(phone: string): Promise<boolean>` — нормализует переданный номер и проверяет наличие в списке.

### 3. Интеграция в отправку форм

В `src/lib/submitLead.ts` добавить новый флаг и проверку **перед** `executeRecaptcha` и `sendToTelegram`:

```ts
const blocked = await isPhoneBlacklisted(phoneFromFields);
if (blocked) {
  throw new BlacklistedPhoneError();
}
```

Чтобы взять телефон из `fields`, добавим в `SubmitLeadOptions` опциональное поле `phone?: string` (передаётся напрямую из форм) — это надёжнее, чем парсить `fields` по ключу с локализацией.

Поведение «полностью блокировать»:
- `submitLead` НЕ зовёт reCAPTCHA и НЕ шлёт в Telegram.
- Кидает `BlacklistedPhoneError`.
- В формах (`LeadForm.tsx`, `HrApplyForm.tsx`) в `catch` ловим этот класс ошибки и делаем `navigate({ to: "/spam" })` без alert.

### 4. Файлы

**Создать:**
- `public/config.php`
- `src/lib/phone-blacklist.ts`

**Изменить:**
- `src/lib/submitLead.ts` — экспорт `BlacklistedPhoneError`, проверка списка в самом начале, новый параметр `phone`.
- `src/components/forms/LeadForm.tsx` — передавать `phone` в `submitLead`, ловить `BlacklistedPhoneError` → redirect на `/spam`.
- `src/components/forms/HrApplyForm.tsx` — то же самое.

### 5. Технические детали

- Нормализация номера на клиенте и в проверке одинаковая: убрать всё кроме цифр, заменить ведущую `8` на `7`. Сравнение по строке из 11 цифр.
- Запрос к `config.php` идёт с `cache: "no-store"`, чтобы свежие правки на хостинге подхватывались сразу.
- Если хостинг отдаст HTML/ошибку — список считается пустым, отправка продолжается штатно (никогда не ломаем пользователю отправку из-за упавшего конфига).
- Никаких изменений в `isPhoneSuspicious` и текущей логике «подозрительных» номеров — это независимый дополнительный слой.
