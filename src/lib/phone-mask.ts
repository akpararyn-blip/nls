/**
 * Маска казахстанского номера телефона: "+7 7XX XXX XX XX".
 * Используется во всех формах с полем телефона.
 */
export function formatKzPhone(value: string): string {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").replace(/^7?/, "");
  const m = digits.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  if (!m) return "+7";
  const [, a, b, c, d] = m;
  let out = "+7";
  if (a) out += " " + a;
  if (b) out += " " + b;
  if (c) out += " " + c;
  if (d) out += " " + d;
  return out;
}
