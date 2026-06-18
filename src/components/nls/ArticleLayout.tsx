import { type ReactNode } from "react";
import { SmartLink } from "./SmartLink";
import { useT } from "@/lib/lang-context";
import { useCity } from "@/lib/city-context";
import { ArrowRight, Calendar, Clock, ImageIcon } from "lucide-react";

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  publishedTime: string; // ISO
  readingMinutes: number;
  section?: string;
}

interface Props {
  meta: ArticleMeta;
  image?: string;
  imageAlt?: string;
  children: ReactNode;
}

export function ArticleLayout({ meta, image, imageAlt, children }: Props) {
  const t = useT();
  const { openConsultationModal } = useCity();

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishedTime,
    dateModified: meta.publishedTime,
    author: { "@type": "Organization", name: "NLS Kazakhstan" },
    publisher: {
      "@type": "Organization",
      name: "NLS Kazakhstan",
      logo: { "@type": "ImageObject", url: "/favicon.svg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `/${meta.slug}` },
    articleSection: meta.section ?? t("СКС", "ҚКЖ"),
  };

  if (image) {
    jsonLd.image = {
      "@type": "ImageObject",
      url: image,
    };
  }

  const dateStr = new Date(meta.publishedTime).toLocaleDateString(
    t("ru-RU", "kk-KZ"),
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <article className="article-page">
      <div className="container">
        <nav className="article-breadcrumbs" aria-label="breadcrumbs">
          <SmartLink to="/">{t("Главная", "Басты бет")}</SmartLink>
          <span>/</span>
          <SmartLink to="/it-sks">{t("СКС", "ҚКЖ")}</SmartLink>
          <span>/</span>
          <span className="is-current">{meta.title}</span>
        </nav>

        <header className="article-header">
          <span className="article-eyebrow">{t("Статья", "Мақала")}</span>
          <h1>{meta.title}</h1>
          <div className="article-meta">
            <span><Calendar size={16} /> {dateStr}</span>
            <span><Clock size={16} /> {meta.readingMinutes} {t("мин", "мин")}</span>
          </div>
        </header>

        <div className={`article-hero${image ? " has-image" : ""}`} aria-hidden="true">
          {image ? (
            <img src={image} alt={imageAlt || meta.title} loading="eager" />
          ) : (
            <ImageIcon size={48} strokeWidth={1.2} />
          )}
        </div>


        <div className="article-body">{children}</div>

        <div className="article-cta">
          <h3>{t("Нужен монтаж СКС под ключ?", "Дайын күйінде ҚКЖ орнату қажет пе?")}</h3>
          <p>
            {t(
              "Оставьте заявку — инженер выедет, сделает замеры и подготовит смету.",
              "Өтінім қалдырыңыз — инженер шығып, өлшеу жасап, сметаны дайындайды."
            )}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openConsultationModal()}
          >
            {t("Получить консультацию", "Кеңес алу")}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
