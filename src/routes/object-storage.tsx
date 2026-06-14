import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CalculatorDisclaimer } from "@/components/nls/CalculatorDisclaimer";
import { RelatedServices } from "@/components/nls/RelatedServices";
import { SupportPromo } from "@/components/nls/SupportPromo";
import { StorageCalculator } from "@/components/nls/StorageCalculator";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "@/components/nls/Icons";
import { Database, ShieldCheck, Globe2, Zap, RefreshCw, Layers } from "lucide-react";

export const Route = createFileRoute("/object-storage")({
  head: () => ({
    meta: [
      { title: "Объектное хранилище S3 в Казахстане — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "S3-совместимое объектное хранилище в дата-центрах NLS Kazakhstan. 110 ₸/ГБ, оплата по факту, шифрование, версионирование, доступ по API.",
      },
      { property: "og:title", content: "Объектное хранилище S3 — NLS Kazakhstan" },
      {
        property: "og:description",
        content: "S3 API, надёжное хранение в Tier III ЦОД Казахстана, оплата по факту использования.",
      },
    ],
  }),
  component: ObjectStoragePage,
});

function scrollToCalc() {
  const el = document.getElementById("object-storage-calculator");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ObjectStoragePage() {
  return (
    <SiteLayout>
      <Hero />
      <Benefits />
      <Calculator />
      <UseCases />
      <SupportPromo />
      <RelatedServices exclude="object-storage" />
    </SiteLayout>
  );
}

function Hero() {
  const t = useT();
  const { openConsultationModal } = useCity();
  const bullets = [
    t("S3-совместимый API", "S3-үйлесімді API"),
    t("Tier III ЦОД в Казахстане", "Қазақстандағы Tier III ДО"),
    t("Шифрование и версионирование", "Шифрлеу және нұсқалау"),
    t("Оплата за фактический объём", "Нақты көлемге ақы төлеу"),
  ];
  return (
    <section className="hero hero--no-image-mobile">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            S3 Object Storage
          </span>
          <h1>
            {t("Объектное хранилище", "Объектілік сақтау орны")}{" "}
            <span style={{ color: "var(--color-orange)" }}>S3</span>
          </h1>
          <p className="hero-subtitle">
            {t(
              "Надёжное S3-совместимое хранилище для бэкапов, медиа и статики сайтов. Размещение в дата-центрах NLS в Казахстане.",
              "Сақтық көшірмелерге, медиаға және сайт статикасына арналған сенімді S3-үйлесімді сақтау орны. NLS дата-орталықтарында орналастыру.",
            )}
          </p>
          <ul className="hero-bullets">
            {bullets.map((tx) => (
              <li key={tx}>
                <CheckIcon />
                {tx}
              </li>
            ))}
          </ul>
          <div className="hero-dedicated-actions" style={{ marginTop: 24 }}>
            <button type="button" className="btn btn-primary" onClick={scrollToCalc}>
              {t("Рассчитать стоимость", "Құнын есептеу")}
            </button>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              {t("Получить консультацию", "Кеңес алу")}
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <div className="storage-hero-art">
              <Database size={220} strokeWidth={1.2} />
            </div>
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const t = useT();
  const items = [
    {
      Icon: Globe2,
      title: t("S3 API из коробки", "Қораптан S3 API"),
      desc: t(
        "Подключайте через AWS CLI, boto3, rclone, MinIO Client — без переписывания приложений.",
        "AWS CLI, boto3, rclone, MinIO Client арқылы қосылыңыз — қосымшаларды қайта жазусыз.",
      ),
    },
    {
      Icon: ShieldCheck,
      title: t("Шифрование и доступ", "Шифрлеу және рұқсат"),
      desc: t(
        "Шифрование на стороне сервера, тонкая настройка прав через access/secret keys и bucket-политики.",
        "Сервер жағындағы шифрлеу, access/secret keys және bucket-саясаттары арқылы икемді баптау.",
      ),
    },
    {
      Icon: Layers,
      title: t("Версионирование", "Нұсқалау"),
      desc: t(
        "Храните несколько версий объектов и восстанавливайте удалённые файлы одной командой.",
        "Объектілердің бірнеше нұсқасын сақтаңыз және өшірілген файлдарды бір команда арқылы қалпына келтіріңіз.",
      ),
    },
    {
      Icon: Zap,
      title: t("Низкая задержка", "Төмен кідіріс"),
      desc: t(
        "Хранилище расположено внутри Казахстана — минимальные задержки для локальных приложений.",
        "Сақтау орны Қазақстан ішінде орналасқан — жергілікті қосымшалар үшін минималды кідірістер.",
      ),
    },
    {
      Icon: RefreshCw,
      title: t("Без скрытых платежей", "Жасырын төлемдерсіз"),
      desc: t(
        "Только за объём, без оплаты за исходящий трафик и количество запросов.",
        "Тек көлем үшін, шығыс трафик пен сұраныс саны үшін төлемсіз.",
      ),
    },
    {
      Icon: Database,
      title: t("Tier III ЦОД", "Tier III ДО"),
      desc: t(
        "Размещение в дата-центрах NLS уровня Tier III с резервированием питания и охлаждения.",
        "Қуат пен салқындатуды резервтеумен қамтамасыз етілген Tier III деңгейіндегі NLS дата-орталықтарында орналастыру.",
      ),
    },
  ];
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Преимущества", "Артықшылықтар")}</span>
          <h2>{t("Почему объектное хранилище NLS", "Неге NLS объектілік сақтау орны")}</h2>
        </div>
        <div className="benefits-grid">
          {items.map(({ Icon, title, desc }) => (
            <div key={title} className="benefit-card">
              <div className="benefit-card__icon">
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const t = useT();
  return (
    <section className="calc-section" id="object-storage-calculator">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Калькулятор", "Калькулятор")}</span>
          <h2>{t("Рассчитайте стоимость хранения", "Сақтау құнын есептеңіз")}</h2>
          <p>{t("Тариф 110 ₸ за 1 ГБ в месяц, оплата по факту", "Айына 1 ГБ үшін 110 ₸ тарифі, нақты пайдалану бойынша")}</p>
        </div>
        <StorageCalculator storageId="object" pricePerGb={110} />
        <CalculatorDisclaimer />
      </div>
    </section>
  );
}

function UseCases() {
  const t = useT();
  const items = [
    {
      title: t("Бэкапы и архивы", "Сақтық көшірмелер және архивтер"),
      desc: t("Регулярные резервные копии серверов и баз данных в безопасное хранилище.", "Серверлер мен дерекқорлардың тұрақты сақтық көшірмелері."),
    },
    {
      title: t("Медиа и статика сайтов", "Сайттардың медиасы және статикасы"),
      desc: t("Хранение изображений, видео и статических ассетов с раздачей по HTTPS.", "Суреттерді, бейнелерді және статикалық ассеттерді HTTPS арқылы тарату."),
    },
    {
      title: t("Аналитика и логи", "Аналитика және логтар"),
      desc: t("Накопление сырых данных и логов для последующей обработки.", "Кейіннен өңдеуге арналған бастапқы деректер мен логтарды жинақтау."),
    },
    {
      title: t("Объекты приложений", "Қосымша объектілері"),
      desc: t("Пользовательские файлы, документы, отчёты вашего сервиса.", "Сервисіңіздің пайдаланушы файлдары, құжаттары, есептері."),
    },
  ];
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Для кого", "Кімдерге")}</span>
          <h2>{t("Типичные сценарии использования", "Әдеттегі қолдану сценарийлері")}</h2>
        </div>
        <div className="usecases-grid">
          {items.map((it) => (
            <div key={it.title} className="usecase-card">
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
