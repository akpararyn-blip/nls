import { Server, MonitorCog, HardDrive, Boxes, Cloud, Database, CloudUpload, ArrowRight } from "lucide-react";
import { SmartLink } from "./SmartLink";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "./Icons";

export type RelatedServiceId =
  | "dedicated"
  | "vps"
  | "colocation"
  | "colocation-full"
  | "iaas"
  | "object-storage"
  | "cloud-storage";

interface RelatedServicesProps {
  exclude: RelatedServiceId;
}

export function RelatedServices({ exclude }: RelatedServicesProps) {
  const t = useT();

  const services: Array<{
    id: RelatedServiceId;
    to: string;
    Icon: typeof Server;
    title: string;
    desc: string;
    bullets: string[];
  }> = [
    {
      id: "dedicated",
      to: "/dedicated",
      Icon: Server,
      title: t("Dedicated серверы", "Dedicated серверлер"),
      desc: t(
        "Аренда физического сервера с полным контролем ресурсов и настройкой конфигурации под ваши задачи.",
        "Ресурстарды толық бақылау және конфигурацияны өз тапсырмаңызға бейімдеу мүмкіндігі бар физикалық серверді жалдау."
      ),
      bullets: [
        t("Гибкая конфигурация CPU, RAM, дисков", "CPU, RAM, дискілерді икемді конфигурациялау"),
        t("Размещение в ЦОД Tier III", "Tier III ДО орналастыру"),
        t("Канал до 10 Гбит/с", "10 Гбит/с дейінгі арна"),
      ],
    },
    {
      id: "vps",
      to: "/vps",
      Icon: MonitorCog,
      title: t("VPS / VDS", "VPS / VDS"),
      desc: t(
        "Виртуальные серверы на KVM с моментальным масштабированием — идеально для сайтов, CRM и приложений.",
        "KVM негізіндегі виртуалды серверлер лезде масштабталады — сайттарға, CRM және қосымшаларға өте қолайлы."
      ),
      bullets: [
        t("KVM-виртуализация", "KVM виртуалдандыруы"),
        t("Готовые тарифы и конфигуратор", "Дайын тарифтер және конфигуратор"),
        t("Запуск за 15 минут", "15 минутта іске қосу"),
      ],
    },
    {
      id: "colocation",
      to: "/colocation",
      Icon: HardDrive,
      title: t("Colocation", "Colocation"),
      desc: t(
        "Разместите собственное оборудование в нашем дата‑центре с резервированным питанием и охлаждением.",
        "Өз жабдықтарыңызды резервтелген қуат пен салқындатумен қамтамасыз етілген дата-орталығымызда орналастырыңыз."
      ),
      bullets: [
        t("Доступность 99,982% SLA", "99,982% SLA қолжетімділік"),
        t("Юнит, питание, IP — гибко", "Юнит, қуат, IP — икемді"),
        t("Мониторинг 24/7", "24/7 мониторинг"),
      ],
    },
    {
      id: "colocation-full",
      to: "/colocation-full",
      Icon: Boxes,
      title: t("Full Rack 42U", "Full Rack 42U"),
      desc: t(
        "Изолированная стойка 42U с выделенной мощностью и каналами связи — решение для Enterprise.",
        "Бөлінген қуат пен байланыс арналары бар оқшауланған 42U шкаф — Enterprise шешімі."
      ),
      bullets: [
        t("Полноразмерный шкаф 42U", "Толық өлшемді 42U шкаф"),
        t("Питание под ваше оборудование", "Жабдығыңызға арналған қуат"),
        t("Резервированные оптоканалы", "Резервтелген оптикалық арналар"),
      ],
    },
    {
      id: "iaas",
      to: "/iaas",
      Icon: Cloud,
      title: t("Виртуальный дата‑центр (IaaS)", "Виртуалды дата-орталық (IaaS)"),
      desc: t(
        "Облако на VMware Cloud Director: vCPU, vRAM, SSD/HDD и резервные копии Veeam в одной панели.",
        "VMware Cloud Director бұлты: vCPU, vRAM, SSD/HDD және Veeam сақтық көшірмелері бір панельде."
      ),
      bullets: [
        t("VMware Cloud Director", "VMware Cloud Director"),
        t("Резервные копии Veeam", "Veeam сақтық көшірмелері"),
        t("Локации: Алматы, Астана, Шымкент", "Локациялар: Алматы, Астана, Шымкент"),
      ],
    },
    {
      id: "object-storage",
      to: "/object-storage",
      Icon: Database,
      title: t("Объектное хранилище S3", "S3 объектілік сақтау орны"),
      desc: t(
        "S3-совместимое хранилище для бэкапов, медиа и статики сайтов. Оплата только за фактический объём.",
        "Сақтық көшірмелерге, медиаға және сайт статикасына арналған S3-үйлесімді сақтау. Тек нақты көлемге ақы.",
      ),
      bullets: [
        t("S3-совместимый API", "S3-үйлесімді API"),
        t("Шифрование и версионирование", "Шифрлеу және нұсқалау"),
        t("110 ₸ за 1 ГБ в месяц", "Айына 1 ГБ үшін 110 ₸"),
      ],
    },
    {
      id: "cloud-storage",
      to: "/cloud-storage",
      Icon: CloudUpload,
      title: t("Облачное хранилище", "Бұлттық сақтау орны"),
      desc: t(
        "Файловое облако для команды: синхронизация, совместный доступ и история версий файлов.",
        "Командаға арналған файлдық бұлт: синхрондау, бірлескен қол жеткізу және файл нұсқалары тарихы.",
      ),
      bullets: [
        t("Синхронизация устройств", "Құрылғылар синхрондауы"),
        t("Общие папки и ссылки", "Жалпы қалталар мен сілтемелер"),
        t("Скидки до 6% за длительный срок", "Ұзақ мерзімге дейін 6% жеңілдік"),
      ],
    },
  ];

  const items = services.filter((s) => s.id !== exclude);

  return (
    <section className="related-services">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Сопутствующие услуги", "Қосымша қызметтер")}</span>
          <h2>{t("Что ещё может пригодиться", "Тағы не пайдалы болуы мүмкін")}</h2>
          <p>
            {t(
              "Решения для разных задач — от аренды виртуальной машины до размещения целой стойки.",
              "Әртүрлі міндеттерге арналған шешімдер — виртуалды машинаны жалдаудан бастап толық шкафты орналастыруға дейін."
            )}
          </p>
        </div>

        <div className="related-grid">
          {items.map(({ id, to, Icon, title, desc, bullets }) => (
            <SmartLink key={id} to={to} className="related-card">
              <div className="related-card__icon">
                <Icon size={26} strokeWidth={1.8} />
              </div>
              <h3 className="related-card__title">{title}</h3>
              <p className="related-card__desc">{desc}</p>
              <ul className="related-card__bullets">
                {bullets.map((b) => (
                  <li key={b}>
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <span className="related-card__cta">
                {t("Подробнее", "Толығырақ")}
                <ArrowRight size={16} strokeWidth={2} />
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}
