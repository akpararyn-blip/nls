/**
 * Конфигурация ссылок.
 *
 * USE_INTERNAL_ROUTING:
 *  - true  → весь сайт работает как сейчас, все маршруты внутренние.
 *  - false → ссылки на услуги переписываются на соответствующие поддомены.
 *
 * Кроме «своих» поддоменов есть особый случай — cloud.nls.kz, который
 * выступает «хабом» облачных решений и услуг ЦОД. С любого поддомена ссылки
 * на 7 услуг (Облачные решения + Услуги дата-центра) переписываются на
 * cloud.nls.kz/<service>, а не на исторический «свой» поддомен.
 */
export const USE_INTERNAL_ROUTING = true;

export type ServicePath =
  | "/internet"
  | "/it-sks"
  | "/it"
  | "/colocation"
  | "/dedicated"
  | "/colocation-full"
  | "/vps"
  | "/iaas"
  | "/object-storage"
  | "/cloud-storage"
  | "/cloud"
  | "/kak-pravilno-prolozhit-kabel"
  | "/vybor-oborudovaniya-dlya-lvs"
  | "/oshibki-pri-montazhe-sks";

/** Поддомен → внутренний путь, который он представляет */
export const DOMAIN_TO_PATH: Record<string, ServicePath> = {
  "internet.nls.kz": "/internet",
  "lan.nls.kz": "/it-sks",
  "it.nls.kz": "/it",
  "colocation.nls.kz": "/colocation",
  "dedicated.nls.kz": "/dedicated",
  "rack.nls.kz": "/colocation-full",
  "server.nls.kz": "/vps",
  "iaas.nls.kz": "/iaas",
  "cloud.nls.kz": "/cloud",
};

/** Внутренний путь → внешний поддомен (для путей без своего поддомена ведём на cloud.nls.kz) */
export const PATH_TO_DOMAIN: Record<ServicePath, string> = {
  "/internet": "internet.nls.kz",
  "/it-sks": "lan.nls.kz",
  "/it": "it.nls.kz",
  "/colocation": "colocation.nls.kz",
  "/dedicated": "dedicated.nls.kz",
  "/colocation-full": "rack.nls.kz",
  "/vps": "server.nls.kz",
  "/iaas": "iaas.nls.kz",
  "/object-storage": "cloud.nls.kz",
  "/cloud-storage": "cloud.nls.kz",
  "/cloud": "cloud.nls.kz",
};

/**
 * Услуги, которые обслуживает cloud.nls.kz (хаб «Облачные решения + Услуги ЦОД»).
 * С любого другого поддомена ссылки на эти пути ведут на cloud.nls.kz/<path>.
 */
const CLOUD_HUB_PATHS = new Set<ServicePath>([
  "/iaas",
  "/vps",
  "/object-storage",
  "/cloud-storage",
  "/colocation",
  "/colocation-full",
  "/dedicated",
]);

const SERVICE_PATHS = new Set<string>(Object.keys(PATH_TO_DOMAIN));
const CLOUD_HOST = "cloud.nls.kz";

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

  // Главная этого поддомена — это страница услуги (например, /internet или /cloud)
  if (to === "/") {
    return { internalTo: ownPath, externalHref: null };
  }

  // Ссылка на «свою» услугу ведёт на главную текущего поддомена
  if (to === ownPath) {
    return { internalTo: "/", externalHref: null };
  }

  // На cloud.nls.kz все «хабовые» маршруты обслуживаются внутри поддомена.
  if (host === CLOUD_HOST && isServicePath(to) && CLOUD_HUB_PATHS.has(to)) {
    return { internalTo: to, externalHref: null };
  }

  // С любого другого поддомена ссылка на «хабовый» маршрут ведёт на cloud.nls.kz
  if (host !== CLOUD_HOST && isServicePath(to) && CLOUD_HUB_PATHS.has(to)) {
    return { internalTo: null, externalHref: `https://${CLOUD_HOST}${to}` };
  }

  // Прочие сервисные пути (internet/it/it-sks) — на свой исторический поддомен
  if (isServicePath(to)) {
    const domain = PATH_TO_DOMAIN[to];
    return { internalTo: null, externalHref: `https://${domain}` };
  }

  // Все прочие пути (/about, /hr, /contacts, /thank-you, ...) остаются внутренними
  return { internalTo: to, externalHref: null };
}
