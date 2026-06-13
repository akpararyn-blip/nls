import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";

export const Route = createFileRoute("/spam")({
  head: () => ({
    meta: [
      { title: "Заявка получена — NLS Kazakhstan" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SpamPage,
});

function SpamPage() {
  const { city } = useCity();
  const t = useT();
  const waHref = `https://wa.me/${city.whatsapp.replace("+", "")}`;

  return (
    <SiteLayout>
      <main className="thank-you-main">
        <section className="thank-you-section">
          <div className="container">
            <div className="spam-card">
              <div className="spam-card__icon" aria-hidden>
                <AlertTriangle size={56} strokeWidth={1.6} />
              </div>
              <h1 className="spam-card__title">{t("Странно…", "Күмәнді…")}</h1>
              <p className="spam-card__lead">
                {t(
                  "Ваша заявка принята, однако нашему отделу продаж она кажется некорректной. Если с вами не свяжутся в течение рабочего дня — пожалуйста, напишите нам в WhatsApp.",
                  "Сіздің өтініміңіз қабылданды, бірақ біздің сату бөліміне ол күмәнді болып көрінеді. Егер жұмыс күні ішінде сізбен байланыспаса — өтінеміз, бізге WhatsApp арқылы жазыңыз."
                )}
              </p>
              <a href={waHref} target="_blank" rel="noreferrer" className="spam-card__wa">
                <MessageCircle size={18} />
                <span>WhatsApp: {city.whatsapp}</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
