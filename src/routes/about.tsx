import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "NLS Kazakhstan — единый оператор связи с более чем 18-летним опытом. Полный спектр телеком и IT-решений для бизнеса в Казахстане.",
      },
      { property: "og:title", content: "О компании — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Единый оператор связи: более 18 лет на рынке, более 1 000 специалистов, собственный ЦОД и магистральная сеть.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { openConsultationModal } = useCity();
  const t = useT();

  const stats = [
    { value: "18+", label: t("лет на рынке", "нарықта жыл") },
    { value: "15 000+", label: t("юридических лиц", "заңды тұлға") },
    { value: "1 000+", label: t("специалистов", "маман") },
    { value: "18 000+ км", label: t("собственной сети", "меншікті желі") },
  ];

  const benefits = [
    { title: t("Симметричный канал", "Симметриялы арна"), text: t("Передача данных на скорости до 10 Гбит/с.", "Деректерді 10 Гбит/с жылдамдыққа дейін беру.") },
    { title: t("Собственный ЦОД", "Меншікті ЦОД"), text: t("Дата-центр в Алматы Tier III.", "Алматыдағы Tier III дата-орталығы.") },
    { title: t("Монтажные бригады", "Монтаждау бригадалары"), text: t("Оперативно устраняют любые неполадки сети.", "Желідегі кез келген ақаулықты жедел жояды.") },
    { title: t("Команда инженеров", "Инженерлер тобы"), text: t("Решаем задачи клиента быстро и экономически выгодно.", "Клиенттің мәселелерін жылдам және үнемді шешеміз.") },
    { title: t("Мониторинг 24/7", "Мониторинг 24/7"), text: t("Устраняем проблемы раньше, чем вы о них узнаете.", "Сіз білмей тұрып проблемаларды жоямыз.") },
    { title: t("Широкое покрытие", "Кең қамту"), text: t("Присутствие в большинстве БЦ Алматы, Алматинской области, Астаны и Шымкента.", "Алматы, Алматы облысы, Астана және Шымкенттегі БО басым бөлігінде қатысу.") },
  ];

  const services = [
    t("Интернет до 10 Гбит/с", "Интернет 10 Гбит/с дейін"),
    t("Видеонаблюдение", "Бейнебақылау"),
    t("IP-телефония", "IP-телефония"),
    t("IT-аутсорсинг", "IT-аутсорсинг"),
    t("Хостинг и домены", "Хостинг және домендер"),
    t("VPS / VDS и облака", "VPS / VDS және бұлттар"),
    t("Услуги дата-центра", "Дата-орталық қызметтері"),
    t("Colocation и Dedicated", "Colocation және Dedicated"),
  ];

  return (
    <SiteLayout>
      <section className="about-hero">
        <div className="container">
          <span className="section-eyebrow about-hero-eyebrow">{t("О компании", "Компания туралы")}</span>
          <h1 className="about-hero-title">
            <span style={{ color: "var(--color-orange)" }}>NLS</span> Kazakhstan — {t("единый оператор связи и IT", "біртұтас байланыс және IT операторы")}
          </h1>
          <p className="about-hero-text">
            {t(
              "Более 18 лет мы строим телеком и IT-инфраструктуру для бизнеса в Казахстане. Более 1 000 специалистов, собственный дата-центр и магистральная сеть — всё, чтобы ваш бизнес работал без перебоев.",
              "18 жылдан астам уақыт бойы біз Қазақстандағы бизнес үшін телеком және IT-инфрақұрылым құрып келеміз. 1 000-нан астам маман, меншікті дата-орталық және магистральдық желі — бизнесіңіздің үзіліссіз жұмыс істеуі үшін бәрі бар."
            )}
          </p>

          <div className="about-stats">
            {stats.map((s) => (
              <div className="about-stat" key={s.label}>
                <div className="about-stat-value">{s.value}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">{t("Подход", "Тәсіл")}</span>
            <h2>{t("Клиентоориентированность и надёжность", "Клиентке бағытталу және сенімділік")}</h2>
            <p>
              {t(
                "Все решения NLS строятся на принципе клиентоориентированности — снижение затрат на телекоммуникации при росте качества услуг и без сложных технических работ на стороне клиента.",
                "NLS-тің барлық шешімдері клиентке бағытталу қағидатына негізделген — қызмет сапасын арттыра отырып телекоммуникацияға жұмсалатын шығынды азайту және клиент тарапынан күрделі техникалық жұмыссыз."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="about-benefits-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">{t("Преимущества", "Артықшылықтар")}</span>
            <h2>{t("Почему выбирают NLS Kazakhstan", "Неліктен NLS Kazakhstan-ды таңдайды")}</h2>
          </div>

          <div className="about-benefits-grid">
            {benefits.map((b, i) => (
              <article className="about-benefit-card" key={b.title}>
                <div className="about-benefit-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-services">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">{t("Что мы делаем", "Біз не істейміз")}</span>
            <h2>{t("Полный спектр услуг для бизнеса", "Бизнеске арналған толық қызмет спектрі")}</h2>
            <p>{t("От подключения интернета до построения собственной IT-инфраструктуры.", "Интернет қосудан бастап жеке IT-инфрақұрылым құруға дейін.")}</p>
          </div>

          <div className="about-services-list">
            {services.map((s) => (
              <span className="about-service-chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="about-cta-card">
            <div>
              <h2>{t("Обсудим ваш проект?", "Жобаңызды талқылайық па?")}</h2>
              <p>{t("Подберём оптимальное решение под задачи вашего бизнеса.", "Бизнес міндеттеріңізге оңтайлы шешімді таңдаймыз.")}</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
              {t("Получить консультацию", "Кеңес алу")}
            </button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
