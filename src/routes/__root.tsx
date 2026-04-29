import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { CityProvider } from "@/lib/city-context";

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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: "NLS Kazakhstan" },
      {
        name: "description",
        content:
          "NLS Kazakhstan — единый оператор связи и IT-решений для бизнеса в Казахстане.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <CityProvider>
      <Outlet />
    </CityProvider>
  );
}
