import { SiteLayout } from "@/components/nls/SiteLayout";
import { Link } from "@tanstack/react-router";

export function StubPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <SiteLayout>
      <main className="about-main">
        <section className="about-section">
          <div className="container">
            <h1 style={{ marginBottom: 24 }}>{title}</h1>
            <div className="about-content">
              <p>
                Эта страница в разработке. {description ?? "Скоро здесь появится подробная информация о наших услугах."}
              </p>
              <p style={{ marginTop: 24 }}>
                Свяжитесь с нами по телефону или оставьте{" "}
                <Link to="/" style={{ color: "var(--color-orange)", fontWeight: 600 }}>
                  заявку на главной странице
                </Link>{" "}
                — менеджер ответит на все вопросы.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
