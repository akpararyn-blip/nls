import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useT } from "@/lib/lang-context";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — NLS Kazakhstan" },
      {
        name: "description",
        content: "Политика обработки персональных данных ТОО «NLS Kazakhstan».",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const t = useT();
  return (
    <SiteLayout>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <h1 style={{ marginBottom: 24 }}>{t("Политика конфиденциальности", "Құпиялылық саясаты")}</h1>
          <p style={{ marginBottom: 24, color: "var(--color-text-light)" }}>
            {t("Полный документ доступен в формате PDF.", "Толық құжат PDF форматында қолжетімді.")}
          </p>
          <a className="btn btn-primary" href="/privacy-policy.pdf" target="_blank" rel="noreferrer">
            {t("Открыть PDF", "PDF ашу")}
          </a>
          <div
            style={{
              marginTop: 32,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              height: "80vh",
            }}
          >
            <iframe
              src="/privacy-policy.pdf"
              title={t("Политика конфиденциальности", "Құпиялылық саясаты")}
              width="100%"
              height="100%"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
