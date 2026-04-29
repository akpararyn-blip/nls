import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { z } from "zod";

const searchSchema = z.object({
  type: z.enum(["sales", "hr"]).optional(),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Спасибо за заявку — NLS Kazakhstan" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Ваша заявка успешно отправлена. Менеджер NLS Kazakhstan свяжется с вами в ближайшее время.",
      },
    ],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { type } = Route.useSearch();
  const { city } = useCity();
  const isHr = type === "hr";

  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${city.whatsapp.replace("+", "")}`;

  return (
    <SiteLayout>
      <main className="thank-you-main">
        <section className="thank-you-section">
          <div className="container">
            <div className="thank-you-card">
              <div className="thank-you-icon" aria-hidden>
                <CheckCircle2 size={56} strokeWidth={1.6} />
              </div>
              <span className="section-eyebrow">Готово</span>
              <h1>{isHr ? "Спасибо за отклик!" : "Спасибо за заявку!"}</h1>
              <p className="thank-you-lead">
                {isHr
                  ? "Мы получили ваш отклик. HR-менеджер свяжется с вами в течение рабочего дня."
                  : "Мы получили вашу заявку. Менеджер NLS Kazakhstan перезвонит в течение 15 минут в рабочее время."}
              </p>

              <div className="thank-you-meta">
                <div className="thank-you-meta-item">
                  <span className="thank-you-meta-label">Город</span>
                  <strong>{city.name}</strong>
                </div>
                <div className="thank-you-meta-item">
                  <span className="thank-you-meta-label">Телефон</span>
                  <a href={phoneHref}>{city.phone}</a>
                </div>
              </div>

              <div className="thank-you-actions">
                <Link to="/" className="btn btn-primary">
                  На главную
                </Link>
                <a href={phoneHref} className="btn btn-outline">
                  <Phone size={18} />
                  Позвонить
                </a>
                <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
