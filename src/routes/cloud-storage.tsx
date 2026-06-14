import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CalculatorDisclaimer } from "@/components/nls/CalculatorDisclaimer";
import { RelatedServices } from "@/components/nls/RelatedServices";
import { SupportPromo } from "@/components/nls/SupportPromo";
import { StorageCalculator } from "@/components/nls/StorageCalculator";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "@/components/nls/Icons";
import { CloudUpload, FolderSync, Users, ShieldCheck, Smartphone, Archive } from "lucide-react";

export const Route = createFileRoute("/cloud-storage")({
  head: () => ({
    meta: [
      { title: "Облачное хранилище для бизнеса — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Облачное файловое хранилище для команд: совместный доступ, синхронизация, версии файлов. 100 ₸/ГБ, скидки за 6 и 12 месяцев.",
      },
      { property: "og:title", content: "Облачное хранилище — NLS Kazakhstan" },
      {
        property: "og:description",
        content: "Файловое облако для бизнеса с синхронизацией и совместным доступом. Скидки на длительные сроки.",
      },
    ],
  }),
  component: CloudStoragePage,
});

function scrollToCalc() {
  const el = document.getElementById("cloud-storage-calculator");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CloudStoragePage() {
  return (
    <SiteLayout>
      <Hero />
      <Benefits />
      <Calculator />
      <UseCases />
      <SupportPromo />
      <RelatedServices exclude="cloud-storage" />
    </SiteLayout>
  );
}

function Hero() {
  const t = useT();
  const { openConsultationModal } = useCity();
  const bullets = [
    t("Доступ из браузера и приложений", "Браузер мен қосымшалардан қол жеткізу"),
    t("Синхронизация устройств команды", "Команда құрылғыларын синхрондау"),
    t("Совместный доступ и права", "Бірлескен қол жеткізу және рұқсаттар"),
    t("Скидки до 6% за длительный срок", "Ұзақ мерзімге дейін 6% жеңілдік"),
  ];
  return (
    <section className="hero hero--no-image-mobile">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Cloud Storage
          </span>
          <h1>
            {t("Облачное хранилище", "Бұлттық сақтау орны")}{" "}
            <span style={{ color: "var(--color-orange)" }}>{t("для бизнеса", "бизнеске")}</span>
          </h1>
          <p className="hero-subtitle">
            {t(
              "Удобное файловое облако для команд: храните, синхронизируйте и делитесь документами с любым устройством.",
              "Командалар үшін ыңғайлы файлдық бұлт: құжаттарды сақтаңыз, синхрондаңыз және кез келген құрылғымен бөлісіңіз.",
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
              <CloudUpload size={220} strokeWidth={1.2} />
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
      Icon: Users,
      title: t("Совместная работа", "Бірлескен жұмыс"),
      desc: t("Общие папки, гибкие права доступа, ссылки на файлы для внешних пользователей.", "Жалпы қалталар, икемді рұқсаттар, сыртқы пайдаланушыларға арналған сілтемелер."),
    },
    {
      Icon: FolderSync,
      title: t("Синхронизация устройств", "Құрылғылар синхрондауы"),
      desc: t("Файлы автоматически синхронизируются между ноутбуками, ПК и мобильными.", "Файлдар ноутбуктер, ДК және мобильді құрылғылар арасында автоматты түрде синхрондалады."),
    },
    {
      Icon: ShieldCheck,
      title: t("Безопасность", "Қауіпсіздік"),
      desc: t("Шифрование на лету, журналы доступа, двухфакторная аутентификация.", "Жылдам шифрлеу, қол жеткізу журналдары, екі факторлы аутентификация."),
    },
    {
      Icon: Archive,
      title: t("Версии файлов", "Файл нұсқалары"),
      desc: t("История изменений и корзина: легко вернуть нужную версию документа.", "Өзгерістер тарихы және себет: құжаттың қажет нұсқасын оңай қайтарыңыз."),
    },
    {
      Icon: Smartphone,
      title: t("Мобильные клиенты", "Мобильді клиенттер"),
      desc: t("Полноценная работа с iOS и Android, офлайн-доступ к избранным файлам.", "iOS және Android-та толыққанды жұмыс, таңдаулы файлдарға офлайн қол жеткізу."),
    },
    {
      Icon: CloudUpload,
      title: t("Хранение в Казахстане", "Қазақстанда сақтау"),
      desc: t("Дата-центры внутри страны — данные не покидают границ Казахстана.", "Ел ішіндегі дата-орталықтар — деректер Қазақстан шегінен шықпайды."),
    },
  ];
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Преимущества", "Артықшылықтар")}</span>
          <h2>{t("Что вы получаете", "Сіз не аласыз")}</h2>
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
    <section className="calc-section" id="cloud-storage-calculator">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Калькулятор", "Калькулятор")}</span>
          <h2>{t("Рассчитайте стоимость облака", "Бұлттың құнын есептеңіз")}</h2>
          <p>
            {t(
              "Тариф 100 ₸ за 1 ГБ в месяц. Скидка 3% при оплате за 6 месяцев и 6% за 12 месяцев.",
              "Айына 1 ГБ үшін 100 ₸ тариф. 6 айға төлегенде 3% және 12 айға 6% жеңілдік.",
            )}
          </p>
        </div>
        <StorageCalculator
          storageId="cloud"
          pricePerGb={100}
          discounts={[
            { months: 6, percent: 3 },
            { months: 12, percent: 6 },
          ]}
        />
        <CalculatorDisclaimer />
      </div>
    </section>
  );
}

function UseCases() {
  const t = useT();
  const items = [
    {
      title: t("Командное файловое хранилище", "Командалық файлдық сақтау"),
      desc: t("Единое пространство для документов отдела или всей компании.", "Бөлім немесе бүкіл компания құжаттарына арналған бірыңғай кеңістік."),
    },
    {
      title: t("Обмен файлами с клиентами", "Клиенттермен файл алмасу"),
      desc: t("Безопасные ссылки с ограничением по времени и паролем.", "Уақыт пен құпиясөзбен шектелген қауіпсіз сілтемелер."),
    },
    {
      title: t("Архивы и резервные копии", "Архивтер және сақтық көшірмелер"),
      desc: t("Долговременное хранение редко используемых данных.", "Сирек қолданылатын деректерді ұзақ сақтау."),
    },
    {
      title: t("Удалённая работа", "Қашықтан жұмыс"),
      desc: t("Доступ к рабочим файлам из любой точки мира с любого устройства.", "Әлемнің кез келген нүктесінен кез келген құрылғыдан жұмыс файлдарына қол жеткізу."),
    },
  ];
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Для кого", "Кімдерге")}</span>
          <h2>{t("Кому подходит облако", "Бұлт кімдерге қолайлы")}</h2>
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
