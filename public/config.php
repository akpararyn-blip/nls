<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

// Чёрный список номеров. Только 11 цифр, формат 77XXXXXXXXX.
// Добавляйте новые номера в массив ниже.
echo json_encode([
  'blacklist' => [
    // '77001234567',
    // '77019998877',
  ],
], JSON_UNESCAPED_UNICODE);
