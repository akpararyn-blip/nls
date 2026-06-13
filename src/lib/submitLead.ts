import { sendToTelegram } from "@/services/telegramApi";
import { executeRecaptcha } from "@/lib/recaptcha";

export type LeadTarget = "sales" | "hr";

export interface SubmitLeadOptions {
  /** Человекочитаемое имя формы, например «СКС — заявка на проект» */
  formName: string;
  /** Action для reCAPTCHA (латиница и подчёркивания) */
  action: string;
  /** Поля заявки: ключ — подпись, значение — введённые данные */
  fields: Record<string, string | undefined | null>;
  /** Куда отправлять: sales (по умолчанию) или hr */
  target?: LeadTarget;
  /** Город, выбранный на сайте (для вывода в шапке сообщения) */
  city?: string;
  /** Найденный в поле «Название компании или ИИН/БИН» 12-значный ИИН/БИН */
  iin?: string;
  /** Заявка определена как спам (битый телефон и т.п.) */
  isSpam?: boolean;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export async function submitLead({
  formName,
  action,
  fields,
  target = "sales",
  city,
  iin,
  isSpam = false,
}: SubmitLeadOptions): Promise<void> {
  // 1. reCAPTCHA v3 — выполняем, но результат в сообщение не пишем
  try {
    await executeRecaptcha(action);
  } catch (err) {
    console.error("[submitLead] reCAPTCHA error:", err);
    throw new Error("Не удалось пройти проверку reCAPTCHA. Попробуйте обновить страницу.");
  }

  // 2. Контекст страницы
  const pageTitle = typeof document !== "undefined" ? document.title : "";
  const fullUrl = typeof window !== "undefined" ? window.location.href : "";
  const cleanUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";

  // UTM-метки
  const utmPairs: Array<[string, string]> = [];
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utmPairs.push([k, v]);
    }
  }

  // 3. Поля
  const fieldLines = Object.entries(fields)
    .filter(([k, v]) => v && String(v).trim() !== "" && k !== "Город")
    .map(([k, v]) => `• <b>${escapeHtml(k)}:</b> ${escapeHtml(String(v))}`)
    .join("\n");

  const iinLine = iin
    ? `\n• <b>Проверить ИИН:</b> https://pk.adata.kz/counterparty/main/company/${iin}/basic-info`
    : "";

  // 4. Сборка сообщения
  const parts: string[] = [];

  if (isSpam) {
    parts.push("🚨 <b>ДАННАЯ ЗАЯВКА УЛИЧЕНА КАК СПАМ</b> 🚨");
  }

  parts.push(
    `🔔 <b>${escapeHtml(formName)}</b>\n` +
      `📄 Страница: ${escapeHtml(pageTitle)}\n` +
      `🔗 ${escapeHtml(cleanUrl)}`
  );

  parts.push(`<b>Данные заявки:</b>\n${fieldLines}${iinLine}`);

  if (city) {
    parts.push(`🏙 Город: ${escapeHtml(city)}`);
  }

  if (utmPairs.length > 0) {
    const utmBlock = utmPairs.map(([k, v]) => `${k}=${escapeHtml(v)}`).join("\n");
    parts.push(`<b>UTM-метки:</b>\n${utmBlock}`);
  }

  parts.push(`🔗 Полная ссылка: ${escapeHtml(fullUrl)}`);

  const text = parts.join("\n\n");

  // 5. Отправка в Telegram
  await sendToTelegram(text, target);
}
