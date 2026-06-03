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
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function submitLead({
  formName,
  action,
  fields,
  target = "sales",
  city,
  iin,
}: SubmitLeadOptions): Promise<void> {
  // 1. reCAPTCHA v3
  let token = "";
  try {
    token = await executeRecaptcha(action);
  } catch (err) {
    console.error("[submitLead] reCAPTCHA error:", err);
    throw new Error("Не удалось пройти проверку reCAPTCHA. Попробуйте обновить страницу.");
  }

  // 2. Контекст страницы
  const pageTitle = typeof document !== "undefined" ? document.title : "";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // 3. Формирование текста — поле «Город» не дублируем в данных, оно в шапке
  const fieldLines = Object.entries(fields)
    .filter(([k, v]) => v && String(v).trim() !== "" && k !== "Город")
    .map(([k, v]) => `• <b>${escapeHtml(k)}:</b> ${escapeHtml(String(v))}`)
    .join("\n");

  const iinLine = iin
    ? `\n• <b>Проверить ИИН:</b> https://pk.adata.kz/counterparty/main/company/${iin}/basic-info`
    : "";

  const cityLine = city ? `🏙 Город: ${escapeHtml(city)}\n` : "";

  const text =
    `🔔 <b>${escapeHtml(formName)}</b>\n` +
    `📄 Страница: ${escapeHtml(pageTitle)}\n` +
    cityLine +
    `🔗 ${escapeHtml(pageUrl)}\n\n` +
    `<b>Данные заявки:</b>\n${fieldLines}${iinLine}\n\n` +
    `🛡 reCAPTCHA: ${token ? "пройдена" : "ключ не настроен"}`;

  // 4. Отправка в Telegram
  await sendToTelegram(text, target);
}
