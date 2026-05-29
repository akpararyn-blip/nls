import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useT } from "@/lib/lang-context";
import hrHero from "@/assets/hr-hero.png";
import { HrApplyForm } from "@/components/forms/HrApplyForm";
import {
  MessageCircle,
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
  const t = useT();
  const scrollToForm = () => {
    document.getElementById("hr-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            {t("Стань частью", "Бөлігі бол")} <span style={{ color: "var(--color-orange)" }}>NLS Kazakhstan</span>
          </h1>
          <p className="hero-subtitle">
            {t(
              "Мы строим крутую команду единого оператора связи. Интересные проекты, амбициозные задачи и возможность реализовать свои идеи в стабильной компании.",
              "Біз біртұтас байланыс операторының күшті командасын құрып жатырмыз. Қызықты жобалар, амбициялы тапсырмалар және тұрақты компанияда өз идеяларыңды жүзеге асыру мүмкіндігі."
            )}
          </p>

          <div className="hr-hero-actions">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                t("Здравствуйте! Интересует вакансия в NLS Kazakhstan.", "Сәлеметсіз бе! NLS Kazakhstan-дағы бос орынға қызығушылық танытамын.")
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={20} />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <button type="button" className="btn btn-primary" onClick={scrollToForm}>
              {t("Оставить заявку", "Өтінім қалдыру")}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={hrHero} alt="NLS Kazakhstan" />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const t = useT();
  const items = [
    {
      icon: <Rocket size={28} />,
      title: t("Что мы делаем", "Біз не істейміз"),
      text: t(
        "Создаём продукты, которые помогают тысячам компаний в Казахстане — от начинающего бизнеса до крупных промышленных и финансовых гигантов. Интернет, телефония, IT-инфраструктура и облачные сервисы для тех, кто строит будущее.",
        "Қазақстандағы мыңдаған компанияға — жаңа бастап келе жатқан бизнестен ірі өнеркәсіптік және қаржы алыптарына дейін көмектесетін өнімдер жасаймыз. Болашақты құратындарға арналған интернет, телефония, IT-инфрақұрылым және бұлтты қызметтер."
      ),
    },
    {
      icon: <Users size={28} />,
      title: t("С кем мы делаем", "Кіммен бірге істейміз"),
      text: t(
        "Сильные и смелые люди с общими целями. Команда из 1000+ специалистов, в которой каждый отвечает за результат и помогает соседу довести проект до финала.",
        "Ортақ мақсаттары бар күшті әрі батыл адамдар. Әркім нәтиже үшін жауап беретін және әріптесіне жобаны аяғына жеткізуге көмектесетін 1000+ маманнан тұратын команда."
      ),
    },
    {
      icon: <Sparkles size={28} />,
      title: t("Как мы делаем", "Қалай істейміз"),
      text: t(
        "Осознанно подходим к технологиям и процессам. Без бюрократии, без бесконечных согласований — работаем на результат и быстро принимаем решения.",
        "Технологиялар мен процестерге саналы түрде қараймыз. Бюрократиясыз, шексіз келісімдерсіз — нәтижеге жұмыс істеп, шешімдерді жылдам қабылдаймыз."
      ),
    },
  ];

  return (
    <section className="hr-values-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Почему NLS", "Неліктен NLS")}</span>
          <h2>{t("Нам важно", "Бізге маңызды")}</h2>
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
  const t = useT();
  return (
    <section className="hr-about-section">
      <div className="container">
        <div className="hr-about-grid">
          <div className="hr-about-text">
            <span className="section-eyebrow">{t("О компании", "Компания туралы")}</span>
            <h2>{t("NLS Kazakhstan — единый оператор связи", "NLS Kazakhstan — біртұтас байланыс операторы")}</h2>
            <p>
              {t(
                "NLS Kazakhstan — опытный B2B-оператор связи с 18-летним стажем (с 2008 года). Предлагаем комплексные IT и телеком-решения для бизнеса любого масштаба в Казахстане.",
                "NLS Kazakhstan — 18 жылдық тәжірибесі бар (2008 жылдан бастап) тәжірибелі B2B байланыс операторы. Қазақстандағы кез келген ауқымдағы бизнеске кешенді IT және телеком шешімдерін ұсынамыз."
              )}
            </p>
            <p>
              {t(
                "Команда из более чем 1000 специалистов обеспечивает высокое качество услуг: интернет, телефония, видеонаблюдение, IT-аутсорсинг и облачная инфраструктура — с фокусом на снижение затрат клиентов.",
                "1000-нан астам маман қызметтердің жоғары сапасын қамтамасыз етеді: интернет, телефония, бейнебақылау, IT-аутсорсинг және бұлтты инфрақұрылым — клиенттер шығынын азайтуға назар аудара отырып."
              )}
            </p>
            <div className="hr-about-cities">
              <div className="hr-city">
                <Building2 size={18} />
                <div>
                  <strong>{t("Алматы", "Алматы")}</strong>
                  <span>{t("пр. Аль-Фараби 95", "Әл-Фараби даңғ. 95")}</span>
                </div>
              </div>
              <div className="hr-city">
                <Building2 size={18} />
                <div>
                  <strong>{t("Астана", "Астана")}</strong>
                  <span>{t("мкр. Жылыой 13/1", "Жылыой ы/а 13/1")}</span>
                </div>
              </div>
              <div className="hr-city">
                <Building2 size={18} />
                <div>
                  <strong>{t("Шымкент", "Шымкент")}</strong>
                  <span>{t("мкр. Малый Самал 1695", "Кіші Самал ы/а 1695")}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hr-about-stats">
            <div className="hr-stat">
              <div className="hr-stat-num">18+</div>
              <div className="hr-stat-label">{t("лет на рынке", "нарықта жыл")}</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">1 000+</div>
              <div className="hr-stat-label">{t("специалистов", "маман")}</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">15 000+</div>
              <div className="hr-stat-label">{t("клиентов B2B", "B2B клиент")}</div>
            </div>
            <div className="hr-stat">
              <div className="hr-stat-num">3</div>
              <div className="hr-stat-label">{t("города присутствия", "қатысу қаласы")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  const t = useT();
  const offers = [
    { icon: <Rocket size={22} />, text: t("Интересные и амбициозные проекты", "Қызықты әрі амбициялы жобалар") },
    { icon: <Sparkles size={22} />, text: t("Возможность реализовать собственные идеи и инновационные подходы", "Жеке идеялар мен инновациялық тәсілдерді жүзеге асыру мүмкіндігі") },
    { icon: <TrendingUp size={22} />, text: t("Конкурентоспособная заработная плата", "Бәсекеге қабілетті жалақы") },
    { icon: <Heart size={22} />, text: t("Развитие в стабильной компании с перспективами карьерного роста", "Мансаптық өсу перспективасы бар тұрақты компанияда даму") },
    { icon: <CheckCircle2 size={22} />, text: t("Оформление согласно ТК РК", "ҚР ЕК сәйкес ресімдеу") },
  ];
  return (
    <section className="hr-offer-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Условия", "Шарттар")}</span>
          <h2>{t("Что мы предлагаем", "Біз не ұсынамыз")}</h2>
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
  const t = useT();
  const stages = [
    {
      n: 1,
      title: t("Интервью с HR", "HR-мен сұхбат"),
      desc: t("Расскажем о компании и позиции, а ты поделись предыдущим опытом работы и достижениями.", "Компания мен позиция туралы айтамыз, ал сен алдыңғы жұмыс тәжірибең мен жетістіктеріңмен бөліс."),
      time: t("5–10 минут", "5–10 минут"),
      where: t("Телефон", "Телефон"),
      icon: <Phone size={16} />,
    },
    {
      n: 2,
      title: t("Интервью с руководителем", "Басшымен сұхбат"),
      desc: t(
        "HR вместе с руководителем проверят нужные навыки и оценят кандидата по нашим грейдам. Это клёвая возможность проявить себя и узнать подробнее о задачах.",
        "HR басшымен бірге қажетті дағдыларды тексеріп, үміткерді біздің грейдтер бойынша бағалайды. Бұл өзіңді көрсетудің және тапсырмалар туралы толық білудің тамаша мүмкіндігі."
      ),
      time: t("60 минут", "60 минут"),
      where: "Kenes NLS",
      icon: <Video size={16} />,
    },
    {
      n: 3,
      title: t("Финальное интервью", "Қорытынды сұхбат"),
      desc: t(
        "Оценим, насколько мы друг другу подходим по культуре. Расскажем о команде и процессах внутри компании.",
        "Мәдениет бойынша бір-бірімізге қаншалықты сәйкес келетінімізді бағалаймыз. Команда және компания ішіндегі процестер туралы айтамыз."
      ),
      time: t("60 минут", "60 минут"),
      where: "Kenes NLS",
      icon: <Video size={16} />,
    },
  ];

  return (
    <section className="hr-stages-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Процесс", "Процесс")}</span>
          <h2>{t("Этапы собеседования", "Әңгімелесу кезеңдері")}</h2>
          <p className="hr-stages-note">
            {t("Этапы зависят от должности, но обычно выглядят так:", "Кезеңдер лауазымға тәуелді, бірақ әдетте былай болады:")}
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
  const t = useT();
  const tips = [
    {
      icon: <Search size={22} />,
      title: t("Изучи вакансию", "Бос орынды зертте"),
      items: [t("Стек технологий", "Технологиялар стегі"), t("Задачи и требования", "Тапсырмалар мен талаптар"), t("Подготовь список вопросов", "Сұрақтар тізімін дайында")],
    },
    {
      icon: <Home size={22} />,
      title: t("Подготовь место для интервью", "Сұхбатқа орын дайында"),
      items: [
        t("Тихое", "Тыныш"),
        t("Светлое", "Жарық"),
        t("Стабильное подключение к интернету", "Тұрақты интернет байланысы"),
        t("Рассчитай время на дорогу (оффлайн-встреча)", "Жолға уақытты есепте (офлайн-кездесу)"),
      ],
    },
    {
      icon: <Heart size={22} />,
      title: t("Будь честен", "Шыншыл бол"),
      items: [t("Чувствуй себя комфортно и уверенно", "Өзіңді жайлы әрі сенімді сезін"), t("Не знаешь ответ — так и говори", "Жауабын білмесең — солай айт")],
    },
    {
      icon: <Building2 size={22} />,
      title: t("Исследуй компанию", "Компанияны зертте"),
      items: [t("Историю", "Тарихын"), t("Факты", "Фактілерді"), t("Новости", "Жаңалықтарды"), t("Команду", "Команданы")],
    },
    {
      icon: <ListChecks size={22} />,
      title: t("Покажи компетентность", "Құзыреттілікті көрсет"),
      items: [
        t("Подготовь заранее цифры и результаты твоей работы", "Жұмысыңның сандары мен нәтижелерін алдын ала дайында"),
        t("Не бойся задавать вопросы HR", "HR-ге сұрақ қоюдан қорықпа"),
      ],
    },
  ];

  return (
    <section className="hr-tips-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Полезное", "Пайдалы")}</span>
          <h2>{t("Советы кандидатам", "Үміткерлерге кеңестер")}</h2>
        </div>
        <div className="hr-tips-grid">
          {tips.map((tip) => (
            <div className="hr-tip-card" key={tip.title}>
              <div className="hr-tip-icon">{tip.icon}</div>
              <h3>{tip.title}</h3>
              <ul>
                {tip.items.map((it) => (
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

function ApplyForm() {
  const t = useT();
  return (
    <section className="hr-apply-section" id="hr-form">
      <div className="container">
        <div className="hr-apply-card">
          <div className="hr-apply-left">
            <span className="section-eyebrow section-eyebrow--light">{t("Откликнуться", "Өтініш беру")}</span>
            <h2>{t("Отправь заявку — и мы свяжемся", "Өтінім жібер — біз байланысамыз")}</h2>
            <p>
              {t(
                "Расскажи коротко, на какую позицию ты претендуешь. Наш HR-менеджер ответит в течение рабочего дня.",
                "Қандай позицияға үміткер екеніңді қысқаша айт. HR-менеджеріміз жұмыс күні ішінде жауап береді."
              )}
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
            <HrApplyForm />
          </div>
        </div>
      </div>
    </section>
  );
}
