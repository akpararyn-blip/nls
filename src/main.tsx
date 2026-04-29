import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import "./styles.css";
import { getRouter } from "./router";
import { installHeadSync } from "./lib/head-sync";

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

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
