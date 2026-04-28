import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import hrHero from "@/assets/hr-hero.png";
import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  MessageCircle,
  Send,
  Sparkles,
  Users,
  Rocket,
  Phone,
  Video,
  Clock,
  CheckCircle2,
  Search,
  ListChecks,
  Home,
  Heart,
  Building2,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/hr")({
  head: () => ({
    meta: [
      { title: "Вакансии и карьера — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Стань частью команды NLS Kazakhstan — единого оператора связи. Открытые вакансии, этапы собеседования и советы кандидатам.",
      },
      { property: "og:title", content: "Карьера в NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Присоединяйся к команде из 1000+ специалистов. Интересные проекты, развитие и стабильность.",
      },
    ],
  }),
  component: HrPage,
});

const WHATSAPP_PHONE = "77081466043";
const WHATSAPP_DISPLAY = "+7 708 146 60 43";

function HrPage() {
  return (
    <SiteLayout>
      <Hero />
      <Values />
      <About />
      <Offer />
      <Stages />
      <Tips />
      <ApplyForm />
    </SiteLayout>
  );
}

function Hero() {
  const scrollToForm = () => {
    document.getElementById("hr-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Стань частью <span style={{ color: "var(--color-orange)" }}>NLS Kazakhstan</span>
          </h1>
          <p className="hero-subtitle">
            Мы строим крутую команду единого оператора связи. Интересные проекты, амбициозные задачи и
            возможность реализовать свои идеи в стабильной компании.
          </p>

          <div className="hr-hero-actions">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                "Здравствуйте! Интересует вакансия в NLS Kazakhstan."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={20} />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <button type="button" className="btn btn-primary" onClick={scrollToForm}>
              Оставить заявку
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={hrHero} alt="Команда NLS Kazakhstan" />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const items = [
    {
      icon: <Rocket size={28} />,
      title: "Что мы делаем",
      text:
        "Создаём продукты, которые помогают сотням компаний в Казахстане — от начинающего бизнеса до крупных промышленных и финансовых гигантов. Интернет, телефония, IT-инфраструктура и облачные сервисы для тех, кто строит будущее.",
    },
    {
      icon: <Users size={28} />,
      title: "С кем мы делаем",
      text:
        "Сильные и смелые люди с общими целями. Команда из 1000+ специалистов, в которой каждый отвечает за результат и помогает соседу довезти проект до финала.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Как мы делаем",
      text:
        "Осознанно подходим к технологиям и процессам. Без бюрократии, без бесконечных согласований — работаем на результат и быстро принимаем решения.",
    },
  ];

  return (
    <section className="hr-values-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Почему NLS</span>
          <h2>Нам важно</h2>
        </div>
        <div className="hr-values-grid">
          {items.map((it) => (
            <div className="hr-value-card" key={it.title}>
              <div className="hr-value-icon">{it.icon}</div>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="hr-about-section">
      <div className="container">
        <div className="hr-about-grid">
          <div className="hr-about-text">
            <span className="section-eyebrow">О компании</span>
            <h2>NLS Kazakhstan — единый оператор связи</h2>
            <p>
              NLS Kazakhstan — опытный B2B-оператор связи с 18-летним стажем (с 2008 года). Предлагаем
              комплексные IT и телеком-решения для бизнеса любого масштаба в Казахстане.
            </p>
            <p>
              Команда из более чем 1000 специалистов обеспечивает высокое качество услуг: интернет,
              телефония, видеонаблюдение, IT-аутсорсинг и облачная инфраструктура — с фокусом на снижение
              затрат клиентов.
            </p>
            <div className="hr-about-cities">
              <div className="hr-city">
                <Building2 size={18} />
                <div>
                  <strong>Алматы</strong>
                  <span>пр. Аль-Фараби</span>
                </div>
              </div>
              <div className="hr-city">
                <Building2 size={18} />
                <div>
                  <strong>Астана</strong>
                  <span>мкр. Жылыой</span>
                </div>
              </div>
              <div className="hr-city">
                <Building2 size={18} />
                <div>
                  <strong>Шымкент</strong>
                  <span>мкр. Малый Самал</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hr-about-stats">
            <div className="hr-stat">
              <div className="hr-stat-num">18</div>
              <div className="hr-stat-label">лет на рынке</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">1000+</div>
              <div className="hr-stat-label">специалистов</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">3000+</div>
              <div className="hr-stat-label">клиентов B2B</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">3</div>
              <div className="hr-stat-label">города присутствия</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const offers = [
    { icon: <Rocket size={22} />, text: "Интересные и амбициозные проекты" },
    { icon: <Sparkles size={22} />, text: "Возможность реализовать собственные идеи и инновационные подходы" },
    { icon: <TrendingUp size={22} />, text: "Конкурентоспособная заработная плата" },
    { icon: <Heart size={22} />, text: "Развитие в стабильной компании с перспективами карьерного роста" },
    { icon: <CheckCircle2 size={22} />, text: "Оформление согласно ТК РК" },
  ];
  return (
    <section className="hr-offer-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Условия</span>
          <h2>Что мы предлагаем</h2>
        </div>
        <div className="hr-offer-grid">
          {offers.map((o, i) => (
            <div className="hr-offer-item" key={i}>
              <div className="hr-offer-icon">{o.icon}</div>
              <span>{o.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stages() {
  const stages = [
    {
      n: 1,
      title: "Интервью с HR",
      desc: "Расскажем о компании и позиции, а ты поделись предыдущим опытом работы и достижениями.",
      time: "5–10 минут",
      where: "Телефон",
      icon: <Phone size={16} />,
    },
    {
      n: 2,
      title: "Интервью с тимлидом",
      desc:
        "HR вместе с тимлидом проверят нужные навыки и оценят кандидата по нашим грейдам. Это клёвая возможность проявить себя и узнать подробнее о задачах.",
      time: "60 минут",
      where: "Google Meet",
      icon: <Video size={16} />,
    },
    {
      n: 3,
      title: "Финальное интервью",
      desc: "Оценим, насколько мы друг другу подходим по культуре. Расскажем о команде и процессах внутри компании.",
      time: "60 минут",
      where: "Google Meet",
      icon: <Video size={16} />,
    },
  ];

  return (
    <section className="hr-stages-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Процесс</span>
          <h2>Этапы собеседования</h2>
          <p className="hr-stages-note">
            Этапы зависят от должности, но обычно выглядят так:
          </p>
        </div>

        <div className="hr-stages-grid">
          {stages.map((s) => (
            <div className="hr-stage-card" key={s.n}>
              <div className="hr-stage-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="hr-stage-meta">
                <span>
                  <Clock size={14} /> {s.time}
                </span>
                <span>
                  {s.icon} {s.where}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tips() {
  const tips = [
    {
      icon: <Search size={22} />,
      title: "Изучи вакансию",
      items: ["Стек технологий", "Задачи и требования", "Подготовь список вопросов"],
    },
    {
      icon: <Home size={22} />,
      title: "Подготовь место для интервью",
      items: ["Тихое", "Светлое", "Стабильное подключение к интернету", "Рассчитай время на дорогу (оффлайн-встреча)"],
    },
    {
      icon: <Heart size={22} />,
      title: "Будь честен",
      items: ["Чувствуй себя комфортно и уверенно", "Не знаешь ответ — так и говори"],
    },
    {
      icon: <Building2 size={22} />,
      title: "Исследуй компанию",
      items: ["Историю", "Факты", "Новости", "Команду"],
    },
    {
      icon: <ListChecks size={22} />,
      title: "Покажи компетентность",
      items: [
        "Подготовь заранее цифры и результаты твоей работы",
        "Не бойся задавать вопросы HR и техническому специалисту",
      ],
    },
  ];

  return (
    <section className="hr-tips-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Полезное</span>
          <h2>Советы кандидатам</h2>
        </div>
        <div className="hr-tips-grid">
          {tips.map((t) => (
            <div className="hr-tip-card" key={t.title}>
              <div className="hr-tip-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <ul>
                {t.items.map((it) => (
                  <li key={it}>
                    <CheckCircle2 size={14} />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^7?/, "");
  const m = digits.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  if (!m) return "+7";
  const [, a, b, c, d] = m;
  return "+7 " + (a || "") + (b ? " " + b : "") + (c ? "-" + c : "") + (d ? "-" + d : "");
}

function ApplyForm() {
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ lastName: "", firstName: "", phone: "", position: "" });

  const onChange = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "phone") v = formatPhone(v);
    setForm((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  return (
    <section className="hr-apply-section" id="hr-form">
      <div className="container">
        <div className="hr-apply-card">
          <div className="hr-apply-left">
            <span className="section-eyebrow section-eyebrow--light">Откликнуться</span>
            <h2>Отправь заявку — и мы свяжемся</h2>
            <p>
              Расскажи коротко, на какую позицию ты претендуешь. Наш HR-менеджер ответит в течение
              рабочего дня.
            </p>

            <div className="hr-apply-contacts">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="hr-apply-wa"
              >
                <MessageCircle size={20} />
                <div>
                  <span>WhatsApp HR</span>
                  <strong>{WHATSAPP_DISPLAY}</strong>
                </div>
              </a>
            </div>
          </div>

          <div className="hr-apply-right">
            {submitted ? (
              <div className="hr-apply-success">
                <CheckCircle2 size={48} />
                <h3>Спасибо! Заявка отправлена</h3>
                <p>HR-менеджер свяжется с тобой в ближайшее время.</p>
              </div>
            ) : (
              <form className="hr-apply-form" onSubmit={onSubmit}>
                <div className="hr-form-row">
                  <div className="hr-form-field">
                    <label htmlFor="hr-lastname">Фамилия</label>
                    <input
                      id="hr-lastname"
                      type="text"
                      value={form.lastName}
                      onChange={onChange("lastName")}
                      placeholder="Иванов"
                      required
                    />
                  </div>
                  <div className="hr-form-field">
                    <label htmlFor="hr-firstname">Имя</label>
                    <input
                      id="hr-firstname"
                      type="text"
                      value={form.firstName}
                      onChange={onChange("firstName")}
                      placeholder="Иван"
                      required
                    />
                  </div>
                </div>
                <div className="hr-form-field">
                  <label htmlFor="hr-phone">Телефон</label>
                  <input
                    id="hr-phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange("phone")}
                    placeholder="+7 700 000-00-00"
                    required
                  />
                </div>
                <div className="hr-form-field">
                  <label htmlFor="hr-position">Должность, на которую претендуете</label>
                  <input
                    id="hr-position"
                    type="text"
                    value={form.position}
                    onChange={onChange("position")}
                    placeholder="Например, сетевой инженер"
                    required
                  />
                </div>

                <ConsentCheckbox
                  id="hr-consent"
                  checked={consent}
                  onChange={setConsent}
                />

                <button type="submit" className="btn btn-primary btn-block" disabled={!consent}>
                  Отправить заявку
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
