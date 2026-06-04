import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, type ReactNode } from "react";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useFitText } from "@/hooks/use-fit-text";

import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "@/components/nls/Icons";
import internetHero from "@/assets/internet-hero2.png";
import { LeadForm } from "@/components/forms/LeadForm";
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
  Calculator,
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
        content: "Симметричные каналы связи по оптоволокну для офисов, предприятий и HoReCa.",
      },
    ],
  }),
  component: InternetPage,
});

export function InternetPage() {
  return (
    <SiteLayout>
      <Hero />
      <Tariffs />
      <CalcCta />
      <HowWeWork />
      <ExtraServices />
      <DcServices />
      <Trust />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  const t = useT();
  const bullets = [
    t("Более 18 лет на рынке телекоммуникаций", "Телекоммуникация нарығында 18 жылдан астам"),
    t("Более 15 000 юридических лиц", "15 000-нан астам заңды тұлға"),
    t("Симметричные каналы связи", "Симметриялы байланыс арналары"),
    t("Техническая поддержка 24/7", "Техникалық қолдау 24/7"),
  ];
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            <span style={{ color: "var(--color-orange)" }}>
              {t("Высокоскоростной интернет", "Жоғары жылдамдықты интернет")}
            </span>{" "}
            {t("от 10 Мбит/с до 10 Гбит/с", "10 Мбит/с-тен 10 Гбит/с-ке дейін")}
          </h1>
          <p className="hero-subtitle">
            {t(
              "Присутствуем в большинстве бизнес-центров. Стабильное соединение по оптоволокну для офисов, предприятий и HoReCa.",
              "Бизнес-орталықтардың басым бөлігінде бармыз. Кеңселер, кәсіпорындар және HoReCa үшін талшықты-оптика арқылы тұрақты қосылыс."
            )}
          </p>

          <ul className="hero-bullets">
            {bullets.map((label) => (
              <li key={label}>
                <CheckIcon />
                {label}
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
            {t("Проверить техническую возможность", "Техникалық мүмкіндікті тексеру")}
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
  const t = useT();
  return (
    <section className="tariffs-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Тарифы", "Тарифтер")}</span>
          <h2>{t("Тарифные решения для бизнеса", "Бизнеске арналған тарифтік шешімдер")}</h2>
          <p>
            {t(
              "Подберём оптимальную скорость под ваши задачи — от небольшого офиса до крупного предприятия.",
              "Шағын кеңседен ірі кәсіпорынға дейінгі міндеттеріңізге оңтайлы жылдамдықты таңдаймыз."
            )}
          </p>
        </div>

        <div className="tariffs-grid tariffs-grid--3">
          <div className="tariff-card">
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>{t("Интернет базовый", "Базалық интернет")}</h3>
            </div>
            <div className="tariff-speed">
              {t("скорость до", "жылдамдық")} <span>100</span> {t("Мбит/с", "Мбит/с дейін")}
            </div>
            <p className="tariff-desc">
              {t(
                "Оптимальный стартовый тариф для небольшого офиса и базовых задач.",
                "Шағын кеңсе мен базалық тапсырмаларға арналған оңтайлы бастапқы тариф."
              )}
            </p>
            <ul className="tariff-features">
              <li>{t("Симметричный канал связи", "Симметриялы байланыс арнасы")}</li>
              <li>{t("Статический IP-адрес", "Статикалық IP-мекенжай")}</li>
              <li>{t("Приоритетная техподдержка 24/7", "Техникалық қолдау 24/7")}</li>
            </ul>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              {t("Узнать стоимость", "Құнын білу")}
            </button>
          </div>

          <div className="tariff-card tariff-featured">
            <div className="featured-badge">{t("Хит продаж", "Сатылым хиті")}</div>
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>{t("Интернет для офиса", "Кеңсеге арналған интернет")}</h3>
            </div>
            <div className="tariff-speed">
              {t("скорость до", "жылдамдық ")} <span>1 000</span> {t("Мбит/с", "Мбит/с дейін")}
            </div>
            <p className="tariff-desc">
              {t(
                "Надёжное решение для малого и среднего бизнеса. Оптика заводится прямо в ваш офис или бизнес-центр.",
                "Шағын және орта бизнеске арналған сенімді шешім. Оптика тікелей сіздің кеңсеңізге немесе бизнес-орталыққа тартылады."
              )}
            </p>
            <ul className="tariff-features">
              <li>{t("Симметричный канал связи", "Симметриялы байланыс арнасы")}</li>
              <li>{t("Статический IP-адрес", "Статикалық IP-мекенжай")}</li>
              <li>{t("Приоритетная техподдержка 24/7", "Техникалық қолдау 24/7")}</li>
            </ul>
            <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
              {t("Узнать стоимость", "Құнын білу")}
            </button>
          </div>

          <div className="tariff-card">
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>{t("Интернет для бизнеса", "Бизнеске арналған интернет")}</h3>
            </div>
            <div className="tariff-speed">
              {t("скорость до", "жылдамдық")} <span>10 000</span> {t("Мбит/с", "Мбит/с дейін")}
            </div>
            <p className="tariff-desc">
              {t(
                "Специальные условия, выделенные каналы и максимальный уровень SLA для крупных предприятий.",
                "Ірі кәсіпорындарға арналған арнайы шарттар, бөлінген арналар және ең жоғары SLA деңгейі."
              )}
            </p>
            <ul className="tariff-features">
              <li>{t("Гарантированная полоса (SLA 99.9%)", "Кепілді жолақ (SLA 99.9%)")}</li>
              <li>{t("Физическое резервирование каналов", "Арналарды физикалық резервтеу")}</li>
              <li>{t("Закреплённый персональный менеджер", "Бекітілген жеке менеджер")}</li>
            </ul>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              {t("Получить КП", "КҰ алу")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcCta() {
  const { openConsultationModalWith } = useCity();
  const t = useT();
  return (
    <section className="calc-cta-section">
      <div className="container">
        <div className="calc-cta-card">
          <div className="calc-cta-icon">
            <Calculator size={32} strokeWidth={1.8} />
          </div>
          <div className="calc-cta-body">
            <h3>{t("Рассчитать скорость с учётом рабочих мест", "Жұмыс орындары бойынша жылдамдықты есептеу")}</h3>
            <p>
              {t(
                "Подберём оптимальный тариф исходя из числа сотрудников, типа задач, видеоконференций, облачных сервисов и резервного копирования.",
                "Қызметкерлер саны, тапсырмалардың түрі, видеоконференциялар, бұлтты сервистер мен резервтік көшіруді ескере отырып оңтайлы тарифті таңдаймыз."
              )}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              openConsultationModalWith({
                subject: t("Расчёт скорости по рабочим местам", "Жұмыс орындары бойынша жылдамдықты есептеу"),
              })
            }
          >
            {t("Рассчитать", "Есептеу")}
          </button>
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  const t = useT();
  type Step = { title: React.ReactNode; text: string; link?: { label: string; to: "/requisites" } };
  const steps: Step[] = [
    {
      title: t("Заявка", "Өтінім"),

      text: t(
        "Вы оставляете заявку на сайте или по номеру телефона.",
        "Сіз сайтта немесе телефон арқылы өтінім қалдырасыз."
      ),
    },
    {
      title: t("Консультация", "Кеңес беру"),
      text: t(
        "Консультация менеджера и согласование времени выезда для замера.",
        "Менеджердің кеңесі және өлшеу үшін шығу уақытын келісу."
      ),
    },
    {
      title: (
        <>
          {t("Возможность", "Қосылу")}
          <br />
          {t("подключения", "мүмкіндігі")}
        </>
      ),
      text: t(
        "Инженер проверит возможность подключения и рассчитает стоимость.",
        "Инженер қосылу мүмкіндігін тексеріп, құнын есептейді."
      ),
    },
    {
      title: t("Договор", "Шарт"),
      text: t(
        "Заключение договора на монтаж оборудования. При выборе аренды — дополнительный договор аренды.",
        "Жабдықты орнатуға шарт жасасу. Жалға алу таңдалса — қосымша жалдау шарты."
      ),
    },
    {
      title: t("Оплата", "Төлем"),
      text: t("Вы производите оплату.", "Сіз төлемді жасайсыз."),
      link: { label: t("Реквизиты NLS Kazakhstan", "NLS Kazakhstan деректемелері"), to: "/requisites" as const },
    },
    {
      title: t("Прокладка кабеля", "Кабель тарту"),
      text: t(
        "Инженеры проложат кабель. Это может занять несколько дней.",
        "Инженерлер кабельді тартады. Бұл бірнеше күнді алуы мүмкін."
      ),
    },
    {
      title: t("Настройка интернета", "Интернетті баптау"),
      text: t(
        "После прокладки настраиваем оборудование и проверяем работу интернета.",
        "Тартудан кейін жабдықты баптаймыз және интернеттің жұмысын тексереміз."
      ),
    },
    {
      title: t("Проверка", "Тексеру"),
      text: t(
        "Финальная проверка — чтобы всё работало как часы.",
        "Бәрі сағаттай дөп жұмыс істеуі үшін соңғы тексеру."
      ),
    },
    {
      title: t("Техподдержка", "Техқолдау"),
      text: t("Техподдержка NLS Kazakhstan 24/7.", "NLS Kazakhstan техқолдауы 24/7."),
    },
  ];

  const renderStep = (step: Step, idx: number) => (
    <div className="how-step" key={idx}>
      <div className="how-step-num">{String(idx + 1).padStart(2, "0")}</div>
      <h3>{step.title}</h3>
      <p>
        {step.text}
        {step.link && (
          <>
            {" "}
            <Link to={step.link.to} className="how-step-link">
              {step.link.label}
            </Link>
          </>
        )}
      </p>
    </div>
  );


  const sectionRef = useRef<HTMLElement | null>(null);
  useFitText(sectionRef, ".how-step h3", { min: 0.62, max: 1, cssVar: "--how-h3-size" });

  return (
    <section ref={sectionRef} className="how-we-work-section">
      <div className="container">
        <div className="section-title">

          <span className="section-eyebrow">{t("Процесс", "Үдеріс")}</span>
          <h2>{t("Как мы работаем", "Біз қалай жұмыс істейміз")}</h2>
          <p>
            {t(
              "От первой заявки до круглосуточной техподдержки — 9 простых шагов.",
              "Алғашқы өтінімнен тәулік бойы техқолдауға дейін — 9 қарапайым қадам."
            )}
          </p>
        </div>

        <div className="how-grid how-grid--5">{steps.slice(0, 5).map((s, i) => renderStep(s, i))}</div>
        <div className="how-grid how-grid--4">{steps.slice(5).map((s, i) => renderStep(s, i + 5))}</div>
      </div>
    </section>
  );
}

function ExtraServices() {
  const t = useT();
  const extraServices = [
    {
      icon: Wifi,
      title: t("Wi-Fi для гостей и клиентов", "Қонақтар мен клиенттерге арналған Wi-Fi"),
      text: t(
        "СМС-авторизация (согласно закону РК) и инструменты для маркетинга и аналитики.",
        "SMS-авторизация (ҚР заңына сәйкес) және маркетинг пен аналитикаға арналған құралдар."
      ),
    },
    {
      icon: Cctv,
      title: t("Видеонаблюдение", "Бейнебақылау"),
      text: t(
        "Профессиональные системы с облачным хранением и доступом из любой точки мира. Контроль безопасности офиса, склада или производства 24/7.",
        "Бұлтты сақтау және әлемнің кез келген нүктесінен қолжетімділігі бар кәсіби жүйелер. Кеңсе, қойма немесе өндіріс қауіпсіздігін 24/7 бақылау."
      ),
    },
    {
      icon: Network,
      title: t("СКС — монтаж локальных сетей", "ҚКЖ — жергілікті желілерді орнату"),
      text: t(
        "Проектирование и монтаж структурированных кабельных систем любой сложности. Создаём надёжную ИТ-инфраструктуру «под ключ» — от небольшого офиса до крупного предприятия.",
        "Кез келген күрделіліктегі құрылымдалған кабельдік жүйелерді жобалау және орнату. Шағын кеңседен ірі кәсіпорынға дейін сенімді IT-инфрақұрылымды дайын күйінде жасаймыз."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("IT-аутсорсинг", "IT-аутсорсинг"),
      text: t(
        "Полная поддержка вашей ИТ-инфраструктуры. Обеспечим бесперебойную работу серверов, компьютеров и офисной техники, чтобы вы сосредоточились на бизнесе.",
        "IT-инфрақұрылымыңызды толық қолдау. Бизнесіңізге шоғырлану үшін серверлердің, компьютерлердің және кеңсе техникасының үзіліссіз жұмысын қамтамасыз етеміз."
      ),
    },
  ];
  return (
    <section className="extra-services-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Доп. услуги", "Қосымша қызметтер")}</span>
          <h2>{t("Дополнительные решения для офиса", "Кеңсеге арналған қосымша шешімдер")}</h2>
          <p>
            {t(
              "Расширьте инфраструктуру комплексными услугами под ключ.",
              "Инфрақұрылымды кешенді қызметтермен толықтырыңыз."
            )}
          </p>
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

function DcServices() {
  const t = useT();
  const dcTiles = [
    { to: "/dedicated" as const, title: t("Аренда сервера", "Серверді жалға алу"), desc: t("Dedicated серверы под ваши задачи", "Тапсырмаларыңызға арналған Dedicated серверлер"), icon: Server },
    { to: "/colocation" as const, title: t("Размещение в ЦОД", "Дата-орталығында орналастыру"), desc: t("Colocation от 1U до серверного шкафа", "1U-дан серверлік шкафқа дейін Colocation"), icon: HardDrive },
    { to: "/vps" as const, title: t("Виртуальный сервер VPS", "Виртуалды сервер VPS"), desc: t("Гибкие конфигурации и быстрый запуск", "Икемді конфигурациялар және жылдам іске қосу"), icon: Cloud },
    { to: "/colocation-full" as const, title: t("Аренда серверного шкафа", "Серверлік шкафты жалға алу"), desc: t("Full Rack 42U в собственном дата-центре", "Меншікті дата-орталықтағы Full Rack 42U"), icon: Boxes },
  ];
  return (
    <section className="dc-tiles-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Услуги ЦОД", "Дата-орталығының қызметтері")}</span>
          <h2>{t("Решения дата-центра NLS", "NLS дата-орталығының шешімдері")}</h2>
          <p>{t("Размещайте инфраструктуру в собственном дата-центре NLS Kazakhstan.", "Инфрақұрылымды NLS Kazakhstan-ның меншікті дата-орталығында орналастырыңыз.")}</p>
        </div>

        <div className="dc-tiles-grid">
          {dcTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Link to={tile.to} className="dc-tile" key={tile.to}>
                <div className="dc-tile-accent" aria-hidden />
                <div className="dc-tile-icon">
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <div className="dc-tile-body">
                  <h3>{tile.title}</h3>
                  <p>{tile.desc}</p>
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
  const t = useT();
  const items = [
    {
      h: t("Собственная инфраструктура", "Меншікті инфрақұрылым"),
      p: t(
        "Независимая магистральная сеть и собственный надёжный дата-центр для гарантии отказоустойчивости.",
        "Істен шықпауға кепілдік беретін тәуелсіз магистральдық желі және меншікті сенімді дата-орталық."
      ),
    },
    {
      h: t("Лёгкая масштабируемость", "Жеңіл масштабталу"),
      p: t(
        "От 10 Мбит/с для малого офиса до 10 000 Мбит/с для крупных корпораций. Растём вместе с вами.",
        "Шағын кеңсеге 10 Мбит/с-тен ірі корпорацияларға 10 000 Мбит/с дейін. Сізбен бірге өсеміз."
      ),
    },
    {
      h: t("Техподдержка 24/7", "Техникалық қолдау 24/7"),
      p: t(
        "Круглосуточный мониторинг сети и оперативное решение любых задач дежурными инженерами.",
        "Желіні тәулік бойы бақылау және кезекші инженерлердің кез келген тапсырмаларды жедел шешуі."
      ),
    },
    {
      h: t("Личный кабинет", "Жеке кабинет"),
      p: t(
        "Ваш цифровой офис: мгновенное формирование счетов-фактур, актов выполненных работ и актов сверок. Прямая связь с техподдержкой и полный цикл электронного документооборота — бухгалтерия и юридическое сопровождение в один клик.",
        "Сіздің цифрлық кеңсеңіз: шот-фактураларды, орындалған жұмыс актілерін және салыстыру актілерін жылдам құру. Техникалық қолдаумен тікелей байланыс және электрондық құжат айналымының толық циклі — бухгалтерия мен заңдық сүйемелдеу бір шертумен."
      ),
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Преимущества", "Артықшылықтар")}</span>
          <h2>
            {t("Почему бизнес выбирает", "Неліктен бизнес ")}{" "}
            <span style={{ color: "var(--color-orange)" }}>NLS Kazakhstan</span>{t("", "-ды таңдайды")}{" "}
          </h2>
          <p>{t("Обеспечиваем стабильность вашей работы на всех уровнях инфраструктуры.", "Инфрақұрылымның барлық деңгейінде жұмысыңыздың тұрақтылығын қамтамасыз етеміз.")}</p>
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
  const t = useT();
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">{t("Контакты", "Байланыс")}</span>
          <h2>{t("Получите предварительный расчёт на подключение под ваш бизнес", "Бизнесіңізге қосылудың алдын ала есебін алыңыз")}</h2>
        </div>

        <div className="contact-form">
          <LeadForm
            formName="Интернет — заявка на подключение"
            action="internet_cta"
            idPrefix="internet"
            messageLabel={t("Сообщение для менеджера (необязательно)", "Менеджерге арналған хабарлама (міндетті емес)")}
            showAddress
          />
        </div>
      </div>
    </section>
  );
}
