/**
 * Генератор номера заявки в формате: DDMMYYHHMMSSXX,
 * где XX — двузначный случайный суффикс (00-99).
 * Пример: 29052617404101 (29.05.2026 17:40:41).
 */
export function generateOrderNumber(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1);
  const yy = pad(date.getFullYear() % 100);
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  const rand = pad(Math.floor(Math.random() * 100));
  return `${dd}${mm}${yy}${hh}${mi}${ss}${rand}`;
}

export interface OrderSummary {
  number: string;
  formName: string;
  /** Тема заявки (subject) или краткое описание услуги */
  subject?: string;
  /** Все поля заявки, которые были отправлены */
  fields: Record<string, string>;
  /** URL, с которого пришёл пользователь — для кнопки «Назад» */
  from: string;
  /** ISO-дата отправки */
  at: string;
}

const SESSION_KEY = "nls_last_order";

export function saveLastOrder(order: OrderSummary): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(order));
  } catch {
    /* ignore */
  }
}

export function loadLastOrder(): OrderSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderSummary;
  } catch {
    return null;
  }
}
