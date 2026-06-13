// Whitelist первых 4 цифр казахстанских мобильных номеров
const VALID_PREFIXES = new Set([
  "7700", "7701", "7702", "7705", "7706", "7707", "7708",
  "7727", "7747", "7717",
  "7770", "7771", "7774", "7775", "7776", "7777", "7778",
  "7710", "7711", "7712", "7713", "7714", "7715", "7716", "7718",
  "7721", "7722", "7723", "7724", "7725", "7726", "7728", "7729",
  "7760", "7761", "7762", "7763", "7764",
  "7750", "7751",
]);

/**
 * Возвращает true, если номер выглядит подозрительно (битая заявка):
 *  - не ровно 11 цифр
 *  - первые 4 цифры не в whitelist
 *  - в оставшихся 7 цифрах одна и та же цифра повторяется 6 и более раз
 */
export function isPhoneSuspicious(phone: string): boolean {
  let digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits.length !== 11) return true;

  const prefix = digits.slice(0, 4);
  if (!VALID_PREFIXES.has(prefix)) return true;

  const tail = digits.slice(4); // 7 цифр
  const counts: Record<string, number> = {};
  let max = 0;
  for (const ch of tail) {
    counts[ch] = (counts[ch] || 0) + 1;
    if (counts[ch] > max) max = counts[ch];
  }
  if (max >= 6) return true;

  return false;
}
