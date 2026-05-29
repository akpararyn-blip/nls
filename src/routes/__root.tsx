import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { CityProvider } from "@/lib/city-context";
import { LangProvider, useT } from "@/lib/lang-context";

function NotFoundComponent() {
  const t = useT();
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h1>{t("Страница не найдена", "Бет табылмады")}</h1>
        <p>
          {t(
            "Возможно, страница была перемещена или её никогда не существовало. Вернитесь на главную или свяжитесь с нами — мы поможем.",
            "Бұл бет жылжытылған немесе мүлдем болмаған шығар. Басты бетке оралыңыз немесе бізбен байланысыңыз — біз көмектесеміз."
          )}
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            {t("На главную", "Басты бетке")}
          </Link>
          <Link to="/contacts" className="btn btn-outline">
            {t("Связаться с нами", "Бізбен байланысу")}
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
    <LangProvider>
      <CityProvider>
        <Outlet />
      </CityProvider>
    </LangProvider>
  );
}

