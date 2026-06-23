# Развёртывание на хостинге

## Структура каталогов

```text
/ (root аккаунта)
├── private/
│   ├── config.php          # секреты (НЕ в git)
│   └── logs/               # автосоздаётся handler.php (chmod 0750)
│       └── leads-YYYY-MM.log
└── httpdocs/               # сюда заливается содержимое dist/
    ├── index.html, assets/…
    ├── handler.php         # обработчик форм
    └── blacklist.php       # публичный список заблокированных номеров
```

## Первичная настройка

1. Создайте каталог `private/` рядом с `httpdocs/` (выше web-root).
2. Скопируйте `public/config.example.php` → `/private/config.php` и заполните:
   - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_SALES`, `TELEGRAM_CHAT_HR`
   - `RECAPTCHA_SECRET` (secret key, а не site key — он во фронте)
   - `ERP_URL`, при необходимости `ERP_TIMEOUT`
   - `ALLOWED_ORIGINS` — домены, с которых SPA шлёт запросы
   - `LOG_DIR` — обычно `__DIR__ . '/logs'`
3. Дайте права: `chmod 0640 /private/config.php`, владелец — пользователь PHP-FPM.
4. Каталог `private/logs/` handler создаст сам при первой заявке (0750).

## Деплой

1. Локально: `bun run build` → каталог `dist/`.
2. Содержимое `dist/` залить в `httpdocs/` (включая `handler.php` и `blacklist.php`).
3. `/private/config.php` остаётся нетронутым между деплоями.

## Пополнение чёрного списка телефонов

Отредактировать массив в `httpdocs/blacklist.php` (формат `77XXXXXXXXX`, 11 цифр).
Изменения видны мгновенно — кэширования нет.

## Просмотр логов

```bash
tail -f /private/logs/leads-$(date +%Y-%m).log
```

Формат — одна строка JSON на заявку:
- успех: `{ts, ip, form, target, tg:"ok", erp:200}` (без данных заявки).
- ошибка: те же поля + `error`, `phone`, `name`, `city`, `fields`, `utm`, `page` — чтобы можно было вручную дослать.

## Что точно проверить после деплоя

- `curl https://nls.kz/blacklist.php` отдаёт JSON со списком.
- `curl -X POST https://nls.kz/handler.php -H 'Content-Type: application/json' -d '{}'` отвечает 422/400, а не 404 / HTML главной (значит web-сервер отдаёт `*.php` напрямую, а не заворачивает в SPA).
- Тестовая заявка с сайта приходит в Telegram и появляется записью в логе.
