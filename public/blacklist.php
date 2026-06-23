<?php
// Публичный список заблокированных телефонов.
// Читается фронтендом (src/lib/phone-blacklist.ts) перед отправкой формы.
// Только цифры, формат 77XXXXXXXXX (11 цифр).
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

echo json_encode([
  'blacklist' => [
    '77020670431',
    '77011230275',
    '77071228032',
    '77472645072',
    '77058499860',
    '77513165656',
    '77002851900',
    '77769242006',
    '77474961848',
    '77026655220',
    '77718594840',
    '77475046487',
    '77767002500',
  ],
], JSON_UNESCAPED_UNICODE);
