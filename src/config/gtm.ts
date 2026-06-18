/**
 * Маппинг хост → GTM container ID.
 *
 * Логика работает по реальному window.location.hostname, поэтому совместима
 * с переключателем USE_INTERNAL_ROUTING из ./links.ts: пока всё крутится
 * на nls.kz — используется GTM_ID_MAIN, после перевода на поддомены каждый
 * поддомен подтянет свой контейнер автоматически.
 */

const GTM_ID_MAIN = import.meta.env.VITE_GTM_ID_MAIN as string | undefined;

const HOST_TO_GTM: Record<string, string> = {
  "colocation.nls.kz": "GTM-W5VT62QG",
  "dedicated.nls.kz": "GTM-WZ29K6QS",
  "internet.nls.kz": "GTM-TMG5ZQDK",
  "lan.nls.kz": "GTM-PT6RVBPF",
  "rack.nls.kz": "GTM-WFDBFNWW",
  "server.nls.kz": "GTM-PLJN2C4N",
  "iaas.nls.kz": "GTM-PSQKW2CG",
  "cloud.nls.kz": "GTM-5QZ8PR2Q",
  "it.nls.kz": "GTM-W5LRRBL5",
};

/** Возвращает GTM ID для текущего хоста или null, если трекинг не нужен. */
export function getGtmIdForHost(hostname: string | undefined): string | null {
  if (!hostname) return null;

  const host = hostname.toLowerCase();

  // Превью/dev-домены — без трекинга.
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".lovable.app") ||
    host.endsWith(".lovableproject.com")
  ) {
    return null;
  }

  if (HOST_TO_GTM[host]) return HOST_TO_GTM[host];

  // Основной домен (nls.kz, www.nls.kz и любой иной поддомен) — из env.
  if (host === "nls.kz" || host.endsWith(".nls.kz")) {
    return GTM_ID_MAIN ?? null;
  }

  return null;
}
