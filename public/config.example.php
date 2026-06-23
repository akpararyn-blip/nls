<?php
/**
 * ШАБЛОН секретного конфига.
 *
 * На боевом хостинге этот файл должен лежать ВЫШЕ httpdocs:
 *   /private/config.php   (рядом httpdocs/)
 *
 * httpdocs/handler.php тянет его так:
 *   require __DIR__ . '/../private/config.php';
 *
 * Этот пример коммитится в репозиторий просто как памятка
 * — реальные значения в git попадать НЕ должны.
 */

return [
  // Telegram
  'TELEGRAM_BOT_TOKEN' => '123456:ABC-DEF...',
  'TELEGRAM_CHAT_SALES' => '-1001234567890',
  'TELEGRAM_CHAT_HR'    => '-1009876543210',

  // Google reCAPTCHA v3 (secret key, НЕ site key)
  'RECAPTCHA_SECRET' => '6Lc...secret',
  'RECAPTCHA_MIN_SCORE' => 0.3,

  // ERP endpoint
  'ERP_URL' => 'https://dev.erp.nlskz.com/api/v1/erp/lead',
  'ERP_TIMEOUT' => 8, // секунд

  // Белый список Origin для CORS (если фронт на поддоменах)
  'ALLOWED_ORIGINS' => [
    'https://nls.kz',
    'https://www.nls.kz',
    'https://internet.nls.kz',
    'https://lan.nls.kz',
    'https://hr.nls.kz',
  ],

  // Лимит заявок с одного IP в минуту
  'RATE_LIMIT_PER_MIN' => 10,

  // Путь к директории логов (абсолютный)
  'LOG_DIR' => __DIR__ . '/logs',
];
