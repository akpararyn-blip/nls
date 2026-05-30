/**
 * Конфигурация ссылок.
 *
 * USE_INTERNAL_ROUTING:
 *  - true  → весь сайт работает как сейчас, все маршруты внутренние.
 *  - false → ссылки на услуги переписываются на соответствующие поддомены
 *            (internet.nls.kz, lan.nls.kz, colocation.nls.kz, dedicated.nls.kz,
 *            rack.nls.kz, server.nls.kz). Главная страница каждого поддомена
 *            становится соответствующей услугой.
 *
 * Достаточно поменять этот флаг — компоненты не трогаем.
 */
export const USE_INTERNAL_ROUTING = true;

export type ServicePath =
  | "/internet"
  | "/it-sks"
  | "/colocation"
  | "/dedicated"
  | "/colocation-full"
  | "/vps";

/** Поддомен → внутренний путь, который он представляет */
export const DOMAIN_TO_PATH: Record<string, ServicePath> = {
  "internet.nls.kz": "/internet",
  "lan.nls.kz": "/it-sks",
  "colocation.nls.kz": "/colocation",
  "dedicated.nls.kz": "/dedicated",
  "rack.nls.kz": "/colocation-full",
  "server.nls.kz": "/vps",
};

/** Внутренний путь → внешний поддомен */
export const PATH_TO_DOMAIN: Record<ServicePath, string> = {
  "/internet": "internet.nls.kz",
  "/it-sks": "lan.nls.kz",
  "/colocation": "colocation.nls.kz",
  "/dedicated": "dedicated.nls.kz",
  "/colocation-full": "rack.nls.kz",
  "/vps": "server.nls.kz",
};

const SERVICE_PATHS = new Set<string>(Object.keys(PATH_TO_DOMAIN));

function isServicePath(to: string): to is ServicePath {
  return SERVICE_PATHS.has(to);
}

/** Какому поддомену принадлежит текущий хост (если режим переключён) */
export function currentDomainPath(hostname: string | undefined): ServicePath | null {
  if (!hostname) return null;
  return DOMAIN_TO_PATH[hostname] ?? null;
}

export interface ResolvedLink {
  /** Внутренний маршрут TanStack Router, либо null если ссылка стала внешней */
  internalTo: string | null;
  /** Готовый href, если ссылка должна быть внешней */
  externalHref: string | null;
}

/**
 * Решает, как отрисовать ссылку.
 * @param to    исходный внутренний путь (например, "/colocation")
 * @param host  window.location.hostname (на сервере — undefined)
 */
export function resolveLink(to: string, host: string | undefined): ResolvedLink {
  // Внутренний режим — ничего не меняем
  if (USE_INTERNAL_ROUTING) {
    return { internalTo: to, externalHref: null };
  }

  const ownPath = currentDomainPath(host);

  // Текущий хост не в списке известных поддоменов — поведение по умолчанию
  if (!ownPath) {
    return { internalTo: to, externalHref: null };
  }

  // Главная этого поддомена — это страница услуги (например, /internet)
  if (to === "/") {
    return { internalTo: ownPath, externalHref: null };
  }

  // Ссылка на «свою» услугу ведёт на главную текущего поддомена
  if (to === ownPath) {
    return { internalTo: "/", externalHref: null };
  }

  // Ссылка на «чужую» услугу превращается во внешний URL поддомена
  if (isServicePath(to)) {
    const domain = PATH_TO_DOMAIN[to];
    return { internalTo: null, externalHref: `https://${domain}` };
  }

  // Все прочие пути (/about, /hr, /contacts, /thank-you, ...) остаются внутренними
  return { internalTo: to, externalHref: null };
}
