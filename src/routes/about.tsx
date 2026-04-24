import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";

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
          "Единый оператор связи: более 18 лет на рынке, более 300 специалистов, собственные ЦОД и магистральная сеть.",
      },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "18+", label: "лет на рынке" },
  { value: "3000+", label: "юридических лиц" },
  { value: "300+", label: "специалистов" },
  { value: "500+ км", label: "собственной сети" },
];

const benefits = [
  {
    title: "Симметричный канал",
    text: "Передача данных на скорости до 10 Гбит/с.",
  },
  {
    title: "Собственный ЦОД",
    text: "Дата-центр в Алматы с каналом до 100 Мбит/с.",
  },
  {
    title: "Монтажные бригады",
    text: "Оперативно устраняют любые неполадки сети.",
  },
  {
    title: "Команда инженеров",
    text: "Решаем задачи клиента быстро и экономически выгодно.",
  },
  {
    title: "Мониторинг 24/7",
    text: "Устраняем проблемы раньше, чем вы о них узнаете.",
  },
  {
    title: "Широкое покрытие",
    text: "Присутствие в большинстве БЦ Алматы и Астаны.",
  },
];

const services = [
  "Интернет до 10 Гбит/с",
  "Видеонаблюдение",
  "IP-телефония",
  "IT-аутсорсинг",
  "Хостинг и домены",
  "VPS / VDS и облака",
  "Услуги дата-центра",
  "Colocation и Dedicated",
];

function AboutPage() {
  const { openConsultationModal } = useCity();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="section-eyebrow about-hero-eyebrow">О компании</span>
          <h1 className="about-hero-title">
            <span style={{ color: "var(--color-orange)" }}>NLS</span> Kazakhstan — единый оператор связи и IT
          </h1>
          <p className="about-hero-text">
            Более 18 лет мы строим телеком- и IT-инфраструктуру для бизнеса в Казахстане. Более 300
            специалистов, собственные дата-центры и магистральная сеть — всё, чтобы ваш бизнес работал без
            перебоев.
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

      {/* Mission */}
      <section className="about-mission">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Подход</span>
            <h2>Клиентоориентированность и надёжность</h2>
            <p>
              Все решения NLS строятся на принципе клиентоориентированности — снижение затрат на
              телекоммуникации при росте качества услуг и без сложных технических работ на стороне клиента.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="about-benefits-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Преимущества</span>
            <h2>Почему выбирают NLS Kazakhstan</h2>
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

      {/* Services */}
      <section className="about-services">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Что мы делаем</span>
            <h2>Полный спектр услуг для бизнеса</h2>
            <p>От подключения интернета до построения собственной IT-инфраструктуры.</p>
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

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-card">
            <div>
              <h2>Обсудим ваш проект?</h2>
              <p>Подберём оптимальное решение под задачи вашего бизнеса.</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
              Получить консультацию
            </button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
