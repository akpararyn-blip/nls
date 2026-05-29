import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { EnterpriseDataCenterBlocks } from "@/components/nls/EnterpriseBlocks";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
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
      { property: "og:title", content: "Аренда серверной стойки (Full Rack) — NLS Kazakhstan" },
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
  const t = useT();
  const bullets = [
    t("Полноразмерная стойка 42U в изолированном холодном коридоре", "Оқшауланған суық дәліздегі толық өлшемді 42U шкаф"),
    t("Выделенная мощность под ваше оборудование", "Жабдығыңызға бөлінген қуат"),
    t("Резервированные оптические каналы связи", "Резервтелген оптикалық байланыс арналары"),
  ];
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Full Rack · Enterprise
          </span>
          <h1>
            {t("Аренда серверной стойки в ЦОД Tier III", "Tier III ЦОД-та серверлік шкафты жалға алу")}{" "}
            <span style={{ color: "var(--color-orange)" }}>(Full Rack)</span>
          </h1>
          <p className="hero-subtitle">
            {t(
              "Изолированные стойки (42 Unit) для вашей ИТ-инфраструктуры в нашем собственном дата-центре. Индивидуальные параметры питания и каналов связи под задачи Enterprise-уровня.",
              "Біздің меншікті дата-орталықтағы IT-инфрақұрылымыңызға арналған оқшауланған шкафтар (42 Unit). Enterprise-деңгейіндегі тапсырмаларға арналған жеке қуат және байланыс арнасы параметрлері."
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
              {t("Получить индивидуальный расчёт", "Жеке есеп алу")}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={fullRackHero} alt="Full Rack 42U" width={1024} height={1024} />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const t = useT();
  const items = [
    {
      Icon: Server,
      h: t("Вместимость", "Сыйымдылық"),
      p: t("Полноразмерный шкаф 42 Unit (600×1200×2000 мм). Десятикратный профиль жёсткости.", "Толық өлшемді 42 Unit шкаф (600×1200×2000 мм). Он есе қаттылық профилі."),
    },
    {
      Icon: Zap,
      h: t("Питание по запросу", "Сұраныс бойынша қуат"),
      p: t("Выделенная мощность на шкаф под ваше оборудование. Интеллектуальные PDU (24 порта C13/C19) в каждой стойке со встроенными счётчиками.", "Жабдығыңызға арналған шкафқа бөлінген қуат. Әр шкафта кірістірілген санауыштары бар интеллектуалды PDU (24 порт C13/C19)."),
    },
    {
      Icon: Network,
      h: t("Связность", "Байланыс"),
      p: t("Подключение оптоволоконных линков, резервирование каналов. Доступ к магистральным сетям Казахстана.", "Талшықты-оптикалық линктерді қосу, арналарды резервтеу. Қазақстанның магистральдық желілеріне қол жеткізу."),
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Характеристики", "Сипаттамалар")}</span>
          <h2>{t("Что входит в аренду шкафа", "Шкафты жалға алуға не кіреді")}</h2>
          <p>{t("Решение «под ключ» для размещения большого парка оборудования.", "Үлкен жабдық паркін орналастыру үшін «кілт астында» шешім.")}</p>
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
  const t = useT();
  const items = [
    { Icon: ShieldCheck, h: t("Отказоустойчивость Tier III", "Tier III істен шықпауы"), p: t("Многоуровневая архитектура N+1, два независимых энерговвода, ИБП и дизель-генераторы с автозапуском.", "Көп деңгейлі N+1 сәулеті, екі тәуелсіз энергия кірісі, ҮҚК және автоматты іске қосумен дизель-генераторлар.") },
    { Icon: Snowflake, h: t("Изолированный холодный коридор", "Оқшауланған суық дәліз"), p: t("24 серверных шкафа с автоматическим открытием потолка и прецизионным охлаждением (InRow по 35 кВт).", "Төбенің автоматты ашылуымен және прецизиялық салқындатумен (InRow 35 кВт бойынша) 24 серверлік шкаф.") },
    { Icon: Flame, h: t("Газовое пожаротушение FM200", "FM200 газды өрт сөндіру"), p: t("Мгновенно подавляет возгорание на молекулярном уровне, безопасна для оборудования.", "Жанып кетуді молекулалық деңгейде лезде басады, жабдыққа қауіпсіз.") },
    { Icon: Fingerprint, h: t("Биометрический контроль", "Биометрикалық бақылау"), p: t("7 уровней доступа (Face ID, RFID, отпечаток пальца) и круглосуточное видеонаблюдение с архивом 30 дней.", "Қол жеткізудің 7 деңгейі (Face ID, RFID, саусақ ізі) және 30 күн мұрағатымен тәулік бойы бейнебақылау.") },
    { Icon: Thermometer, h: t("Климат-контроль", "Климат-бақылау"), p: t("Адаптация к климату от −40 °C до +45 °C. Непрерывный мониторинг температуры и влажности.", "−40 °C-тан +45 °C-қа дейінгі климатқа бейімделу. Температура мен ылғалдылықты үздіксіз бақылау.") },
  ];
  return (
    <section className="trust-section trust-section--alt">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Инфраструктура", "Инфрақұрылым")}</span>
          <h2>{t("Технологии и безопасность", "Технологиялар мен қауіпсіздік")}</h2>
          <p>{t("Характеристики дата-центра едины для всех услуг размещения.", "Дата-орталық сипаттамалары барлық орналастыру қызметтері үшін бірдей.")}</p>
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
  const t = useT();
  const items = [
    { Icon: Building2, h: t("Крупный бизнес и Enterprise", "Ірі бизнес және Enterprise"), p: t("Для размещения большого парка серверов и систем хранения данных.", "Серверлер мен деректер қоймасы жүйелерінің үлкен паркін орналастыруға арналған.") },
    { Icon: Landmark, h: t("Банки и Финтех", "Банктер мен Финтех"), p: t("Соответствие строгим требованиям безопасности (PCI DSS, ISO 27001), физическая изоляция оборудования.", "Қатаң қауіпсіздік талаптарына сәйкестік (PCI DSS, ISO 27001), жабдықтың физикалық оқшаулануы.") },
    { Icon: Radio, h: t("Телеком и провайдеры", "Телеком және провайдерлер"), p: t("Создание надёжных узлов связи с прямым доступом к магистральным каналам.", "Магистральдық арналарға тікелей қол жеткізумен сенімді байланыс түйіндерін құру.") },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Кому подойдёт", "Кімге сай келеді")}</span>
          <h2>{t("Аренда шкафа — для задач масштаба Enterprise", "Шкафты жалға алу — Enterprise ауқымындағы тапсырмалар үшін")}</h2>
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
  const t = useT();
  return (
    <section className="cta-section" id="fullrack-form">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">{t("Индивидуальный расчёт", "Жеке есеп")}</span>
          <h2>{t("Получите коммерческое предложение на аренду стойки", "Шкафты жалға алуға коммерциялық ұсыныс алыңыз")}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 760, margin: "0 auto" }}>
            {t(
              "Услуга рассчитывается индивидуально. Стоимость аренды шкафа (42U) зависит от требуемой мощности электропитания (кВт) и пропускной способности каналов связи — поэтому конфигуратор и тарифы на этой странице отсутствуют.",
              "Қызмет жеке есептеледі. Шкафты (42U) жалға алу құны қажетті электр қуатының мөлшеріне (кВт) және байланыс арналарының өткізу қабілетіне байланысты — сондықтан бұл бетте конфигуратор мен тарифтер жоқ."
            )}
          </p>
        </div>

        <div className="contact-form">
          <LeadForm
            formName="Аренда стойки — запрос расчёта"
            action="fullrack_cta"
            idPrefix="fr"
            companyLabel={t("Название компании", "Компания атауы")}
            messageLabel={t("Комментарий / требования (мощность, каналы, кол-во шкафов)", "Пікір / талаптар (қуат, арналар, шкафтар саны)")}
            messageFieldKey="Требования"
            messageRows={5}
            submitLabel={t("Запросить расчёт", "Есеп сұрау")}
          />
        </div>
      </div>
    </section>
  );
}
