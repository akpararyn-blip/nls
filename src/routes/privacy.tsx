import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Политика обработки персональных данных ТОО «NLS Kazakhstan».",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section style={{ padding: "60px 0" }}>
        <div className="container">
          <h1 style={{ marginBottom: 24 }}>Политика конфиденциальности</h1>
          <p style={{ marginBottom: 24, color: "var(--color-text-light)" }}>
            Полный документ доступен в формате PDF.
          </p>
          <a
            className="btn btn-primary"
            href="/privacy-policy.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Открыть PDF
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
              title="Политика конфиденциальности"
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
