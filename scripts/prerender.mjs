// Постбилд: создаём <route>/index.html для каждого статического маршрута,
// чтобы прямые ссылки и обновление страницы работали на shared-хостинге
// без серверного фолбэка. Плюс кладём .htaccess для Apache.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const indexPath = join(distDir, "index.html");

if (!existsSync(indexPath)) {
  console.error("[prerender] dist/index.html не найден. Сначала `vite build`.");
  process.exit(1);
}

const ROUTES = [
  "about",
  "contacts",
  "internet",
  "it-sks",
  "colocation",
  "colocation-full",
  "dedicated",
  "vps",
  "hr",
  "login",
  "privacy",
  "thank-you",
];

const html = readFileSync(indexPath, "utf8");

for (const route of ROUTES) {
  const dir = join(distDir, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
  console.log(`[prerender] ${route}/index.html`);
}

// Apache .htaccess — SPA-фолбэк на index.html для любых неизвестных путей.
// На Nginx нужна директива `try_files $uri $uri/ /index.html;` в конфиге сервера.
const htaccess = `# SPA fallback for shared hosting (Apache)
Options -MultiViews
RewriteEngine On
RewriteBase /

# Не трогаем существующие файлы и директории
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Всё остальное — на index.html (роутинг разрулит TanStack Router)
RewriteRule . /index.html [L]

# Кэш для ассетов с хешами в имени
<IfModule mod_headers.c>
  <FilesMatch "\\.(?:js|css|woff2?|ttf|otf|eot|svg|png|jpe?g|webp|avif|gif|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>
`;
writeFileSync(join(distDir, ".htaccess"), htaccess, "utf8");
console.log("[prerender] .htaccess");

console.log("[prerender] done.");
