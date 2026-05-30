## Что сейчас не так

Сайт — SPA на TanStack Router. Если вставить GTM-скрипт по инструкции Google, он инициализируется один раз при загрузке и фиксирует только первый просмотр страницы. Переходы между маршрутами не вызывают перезагрузку документа, поэтому в GTM не приходят `Page View` события — а от них зависят триггеры Yandex Metrika, Meta Pixel и TikTok Pixel.

Решение: подгружать нужный GTM-контейнер по `window.location.hostname` и на каждой смене URL отправлять событие в `dataLayer`.

## План

### 1. Конфиг GTM по доменам — `src/config/gtm.ts` (новый файл)

Маппинг хост → GTM ID:

```
colocation.nls.kz   → GTM-W5VT62QG
dedicated.nls.kz    → GTM-WZ29K6QS
internet.nls.kz     → GTM-TMG5ZQDK
lan.nls.kz          → GTM-PT6RVBPF
rack.nls.kz         → GTM-WFDBFNWW
server.nls.kz       → GTM-PLJN2C4N
nls.kz / www.nls.kz → читается из import.meta.env.VITE_GTM_ID_MAIN
```

Превью- и lovable-домены (`*.lovable.app`, `localhost`) — GTM не подключаем, чтобы не загрязнять статистику.

Экспортируется функция `getGtmIdForHost(host)`.

### 2. Загрузчик GTM — `src/lib/gtm.ts` (новый файл)

Две функции:
- `initGtm(id)` — однократно инициализирует `window.dataLayer`, пушит `gtm.start` и вставляет `<script src="https://www.googletagmanager.com/gtm.js?id=...">` + `<noscript><iframe ...>` в `<body>`. Защищён флагом, чтобы не подключиться дважды.
- `pushPageView({ path, title })` — пушит в `dataLayer` событие `{ event: 'page_view', page_path, page_location, page_title }`. В GTM это будет триггер «Custom Event = page_view» для Yandex Metrika hit, Meta Pixel PageView и TikTok Pixel Pageview.

### 3. Подключение к роутеру — `src/main.tsx`

После создания роутера:
- Определяем `hostname`, через `getGtmIdForHost` получаем ID, вызываем `initGtm(id)`.
- Подписываемся на `router.subscribe('onResolved', ({ toLocation }) => pushPageView({ path: toLocation.pathname + toLocation.search, title: document.title }))`. Это срабатывает после каждой завершённой навигации, когда новый `document.title` уже применён (через существующий `installHeadSync`).
- Первый просмотр тоже отправляем явно после `initGtm`, чтобы не зависеть от тайминга первого `onResolved`.

### 4. Учёт переключателя поддоменов (`USE_INTERNAL_ROUTING`)

Логика берёт ID строго по реальному `hostname`. Поэтому:
- В текущем «внутреннем» режиме на nls.kz используется ID основного домена.
- Когда вы переключите `USE_INTERNAL_ROUTING = false` и каждый поддомен начнёт обслуживать свою услугу — автоматически подтянется правильный GTM (например, на `colocation.nls.kz` — GTM-W5VT62QG). Менять ничего не нужно.

### 5. Что нужно настроить в каждом GTM-контейнере

В каждом из 7 контейнеров создаём один общий триггер и переиспользуем его для всех тегов:

- **Trigger**: Custom Event, имя события = `page_view`.
- В тегах Yandex Metrika, Meta Pixel, TikTok Pixel заменить триггер `All Pages` (History Change) на этот `page_view`.
- Опционально: создать переменные dataLayer `page_path`, `page_title` и пробрасывать их в Yandex Metrika hit (`url`, `title`) и в Pixel `PageView`.

После этого все три системы будут получать корректные просмотры при каждом переходе.

## Технические детали

- GTM скрипт грузится синхронно через `appendChild` (async), без блокировки рендера.
- `dataLayer` инициализируется ДО создания скрипта — это обязательное условие GTM-snippet.
- Подписка `router.subscribe('onResolved', ...)` — стандартный API TanStack Router, не требует ререндеров.
- Файлы изменяются: `src/main.tsx`. Новые файлы: `src/config/gtm.ts`, `src/lib/gtm.ts`.
- Поведение `LangProvider` и `CityProvider` не затрагивается.
- SSR не активирован для production (сейчас чистый CSR), поэтому проверки `typeof window !== 'undefined'` достаточно — никаких изменений в server-функциях не требуется.

## Что нужно от вас

1. **GTM ID для основного домена nls.kz** — добавлю в `.env` как `VITE_GTM_ID_MAIN`. Если пока нет — пришлите позже, до этого на nls.kz GTM подключаться не будет.
2. Подтвердите, что в каждом GTM-контейнере вы готовы перенастроить триггеры пикселей на Custom Event `page_view` (или мне расписать пошагово).
