// src/services/telegramApi.ts

// Типизируем цель: либо продажи, либо hr
type TargetChat = 'sales' | 'hr';

export const sendToTelegram = async (text: string, target: TargetChat = 'sales') => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  
  const CHAT_ID = target === 'hr' 
    ? import.meta.env.VITE_TELEGRAM_CHAT_HR 
    : import.meta.env.VITE_TELEGRAM_CHAT_SALES;
  
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка отправки в чат ${target}`);
  }
  
  return await response.json();
};