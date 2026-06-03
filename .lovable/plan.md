## План изменений (с учётом уточнений)

### 1. Telegram: город + автоссылка на ИИН/БИН
**`src/lib/submitLead.ts`**
- Принимать опц. `city?: string` и `iinSource?: string` (или просто передавать в `fields` ключ `Название компании или ИИН/БИН` — и сканировать **только это поле**).
- Регулярка `/(?<!\d)(\d{12})(?!\d)/` применяется ИСКЛЮЧИТЕЛЬНО к значению поля «Название компании или ИИН/БИН». Если найдено — в сообщение добавляется строка:
  `• <b>Проверить ИИН:</b> https://pk.adata.kz/counterparty/main/company/{12d}/basic-info`
- В шапку сообщения добавить `🏙 Город: {city}` (после строки `Страница`).

**`src/components/forms/LeadForm.tsx`**
- Подтянуть `useCity()` и передавать `city: city.name.ru` в `submitLead`.
- Поле «Город» в `fields` также сохраняем (для thank-you), но в Telegram дублироваться не будет — `submitLead` исключит его из `fieldLines`, т.к. рендерит в шапке.

### 2. Поля «Адрес» и «Город» — ТОЛЬКО на странице «Интернет»
**`LeadForm.tsx`** — добавить пропс `showAddress?: boolean` (по умолчанию `false`).
- Если `showAddress`, между телефоном и комментарием рендерим строку из двух полей:
  - `Адрес` (input text, необязательное)
  - `Город` (select: Алматы / Астана / Шымкент / Другие города), значение по умолчанию = текущий `cityKey`.
- Класс-обёртка `.form-row-2` (2 колонки на десктопе, 1 на мобиле).
- В `fields` попадают «Адрес» и «Город».

**Где включаем `showAddress`:**
- `src/routes/internet.tsx` — `<LeadForm ... showAddress />` в секции FinalCTA.
- `src/components/nls/Modals.tsx` — модалка «Оставить заявку»: включать `showAddress` ТОЛЬКО если открыта со страницы `/internet`. Реализация: проверка `typeof window !== "undefined" && window.location.pathname.startsWith("/internet")` при открытии модалки → пробросить флаг в `LeadForm` через `key`/проп.

Поле «Город» всё равно передаётся в Telegram (через `submitLead.city`) на ВСЕХ страницах — берётся из `useCity()`. Видимый селектор «Город» в форме показывается только на /internet.

### 3. Уменьшение модалки «Оставить заявку»
**CSS (`src/styles/nls.css`):**
- `.modal-content`, `.form-modal-content` — вертикальные паддинги 32 → 20 px.
- `.modal-header` — меньше `margin-bottom`, `h3` чуть меньше, `p` уменьшить шрифт/убрать на маленьких высотах.
- `.form-group` — `margin-bottom` 16 → 10 px; `input/textarea` — меньше `padding-y`.
- Новый `.form-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; } @media(max-width:560px){ grid-template-columns:1fr; }`.

### 4. Cookie-баннер компактнее (текст НЕ сокращать)
**`CookieBanner.tsx` + CSS `.cookie-banner`**
- Текст оставить, но уменьшить `font-size` (например 0.95 → 0.78 rem), `line-height` ужать.
- Кнопки — меньше (padding и font-size, например `.btn-sm` стиль локально).
- Баннер прижать к низу: `bottom: 0; border-radius: 0`, убрать нижний отступ, общий `padding` уменьшить.
- На десктопе текст и кнопки в один ряд (flex).

### 5. Страница «Интернет»: блок «Как мы работаем»
**`src/routes/internet.tsx`** — новая секция `HowWeWork` после `Tariffs`/CTA (см. п.8).
- 9 шагов. Сетка:
  - Desktop: первый ряд 5 колонок, второй ряд 4 колонки (используем два отдельных grid-блока подряд: `grid-template-columns: repeat(5,1fr)` и ниже `repeat(4,1fr)`).
  - Mobile (`<=720px`): 2 колонки.
- Карточка шага: крупная цифра, заголовок, описание.
- В шаге 5 «ОПЛАТА» — ссылка `<Link to="/requisites">Реквизиты NLS KAZAKHSTAN</Link>`.
- Локализация RU/KZ через `useT()`.

### 6. Страница «Реквизиты»
- `src/routes/requisites.tsx` (URL `/requisites`), `createFileRoute("/requisites")` + `head()`.
- Таблица со всеми реквизитами ТОО «NLS KAZAKHSTAN» (директор, адреса, телефоны, email, БИН, НДС, банк. реквизиты — 3 банка).
- Внутри `SiteLayout`, стили — новый класс `.requisites-table` в `nls.css`.
- Ссылка добавляется в `Footer.tsx` рядом с «Политика конфиденциальности».

### 7. Новый тариф «Интернет базовый»
**`src/routes/internet.tsx` → `Tariffs`**
- Добавить третью карточку (первой в ряду): «Интернет базовый», «скорость до 100 Мбит/с», фичи и кнопка как у «Интернет для офиса».
- Сетка тарифов: 3 колонки на десктопе, 1 на мобиле. Хит — по-прежнему «Интернет для офиса».

### 8. CTA «Рассчитать скорость с учётом рабочих мест»
- Новая секция сразу после `Tariffs`.
- Заголовок + короткое описание (скорость зависит от числа сотрудников, видеосвязи, облаков и т.п.).
- Кнопка «Рассчитать» → `openConsultationModalWith({ subject: t("Расчёт скорости по рабочим местам", "Жұмыс орындары бойынша жылдамдықты есептеу") })`.

### 9. Заголовок «Доп. услуги» перед `ExtraServices`
- Внутри `<section className="extra-services-section">` добавить `section-title` c eyebrow «Доп. услуги» / «Қосымша қызметтер» и заголовком в едином стиле с остальными секциями.

### 10. Плавающая кнопка — отступ от края
- `.float-contact` в `src/styles/nls.css`: увеличить `right`/`bottom` (desktop 16→28 px, mobile 12→20 px).

---

### Технические детали
- Регэксп ИИН: `/(?<!\d)(\d{12})(?!\d)/` применяется только к значению ключа, начинающегося с «Название компании» (или матчинг по точному label`Название компании или ИИН/БИН`). Реализуем через дополнительный аргумент `submitLead({ iin })` — лучше: `LeadForm` сам ищет 12 цифр в value поля `company` и передаёт `iin?: string` в `submitLead`.
- Город в Telegram отдельной строкой шапки; ключ «Город» из `fields` фильтруется при рендере `fieldLines`.
- Поле «Адрес»/«Город» появляется только при `showAddress` пропсе.
- Маршрут `/requisites` авто-регистрируется TanStack file-router.

### Файлы
- edit: `src/lib/submitLead.ts`, `src/components/forms/LeadForm.tsx`, `src/components/nls/CookieBanner.tsx`, `src/components/nls/Footer.tsx`, `src/components/nls/Modals.tsx`, `src/routes/internet.tsx`, `src/styles/nls.css`
- create: `src/routes/requisites.tsx`
