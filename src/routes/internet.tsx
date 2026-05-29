import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
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
              "Бизнес-орталықтардың басым бөлігінде қатысамыз. Кеңселер, кәсіпорындар және HoReCa үшін талшықты-оптика арқылы тұрақты қосылыс."
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

        <div className="tariffs-grid">
          <div className="tariff-card tariff-featured">
            <div className="featured-badge">{t("Хит продаж", "Сатылым хиті")}</div>
            <div className="tariff-header">
              <div className="tariff-icon">
                <CheckIcon />
              </div>
              <h3>{t("Интернет для офиса", "Кеңсеге арналған интернет")}</h3>
            </div>
            <div className="tariff-speed">
              {t("скорость до", "жылдамдық дейін")} <span>1 000</span> {t("Мбит/с", "Мбит/с")}
            </div>
            <p className="tariff-desc">
              {t(
                "Надёжное решение для малого и среднего бизнеса. Оптика заводится прямо в ваш офис или бизнес-центр.",
                "Шағын және орта бизнеске арналған сенімді шешім. Оптика тікелей сіздің кеңсеге немесе бизнес-орталыққа тартылады."
              )}
            </p>
            <ul className="tariff-features">
              <li>{t("Симметричный канал связи", "Симметриялы байланыс арнасы")}</li>
              <li>{t("Статический IP-адрес", "Статикалық IP-мекенжай")}</li>
              <li>{t("Приоритетная техподдержка 24/7", "Басым техникалық қолдау 24/7")}</li>
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
              {t("скорость до", "жылдамдық дейін")} <span>10 000</span> {t("Мбит/с", "Мбит/с")}
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
        "Бұлтты сақтаумен және әлемнің кез келген нүктесінен қолжетімділікпен кәсіби жүйелер. Кеңсе, қойма немесе өндіріс қауіпсіздігін 24/7 бақылау."
      ),
    },
    {
      icon: Network,
      title: t("СКС — монтаж локальных сетей", "ҚКЖ — жергілікті желілерді орнату"),
      text: t(
        "Проектирование и монтаж структурированных кабельных систем любой сложности. Создаём надёжную ИТ-инфраструктуру «под ключ» — от небольшого офиса до крупного предприятия.",
        "Кез келген күрделіліктегі құрылымдалған кабельдік жүйелерді жобалау және орнату. Шағын кеңседен ірі кәсіпорынға дейін сенімді IT-инфрақұрылымды «кілт астында» жасаймыз."
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
    { to: "/colocation" as const, title: t("Размещение в ЦОД", "ЦОД-та орналастыру"), desc: t("Colocation от 1U до серверного шкафа", "1U-дан серверлік шкафқа дейін Colocation"), icon: HardDrive },
    { to: "/vps" as const, title: t("Виртуальный сервер VPS", "Виртуалды сервер VPS"), desc: t("Гибкие конфигурации и быстрый запуск", "Икемді конфигурациялар және жылдам іске қосу"), icon: Cloud },
    { to: "/colocation-full" as const, title: t("Аренда серверного шкафа", "Серверлік шкафты жалға алу"), desc: t("Full Rack 42U в собственном дата-центре", "Меншікті дата-орталықтағы Full Rack 42U"), icon: Boxes },
  ];
  return (
    <section className="dc-tiles-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Услуги ЦОД", "ЦОД қызметтері")}</span>
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
            {t("Почему бизнес выбирает", "Бизнес неліктен таңдайды")}{" "}
            <span style={{ color: "var(--color-orange)" }}>NLS Kazakhstan</span>
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
          />
        </div>
      </div>
    </section>
  );
}
