import { useState } from "react";
import {
  Cloud,
  MonitorCog,
  Database,
  CloudUpload,
  HardDrive,
  Boxes,
  Server,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SmartLink } from "./SmartLink";
import { SupportPromo } from "./SupportPromo";
import { useT } from "@/lib/lang-context";

type Card = {
  to: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
};

type Group = "cloud" | "dc";

export function CloudHub() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<Group>("cloud");

  const cloudCards: Card[] = [
    {
      to: "/iaas",
      Icon: Cloud,
      title: t("Виртуальный дата‑центр", "Виртуалды дата-орталық"),
      desc: t(
        "Облако на VMware Cloud Director: vCPU, vRAM, SSD/HDD и резервные копии Veeam.",
        "VMware Cloud Director бұлты: vCPU, vRAM, SSD/HDD және Veeam көшірмелері.",
      ),
    },
    {
      to: "/vps",
      Icon: MonitorCog,
      title: t("VPS / VDS сервер", "VPS / VDS сервер"),
      desc: t(
        "Виртуальные серверы на KVM с мгновенным масштабированием.",
        "KVM негізіндегі виртуалды серверлер, лезде масштабталады.",
      ),
    },
    {
      to: "/object-storage",
      Icon: Database,
      title: t("Объектное хранилище S3", "S3 объектілік сақтау"),
      desc: t(
        "S3-совместимое хранилище для бэкапов, медиа и статики сайтов.",
        "Сақтық көшірмелерге, медиаға арналған S3-үйлесімді сақтау.",
      ),
    },
    {
      to: "/cloud-storage",
      Icon: CloudUpload,
      title: t("Облачное хранилище", "Бұлттық сақтау"),
      desc: t(
        "Файловое облако для команды: синхронизация и общий доступ.",
        "Командаға арналған файлдық бұлт: синхрондау және ортақ қол жеткізу.",
      ),
    },
  ];

  const dcCards: Card[] = [
    {
      to: "/colocation",
      Icon: HardDrive,
      title: t("Размещение сервера", "Серверді орналастыру"),
      desc: t(
        "Разместите оборудование в дата‑центре Tier III с резервным питанием.",
        "Жабдықты Tier III дата-орталығында резервтік қуатпен орналастырыңыз.",
      ),
    },
    {
      to: "/colocation-full",
      Icon: Boxes,
      title: t("Аренда стойки", "Тіректі жалға алу"),
      desc: t(
        "Изолированная стойка 42U с выделенной мощностью и каналами.",
        "Бөлінген қуат пен арналары бар оқшауланған 42U шкаф.",
      ),
    },
    {
      to: "/dedicated",
      Icon: Server,
      title: t("Аренда сервера", "Серверді жалға алу"),
      desc: t(
        "Готовые и кастомные dedicated‑серверы под ваши задачи.",
        "Тапсырмаңызға арналған дайын және теңшелетін dedicated серверлер.",
      ),
    },
  ];

  const renderCard = (c: Card) => (
    <SmartLink key={c.to} to={c.to} className="cloud-hub__card">
      <div className="cloud-hub__card-icon">
        <c.Icon size={24} strokeWidth={1.8} />
      </div>
      <div className="cloud-hub__card-body">
        <h3 className="cloud-hub__card-title">{c.title}</h3>
        <p className="cloud-hub__card-desc">{c.desc}</p>
      </div>
      <span className="cloud-hub__card-arrow" aria-hidden>
        <ArrowRight size={18} strokeWidth={2} />
      </span>
    </SmartLink>
  );

  return (
    <>
      <section className="cloud-hub-hero">
        <div className="container">
          <span className="section-eyebrow">{t("NLS Cloud", "NLS Cloud")}</span>
          <h1>
            {t(
              "Облачные решения и услуги дата-центра",
              "Бұлттық шешімдер және дата-орталық қызметтері",
            )}
          </h1>
          <p className="cloud-hub-hero__sub">
            {t(
              "Всё, что нужно бизнесу: от виртуальных машин и объектного хранилища до аренды стойки в собственном ЦОД Tier III.",
              "Бизнеске қажеттінің бәрі: виртуалды машиналар мен объектілік сақтаудан бастап Tier III ДО шкаф жалдауға дейін.",
            )}
          </p>
        </div>
      </section>

      <section className="cloud-hub">
        <div className="container">
          {/* Mobile tabs */}
          <div className="cloud-hub__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "cloud"}
              className={`cloud-hub__tab${activeTab === "cloud" ? " is-active" : ""}`}
              onClick={() => setActiveTab("cloud")}
            >
              {t("Облачные решения", "Бұлттық шешімдер")}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "dc"}
              className={`cloud-hub__tab${activeTab === "dc" ? " is-active" : ""}`}
              onClick={() => setActiveTab("dc")}
            >
              {t("Услуги дата-центра", "Дата-орталық қызметтері")}
            </button>
          </div>

          <div className="cloud-hub__columns">
            <div
              className={`cloud-hub__column${activeTab === "cloud" ? " is-active" : ""}`}
              data-group="cloud"
            >
              <h2 className="cloud-hub__column-title">
                <Cloud size={20} strokeWidth={1.8} />
                {t("Облачные решения", "Бұлттық шешімдер")}
              </h2>
              <div className="cloud-hub__cards">{cloudCards.map(renderCard)}</div>
            </div>

            <div
              className={`cloud-hub__column${activeTab === "dc" ? " is-active" : ""}`}
              data-group="dc"
            >
              <h2 className="cloud-hub__column-title">
                <HardDrive size={20} strokeWidth={1.8} />
                {t("Услуги дата-центра", "Дата-орталық қызметтері")}
              </h2>
              <div className="cloud-hub__cards">{dcCards.map(renderCard)}</div>
            </div>
          </div>
        </div>
      </section>

      <SupportPromo />
    </>
  );
}
