import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import internetHero from "@/assets/internet-hero2.png";
import { useState, type FormEvent } from "react";
import {
  Cctv,
  Network,
  ShieldCheck,
  Wifi,
  Server,
  HardDrive,
  Cloud,
  Boxes,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/internet")({
  head: () => ({
    meta: [
      { title: "Интернет для бизнеса до 10 Гбит/с — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Высокоскоростной интернет от 10 Мбит/с до 10 Гбит/с для офисов и бизнес-центров. Симметричные каналы, SLA, поддержка 24/7.",
      },
      { property: "og:title", content: "Высокоскоростной интернет для бизнеса — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Симметричные каналы связи по оптоволокну для офисов, предприятий и HoReCa.",
      },
    ],
  }),
  component: InternetPage,
});

function InternetPage() {
  return (
    <SiteLayout>
      <Hero />
      <Tariffs />
      <ExtraServices />
      <DcServices />
      <Trust />
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
            <span style={{ color: "var(--color-orange)" }}>Высокоскоростной интернет</span> от 10 Мбит/с
            до 10 Гбит/с
          </h1>
          <p className="hero-subtitle">
            Присутствуем в большинстве бизнес-центров. Стабильное соединение по оптоволокну для офисов,
            предприятий и HoReCa.
          </p>

          <ul className="hero-bullets">
            {[
              "более 18 лет на рынке телекоммуникаций",
              "Более 3000 юридических лиц",
              "Симметричные каналы связи",
              "Техническая поддержка 24/7",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
            Проверить техническую возможность
          </button>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={internetHero} alt="Internet for business" />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tariffs() {
  const { openConsultationModal } = useCity();
  return (
    <section className="tariffs-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Тарифы</span>
          <h2>Тарифные решения для бизнеса</h2>
          <p>Подберём оптимальную скорость под ваши задачи — от небольшого офиса до крупного предприятия.</p>
        </div>

        <div className="tariffs-grid">
          <div className="tariff-card">
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>Интернет для офиса</h3>
            </div>
            <div className="tariff-speed">
              скорость до <span>1 000</span> Мбит/с
            </div>
            <p className="tariff-desc">
              Надёжное решение для малого и среднего бизнеса. Оптика заводится прямо в ваш офис или
              бизнес-центр.
            </p>
            <ul className="tariff-features">
              <li>Симметричный канал связи</li>
              <li>Статический IP-адрес</li>
              <li>Приоритетная техподдержка 24/7</li>
            </ul>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              Узнать стоимость
            </button>
          </div>

          <div className="tariff-card tariff-featured">
            <div className="featured-badge">Хит продаж</div>
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>Интернет для бизнеса</h3>
            </div>
            <div className="tariff-speed">
              скорость <span>индивидуально</span>
            </div>
            <p className="tariff-desc">
              Специальные условия, выделенные каналы и максимальный уровень SLA для крупных предприятий.
            </p>
            <ul className="tariff-features">
              <li>Гарантированная полоса (SLA 99.9%)</li>
              <li>Физическое резервирование каналов</li>
              <li>Закреплённый персональный менеджер</li>
            </ul>
            <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
              Получить КП
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const extraServices = [
  {
    icon: Wifi,
    title: "Wi-Fi для гостей и клиентов",
    text:
      "Официальная СМС-авторизация (согласно закону РК) и инструменты для маркетинга и аналитики.",
  },
  {
    icon: Cctv,
    title: "Видеонаблюдение",
    text:
      "Профессиональные системы охранного телевидения с облачным хранением и доступом из любой точки мира. Контроль безопасности офиса, склада или производства 24/7.",
  },
  {
    icon: Network,
    title: "СКС — монтаж локальных сетей",
    text:
      "Проектирование и монтаж структурированных кабельных систем любой сложности. Создаём надёжную ИТ-инфраструктуру «под ключ» — от прокладки кабеля до сертификации портов.",
  },
  {
    icon: ShieldCheck,
    title: "IT-аутсорсинг",
    text:
      "Полная поддержка вашей ИТ-инфраструктуры. Обеспечим бесперебойную работу серверов, компьютеров и офисной техники, чтобы вы сосредоточились на бизнесе.",
  },
];

function ExtraServices() {
  return (
    <section className="extra-services-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Дополнительные услуги</span>
          <h2>Всё для вашей IT-инфраструктуры</h2>
          <p>Полный цикл сопутствующих услуг — от Wi-Fi для гостей до построения корпоративных сетей.</p>
        </div>

        <div className="bento-grid">
          {extraServices.map((s) => {
            const Icon = s.icon;
            return (
              <article className="bento-card" key={s.title}>
                <div className="bento-card-accent" aria-hidden />
                <div className="bento-card-icon">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const dcTiles = [
  { to: "/dedicated", title: "Аренда сервера", desc: "Dedicated серверы под ваши задачи", icon: Server },
  { to: "/colocation", title: "Размещение в ЦОД", desc: "Colocation от 1U до серверного шкафа", icon: HardDrive },
  { to: "/vps", title: "Виртуальный сервер VPS", desc: "Гибкие конфигурации и быстрый запуск", icon: Cloud },
  { to: "/colocation-full", title: "Аренда серверного шкафа", desc: "Full Rack 42U в собственном дата-центре", icon: Boxes },
] as const;

function DcServices() {
  return (
    <section className="dc-tiles-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Услуги ЦОД</span>
          <h2>Решения дата-центра NLS</h2>
          <p>Размещайте инфраструктуру в собственных дата-центрах NLS Kazakhstan.</p>
        </div>

        <div className="dc-tiles-grid">
          {dcTiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link to={t.to} className="dc-tile" key={t.to}>
                <div className="dc-tile-accent" aria-hidden />
                <div className="dc-tile-icon">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <div className="dc-tile-body">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
                <span className="dc-tile-arrow" aria-hidden>
                  <ArrowRight size={20} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    {
      h: "Собственная инфраструктура",
      p: "Независимая магистральная сеть и собственный надёжный дата-центр для гарантии отказоустойчивости.",
    },
    {
      h: "Лёгкая масштабируемость",
      p: "От 10 Мбит/с для малого офиса до десятков Гбит/с для крупных корпораций. Растём вместе с вами.",
    },
    {
      h: "Техподдержка 24/7",
      p: "Круглосуточный мониторинг сети и оперативное решение любых задач дежурными инженерами.",
    },
    {
      h: "Личный кабинет",
      p: "Ваш цифровой офис: мгновенное формирование счетов-фактур, актов выполненных работ и актов сверок. Прямая связь с техподдержкой и полный цикл электронного документооборота — бухгалтерия и юридическое сопровождение в один клик.",
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Преимущества</span>
          <h2>
            Почему бизнес выбирает <span style={{ color: "var(--color-orange)" }}>NLS Kazakhstan</span>
          </h2>
          <p>Обеспечиваем стабильность вашей работы на всех уровнях инфраструктуры.</p>
        </div>

        <div className="trust-grid">
          {items.map((it) => (
            <div className="trust-card" key={it.h}>
              <div className="trust-icon">
                <CheckIcon />
              </div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [consent, setConsent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    alert("Заявка отправлена!");
  };
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">Контакты</span>
          <h2>Получите предварительный расчёт на подключение под ваш бизнес</h2>
        </div>

        <div className="contact-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="i-company">Название компании или проекта</label>
              <input type="text" id="i-company" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="i-name">ФИО</label>
              <input type="text" id="i-name" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="i-phone">Телефон</label>
              <input
                type="tel"
                id="i-phone"
                className="form-control"
                placeholder="+7 7__ ___ __ __"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="i-message">Сообщение для менеджера (необязательно)</label>
              <textarea id="i-message" className="form-control" rows={4} />
            </div>

            <ConsentCheckbox id="i-consent" checked={consent} onChange={setConsent} />

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", fontSize: "1.1rem" }}
              disabled={!consent}
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
