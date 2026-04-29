import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { EnterpriseDataCenterBlocks } from "@/components/nls/EnterpriseBlocks";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import fullRackHero from "@/assets/fullrack.png";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  Server,
  Zap,
  Network,
  ShieldCheck,
  Snowflake,
  Flame,
  Fingerprint,
  Thermometer,
  Building2,
  Landmark,
  Radio,
} from "lucide-react";

export const Route = createFileRoute("/colocation-full")({
  head: () => ({
    meta: [
      { title: "Аренда серверной стойки (Full Rack) в ЦОД Tier III — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Изолированные стойки 42U в собственном дата-центре Tier III. Индивидуальные параметры питания и каналов связи под задачи Enterprise.",
      },
      {
        property: "og:title",
        content: "Аренда серверной стойки (Full Rack) — NLS Kazakhstan",
      },
      {
        property: "og:description",
        content:
          "Полноразмерная стойка 19″ 42U, выделенная мощность, интеллектуальные PDU и резервированные оптические каналы.",
      },
    ],
  }),
  component: FullRackPage,
});



export function FullRackPage() {
  return (
    <SiteLayout>
      <Hero />
      <Specs />
      <Advantages />
      <EnterpriseDataCenterBlocks />
      <Audience />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModalWith } = useCity();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Full Rack · Enterprise
          </span>
          <h1>
            Аренда серверной стойки в ЦОД Tier III{" "}
            <span style={{ color: "var(--color-orange)" }}>(Full Rack)</span>
          </h1>
          <p className="hero-subtitle">
            Изолированные стойки (42 Unit) для вашей ИТ-инфраструктуры в нашем собственном
            дата-центре. Индивидуальные параметры питания и каналов связи под задачи
            Enterprise-уровня.
          </p>

          <ul className="hero-bullets">
            {[
              "Полноразмерная стойка 42U в изолированном холодном коридоре",
              "Выделенная мощность под ваше оборудование",
              "Резервированные оптические каналы связи",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <div className="hero-dedicated-actions" style={{ marginTop: 24 }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                openConsultationModalWith({
                  subject: "Запрос на аренду стойки (Full Rack 42U)",
                })
              }
            >
              Получить индивидуальный расчёт
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img
              src={fullRackHero}
              alt="Аренда серверной стойки Full Rack 42U"
              width={1024}
              height={1024}
            />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const items = [
    {
      Icon: Server,
      h: "Вместимость",
      p: "Полноразмерный шкаф 42 Unit (600×1200×2000 мм). Десятикратный профиль жёсткости.",
    },
    {
      Icon: Zap,
      h: "Питание по запросу",
      p: "Выделенная мощность на шкаф под ваше оборудование. Интеллектуальные PDU (24 порта C13/C19) в каждой стойке со встроенными счётчиками.",
    },
    {
      Icon: Network,
      h: "Связность",
      p: "Подключение оптоволоконных линков, резервирование каналов. Доступ к магистральным сетям Казахстана.",
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Характеристики</span>
          <h2>Что входит в аренду шкафа</h2>
          <p>Решение «под ключ» для размещения большого парка оборудования.</p>
        </div>
        <div className="trust-grid trust-grid--5">
          {items.map(({ Icon, h, p }) => (
            <div className="trust-card" key={h}>
              <div className="trust-icon">
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const items = [
    {
      Icon: ShieldCheck,
      h: "Отказоустойчивость Tier III",
      p: "Многоуровневая архитектура N+1, два независимых энерговвода, ИБП и дизель-генераторы с автозапуском.",
    },
    {
      Icon: Snowflake,
      h: "Изолированный холодный коридор",
      p: "24 серверных шкафа с автоматическим открытием потолка и прецизионным охлаждением (InRow по 35 кВт).",
    },
    {
      Icon: Flame,
      h: "Газовое пожаротушение FM200",
      p: "Мгновенно подавляет возгорание на молекулярном уровне, безопасна для оборудования.",
    },
    {
      Icon: Fingerprint,
      h: "Биометрический контроль",
      p: "7 уровней доступа (Face ID, RFID, отпечаток пальца) и круглосуточное видеонаблюдение с архивом 30 дней.",
    },
    {
      Icon: Thermometer,
      h: "Климат-контроль",
      p: "Адаптация к климату от −40 °C до +45 °C. Непрерывный мониторинг температуры и влажности.",
    },
  ];
  return (
    <section className="trust-section trust-section--alt">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Инфраструктура</span>
          <h2>
            Технологии и безопасность{" "}
            <span style={{ color: "var(--color-orange)" }}>Infinity B40 Cluster</span>
          </h2>
          <p>Характеристики дата-центра едины для всех услуг размещения.</p>
        </div>
        <div className="trust-grid trust-grid--5">
          {items.map(({ Icon, h, p }) => (
            <div className="trust-card" key={h}>
              <div className="trust-icon">
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  const items = [
    {
      Icon: Building2,
      h: "Крупный бизнес и Enterprise",
      p: "Для размещения большого парка серверов и систем хранения данных.",
    },
    {
      Icon: Landmark,
      h: "Банки и Финтех",
      p: "Соответствие строгим требованиям безопасности (PCI DSS, ISO 27001), физическая изоляция оборудования.",
    },
    {
      Icon: Radio,
      h: "Телеком и провайдеры",
      p: "Создание надёжных узлов связи с прямым доступом к магистральным каналам.",
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Кому подойдёт</span>
          <h2>Аренда шкафа — для задач масштаба Enterprise</h2>
        </div>
        <div className="trust-grid trust-grid--5">
          {items.map(({ Icon, h, p }) => (
            <div className="trust-card" key={h}>
              <div className="trust-icon">
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta-section" id="fullrack-form">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">Индивидуальный расчёт</span>
          <h2>Получите коммерческое предложение на аренду стойки</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 760, margin: "0 auto" }}>
            Услуга рассчитывается индивидуально. Стоимость аренды шкафа (42U) зависит от
            требуемой мощности электропитания (кВт) и пропускной способности каналов связи —
            поэтому конфигуратор и тарифы на этой странице отсутствуют.
          </p>
        </div>

        <div className="contact-form">
          <LeadForm
            formName="Аренда стойки — запрос расчёта"
            action="fullrack_cta"
            idPrefix="fr"
            companyLabel="Название компании"
            messageLabel="Комментарий / требования (мощность, каналы, кол-во шкафов)"
            messageFieldKey="Требования"
            messageRows={5}
            submitLabel="Запросить расчёт"
          />
        </div>
      </div>
    </section>
  );
}
