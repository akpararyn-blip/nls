# План: поддомены iaas/cloud, новая группа «ЦОД», хаб облачных решений, обновления Dedicated/мобильного меню/футера

## 1. GTM для новых поддоменов
`src/config/gtm.ts` — в `HOST_TO_GTM` добавить:
- `"iaas.nls.kz": "GTM-PSQKW2CG"`
- `"cloud.nls.kz": "GTM-5QZ8PR2Q"`

## 2. Маршрутизация поддоменов (`src/config/links.ts`)

**a) iaas.nls.kz/** уже корректно открывает `/iaas` через существующий механизм (`currentDomainPath` + `to === "/"` → `internalTo: ownPath`). Только проверка.

**b) cloud.nls.kz/** становится хабом (новый маршрут `/cloud`, см. §4). `cloud.nls.kz ↔ /cloud` в `DOMAIN_TO_PATH` / `PATH_TO_DOMAIN`.

**c) На любом поддомене ссылки на 7 «облачных + ЦОД» услуг ведут на cloud.nls.kz/<service>.**

В `ServicePath` добавить `/object-storage`, `/cloud-storage` (для них в `PATH_TO_DOMAIN` ставим `cloud.nls.kz`). Ввести:
```ts
const CLOUD_HUB_PATHS = new Set<ServicePath>([
  "/iaas", "/vps", "/object-storage", "/cloud-storage",
  "/colocation", "/colocation-full", "/dedicated",
]);
```

Логика `resolveLink` при `USE_INTERNAL_ROUTING = false`:
1. `to === "/"` → `ownPath`.
2. `to === ownPath` → `/`.
3. `host === "cloud.nls.kz"` и `to ∈ CLOUD_HUB_PATHS` → внутренний `to` (cloud.nls.kz обслуживает все 7 маршрутов).
4. `to ∈ CLOUD_HUB_PATHS` и `host ≠ cloud.nls.kz` → внешний `https://cloud.nls.kz<to>`.
5. `to ∈ PATH_TO_DOMAIN` (internet/it/it-sks) и хост ≠ родного → внешний `https://<domain>`.
6. Иначе внутренний.

`USE_INTERNAL_ROUTING = true` (текущий режим) — всё ходит внутри без изменений.

## 3. Реструктуризация меню

Группы:
1. **Интернет** — `/internet`
2. **IT услуги** — `/it`, `/it-sks`
3. **Облачные решения** — Виртуальный дата-центр (`/iaas`), VPS/VDS сервер (`/vps`), Объектное хранилище S3 (`/object-storage`), Облачное хранилище (`/cloud-storage`)
4. **Услуги дата-центра** — Размещение сервера (`/colocation`), Аренда стойки (`/colocation-full`), Аренда сервера (`/dedicated`)

Файлы: `Header.tsx`, `MobileNav.tsx`, `Footer.tsx`. Контент страниц (h1, тексты) не меняется — переименование только в навигации.

## 4. Новая хаб-страница `/cloud`

Файлы:
- `src/routes/cloud.tsx` (новый)
- `src/components/nls/CloudHub.tsx` (новый)
- `src/routeTree.gen.ts` — добавить запись по образцу.

Контент:
- Стандартные header/footer через `SiteLayout`.
- Hero: «Облачные решения и услуги дата-центра».
- Основной блок:
  - **Desktop (≥768px)**: две колонки 50/50. Слева «Облачные решения» (4 карточки), справа «Услуги дата-центра» (3 карточки). Сверху каждой колонки — заголовок группы.
  - **Mobile (<768px)**: переключатель табов «Облачные решения / Дата-центр», под ним вертикальная сетка компактных широких карточек (иконка слева, заголовок + 1 предложение справа) — 3 шт. помещаются на экран телефона.
- Карточка: `SmartLink` на путь услуги, иконка lucide, заголовок (название из меню), краткое описание.
- Внизу — `SupportPromo`. Без `RelatedServices` (вся страница и есть related).

SEO: title «Облачные решения и услуги дата-центра — NLS Kazakhstan», description, h1.

## 5. Обновление страницы Dedicated

`src/routes/dedicated.tsx` (или соответствующий компонент с готовыми конфигурациями серверов) — заменить карточку «готовый сервер за 227 320 ₸» на:

```
Сервер: HP DL360 Gen10
Процессор: 2 × Intel® Xeon® Gold 6140
Всего ядер/потоков: 36C / 72T
Частота: 2.30 GHz
Память: 128 GB
Накопители: 4 × 480 GB SSD
RAID, 100 Мбит/с, 1 IP, IPMI
от 224 800 ₸
```

Старую цену 227 320 заменить на 224 800. Поля характеристик привести к новому списку (модель сервера, CPU, ядра/потоки, частота, RAM, диски, доп. характеристики строкой).

## 6. Доработка мобильного меню (`MobileNav.tsx` + CSS)

Цель — максимально удобное выезжающее меню.

Состав (проверить, что всё есть):
- Город, язык, телефон (как сейчас).
- Кнопка «Консультация» — добавить (сейчас её в мобильном меню нет, а в шапке на десктопе есть).
- Услуги — 4 группы в новом составе (см. §3).
- О компании, Вакансии, Интернет для физ. лиц, Контакты.
- Соц. иконки внизу (Instagram, LinkedIn, YouTube, TikTok) — добавить, сейчас отсутствуют.
- Кнопка «Войти» — добавить.

Дизайн (через design directions, после утверждения плана):
- Аккуратная типографика, секционные разделители, отступы под палец (мин. 44px touch target).
- Группы услуг с раскрытием (accordion) или просто визуальной группировкой с подзаголовком и иконкой.
- Иконки lucide рядом с пунктами услуг (как в мега-меню).
- Sticky-шапка меню (лого + крестик), скролл-контейнер для списка, sticky-низ с CTA «Консультация» и телефоном.
- Активный пункт подсвечен.

CSS — стили в `src/styles/nls.css` для `.mobile-nav`, `.mobile-nav__section`, `.mobile-nav__cta-bar` и т.д.

## 7. Доработка футера (`Footer.tsx`)

- Привести список услуг в футере к новой структуре из 4 групп (см. §3) с правильными названиями.
- Добавить в столбец услуг: `/iaas`, `/object-storage`, `/cloud-storage`, ссылку на `/cloud` (хаб).
- Проверить, что соц. иконки (включая TikTok) и контакты актуальны.

## 8. CSS (`src/styles/nls.css`)
- `.cloud-hub`, `.cloud-hub__columns`, `.cloud-hub__tabs` (mobile only), `.cloud-hub__card`.
- Обновлённые стили `.mobile-nav` под новый дизайн.

## 9. Проверки
- `/iaas` корректно отображается как главная iaas.nls.kz (визуально — текущая страница).
- `/cloud` открывается как хаб; в превью (`USE_INTERNAL_ROUTING = true`) все карточки ведут на внутренние маршруты.
- Меню (десктоп и мобильное) содержит все 4 группы и все пункты.
- Футер обновлён.
- Dedicated показывает новый конфиг и цену 224 800.

## Затронутые файлы
- `src/config/gtm.ts`
- `src/config/links.ts`
- `src/components/nls/Header.tsx`
- `src/components/nls/MobileNav.tsx`
- `src/components/nls/Footer.tsx`
- `src/components/nls/CloudHub.tsx` (новый)
- `src/routes/cloud.tsx` (новый)
- `src/routes/dedicated.tsx` (или `DedicatedPlans.tsx`)
- `src/routeTree.gen.ts`
- `src/styles/nls.css`

## Что НЕ трогаем
- Контент и калькуляторы существующих страниц услуг (кроме указанной правки готового сервера в Dedicated).
- `RelatedServices`, `SupportPromo`.
- Главную `/`, About, Contacts, HR, Internet, IT.
- Логику форм, инициализацию GTM, reCAPTCHA.
