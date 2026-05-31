## Что меняем

### 1. Переводы RU/KZ через `useT()`

- **`src/components/nls/ConsentCheckbox.tsx`** — перевести «Отправляя форму, я даю согласие на обработку персональных данных».
- **`src/components/nls/RecaptchaNotice.tsx`** — перевести «Защищено reCAPTCHA. Применяются Политика конфиденциальности и Условия использования Google».
- **`src/components/nls/StoreBadges.tsx`** — перевести «Загрузите в», «Доступно в».
- **`src/lib/city-context.tsx`** — адреса городов сделать локализуемыми. Заменим `address: string` на `address: { ru: string; kz: string }`, переведём адреса трёх городов и Other, в `Footer.tsx` и `Modals.tsx` (где используется `city.address`) — выбирать перевод через `t(city.address.ru, city.address.kz)`. Названия городов (`name`) тоже сделать локализуемыми (Алматы/Алматы, Астана/Астана, Шымкент/Шымкент, «Другие города»/«Басқа қалалар»).

### 2. WhatsApp: два номера с подписями

Константы:
- Техподдержка: `+7 700 339 7777` (текущий `city.whatsapp`)
- Отдел продаж: `+7 700 730 4591`

Куда добавить подписи:
- **`Footer.tsx`** — текущая строка «WhatsApp · Отдел продаж» неверная (номер техподдержки). Делаем две строки:
  - WhatsApp · Отдел продаж → `wa.me/77007304591`
  - WhatsApp · Техподдержка → `wa.me/77003397777`
- **Телефонная ссылка `tel:+77003397777` в шапке/футере — не трогаем** (по требованию).

### 3. `FloatingContact.tsx` — расширить меню

В выпадающем меню кнопки сейчас два пункта (Позвонить, WhatsApp). Делаем 4 пункта:
1. Позвонить — `+7 700 339 7777`
2. WhatsApp · Отдел продаж — `wa.me/77007304591`
3. WhatsApp · Техподдержка — `wa.me/77003397777`
4. Заказать обратный звонок — кнопка, вызывает `openConsultationModalWith({ subject: "Обратный звонок" })` из `useCity()`.

Все подписи через `useT()`.

### 4. Beta-плашки у переключателя языка

- **`Header.tsx`** — в выпадающем списке `.lang-dropdown` рядом с «RU» и «KZ» отрисовать маленький бейдж `<span class="lang-beta">beta</span>`. Поскольку перевод неофициальный для обоих языков, бейдж ставим у обоих вариантов (так пользователь понимает, что любая локализация — beta).
- **`MobileNav.tsx`** — если там есть переключатель языка, добавить такие же бейджи (проверим файл при реализации).
- **`src/styles/nls.css`** — добавить стиль `.lang-beta` (маленькая капсула, акцентный цвет, uppercase).

## Что НЕ меняем

- Номер `tel:+77003397777` в шапке/футере остаётся как есть (без изменения подписи).
- Логика GTM, маршрутизация, тексты страниц вне перечисленных компонентов.

## Файлы

- edit: `src/components/nls/ConsentCheckbox.tsx`
- edit: `src/components/nls/RecaptchaNotice.tsx`
- edit: `src/components/nls/StoreBadges.tsx`
- edit: `src/lib/city-context.tsx` (тип `CityData.address` и `name` → локализуемые)
- edit: `src/components/nls/Footer.tsx` (два WA с подписями + локализованные адреса/имена городов)
- edit: `src/components/nls/Modals.tsx` (если использует `city.address`/`city.name` — подставить `t(...)`)
- edit: `src/components/nls/FloatingContact.tsx` (4 пункта, переводы, обратный звонок)
- edit: `src/components/nls/Header.tsx` (beta-бейджи)
- edit: `src/components/nls/MobileNav.tsx` (beta-бейджи у языкового переключателя, если есть)
- edit: `src/styles/nls.css` (стиль `.lang-beta`)
