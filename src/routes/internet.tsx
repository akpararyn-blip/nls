import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import internetHero from "@/assets/internet-hero2.png";
import type { FormEvent } from "react";

export const Route = createFileRoute("/internet")({
  head: () => ({
    meta: [
      { title: "Интернет для бизнеса до 10 Гбит/с — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Высокоскоростной интернет от 10 Мбит/с до 10 000 Мбит/с для офисов и бизнес-центров. Оптоволокно, SLA, поддержка 24/7. Оформление онлайн.",
      },
      { property: "og:title", content: "Интернет для бизнеса до 10 Гбит/с — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Стабильное соединение по оптоволокну для офисов, предприятий и HoReCa. Оформление договора онлайн.",
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
            Высокоскоростной интернет от 10 Мбит/с до{" "}
            <span style={{ color: "var(--color-orange)" }}>10 000 Мбит/с</span>
          </h1>
          <p className="hero-subtitle">
            Присутствуем в большинстве бизнес-центров. Стабильное соединение по оптоволокну для офисов,
            предприятий и HoReCa. Оформление договора полностью онлайн.
          </p>

          <ul className="hero-bullets">
            {[
              "14 лет на рынке телекоммуникаций",
              "Более 3000 юридических лиц",
              "Онлайн-оформление за 1 день",
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
        <h2 style={{ textAlign: "center", marginBottom: 15 }}>
          Тарифные решения и дополнительные услуги
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "var(--color-text-light)",
            maxWidth: 600,
            margin: "0 auto 50px",
            fontSize: "1.1rem",
          }}
        >
          Подберем оптимальную скорость и дополнительные сервисы под ваши бизнес-задачи
        </p>

        <div className="tariffs-grid">
          <div className="tariff-card">
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>Интернет для бизнеса</h3>
            </div>
            <div className="tariff-speed">
              скорость до <span>10 000</span> Мбит/с
            </div>
            <p className="tariff-desc">
              Надежное решение для малого и среднего бизнеса. Оптика заводится прямо в ваш офис или
              бизнес-центр.
            </p>
            <ul className="tariff-features">
              <li>Симметричный канал связи</li>
              <li>Подпись договора онлайн</li>
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
              <h3>Enterprise (100+ сотрудников)</h3>
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
              <li>Закрепленный персональный менеджер</li>
            </ul>
            <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
              Получить КП
            </button>
          </div>

          <div className="service-addon-card">
            <div className="service-addon-icon">
              <CheckIcon />
            </div>
            <div>
              <h4>Wi-Fi для гостей и клиентов</h4>
              <p>Официальная СМС-авторизация (согласно закону РК) и маркетинг для HoReCa.</p>
            </div>
          </div>

          <div className="service-addon-card">
            <div className="service-addon-icon">
              <CheckIcon />
            </div>
            <div>
              <h4>Строительство радиомостов</h4>
              <p>Организация высокоскоростной связи в труднодоступных локациях (заводы, промзоны).</p>
            </div>
          </div>

          <div className="service-addon-card">
            <div className="service-addon-icon">
              <CheckIcon />
            </div>
            <div>
              <h4>Статические IP-адреса</h4>
              <p>Фиксированные IP-адреса для видеонаблюдения, корпоративных серверов и VPN.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    {
      h: "Собственная инфраструктура",
      p: "Независимая магистральная сеть и надежные дата-центры для гарантии отказоустойчивости.",
    },
    {
      h: "Легкая масштабируемость",
      p: "От 10 Мбит/с для малого офиса до десятков Гбит/с для крупных корпораций. Растем вместе с вами.",
    },
    {
      h: "Техподдержка 24/7",
      p: "Круглосуточный мониторинг сети и оперативное решение любых задач дежурными инженерами.",
    },
    {
      h: "Прозрачные условия",
      p: "Официальный договор, закрывающие документы и строгие SLA гарантии без скрытых платежей.",
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
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Заявка отправлена!");
  };
  return (
    <section className="cta-section">
      <div className="container">
        <h2>Получите предварительный расчет на подключение под ваш бизнес</h2>

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

            <button type="submit" className="btn btn-primary" style={{ width: "100%", fontSize: "1.1rem" }}>
              Отправить заявку
            </button>

            <p className="disclaimer">
              Я согласен на сбор и обработку моих личных данных. Ознакомиться с политикой
              конфиденциальности.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
