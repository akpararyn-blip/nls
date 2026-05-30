import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, MessageCircle, ArrowLeft, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { loadLastOrder, type OrderSummary } from "@/lib/order-number";
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
  const t = useT();
  const isHr = type === "hr";

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrder(loadLastOrder());
  }, []);

  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${city.whatsapp.replace("+", "")}`;
  const backHref = order?.from && order.from !== "/thank-you" ? order.from : "/";

  const copyNumber = async () => {
    if (!order) return;
    try {
      await navigator.clipboard.writeText(order.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <SiteLayout>
      <main className="thank-you-main">
        <section className="thank-you-section">
          <div className="container">
            <div className="thank-you-card">
              <div className="thank-you-icon" aria-hidden>
                <CheckCircle2 size={56} strokeWidth={1.6} />
              </div>
              <span className="section-eyebrow">{t("Готово", "Дайын")}</span>
              <h1>
                {isHr
                  ? t("Спасибо за отклик!", "Өтінішіңізге рақмет!")
                  : t("Спасибо за заявку!", "Өтінімге рақмет!")}
              </h1>
              <p className="thank-you-lead">
                {isHr
                  ? t(
                      "Мы получили ваш отклик. HR-менеджер свяжется с вами в течение рабочего дня.",
                      "Біз сіздің өтінішіңізді алдық. HR-менеджер жұмыс күні ішінде сізбен байланысады."
                    )
                  : t(
                      "Мы получили вашу заявку. Менеджер NLS Kazakhstan перезвонит в течение 15 минут в рабочее время.",
                      "Біз сіздің өтініміңізді алдық. NLS Kazakhstan менеджері жұмыс уақытында 15 минут ішінде хабарласады."
                    )}
              </p>

              {order && (
                <div className="thank-you-order">
                  <div className="thank-you-order-head">
                    <div>
                      <span className="thank-you-order-label">{t("Номер заявки", "Өтінім нөмірі")}</span>
                      <strong className="thank-you-order-num">{order.number}</strong>
                    </div>
                    <button
                      type="button"
                      className="thank-you-copy"
                      onClick={copyNumber}
                      aria-label={t("Скопировать номер", "Нөмірді көшіру")}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? t("Скопировано", "Көшірілді") : t("Копировать", "Көшіру")}
                    </button>
                  </div>

                  {order.subject && (
                    <div className="thank-you-order-subject">
                      <span className="thank-you-meta-label">{t("Услуга / тема", "Қызмет / тақырып")}</span>
                      <strong>{order.subject}</strong>
                    </div>
                  )}

                  <div className="thank-you-order-fields">
                    <div className="thank-you-meta-label">{t("Данные заявки", "Өтінім мәліметтері")}</div>
                    <dl>
                      {Object.entries(order.fields)
                        .filter(([, v]) => v && String(v).trim() !== "")
                        .map(([k, v]) => (
                          <div className="thank-you-order-row" key={k}>
                            <dt>{k}</dt>
                            <dd>{v}</dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                </div>
              )}

              <div className="thank-you-meta">
                <div className="thank-you-meta-item">
                  <span className="thank-you-meta-label">{t("Город", "Қала")}</span>
                  <strong>{t(city.name.ru, city.name.kz)}</strong>
                </div>
                <div className="thank-you-meta-item">
                  <span className="thank-you-meta-label">{t("Телефон", "Телефон")}</span>
                  <a href={phoneHref}>{city.phone}</a>
                </div>
              </div>

              <div className="thank-you-actions">
                <Link to={backHref} className="btn btn-primary">
                  <ArrowLeft size={18} />
                  {t("Вернуться назад", "Кері оралу")}
                </Link>
                <a href={phoneHref} className="btn btn-outline">
                  <Phone size={18} />
                  {t("Позвонить", "Қоңырау шалу")}
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
