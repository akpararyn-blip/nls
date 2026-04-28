import {
  Battery,
  BatteryCharging,
  Plug,
  Gauge,
  Zap,
  Snowflake,
  Wind,
  Thermometer,
  Filter,
  Flame,
  Fingerprint,
  Camera,
  ServerCog,
  ShieldCheck,
  Activity,
  Clock,
  FileBadge2,
} from "lucide-react";

type CardItem = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  h: string;
  p: string;
};

function EnterpriseSection({
  eyebrow,
  title,
  subtitle,
  items,
  alt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  items: CardItem[];
  alt?: boolean;
}) {
  return (
    <section className={`enterprise-section${alt ? " enterprise-section--alt" : ""}`}>
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="enterprise-grid">
          {items.map(({ Icon, h, p }) => (
            <div className="enterprise-card" key={h}>
              <div className="enterprise-card-icon">
                <Icon size={22} strokeWidth={1.8} />
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

export function PowerSection() {
  const items: CardItem[] = [
    {
      Icon: BatteryCharging,
      h: "Автономный дизель-генератор",
      p: "Мощность 380 кВт со встроенным баком — до 8 часов бесперебойной работы под нагрузкой.",
    },
    {
      Icon: Battery,
      h: "Двойное резервирование ИБП",
      p: "Два модульных UPS по 200 kVA с КПД 95,5% обеспечивают мгновенный переход на резерв.",
    },
    {
      Icon: Zap,
      h: "Автоматический ввод резерва (ATS)",
      p: "Контакторы Schneider Electric (600 А). Переключение между вводами без потери питания.",
    },
    {
      Icon: Plug,
      h: "Выделенная буферная зона",
      p: "Массив из 80 кислотных батарей (12 V 250 Ah) в специальных изолированных шкафах.",
    },
    {
      Icon: Gauge,
      h: "Умное распределение в стойке",
      p: "Интеллектуальные PDU (1 фаза, 40 А, 24 порта C13/C19) со встроенными счётчиками потребления.",
    },
  ];
  return (
    <EnterpriseSection
      eyebrow="Энергетика"
      title="Энергоснабжение со 100% защитой от сбоев"
      subtitle="Многоуровневая архитектура питания N+1: два независимых ввода, ИБП и резервная генерация."
      items={items}
    />
  );
}

export function ClimateSection() {
  const items: CardItem[] = [
    {
      Icon: Snowflake,
      h: "Изолированный холодный коридор",
      p: "Cold Aisle Containment со слайд-дверьми и автоматическим открытием потолка при инцидентах.",
    },
    {
      Icon: Thermometer,
      h: "Экстремальная стойкость",
      p: "Старт и работа фреонового контура при уличных температурах от −40 °C до +45 °C.",
    },
    {
      Icon: Wind,
      h: "Снятие тепловой нагрузки",
      p: "6 внутрирядных (InRow) прецизионных кондиционеров по 35 кВт каждый.",
    },
    {
      Icon: Filter,
      h: "Непрерывная очистка воздуха",
      p: "Приток свежего отфильтрованного воздуха 400 м³/ч и вытяжка 1300 м³/ч.",
    },
    {
      Icon: ServerCog,
      h: "Стабилизация электрощитовых",
      p: "2 резервных кондиционера (7,5 кВт) с постоянным контролем температуры и влажности.",
    },
  ];
  return (
    <EnterpriseSection
      eyebrow="Климат"
      title="Экстремальная стойкость и прецизионное охлаждение"
      subtitle="Архитектура холодного коридора и InRow-охлаждение поддерживают точные параметры микроклимата."
      items={items}
      alt
    />
  );
}

export function SecuritySection() {
  const items: CardItem[] = [
    {
      Icon: Flame,
      h: "Автоматика пожаротушения FM200",
      p: "190 кг гептафторпропана подавляют возгорание на молекулярном уровне без ущерба оборудованию. При срабатывании отключается вентиляция и активируются клапаны сброса давления.",
    },
    {
      Icon: Fingerprint,
      h: "Биометрический доступ",
      p: "Face ID, RFID-карты и отпечаток пальца. База рассчитана на 50 000 пользователей.",
    },
    {
      Icon: Camera,
      h: "Визуальный и сенсорный контроль",
      p: "6 HD-камер с архивом 30 дней, датчики температуры, влажности, задымления и протечек.",
    },
    {
      Icon: Activity,
      h: "Единый управляющий центр",
      p: "Сервер на Linux собирает данные с 200+ модулей и отправляет уведомления через SMS, Email и Telegram 24/7.",
    },
  ];
  return (
    <EnterpriseSection
      eyebrow="Безопасность"
      title="Многоуровневый контроль доступа и иммунитет к инцидентам"
      subtitle="Физическая защита оборудования и непрерывный мониторинг каждой подсистемы дата-центра."
      items={items}
    />
  );
}

export function SlaSection() {
  const stats = [
    {
      value: "99,982%",
      label: "Доступность по SLA",
      text: "Ежеквартальные отчёты и прозрачный портал клиента с актуальными метриками.",
    },
    {
      value: "≤ 15 мин",
      label: "Реакция инженера",
      text: "Круглосуточный мониторинг 24/7/365, выделенный NOC и мгновенные уведомления.",
    },
    {
      value: "N+1",
      label: "Отказоустойчивость Tier III",
      text: "Параллельные пути электропитания и охлаждения, плановые работы без остановки сервисов.",
    },
    {
      value: "ISO / PCI",
      label: "Соответствие регуляторам",
      text: "Регулярное тестирование DR-планов, ISO 27001, ISO 22301 и PCI DSS.",
    },
  ];
  return (
    <section className="enterprise-section enterprise-section--alt">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Tier III · SLA</span>
          <h2>
            Инфраструктура стандарта{" "}
            <span style={{ color: "var(--color-orange)" }}>Tier III</span> с гарантией доступности
          </h2>
          <p>Прозрачные обязательства, измеримые метрики и регулярный аудит соответствия.</p>
        </div>
        <div className="sla-stats">
          {stats.map((s) => (
            <div className="sla-stat" key={s.label}>
              <div className="sla-stat-value">{s.value}</div>
              <div className="sla-stat-label">
                {s.label === "Соответствие регуляторам" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <FileBadge2 size={16} /> {s.label}
                  </span>
                ) : s.label === "Реакция инженера" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Clock size={16} /> {s.label}
                  </span>
                ) : s.label === "Отказоустойчивость Tier III" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <ShieldCheck size={16} /> {s.label}
                  </span>
                ) : (
                  s.label
                )}
              </div>
              <div className="sla-stat-text">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EnterpriseDataCenterBlocks() {
  return (
    <>
      <PowerSection />
      <ClimateSection />
      <SecuritySection />
      <SlaSection />
    </>
  );
}
