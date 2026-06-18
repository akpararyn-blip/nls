/**
 * Чёрный список телефонов.
 * Список тянется с /config.php на хостинге — там администратор вручную
 * пополняет массив запрещённых номеров. Если файл недоступен или вернул
 * что-то некорректное — список считается пустым, чтобы не блокировать
 * легитимные заявки.
 */

export class BlacklistedPhoneError extends Error {
  constructor() {
    super("Phone is blacklisted");
    this.name = "BlacklistedPhoneError";
  }
}

/** Нормализуем номер к 11 цифрам, формат 77XXXXXXXXX. Возвращает "" если не валиден. */
export function normalizePhone(phone: string): string {
  let digits = (phone || "").replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits.length !== 11) return "";
  return digits;
}

let cache: Promise<Set<string>> | null = null;

async function loadBlacklist(): Promise<Set<string>> {
  try {
    const res = await fetch("/config.php", { cache: "no-store" });
    if (!res.ok) return new Set();
    const data = (await res.json()) as { blacklist?: unknown };
    if (!data || !Array.isArray(data.blacklist)) return new Set();
    const set = new Set<string>();
    for (const item of data.blacklist) {
      const n = normalizePhone(String(item ?? ""));
      if (n) set.add(n);
    }
    return set;
  } catch (err) {
    console.warn("[phone-blacklist] не удалось загрузить /config.php:", err);
    return new Set();
  }
}

export function fetchPhoneBlacklist(): Promise<Set<string>> {
  if (!cache) cache = loadBlacklist();
  return cache;
}

export async function isPhoneBlacklisted(phone: string): Promise<boolean> {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  const list = await fetchPhoneBlacklist();
  return list.has(normalized);
}
