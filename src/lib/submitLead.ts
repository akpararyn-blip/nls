import { executeRecaptcha } from "@/lib/recaptcha";
import { BlacklistedPhoneError } from "@/lib/phone-blacklist";

export { BlacklistedPhoneError } from "@/lib/phone-blacklist";

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
  /** Телефон для проверки по чёрному списку и нормализации */
  phone?: string;
  /** ERP form_key (по умолчанию consultation) */
  formKey?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const HANDLER_URL = "/handler.php";

/**
 * Отправка заявки на серверный обработчик (handler.php).
 * Handler сам валидирует, шлёт в Telegram, дублирует в ERP и пишет лог.
 * Все секреты (токен TG, chat_id, ERP-URL) живут только на сервере.
 */
export async function submitLead({
  formName,
  action,
  fields,
  target = "sales",
  city,
  iin,
  isSpam = false,
  phone,
  formKey = "consultation",
}: SubmitLeadOptions): Promise<void> {
  // reCAPTCHA v3 — токен валидируется на бэке
  let recaptchaToken = "";
  try {
    recaptchaToken = await executeRecaptcha(action);
  } catch (err) {
    console.error("[submitLead] reCAPTCHA error:", err);
    throw new Error(
      "Не удалось пройти проверку reCAPTCHA. Попробуйте обновить страницу."
    );
  }

  // Контекст страницы
  const pageTitle = typeof document !== "undefined" ? document.title : "";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const cleanUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "";

  // UTM-метки
  const utm: Record<string, string> = {};
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v;
    }
  }

  // Чистим undefined/null в fields — на бэк уходит только то, что заполнено
  const cleanFields: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null) continue;
    const s = String(v).trim();
    if (s === "") continue;
    cleanFields[k] = s;
  }

  const payload = {
    formName,
    action,
    target,
    fields: cleanFields,
    city: city ?? "",
    iin: iin ?? "",
    isSpam,
    phone: phone ?? "",
    pageTitle,
    pageUrl,
    cleanUrl,
    utm,
    formKey,
    recaptchaToken,
  };

  let res: Response;
  try {
    res = await fetch(HANDLER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[submitLead] network error:", err);
    throw new Error("Сеть недоступна. Попробуйте ещё раз.");
  }

  let data: { ok?: boolean; spam?: boolean; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* handler всегда возвращает JSON, но подстрахуемся */
  }

  if (!res.ok || !data.ok) {
    if (res.status === 422) throw new Error("Некорректный номер телефона.");
    throw new Error(data.error || "Не удалось отправить заявку.");
  }

  // Handler в blacklist-кейсе возвращает {ok:true, spam:true}.
  // Возвращаем ту же ошибку, что и раньше — формы её ловят и редиректят на /spam.
  if (data.spam && !isSpam) {
    throw new BlacklistedPhoneError();
  }
}
