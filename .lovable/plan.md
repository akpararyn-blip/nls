## 1. Мета-теги для каждой страницы

Сейчас у большинства маршрутов уже есть `title` + `description` + `og:*`, но нет `keywords` и местами формулировки можно подтянуть. Я пройдусь по всем route-файлам в `src/routes/` (кроме служебных `__root`, `thank-you`, `spam`, `login`, `privacy`, `requisites` — у них оставлю минимум + `noindex` там, где было) и приведу `head: () => ({ meta: [...] })` к единому виду:

- `title` — уникальный, ≤ 60 символов, с ключевым словом.
- `description` — уникальный, ≤ 160 символов.
- `keywords` — 5–10 ключей через запятую (заглушка под услугу, под доработку пользователем).
- `og:title`, `og:description`, `og:type` (`website` / `article` для статей).
- `link rel="canonical"` — относительный путь страницы.

Затронутые файлы (заполню «как вижу», пользователь поправит):
`index.tsx`, `about.tsx`, `contacts.tsx`, `hr.tsx`, `internet.tsx`, `it.tsx`, `it-sks.tsx`, `cloud.tsx`, `cloud-storage.tsx`, `object-storage.tsx`, `iaas.tsx`, `vps.tsx`, `colocation.tsx`, `colocation-full.tsx`, `dedicated.tsx`.

## 2. Блок «Статьи» на странице `/it-sks`

В `src/routes/it-sks.tsx` перед `<Faq />` добавлю новую секцию `<Articles />`:

- Заголовок секции + подзаголовок (RU/KZ через `useT`).
- Сетка из 3 карточек (desktop — 3 в ряд, mobile — стэк).
- Карточка: заглушка-изображение (плейсхолдер 16:9, серый блок с иконкой `ImageIcon` из lucide), бейдж «Статья», заголовок, lorem-текст (2–3 строки), мета (дата + время чтения), `SmartLink` «Читать →».
- Стили добавлю в `src/styles.css` (или существующий `nls.css`), используя текущие токены дизайн-системы.

3 статьи-заглушки:
1. `kak-pravilno-prolozhit-kabel` — «Как правильно проложить кабель в офисе»
2. `vybor-oborudovaniya-dlya-lvs` — «Как выбрать оборудование для ЛВС»
3. `oshibki-pri-montazhe-sks` — «5 ошибок при монтаже СКС»

## 3. Страницы статей + SEO как у новостей

Создам по файлу на статью в `src/routes/`:
`kak-pravilno-prolozhit-kabel.tsx`, `vybor-oborudovaniya-dlya-lvs.tsx`, `oshibki-pri-montazhe-sks.tsx`.

Маршруты топ-уровневые, чтобы URL совпадал с требованием `lan.nls.kz/<slug>`. Каждая страница:

- `SiteLayout` + компонент `ArticleLayout` (новый, в `src/components/nls/ArticleLayout.tsx`) с хлебными крошками `Главная → СКС → <статья>`, заглушкой hero-изображения, заголовком H1, мета (дата публикации, автор «NLS Kazakhstan», время чтения), телом из lorem ipsum (несколько H2/параграфов/списков), CTA «Заказать монтаж СКС» в конце.
- `head: () => ({ meta, links })` со «статейным» SEO:
  - `title`, `description`, `keywords`.
  - `og:type="article"`, `og:title`, `og:description`, `og:url` (относительный).
  - `article:published_time`, `article:author`, `article:section="СКС"`.
  - JSON-LD `Article` (через `<script type="application/ld+json">` в `links`/`scripts` head TanStack — фактически вставлю инлайн в компонент через `useEffect` или через `head().scripts`, как уже сделано в проекте; проверю текущий шаблон в `src/lib/head-sync.ts` — он поддерживает только meta/links, поэтому JSON-LD добавлю прямо в JSX компонента статьи через `<script>` тэг рендерится в head нельзя, поэтому пойду тем же путём, что и `index.html` — встрою `<script type="application/ld+json">` в тело страницы (Google это принимает).

## 4. Поддоменная маршрутизация

В `src/config/links.ts`:

- Расширю `ServicePath` типом, включающим 3 новых slug-а.
- Добавлю их в `PATH_TO_DOMAIN` со значением `lan.nls.kz` (это «родной» поддомен `/it-sks`).
- В `resolveLink`: если текущий хост `lan.nls.kz`, ссылка на `/kak-pravilno-prolozhit-kabel` остаётся внутренней; с других хостов будет переписана на `https://lan.nls.kz/kak-pravilno-prolozhit-kabel`. Логика уже есть в ветке «Прочие сервисные пути → исторический поддомен», нужно только добавить пути в карту.
- В блоке `Articles` и в карточках использовать `SmartLink to="/kak-pravilno-prolozhit-kabel"` и т.д.

## 5. Технические детали

- `src/routeTree.gen.ts` обновится автоматически TanStack File-Based роутером при добавлении файлов в `src/routes/`.
- JSON-LD для `Article` будет рендериться в теле страницы (текущий `head-sync` не прокидывает inline-скрипты), что валидно для Google.
- Никаких изменений в `index.html` и `__root.tsx` не требуется.
- Изображения статей — пока заглушка (CSS-блок с иконкой); пользователь заменит позже.

## Файлы

Изменяю:
- все основные route-файлы из п.1
- `src/routes/it-sks.tsx` (новая секция Articles)
- `src/config/links.ts` (добавить slug-и статей)
- `src/styles.css` или `src/styles/nls.css` (стили карточек статей и article-layout)

Создаю:
- `src/routes/kak-pravilno-prolozhit-kabel.tsx`
- `src/routes/vybor-oborudovaniya-dlya-lvs.tsx`
- `src/routes/oshibki-pri-montazhe-sks.tsx`
- `src/components/nls/ArticleLayout.tsx`
