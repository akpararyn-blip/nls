## Что нужно сделать

Проект сейчас собирается через `@lovable.dev/vite-tanstack-config`, который под капотом включает плагин TanStack Start + Cloudflare-плагин и выдаёт серверную сборку (`wrangler.jsonc`, server-entry). Для FTP-хостинга нужна чистая статика: `index.html` + `assets/` + готовые HTML-страницы маршрутов, чтобы прямые ссылки и обновление страницы работали без Node-сервера.

Хорошая новость: серверного кода в проекте нет — все формы шлются прямо из браузера (`fetch` в Telegram API), reCAPTCHA публичная, никакие `createServerFn` / `/api/*` маршруты не используются. То есть функционально приложение уже client-only, надо только переупаковать сборку.

## Подход

Переключаемся с **TanStack Start (SSR)** на **TanStack Router в режиме SPA + предрендер маршрутов** через официальный плагин `@tanstack/router-plugin/vite`. На выходе получаем папку `dist/` с:
- `index.html` (SPA-фолбэк),
- по `index.html` для каждого статического маршрута (`/login/index.html`, `/about/index.html`, `/internet/index.html` и т.д.) — чтобы Apache/Nginx на shared-хостинге отдавал нужную страницу по прямой ссылке без 404,
- `assets/` со всеми JS/CSS/картинками.

Это снимает зависимость от Cloudflare Workers, `nodejs_compat` и server-функций.

## Изменения в файлах

### 1. `vite.config.ts` — собственная конфигурация без Lovable-обёртки
Уходим от `@lovable.dev/vite-tanstack-config` (он жёстко тянет `tanstackStart()` + Cloudflare). Новый конфиг:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "src/routes",
      generatedRouteTree: "src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: { outDir: "dist", sourcemap: false },
  server: { port: 8080, host: true },
});
```

Никаких `tanstackStart()` и `cloudflare()`.

### 2. Новая точка входа SPA
- `index.html` (в корне) — стандартный Vite-шаблон с `<div id="root">` и `<script type="module" src="/src/main.tsx">`.
- `src/main.tsx` — создаёт роутер и монтирует `<RouterProvider>` в `#root`.

### 3. `src/routes/__root.tsx` — упростить
Убрать `HeadContent`, `Scripts`, `shellComponent`, `links: [{ rel: "stylesheet", href: appCss }]` — это API TanStack Start. В SPA:
- стили подключаются напрямую `import "./styles.css"` в `main.tsx`,
- `<head>` живёт в `index.html`,
- скрипт reCAPTCHA добавляется в `index.html` обычным `<script async defer src="...?render=KEY">` (ключ подставляем через `%VITE_RECAPTCHA_SITE_KEY%` в `index.html` либо инжектим маленьким рантайм-скриптом в `main.tsx`).

`__root.tsx` оставляет только `createRootRoute({ component, notFoundComponent })` с `<Outlet />` внутри `<CityProvider>`.

### 4. Per-route `<head>` через `react-helmet-async` или нативно
TanStack Start `head: () => ({ meta, links, scripts })` перестанет работать. Чтобы не потерять SEO (титулы, OG), добавляем лёгкий хелпер `useDocumentHead({ title, description, ogImage })` на основе `useEffect`, который выставляет `document.title` и мета-теги. На каждой странице меняем `head: () => ({...})` на вызов этого хука в компоненте маршрута. Для предрендеренных страниц мета попадёт прямо в HTML.

### 5. Предрендер всех известных маршрутов
Чтобы прямые ссылки `/login`, `/about`, `/contacts`, `/internet`, `/it-sks`, `/colocation`, `/colocation-full`, `/dedicated`, `/vps`, `/hr`, `/privacy`, `/thank-you` работали без Node-сервера, добавляем простой пост-билд скрипт `scripts/prerender.mjs`, который копирует `dist/index.html` в `dist/<route>/index.html` для каждого маршрута из списка. Apache/Nginx на shared-хостинге сам отдаст правильный файл.

В `package.json`: `"build": "vite build && node scripts/prerender.mjs"`.

### 6. SPA-фолбэк для shared-хостинга
Чтобы любые неизвестные пути (например, опечатки) не давали серверный 404, добавляем в `dist/` файл `.htaccess` (Apache) — дефолт большинства местных shared-хостингов:

```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Тот же скрипт `prerender.mjs` положит его в `dist/`. Если хостинг на Nginx — в README пометим, какую `try_files` директиву попросить у админа.

### 7. Удаляем серверные артефакты
- `wrangler.jsonc` — удалить.
- `@cloudflare/vite-plugin`, `@tanstack/react-start`, `@lovable.dev/vite-tanstack-config` — удалить из `package.json` (сборка их больше не использует).
- В `src/router.tsx` ничего менять не нужно — `createRouter` из `@tanstack/react-router` уже правильный API.
- Импорты `@tanstack/react-router` в коде остаются как есть (`Link`, `useNavigate`, `createFileRoute`, `Outlet`).

### 8. `.env` — продолжает работать
`VITE_*` переменные подхватываются обычным Vite-сборщиком ровно так же. Никакие `process.env` в коде не используются.

## Что получим

После `npm run build` (или `bun run build`) в папке `dist/` будет:
```
dist/
  index.html              ← главная + SPA-фолбэк
  about/index.html
  contacts/index.html
  internet/index.html
  it-sks/index.html
  colocation/index.html
  colocation-full/index.html
  dedicated/index.html
  vps/index.html
  hr/index.html
  login/index.html
  privacy/index.html
  thank-you/index.html
  .htaccess               ← rewrite на index.html
  assets/                 ← JS, CSS, картинки с хешами в именах
  favicon.svg
```

Эту папку можно загрузить на любой shared-хостинг через FTP в корень сайта и оно заработает.

## Риски / на что обратить внимание

- **SEO-метаданные**: текущие `head: () => ({...})` в роутах (титулы, OG-теги для `/about`, `/colocation` и т.д.) надо переписать на хук `useDocumentHead`. Иначе поисковики увидят дефолтный заголовок «NLS Kazakhstan» на всех страницах. Это рутинная, но обязательная правка по каждому файлу в `src/routes/`.
- **Hydration / SSR-данные**: ни одна страница не использует `loader` с серверными данными (всё рендерится на клиенте, формы шлют запросы из браузера) — миграция безопасна.
- **TanStack Start-специфичные импорты**: `HeadContent`, `Scripts`, `shellComponent`, `head: () => ({ scripts })`, `?url`-импорт CSS как «links» — нужно вычистить. Я составлю полный список затронутых файлов на этапе реализации и поправлю каждый.
- **Lovable Preview**: после миграции превью внутри Lovable продолжит работать (это всё ещё Vite + React), но фича Lovable «Publish» больше не будет публиковать на Cloudflare — это и есть цель.

## Резюме

Снимаем Cloudflare/SSR-обёртку, переключаемся на классический SPA + статический предрендер маршрутов + `.htaccess` для рерайтов. На выходе — чистая папка `dist/`, которую заливаем по FTP.