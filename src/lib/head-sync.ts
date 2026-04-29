import type { AnyRouter } from "@tanstack/react-router";

/**
 * Совместимость с TanStack Start API `head: () => ({ meta, links })`.
 * При каждой смене маршрута собираем `head` из всех активных маршрутов
 * (root + дочерние) и применяем теги к document.head.
 *
 * Дочерние теги переопределяют родительские по `name` / `property` / `title`.
 */
export function installHeadSync(router: AnyRouter) {
  if (typeof document === "undefined") return;

  const apply = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const matches = (router.state as any).matches as Array<any>;
    if (!matches) return;

    const metaMap = new Map<string, Record<string, string>>();
    let pageTitle: string | undefined;
    const links: Array<Record<string, string>> = [];

    for (const m of matches) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const headFn = (m.routeContext?.head ?? m.staticData?.head ?? m.route?.options?.head) as any;
      // В TanStack Router head хранится в options маршрута
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const route = (router.routesById as any)?.[m.routeId];
      const opts = route?.options ?? {};
      const head = typeof opts.head === "function"
        ? opts.head({ loaderData: m.loaderData, params: m.params, match: m })
        : undefined;
      if (!head) continue;

      if (Array.isArray(head.meta)) {
        for (const tag of head.meta) {
          if (!tag) continue;
          if (tag.title) {
            pageTitle = String(tag.title);
            continue;
          }
          const key = tag.name
            ? `name:${tag.name}`
            : tag.property
              ? `property:${tag.property}`
              : tag.charSet
                ? "charset"
                : tag.httpEquiv
                  ? `http:${tag.httpEquiv}`
                  : JSON.stringify(tag);
          metaMap.set(key, tag);
        }
      }
      if (Array.isArray(head.links)) {
        for (const l of head.links) if (l) links.push(l);
      }
    }

    if (pageTitle) document.title = pageTitle;

    // Чистим ранее проставленные теги и ставим новые
    document
      .querySelectorAll("[data-rh-managed]")
      .forEach((n) => n.parentNode?.removeChild(n));

    for (const tag of metaMap.values()) {
      const el = document.createElement("meta");
      for (const [k, v] of Object.entries(tag)) {
        if (v == null) continue;
        const attr = k === "httpEquiv" ? "http-equiv" : k === "charSet" ? "charset" : k;
        el.setAttribute(attr, String(v));
      }
      el.setAttribute("data-rh-managed", "");
      document.head.appendChild(el);
    }

    for (const l of links) {
      // Стили / favicon уже в index.html — не дублируем `rel=stylesheet` для шрифтов и т.п.
      if (l.rel === "stylesheet") continue;
      if (l.rel === "icon" && document.querySelector('link[rel="icon"]')) continue;
      const el = document.createElement("link");
      for (const [k, v] of Object.entries(l)) {
        if (v == null) continue;
        const attr = k === "crossOrigin" ? "crossorigin" : k;
        el.setAttribute(attr, String(v));
      }
      el.setAttribute("data-rh-managed", "");
      document.head.appendChild(el);
    }
  };

  apply();
  router.subscribe("onResolved", apply);
}
