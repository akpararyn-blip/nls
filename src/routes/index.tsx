import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "@/components/nls/Icons";
import heroMain from "@/assets/hero-main.png";
import datacenterImg from "@/assets/datacenter.png";
import { LeadForm } from "@/components/forms/LeadForm";
import { USE_INTERNAL_ROUTING, currentDomainPath, type ServicePath } from "@/config/links";
import { SmartLink } from "@/components/nls/SmartLink";
import { InternetPage } from "./internet";
import { ColocationPage } from "./colocation";
import { SksPage } from "./it-sks";
import { DedicatedPage } from "./dedicated";
import { FullRackPage } from "./colocation-full";
import { VpsPage } from "./vps";
import { ItOutsourcingPage } from "./it";
import { IaasPage } from "./iaas";
import { CloudPage } from "./cloud";
import { ObjectStoragePage } from "./object-storage";
import { CloudStoragePage } from "./cloud-storage";

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
          "NLS Kazakhstan — надежный провайдер высокоскоростного интернета и IT-инфраструктуры для бизнеса в Казахстане. Дата‑центры, colocation, СКС и IT-аутсорсинг.",
      },
      {
        name: "keywords",
        content:
          "интернет провайдер для бизнеса, IT-инфраструктура, дата-центр Казахстан, СКС, colocation, VPS, IT аутсорсинг, NLS",
      },
      { property: "og:url", content: "/" },
      { property: "og:title", content: "NLS Kazakhstan — Интернет и IT-инфраструктура для бизнеса" },
      {
        property: "og:description",
        content:
          "Высокоскоростной интернет до 10 Гбит/с, дата‑центры в Алматы и Астане, colocation и IT-аутсорсинг.",
      },
    ],
  }),
  component: IndexPage,
});

const SERVICE_COMPONENTS: Partial<Record<ServicePath, () => React.ReactElement>> = {
  "/internet": InternetPage,
  "/it-sks": SksPage,
  "/it": ItOutsourcingPage,
  "/colocation": ColocationPage,
  "/dedicated": DedicatedPage,
  "/colocation-full": FullRackPage,
  "/vps": VpsPage,
  "/iaas": IaasPage,
  "/cloud": CloudPage,
  "/object-storage": ObjectStoragePage,
  "/cloud-storage": CloudStoragePage,
};

function IndexPage() {
  const [servicePath, setServicePath] = useState<ServicePath | null>(null);
  useEffect(() => {
    if (USE_INTERNAL_ROUTING) return;
    if (typeof window === "undefined") return;
    setServicePath(currentDomainPath(window.location.hostname));
  }, []);
  if (servicePath) {
    const ServiceComponent = SERVICE_COMPONENTS[servicePath];
    if (ServiceComponent) return <ServiceComponent />;
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
  const t = useT();
  const bullets = [
    t("Более 18 лет на рынке телекоммуникаций", "Телекоммуникация нарығында 18 жылдан астам"),
    t("Более 15 000 корпоративных клиентов", "15 000-нан астам заңды тұлға"),
    t("Онлайн-оформление за 1 день", "Онлайн рәсімдеу 1 күнде"),
    t("Собственные дата‑центры (Алматы, Астана)", "Меншікті дата-орталықтар (Алматы, Астана)"),
    t("Техническая поддержка 24/7", "Техникалық қолдау 24/7"),
  ];
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            NLS Kazakhstan — <span style={{ color: "var(--color-orange)" }}>{t("Интернет", "Интернет")}</span>{" "}
            {t("и IT-инфраструктура для бизнеса", "және бизнеске арналған IT-инфрақұрылым")}
          </h1>
          <p className="hero-subtitle">
            {t(
              "Подключаем высокоскоростной интернет до 10 Гбит/с, разворачиваем IT-инфраструктуру и размещаем серверы в собственном дата‑центре NLS.",
              "10 Гбит/с дейінгі жоғары жылдамдықты интернетті қосамыз, IT-инфрақұрылымды құрамыз және серверлерді өз NLS дата-орталығымызда орналастырамыз."
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
            {t("Получить коммерческое предложение", "Коммерциялық ұсыныс алу")}
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
  const t = useT();

  type SvcItem = { to: string; title: string; desc: string };
  const groups: { eyebrow: string; title: string; items: SvcItem[] }[] = [
    {
      eyebrow: t("Связь и сети", "Байланыс және желілер"),
      title: t("Интернет и кабельные сети", "Интернет және кабельдік желілер"),
      items: [
        {
          to: "/internet",
          title: t("Интернет для бизнеса", "Бизнеске арналған интернет"),
          desc: t("Симметричный канал до 10 Гбит/с по оптике с SLA и резервированием.", "10 Гбит/с дейінгі симметриялы оптика арнасы, SLA және резервтеу."),
        },
        {
          to: "/it-sks",
          title: t("СКС — структурированные кабельные сети", "ҚКЖ — құрылымдалған кабельдік желілер"),
          desc: t("Проектирование и монтаж СКС от офиса до бизнес-центра.", "Кеңседен бизнес-орталыққа дейін ҚКЖ жобалау және орнату."),
        },
        {
          to: "/vybor-oborudovaniya-dlya-lvs",
          title: t("Подбор оборудования для ЛВС", "ЖЕЖ үшін жабдықты таңдау"),
          desc: t("Гайд: коммутаторы, маршрутизаторы и точки доступа под задачи бизнеса.", "Гайд: бизнес міндеттеріне арналған коммутаторлар, маршрутизаторлар және Wi-Fi."),
        },
      ],
    },
    {
      eyebrow: t("IT-инфраструктура", "IT-инфрақұрылым"),
      title: t("Аутсорсинг и сопровождение", "Аутсорсинг және сүйемелдеу"),
      items: [
        {
          to: "/it",
          title: t("IT-аутсорсинг", "IT-аутсорсинг"),
          desc: t("Полное обслуживание IT: компьютеры, серверы, ПО и безопасность.", "IT-ні толық қызмет көрсету: компьютерлер, серверлер, БҚ, қауіпсіздік."),
        },
        {
          to: "/oshibki-pri-montazhe-sks",
          title: t("Типичные ошибки при монтаже СКС", "ҚКЖ орнатудағы типтік қателіктер"),
          desc: t("Что проверять при приёмке кабельной системы и как избежать переделок.", "Кабельдік жүйені қабылдау кезінде нені тексеру керек және қайта жасаудан қалай аулақ болу керек."),
        },
        {
          to: "/kak-pravilno-prolozhit-kabel",
          title: t("Как правильно проложить кабель", "Кабельді қалай дұрыс төсеу керек"),
          desc: t("Практическое руководство по прокладке витой пары и оптики.", "Иілген жұп пен оптиканы төсеу бойынша практикалық нұсқаулық."),
        },
      ],
    },
    {
      eyebrow: t("Дата-центр и облака", "Дата-орталық және бұлттар"),
      title: t("Размещение и облачные сервисы", "Орналастыру және бұлтты қызметтер"),
      items: [
        {
          to: "/colocation",
          title: t("Colocation", "Colocation"),
          desc: t("Размещение оборудования в собственном ЦОД уровня Tier III.", "Tier III деңгейіндегі меншікті ЦОД-та жабдықты орналастыру."),
        },
        {
          to: "/colocation-full",
          title: t("Full rack colocation", "Full rack colocation"),
          desc: t("Аренда стойки целиком с гарантированным питанием и охлаждением.", "Кепілді қуат пен салқындатумен стойканы толық жалға алу."),
        },
        {
          to: "/dedicated",
          title: t("Dedicated серверы", "Dedicated серверлер"),
          desc: t("Выделенные серверы с быстрым развёртыванием и поддержкой 24/7.", "Жылдам орналастырылатын және 24/7 қолдау бар бөлінген серверлер."),
        },
        {
          to: "/vps",
          title: t("Виртуальные серверы (VPS)", "Виртуалды серверлер (VPS)"),
          desc: t("Гибкие конфигурации vCPU/RAM/SSD под любую нагрузку.", "Кез келген жүктемеге арналған vCPU/RAM/SSD икемді конфигурациялары."),
        },
        {
          to: "/iaas",
          title: t("IaaS — инфраструктура как сервис", "IaaS — қызмет ретіндегі инфрақұрылым"),
          desc: t("Управляемая виртуальная инфраструктура для роста бизнеса.", "Бизнестің өсуіне арналған басқарылатын виртуалды инфрақұрылым."),
        },
        {
          to: "/cloud",
          title: t("Облачные решения NLS Cloud", "NLS Cloud бұлтты шешімдері"),
          desc: t("Единая платформа облачных сервисов и ЦОД.", "Бұлтты қызметтер мен ЦОД-тың біртұтас платформасы."),
        },
        {
          to: "/object-storage",
          title: t("Object Storage (S3)", "Object Storage (S3)"),
          desc: t("Объектное хранилище для бэкапов, медиа и приложений.", "Сақтық көшірмелерге, медиаға және қосымшаларға арналған объектілік сақтау."),
        },
        {
          to: "/cloud-storage",
          title: t("Облачное хранилище", "Бұлтты сақтау"),
          desc: t("Безопасное хранение корпоративных данных с доступом из любой точки.", "Корпоративтік деректерді қауіпсіз сақтау, кез келген жерден қол жеткізу."),
        },
      ],
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Услуги", "Қызметтер")}</span>
          <h2>{t("Комплексные IT-решения для бизнеса", "Бизнеске арналған кешенді IT-шешімдер")}</h2>
          <p>{t("Полный спектр: от подключения интернета до облачной инфраструктуры.", "Толық спектр: интернет қосудан бастап бұлтты инфрақұрылымға дейін.")}</p>
        </div>

        <div className="svc-groups">
          {groups.map((g) => (
            <div className="svc-group" key={g.title}>
              <div className="svc-group-head">
                <span className="svc-group-eyebrow">{g.eyebrow}</span>
                <h3 className="svc-group-title">{g.title}</h3>
              </div>
              <div className="svc-group-grid">
                {g.items.map((it) => (
                  <SmartLink to={it.to} key={it.to} className="svc-mini-card">
                    <span className="svc-mini-card__title">
                      {it.title}
                      <span className="svc-mini-card__arrow" aria-hidden>→</span>
                    </span>
                    <span className="svc-mini-card__desc">{it.desc}</span>
                  </SmartLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="svc-cta-card">
          <div>
            <h3>{t("Не знаете, что выбрать?", "Не таңдауды білмейсіз бе?")}</h3>
            <p>
              {t(
                "Получите быструю и бесплатную консультацию инженера. Поможем подобрать оптимальное решение под задачи вашего бизнеса.",
                "Инженердің тегін әрі жылдам кеңесін алыңыз. Бизнес міндеттеріңізге оңтайлы шешімді таңдауға көмектесеміз."
              )}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              openConsultationModalWith({
                subject: "Бесплатная консультация по IT-решениям",
              })
            }
          >
            {t("Получить консультацию", "Кеңес алу")}
          </button>
        </div>
      </div>
    </section>
  );
}

function DataCenter() {
  const t = useT();
  const facts = [
    { v: "70", l: t("Серверных шкафов", "Серверлік шкафтар") },
    { v: "2N", l: t("Резервирование", "Резервтеу") },
    { v: "100%", l: t("Без перебоев электропитания", "Электр қуатының үзіліссіздігі") },
    { v: "24/7", l: t("Круглосуточный доступ и поддержка", "Тәулік бойы қолжетімділік және қолдау") },
  ];
  return (
    <section className="datacenter-section">
      <div className="container">
        <div className="datacenter-grid">
          <div className="datacenter-content">
            <h2>{t("Собственный дата‑центр в Казахстане", "Қазақстандағы өз дата-орталығымыз")}</h2>
            <p style={{ fontSize: "1.1rem", marginBottom: 20 }}>
              {t(
                "Надёжная инфраструктура для размещения и обработки данных вашего бизнеса.",
                "Бизнес деректеріңізді орналастыру және өңдеу үшін сенімді инфрақұрылым."
              )}
            </p>

            <div className="dc-facts">
              {facts.map((f) => (
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
            <p style={{ marginTop: 20, fontWeight: 600 }}>
              {t("Несколько оптоволоконных провайдеров.", "Бірнеше талшықты-оптикалық провайдер.")}
            </p>
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
  const t = useT();
  const items = [
    { h: t("Надежная инфраструктура", "Сенімді инфрақұрылым"), p: t("Собственная магистральная сеть и дата‑центры", "Меншікті магистральдық желі және дата-орталықтар") },
    { h: t("Масштабируемость", "Масштабталу"), p: t("Решения для малого, среднего и крупного бизнеса", "Шағын, орта және ірі бизнеске арналған шешімдер") },
    { h: t("Поддержка 24/7", "Қолдау 24/7"), p: t("Инженеры и IT-специалисты всегда на связи", "Инженерлер мен IT-мамандар әрқашан байланыста") },
    { h: t("Работа по договору", "Шарт бойынша жұмыс"), p: t("Официальные документы и прозрачные условия", "Ресми құжаттар және ашық шарттар") },
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
  const t = useT();
  const cases = [
    {
      h: t("Офисы и бизнес-центры", "Кеңселер мен бизнес-орталықтар"),
      p: t(
        "Стабильный интернет и IT-инфраструктура для бесперебойной работы сотрудников, CRM, IP-телефонии и облачных сервисов.",
        "Қызметкерлердің, CRM, IP-телефония және бұлтты қызметтердің үзіліссіз жұмысы үшін тұрақты интернет және IT-инфрақұрылым."
      ),
      f: [
        t("Подключение выделенных линий", "Бөлінген желілерді қосу"),
        t("Покрытие бесшовным Wi-Fi", "Үздіксіз Wi-Fi жабыны"),
        t("Резервирование каналов связи", "Байланыс арналарын резервтеу"),
      ],
    },
    {
      h: t("Производственные компании", "Өндірістік компаниялар"),
      p: t(
        "Надежная связь для управления производственными процессами, систем мониторинга и автоматизации.",
        "Өндірістік үдерістерді, мониторинг және автоматтандыру жүйелерін басқару үшін сенімді байланыс."
      ),
      f: [
        t("Реализация резервных каналов", "Резервтік арналарды іске асыру"),
        t("Защищенные корпоративные сети", "Қорғалған корпоративтік желілер"),
        t("IT-поддержка непрерывной работы", "Үздіксіз жұмысты IT-қолдау"),
      ],
    },
    {
      h: t("Стартапы и IT", "Стартаптар мен IT"),
      p: t(
        "Инфраструктура для сайтов и онлайн-сервисов с возможностью быстрого масштабирования под нагрузки.",
        "Жүктемеге қарай жылдам масштабталатын сайттар мен онлайн-қызметтерге арналған инфрақұрылым."
      ),
      f: [
        t("Виртуальные серверы (VPS/VDS)", "Виртуалды серверлер (VPS/VDS)"),
        t("Аренда Dedicated-серверов", "Dedicated серверлерді жалға алу"),
        t("Размещение в дата‑центре (Colocation)", "Дата-орталықта орналастыру (Colocation)"),
      ],
    },
    {
      h: t("Банки и финтех", "Банктер мен финтех"),
      p: t(
        "Защищенные каналы связи и отказоустойчивая инфраструктура для обработки финансовых операций.",
        "Қаржылық операцияларды өңдеуге арналған қорғалған байланыс арналары және істен шықпайтын инфрақұрылым."
      ),
      f: [
        t("Соответствие требованиям безопасности", "Қауіпсіздік талаптарына сәйкестік"),
        t("Многократное резервирование", "Көп реттік резервтеу"),
        t("Стабильная работа 24/7", "24/7 тұрақты жұмыс"),
      ],
    },
    {
      h: t("Ритейл и склады", "Ритейл және қоймалар"),
      p: t(
        "Стабильный интернет для кассовых систем, складского учета, ERP и онлайн-интеграций по всему Казахстану.",
        "Бүкіл Қазақстан бойынша касса жүйелеріне, қойма есебіне, ERP және онлайн-интеграцияларға арналған тұрақты интернет."
      ),
      f: [
        t("Бесперебойная работа точек продаж", "Сату нүктелерінің үзіліссіз жұмысы"),
        t("Wi-Fi для персонала и клиентов", "Қызметкерлер мен клиенттерге арналған Wi-Fi"),
        t("Единая корпоративная сеть", "Біртұтас корпоративтік желі"),
      ],
    },
  ];
  return (
    <section className="usecases-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Кейсы", "Кейстер")}</span>
          <h2>{t("Где применяются наши решения", "Шешімдеріміз қайда қолданылады")}</h2>
          <p>{t("Разрабатываем и внедряем индивидуальные IT-стратегии с учётом специфики вашей отрасли.", "Сіздің саланың ерекшелігін ескере отырып, жеке IT-стратегияларды әзірлейміз және енгіземіз.")}</p>
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
  const t = useT();
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">{t("Контакты", "Байланыс")}</span>
          <h2>{t("Получите расчёт IT-решения под ваш бизнес", "Бизнесіңізге арналған IT-шешімнің есебін алыңыз")}</h2>
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
