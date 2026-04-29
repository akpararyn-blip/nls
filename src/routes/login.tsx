import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { StoreBadges } from "@/components/nls/StoreBadges";
import { CheckIcon } from "@/components/nls/Icons";
import mobileAppPreview from "@/assets/mobile-app-preview.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Личный кабинет NLS — мобильное приложение для клиентов" },
      {
        name: "description",
        content:
          "Скачайте мобильное приложение NLS Kazakhstan: личный кабинет, оплата услуг, реактивная техподдержка и инструкции — всегда под рукой.",
      },
      { property: "og:title", content: "Личный кабинет NLS — мобильное приложение" },
      {
        property: "og:description",
        content:
          "Управляйте договорами, оплачивайте услуги и получайте поддержку 24/7 в приложении NLS для iOS и Android.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const features = [
    "Полноценный личный кабинет: договоры, баланс, услуги",
    "Быстрая онлайн-оплата без комиссии",
    "Реактивная техническая поддержка прямо в приложении",
    "Инструкции, статьи и уведомления о работах",
    "Доступ для нескольких сотрудников вашей компании",
  ];
  return (
    <SiteLayout>
      <section className="app-page-section">
        <div className="container">
          <div className="app-page-grid">
            <div className="app-page-content">
              <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
                Личный кабинет · Мобильное приложение
              </span>
              <h1>
                Управляйте услугами NLS{" "}
                <span style={{ color: "var(--color-orange)" }}>в одно касание</span>
              </h1>
              <p className="lead">
                Скачайте мобильное приложение личного кабинета NLS Kazakhstan. Личный кабинет,
                оплата, реактивная техническая поддержка, инструкции и многое другое — всегда под
                рукой.
              </p>

              <ul className="app-features">
                {features.map((f) => (
                  <li key={f}>
                    <CheckIcon width={20} height={20} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <StoreBadges />
            </div>

            <div className="app-page-visual">
              <img
                src={mobileAppPreview}
                alt="Мобильное приложение NLS Kazakhstan — личный кабинет"
                width={480}
                height={520}
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
