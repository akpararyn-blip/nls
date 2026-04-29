# План доработок

## 1. Страницы «Спасибо» и 404

**`src/routes/thank-you.tsx`** — страница, на которую редиректит каждая форма после успешной отправки.
- Заголовок «Спасибо за заявку!», подзаголовок про звонок в течение 15 минут.
- Иконка-галочка, контакты выбранного города (через `useCity`), кнопки «На главную» и «Позвонить».
- `head()` с `noindex` и собственными title/description.

**404** — обновить `notFoundComponent` в `src/routes/__root.tsx`:
- Брендированная страница 404 (логотип, кнопки «На главную» / «Связаться»).
- Также добавить `defaultNotFoundComponent` в `src/router.tsx`, чтобы все ненайденные пути ловились единообразно.

После отправки формы вместо `alert(...)` будет `navigate({ to: "/thank-you" })`. Для HR — `navigate({ to: "/thank-you", search: { type: "hr" } })`, страница покажет немного другой текст («Спасибо за отклик»).

## 2. Единый компонент форм

Да, вы правы: 5 sales-форм (главная, internet, it-sks, colocation, colocation-full) идентичны по структуре. HR отличается полями (вакансия, резюме, опыт). Делаем папку `src/components/forms/`:

- **`LeadForm.tsx`** — универсальная форма для sales-заявок. Пропсы:
  - `formName: string` (например, «Colocation — заявка на размещение»)
  - `action: string` (для reCAPTCHA, например `colocation_cta`)
  - `messageLabel?: string` (по умолчанию «Сообщение для менеджера»)
  - `idPrefix?: string` (чтобы `id` инпутов не конфликтовали)
  - Внутри — все 4 поля (компания, ФИО, телефон, сообщение), `ConsentCheckbox`, `RecaptchaNotice`, кнопка, состояние `submitting`, вызов `submitLead`, редирект на `/thank-you`.
- **`HrApplyForm.tsx`** — отдельная форма для `/hr` (поля + загрузка резюме + `target: "hr"`). Логика та же, но поля свои.
- **`useLeadForm.ts`** *(опционально)* — хук с общим `onSubmit`, чтобы не дублировать логику между LeadForm и HrApplyForm.

Затем в страницах `index.tsx`, `internet.tsx`, `it-sks.tsx`, `colocation.tsx`, `colocation-full.tsx` блок `<FinalCTA>` упрощается до:
```tsx
<LeadForm formName="…" action="…" />
```
В `Modals.tsx` модальное окно тоже использует `LeadForm` (с пропом `subject` для подстановки темы).
В `hr.tsx` — `<HrApplyForm vacancy={…} />`.

## 3. Доменно-зависимая конфигурация ссылок

Создадим `src/config/links.ts` — единственное место, где описано поведение ссылок:

```ts
export const USE_INTERNAL_ROUTING = true; // переключатель

export const DOMAIN_MAP = {
  "internet.nls.kz":      { home: "/internet",        path: "/internet" },
  "lan.nls.kz":           { home: "/it-sks",          path: "/it-sks" },
  "colocation.nls.kz":    { home: "/colocation",      path: "/colocation" },
  "dedicated.nls.kz":     { home: "/dedicated",       path: "/dedicated" },
  "rack.nls.kz":          { home: "/colocation-full", path: "/colocation-full" },
  "server.nls.kz":        { home: "/vps",             path: "/vps" },
} as const;
```

Логика (хелпер `resolveLink(to)`):
- Если `USE_INTERNAL_ROUTING === true` → возвращаем внутренний путь как есть, всё работает как сейчас.
- Если `USE_INTERNAL_ROUTING === false`:
  - Определяем текущий поддомен (`window.location.hostname`).
  - Главная (`/`) превращается в путь, соответствующий текущему домену (например, на `internet.nls.kz` → `/internet`).
  - Все ссылки на «чужие» услуги превращаются в **внешние URL** на соответствующие поддомены (https://colocation.nls.kz и т.д.).
  - Ссылка на «свою» услугу (например, `/internet` на `internet.nls.kz`) ведёт на `/`.
  - Все остальные пути (`/about`, `/hr`, `/contacts`, `/thank-you` и т.д.) остаются внутренними.

**Компонент-обёртка `<SmartLink to="…">`** в `src/components/nls/SmartLink.tsx`:
- Внутри решает, рендерить `<Link>` (TanStack) или обычный `<a href="https://…">` с `target="_blank"`.
- Все ссылки на услуги в `Header.tsx`, `MobileNav.tsx`, `Footer.tsx`, карточках на главной — переводим на `<SmartLink>`.

Так переключение режима — один булеан в `links.ts`, не трогая компоненты.

### Замечание про SSR
`window.location.hostname` недоступен на сервере. SmartLink будет:
- На SSR рендерить безопасный fallback (внутренний `<Link>`), а на клиенте после монтирования заменять на правильный URL через `useEffect` + `useState`. Это гарантирует, что HTML-разметка валидна и ссылка корректна для пользователя.

## Затрагиваемые файлы

**Новые:**
- `src/routes/thank-you.tsx`
- `src/components/forms/LeadForm.tsx`
- `src/components/forms/HrApplyForm.tsx`
- `src/components/nls/SmartLink.tsx`
- `src/config/links.ts`

**Изменяемые:**
- `src/routes/__root.tsx` — брендированный `notFoundComponent`.
- `src/router.tsx` — `defaultNotFoundComponent`.
- `src/routes/index.tsx`, `internet.tsx`, `it-sks.tsx`, `colocation.tsx`, `colocation-full.tsx` — заменить `FinalCTA` на `<LeadForm …/>`.
- `src/routes/hr.tsx` — заменить форму на `<HrApplyForm/>`.
- `src/components/nls/Modals.tsx` — модалку построить на `LeadForm` (через проп `subject`/`compact`).
- `src/components/nls/Header.tsx`, `MobileNav.tsx`, `Footer.tsx` и места с карточками услуг (`index.tsx`, `EnterpriseBlocks.tsx`) — заменить `<Link>` для путей услуг на `<SmartLink>`.

После одобрения переключусь в build-режим и реализую.
