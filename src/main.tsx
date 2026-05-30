import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";
import { installHeadSync } from "./lib/head-sync";
import { getGtmIdForHost } from "./config/gtm";
import { initGtm, pushPageView } from "./lib/gtm";

// reCAPTCHA v3 — публичный ключ, безопасно подключать прямо в браузере.
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as
  | string
  | undefined;
if (RECAPTCHA_SITE_KEY && typeof document !== "undefined") {
  const s = document.createElement("script");
  s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

const router = getRouter();
installHeadSync(router);

// Google Tag Manager: подгружаем контейнер по hostname и пушим page_view
// на каждой смене маршрута (head-sync уже обновил document.title к этому моменту,
// так как подписался на onResolved раньше).
if (typeof window !== "undefined") {
  const gtmId = getGtmIdForHost(window.location.hostname);
  if (gtmId) {
    initGtm(gtmId);
    pushPageView({
      path: window.location.pathname + window.location.search,
    });
    router.subscribe("onResolved", ({ toLocation }) => {
      pushPageView({
        path: toLocation.pathname + (toLocation.searchStr ?? ""),
      });
    });
  }
}

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
