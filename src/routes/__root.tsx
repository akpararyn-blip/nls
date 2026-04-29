import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { CityProvider } from "@/lib/city-context";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h1>Страница не найдена</h1>
        <p>
          Возможно, страница была перемещена или её никогда не существовало.
          Вернитесь на главную или свяжитесь с нами — мы поможем.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            На главную
          </Link>
          <Link to="/contacts" className="btn btn-outline">
            Связаться с нами
          </Link>
        </div>
      </div>
    </div>
  );
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

export const Route = createRootRoute({
  head: () => ({
    scripts: RECAPTCHA_SITE_KEY
      ? [
          {
            src: `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`,
            async: true,
            defer: true,
          },
        ]
      : [],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NLS Kazakhstan" },
      {
        name: "description",
        content:
          "NLS Kazakhstan — единый оператор связи и IT-решений для бизнеса в Казахстане.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CityProvider>
      <Outlet />
    </CityProvider>
  );
}
