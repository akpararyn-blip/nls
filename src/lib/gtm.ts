/**
 * Загрузчик Google Tag Manager для SPA.
 *
 * В SPA смена маршрута не вызывает перезагрузку документа, поэтому встроенные
 * GTM-триггеры «All Pages» срабатывают только один раз. Чтобы Yandex Metrika,
 * Meta Pixel и TikTok Pixel получали корректные просмотры, мы пушим
 * собственное событие `page_view` в dataLayer на каждой смене URL —
 * в GTM на него настраивается Custom Event триггер.
 */

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

let installedId: string | null = null;

export function initGtm(id: string): void {
  if (typeof window === "undefined") return;
  if (installedId === id) return;
  if (installedId && installedId !== id) {
    // На одном document подключаем только один контейнер.
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  // <noscript> фолбэк — для краулеров и пользователей без JS.
  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);
  if (document.body) {
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  installedId = id;
}

export function pushPageView(opts: { path: string; title?: string }): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: opts.path,
    page_location: window.location.href,
    page_title: opts.title ?? document.title,
  });
}
