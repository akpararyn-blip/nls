import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import heroMain from "@/assets/hero-main.png";
import datacenterImg from "@/assets/datacenter.png";
import { LeadForm } from "@/components/forms/LeadForm";
import { USE_INTERNAL_ROUTING, currentDomainPath, type ServicePath } from "@/config/links";
import { InternetPage } from "./internet";
import { ColocationPage } from "./colocation";
import { SksPage } from "./it-sks";
import { DedicatedPage } from "./dedicated";
import { FullRackPage } from "./colocation-full";
import { VpsPage } from "./vps";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "NLS Kazakhstan — Интернет и IT-инфраструктура для бизнеса в Казахстане",
      },
      {
        name: "description",
        content:
          "NLS Kazakhstan — надежный провайдер высокоскоростного интернета и IT-инфраструктуры для бизнеса в Казахстане. Дата-центры, colocation, СКС и IT-аутсорсинг.",
      },
      { property: "og:title", content: "NLS Kazakhstan — Интернет и IT-инфраструктура для бизнеса" },
      {
        property: "og:description",
        content:
          "Высокоскоростной интернет до 10 Гбит/с, дата-центры в Алматы и Астане, colocation и IT-аутсорсинг.",
      },
    ],
  }),
  component: IndexPage,
});

const SERVICE_COMPONENTS: Record<ServicePath, () => JSX.Element> = {
  "/internet": InternetPage,
  "/it-sks": SksPage,
  "/colocation": ColocationPage,
  "/dedicated": DedicatedPage,
  "/colocation-full": FullRackPage,
  "/vps": VpsPage,
};

function IndexPage() {
  // На сервисных поддоменах (internet.nls.kz и т.п.) на главной показываем
  // содержимое страницы соответствующей услуги, не меняя URL.
  const [servicePath, setServicePath] = useState<ServicePath | null>(null);
  useEffect(() => {
    if (USE_INTERNAL_ROUTING) return;
    if (typeof window === "undefined") return;
    setServicePath(currentDomainPath(window.location.hostname));
  }, []);
  if (servicePath) {
    const ServiceComponent = SERVICE_COMPONENTS[servicePath];
    return <ServiceComponent />;
  }

  return (
    <SiteLayout>
      <Hero />
      <Services />
      <DataCenter />
      <Trust />
      <UseCases />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            NLS Kazakhstan — <span style={{ color: "var(--color-orange)" }}>Интернет</span> и
            IT-инфраструктура для бизнеса
          </h1>
          <p className="hero-subtitle">
            Подключаем высокоскоростной интернет до 10 Гбит/с, разворачиваем IT-инфраструктуру и размещаем
            серверы в собственных дата-центрах.
          </p>

          <ul className="hero-bullets">
            {[
              "Более 18 лет на рынке телекоммуникаций",
              "Более 3000 юридических лиц",
              "Онлайн-оформление за 1 день",
              "6 дата-центров (Алматы, Астана)",
              "Техническая поддержка 24/7",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
            Получить коммерческое предложение
          </button>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={heroMain} alt="Data Center NLS Kazakhstan" />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { openConsultationModalWith } = useCity();
  return (
    <section className="services-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Услуги</span>
          <h2>Комплексные IT-решения для бизнеса</h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <h3>Интернет для юридических лиц</h3>
            <p>Стабильный канал связи по оптике до 10 Гбит/с для офисов, складов и производств.</p>
          </div>

          <div className="service-card">
            <h3>IT-аутсорсинг</h3>
            <p>Полное обслуживание IT-инфраструктуры: компьютеры, серверы, ПО и безопасность.</p>
          </div>

          <div className="service-card">
            <h3>СКС</h3>
            <p>
              Проектирование и монтаж структурированных кабельных сетей любой сложности: от офиса до
              бизнес-центра.
            </p>
          </div>

          <div className="service-card">
            <h3>Услуги дата-центра</h3>
            <ul
              style={{
                paddingLeft: 20,
                listStyle: "disc",
                marginTop: 10,
                color: "var(--color-text-light)",
              }}
            >
              <li>Colocation (размещение серверов)</li>
              <li>Dedicated серверы</li>
              <li>Full rack colocation</li>
              <li>Виртуальные серверы (VDS/VPS)</li>
            </ul>
          </div>

          <div className="service-card service-card--cta">
            <h3>Не знаете, что выбрать?</h3>
            <p>
              Получите быструю и бесплатную консультацию инженера. Поможем подобрать оптимальное
              решение под задачи вашего бизнеса.
            </p>
            <button
              type="button"
              className="btn btn-primary service-card-cta-btn"
              onClick={() =>
                openConsultationModalWith({
                  subject: "Бесплатная консультация по IT-решениям",
                })
              }
            >
              Получить консультацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataCenter() {
  return (
    <section className="datacenter-section">
      <div className="container">
        <div className="datacenter-grid">
          <div className="datacenter-content">
            <h2>Собственный дата-центр в Казахстане</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: 20 }}>
              Надёжная инфраструктура для размещения и обработки данных вашего бизнеса.
            </p>

            <div className="dc-facts">
              {[
                { v: "70", l: "Серверных шкафов" },
                { v: "N+1 / 2N", l: "Резервирование" },
                { v: "100%", l: "Без перебоев электропитания" },
                { v: "24/7", l: "Круглосуточный доступ и поддержка" },
              ].map((f) => (
                <div className="dc-fact-item" key={f.l}>
                  <h4
                    style={{
                      color: "var(--color-orange)",
                      fontSize: "1.5rem",
                      marginBottom: 5,
                    }}
                  >
                    {f.v}
                  </h4>
                  <p>{f.l}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 20, fontWeight: 600 }}>Несколько оптоволоконных провайдеров.</p>
          </div>

          <div className="datacenter-img">
            <img src={datacenterImg} alt="NLS Kazakhstan Data Center" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { h: "Надежная инфраструктура", p: "Собственная магистральная сеть и дата-центры" },
    { h: "Масштабируемость", p: "Решения для малого, среднего и крупного бизнеса" },
    { h: "Поддержка 24/7", p: "Инженеры и IT-специалисты всегда на связи" },
    { h: "Работа по договору", p: "Официальные документы и прозрачные условия" },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {items.map((it) => (
            <div className="trust-item" key={it.h}>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    {
      h: "Офисы и бизнес-центры",
      p: "Стабильный интернет и IT-инфраструктура для бесперебойной работы сотрудников, CRM, IP-телефонии и облачных сервисов.",
      f: ["Подключение выделенных линий", "Покрытие бесшовным Wi-Fi", "Резервирование каналов связи"],
    },
    {
      h: "Производственные компании",
      p: "Надежная связь для управления производственными процессами, систем мониторинга и автоматизации.",
      f: ["Реализация резервных каналов", "Защищенные корпоративные сети", "IT-поддержка непрерывной работы"],
    },
    {
      h: "Стартапы и IT",
      p: "Инфраструктура для сайтов и онлайн-сервисов с возможностью быстрого масштабирования под нагрузки.",
      f: [
        "Виртуальные серверы (VPS/VDS)",
        "Аренда Dedicated-серверов",
        "Размещение в дата-центре (Colocation)",
      ],
    },
    {
      h: "Банки и финтех",
      p: "Защищенные каналы связи и отказоустойчивая инфраструктура для обработки финансовых операций.",
      f: ["Соответствие требованиям безопасности", "Многократное резервирование", "Стабильная работа 24/7"],
    },
    {
      h: "Ритейл и склады",
      p: "Стабильный интернет для кассовых систем, складского учета, ERP и онлайн-интеграций по всему Казахстану.",
      f: ["Бесперебойная работа точек продаж", "Wi-Fi для персонала и клиентов", "Единая корпоративная сеть"],
    },
  ];
  return (
    <section className="usecases-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Кейсы</span>
          <h2>Где применяются наши решения</h2>
          <p>Разрабатываем и внедряем индивидуальные IT-стратегии с учётом специфики вашей отрасли.</p>
        </div>

        <div className="usecases-grid">
          {cases.map((c) => (
            <div className="usecase-card" key={c.h}>
              <div className="usecase-icon">
                <CheckIcon />
              </div>
              <h4>{c.h}</h4>
              <p>{c.p}</p>
              <ul className="usecase-features">
                {c.f.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">Контакты</span>
          <h2>Получите расчёт IT-решения под ваш бизнес</h2>
        </div>

        <div className="contact-form">
          <LeadForm
            formName="Главная — заявка на IT-решение"
            action="home_cta"
            idPrefix="home"
          />
        </div>
      </div>
    </section>
  );
}
