<?php
/**
 * Обработчик заявок с SPA.
 *
 *   POST /handler.php   (JSON)
 *
 * 1) Валидирует и санитизирует данные.
 * 2) Проверяет blacklist / reCAPTCHA / rate-limit.
 * 3) Отправляет сообщение в Telegram.
 * 4) Дублирует заявку в ERP (JSON).
 * 5) Логирует результат в ../private/logs/leads-YYYY-MM.log.
 *
 * Секреты лежат в /private/config.php (вне httpdocs).
 * Шаблон — public/config.example.php.
 */

declare(strict_types=1);


// ===== Конфиг =====================================================
$configPath = __DIR__ . '/private/config.php';
if (!is_file($configPath)) {
  http_response_code(500);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode(['ok' => false, 'error' => 'Server is not configured']);
  exit;
}
$CFG = require $configPath;

// ===== CORS / метод ==============================================
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = $CFG['ALLOWED_ORIGINS'] ?? [];
if ($origin !== '' && in_array($origin, $allowed, true)) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Max-Age: 86400');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// ===== Утилиты ====================================================
function clean_str($v, int $max = 500): string {
  if (!is_scalar($v)) return '';
  $s = (string)$v;
  // Удаляем управляющие символы (кроме \n \r \t)
  $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s) ?? '';
  $s = trim($s);
  if (mb_strlen($s, 'UTF-8') > $max) {
    $s = mb_substr($s, 0, $max, 'UTF-8');
  }
  return $s;
}

function normalize_phone(string $phone): string {
  $digits = preg_replace('/\D+/', '', $phone) ?? '';
  if ($digits !== '' && $digits[0] === '8') {
    $digits = '7' . substr($digits, 1);
  }
  return $digits;
}

function strip_urls(string $s): string {
  return preg_replace('~https?://\S+~iu', '', $s) ?? $s;
}

function flatten_line(string $s): string {
  // Любые переносы → "|"
  $s = preg_replace('/\s*[\r\n]+\s*/u', ' | ', $s) ?? $s;
  return trim($s);
}

function tg_escape(string $s): string {
  return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function client_ip(): string {
  return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function channel_grouping(array $utm): string {
  $m = strtolower((string)($utm['utm_medium'] ?? ''));
  $s = strtolower((string)($utm['utm_source'] ?? ''));
  $hasAny = $m !== '' || $s !== '' || !empty($utm['utm_campaign']);
  if (in_array($m, ['cpc', 'ppc', 'paid', 'paidsearch', 'cpm'], true)) return 'Paid Search';
  if (in_array($m, ['social', 'paid-social', 'paidsocial'], true))     return 'Paid Social';
  if ($m === 'email')                                                  return 'Email';
  if ($m === 'organic')                                                return 'Organic Search';
  if ($m === 'referral')                                               return 'Referral';
  if ($hasAny)                                                         return 'Other';
  return 'Direct';
}

// ===== Логирование ===============================================
function write_log(array $CFG, array $entry): void {
  $dir = $CFG['LOG_DIR'] ?? (__DIR__ . '/private/logs');
  if (!is_dir($dir)) {
    @mkdir($dir, 0750, true);
  }
  $file = rtrim($dir, '/') . '/leads-' . date('Y-m') . '.log';
  $line = json_encode($entry, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
  @file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
  @chmod($file, 0640);
}

// ===== Rate limit (по IP, файл-счётчик) ==========================
function rate_limited(array $CFG): bool {
  $limit = (int)($CFG['RATE_LIMIT_PER_MIN'] ?? 10);
  if ($limit <= 0) return false;
  $dir = ($CFG['LOG_DIR'] ?? (__DIR__ . '/private/logs')) . '/ratelimit';
  if (!is_dir($dir)) @mkdir($dir, 0750, true);
  $key = preg_replace('/[^a-z0-9._:-]/i', '_', client_ip());
  $file = $dir . '/' . $key . '.json';
  $now = time();
  $bucket = ['minute' => (int)floor($now / 60), 'count' => 0];
  if (is_file($file)) {
    $raw = @file_get_contents($file);
    if ($raw) {
      $decoded = json_decode($raw, true);
      if (is_array($decoded) && isset($decoded['minute'], $decoded['count'])) {
        $bucket = $decoded;
      }
    }
  }
  $minute = (int)floor($now / 60);
  if ($bucket['minute'] !== $minute) {
    $bucket = ['minute' => $minute, 'count' => 0];
  }
  $bucket['count']++;
  @file_put_contents($file, json_encode($bucket), LOCK_EX);
  return $bucket['count'] > $limit;
}

// ===== Парсинг входа ==============================================
$raw = file_get_contents('php://input') ?: '';
$payload = json_decode($raw, true);
if (!is_array($payload)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

if (rate_limited($CFG)) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'error' => 'Too many requests']);
  exit;
}

$formName  = clean_str($payload['formName'] ?? '', 200);
$action    = clean_str($payload['action']   ?? '', 64);
$target    = ($payload['target'] ?? 'sales') === 'hr' ? 'hr' : 'sales';
$pageTitle = clean_str($payload['pageTitle'] ?? '', 300);
$pageUrl   = clean_str($payload['pageUrl']   ?? '', 1000);
$cleanUrl  = clean_str($payload['cleanUrl']  ?? $pageUrl, 1000);
$city      = clean_str($payload['city']      ?? '', 100);
$iin       = preg_replace('/\D+/', '', (string)($payload['iin'] ?? '')) ?? '';
if (strlen($iin) !== 12) $iin = '';
$isSpamIn  = !empty($payload['isSpam']);
$formKey   = clean_str($payload['formKey'] ?? 'consultation', 64) ?: 'consultation';
$recaptcha = clean_str($payload['recaptchaToken'] ?? '', 4096);

$fieldsIn = is_array($payload['fields'] ?? null) ? $payload['fields'] : [];
$fields = [];
foreach ($fieldsIn as $k => $v) {
  $key = clean_str((string)$k, 100);
  $val = clean_str((string)$v, 2000);
  if ($key === '' || $val === '') continue;
  $fields[$key] = $val;
}

$utmIn = is_array($payload['utm'] ?? null) ? $payload['utm'] : [];
$utm = [];
foreach (['utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as $uk) {
  $val = clean_str((string)($utmIn[$uk] ?? ''), 200);
  if ($val !== '') $utm[$uk] = $val;
}

// Имя/телефон ищем по типичным ключам формы
$nameVal  = '';
$phoneVal = '';
foreach ($fields as $k => $v) {
  $lk = mb_strtolower($k, 'UTF-8');
  if ($nameVal === ''  && (strpos($lk, 'фио') !== false || strpos($lk, 'имя') !== false || strpos($lk, 'аты') !== false)) $nameVal = $v;
  if ($phoneVal === '' && (strpos($lk, 'телефон') !== false || strpos($lk, 'phone') !== false)) $phoneVal = $v;
}
$phoneNorm = normalize_phone($payload['phone'] ?? $phoneVal);
if (strlen($phoneNorm) !== 11) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Invalid phone']);
  exit;
}

// ===== Blacklist =================================================
// ===== Blacklist =================================================
$blacklist = [];
$blFile = __DIR__ . '/blacklist.php';
if (is_file($blFile)) {
  // blacklist.php сам печатает JSON — но нам нужны данные.
  // Дублируем массив сюда через ob_start.
  ob_start();
  include $blFile;
  $blJson = ob_get_clean();
  $blData = json_decode((string)$blJson, true);
  if (is_array($blData) && isset($blData['blacklist']) && is_array($blData['blacklist'])) {
    $blacklist = array_map(function($p) { return normalize_phone((string)$p); }, $blData['blacklist']);
  }
}
if (in_array($phoneNorm, $blacklist, true)) {
  write_log($CFG, [
    'ts' => date('c'), 'ip' => client_ip(), 'form' => $formName,
    'event' => 'blacklist', 'phone' => $phoneNorm,
  ]);
  echo json_encode(['ok' => true, 'spam' => true]);
  exit;
}

// ===== reCAPTCHA =================================================
$isSpam = $isSpamIn;
if (!empty($CFG['RECAPTCHA_SECRET']) && $recaptcha !== '') {
  $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_POSTFIELDS => http_build_query([
      'secret'   => $CFG['RECAPTCHA_SECRET'],
      'response' => $recaptcha,
      'remoteip' => client_ip(),
    ]),
  ]);
  $resp = curl_exec($ch);
  curl_close($ch);
  $data = json_decode((string)$resp, true);
  $minScore = (float)($CFG['RECAPTCHA_MIN_SCORE'] ?? 0.3);
  if (!is_array($data) || empty($data['success']) || (isset($data['score']) && (float)$data['score'] < $minScore)) {
    $isSpam = true;
  }
}

// ===== Telegram сообщение ========================================
$tgLines = [];
if ($isSpam) $tgLines[] = '🚨 <b>ДАННАЯ ЗАЯВКА УЛИЧЕНА КАК СПАМ</b> 🚨';
$tgLines[] = "🔔 <b>" . tg_escape($formName) . "</b>\n" .
             "📄 Страница: " . tg_escape($pageTitle) . "\n" .
             "🔗 " . tg_escape($cleanUrl);

$fieldOut = [];
foreach ($fields as $k => $v) {
  if (mb_strtolower($k, 'UTF-8') === 'город') continue;
  $fieldOut[] = '• <b>' . tg_escape($k) . ':</b> ' . tg_escape($v);
}
if ($iin !== '') {
  $fieldOut[] = '• <b>Проверить ИИН:</b> https://pk.adata.kz/counterparty/main/company/' . $iin . '/basic-info';
}
$tgLines[] = "<b>Данные заявки:</b>\n" . implode("\n", $fieldOut);

if ($city !== '') $tgLines[] = '🏙 Город: ' . tg_escape($city);

if (!empty($utm)) {
  $utmBlock = [];
  foreach ($utm as $k => $v) $utmBlock[] = $k . '=' . tg_escape($v);
  $tgLines[] = "<b>UTM-метки:</b>\n" . implode("\n", $utmBlock);
}
$tgLines[] = '🔗 Полная ссылка: ' . tg_escape($pageUrl);

$tgText = implode("\n\n", $tgLines);
$chatId = $target === 'hr' ? ($CFG['TELEGRAM_CHAT_HR'] ?? '') : ($CFG['TELEGRAM_CHAT_SALES'] ?? '');
$tgStatus = 'skip';
$tgError = null;

if (!empty($CFG['TELEGRAM_BOT_TOKEN']) && $chatId !== '') {
  $ch = curl_init('https://api.telegram.org/bot' . $CFG['TELEGRAM_BOT_TOKEN'] . '/sendMessage');
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode([
      'chat_id' => $chatId,
      'text'    => $tgText,
      'parse_mode' => 'HTML',
      'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE),
  ]);
  $tgResp = curl_exec($ch);
  $tgCode = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
  $curlErr = curl_error($ch);
  curl_close($ch);
  if ($tgCode >= 200 && $tgCode < 300) {
    $tgStatus = 'ok';
  } else {
    $tgStatus = 'err:' . $tgCode;
    $tgError = $curlErr ?: substr((string)$tgResp, 0, 200);
  }
}

// ===== ERP (JSON) =================================================
// Сборка comment
$commentParts = [];
if ($pageTitle !== '' || $cleanUrl !== '') {
  $commentParts[] = 'Страница: ' . trim($pageTitle . ' ' . $cleanUrl);
}
foreach ($fields as $k => $v) {
  $lk = mb_strtolower($k, 'UTF-8');
  // Дубли: имя, телефон, город — пропускаем
  if (strpos($lk, 'фио') !== false || strpos($lk, 'имя') !== false || strpos($lk, 'аты') !== false) continue;
  if (strpos($lk, 'телефон') !== false || strpos($lk, 'phone') !== false) continue;
  if ($lk === 'город') continue;
  $commentParts[] = $k . ': ' . $v;
}
if ($iin !== '' && !isset($fields['Компания/БИН'])) {
  $commentParts[] = 'БИН/ИИН: ' . $iin;
}
if ($city !== '') $commentParts[] = 'Город: ' . $city;

$comment = implode(' | ', $commentParts);
$comment = strip_urls($comment);
$comment = flatten_line($comment);
if (mb_strlen($comment, 'UTF-8') > 4000) $comment = mb_substr($comment, 0, 4000, 'UTF-8');

$tracking = [
  'website_domain'   => 'nls.kz',
  'landing_page_url' => $pageUrl !== '' ? $pageUrl : null,
  'ft_utm_source'    => null,
  'ft_utm_medium'    => null,
  'ft_utm_campaign'  => null,
  'ft_utm_term'      => null,
  'ft_utm_content'   => null,
  'ft_referrer'      => null,
  'lt_utm_source'    => $utm['utm_source']   ?? null,
  'lt_utm_medium'    => $utm['utm_medium']   ?? null,
  'lt_utm_campaign'  => $utm['utm_campaign'] ?? null,
  'lt_utm_term'      => $utm['utm_term']     ?? null,
  'lt_utm_content'   => $utm['utm_content']  ?? null,
  'lt_referrer'      => null,
  'channel_grouping' => channel_grouping($utm),
];

$erpStatus = null;
$erpError = null;
if (!empty($CFG['ERP_URL'])) {
  $body = [
    'name'     => $nameVal !== '' ? $nameVal : 'Без имени',
    'phone'    => $phoneNorm,
    'form_key' => $formKey,
    'comment'  => $comment,
    'tracking' => json_encode($tracking, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
  ];
  $ch = curl_init($CFG['ERP_URL']);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => (int)($CFG['ERP_TIMEOUT'] ?? 8),
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
  ]);
  $erpResp = curl_exec($ch);
  $erpStatus = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
  $curlErr = curl_error($ch);
  curl_close($ch);
  if ($erpStatus < 200 || $erpStatus >= 300) {
    $erpError = $curlErr ?: substr((string)$erpResp, 0, 200);
  }
}

// ===== Лог =======================================================
$ok = $tgStatus === 'ok' && ($erpStatus === null || ($erpStatus >= 200 && $erpStatus < 300));
$logEntry = [
  'ts'     => date('c'),
  'ip'     => client_ip(),
  'form'   => $formName,
  'target' => $target,
  'tg'     => $tgStatus,
  'erp'    => $erpStatus,
];
if (!$ok) {
  $logEntry['error']  = trim((string)$tgError . ' | ' . (string)$erpError, ' |');
  $logEntry['phone']  = $phoneNorm;
  $logEntry['name']   = $nameVal;
  $logEntry['city']   = $city;
  $logEntry['fields'] = $fields;
  $logEntry['utm']    = $utm;
  $logEntry['page']   = $pageUrl;
}
write_log($CFG, $logEntry);

// ===== Ответ фронту ==============================================
// Пользователю показываем успех, если хотя бы Telegram прошёл.
// ===== Ответ фронту ==============================================
echo json_encode([
  'ok'   => $tgStatus === 'ok',
  'spam' => $isSpam,
  'debug_erp_status' => $erpStatus, // ВРЕМЕННО ДЛЯ ТЕСТА
  'debug_erp_error'  => $erpError   // ВРЕМЕННО ДЛЯ ТЕСТА
]);
