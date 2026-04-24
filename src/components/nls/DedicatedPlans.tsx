import { useCity } from "@/lib/city-context";

type Plan = {
  id: string;
  model: string;
  cpu: string;
  freq: string;
  ram: string;
  ssd: string;
  raid: string;
  network: string;
  ip: string;
  price: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: "dl380-g9-64",
    model: "HP DL380 Gen9",
    cpu: "2 × Intel® Xeon® E5-2680 v4",
    freq: "2.40 GHz",
    ram: "64 GB",
    ssd: "4 × 480 GB",
    raid: "RAID p240",
    network: "100 Мбит/с",
    ip: "1 IP",
    price: "201 450",
  },
  {
    id: "dl360-g9-128",
    model: "HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2680 v4",
    freq: "2.40 GHz",
    ram: "128 GB",
    ssd: "2 × 960 GB",
    raid: "RAID p240",
    network: "100 Мбит/с",
    ip: "4 IP",
    price: "227 320",
    popular: true,
  },
  {
    id: "dl360-g9-64",
    model: "HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2690 v3",
    freq: "2.60 GHz",
    ram: "64 GB",
    ssd: "2 × 960 GB",
    raid: "RAID p240",
    network: "100 Мбит/с",
    ip: "4 IP",
    price: "204 200",
  },
  {
    id: "dl360-g9-256",
    model: "HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2690 v3",
    freq: "2.60 GHz",
    ram: "256 GB",
    ssd: "2 × 1.92 TB",
    raid: "RAID p240",
    network: "100 Мбит/с",
    ip: "1 IP",
    price: "269 110",
  },
];

// Иконки SVG
const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);
const FreqIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);
const RamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="1.5" />
    <path d="M6 11v2M10 11v2M14 11v2M18 11v2" />
  </svg>
);
const DiskIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="6" rx="9" ry="3" />
    <path d="M3 6v6c0 1.66 4.03 3 9 3s9-1.34 9-3V6" />
    <path d="M3 12v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
  </svg>
);

export function DedicatedPlans() {
  const { openConsultationModalWith } = useCity();

  return (
    <section className="plans-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Тарифы</span>
          <h2>Готовые конфигурации</h2>
          <p>Выберите подходящий тариф или соберите свой в конфигураторе ниже</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article key={plan.id} className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}>
              {plan.popular && <div className="plan-badge">Популярный</div>}

              <div className="plan-header">
                <span className="plan-vendor">Сервер</span>
                <h3 className="plan-title">{plan.model}</h3>
              </div>

              <ul className="plan-specs">
                <li className="plan-spec">
                  <span className="plan-spec-icon"><CpuIcon /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Процессор</span>
                    <span className="plan-spec-value">{plan.cpu}</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><FreqIcon /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Частота</span>
                    <span className="plan-spec-value">{plan.freq}</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><RamIcon /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Память</span>
                    <span className="plan-spec-value">{plan.ram}</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><DiskIcon /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Накопители</span>
                    <span className="plan-spec-value">{plan.ssd}</span>
                  </span>
                </li>
              </ul>

              <div className="plan-extras">
                <span className="plan-tag">{plan.raid}</span>
                <span className="plan-tag">{plan.network}</span>
                <span className="plan-tag">{plan.ip}</span>
              </div>

              <div className="plan-price-block">
                <div className="plan-price-label">от</div>
                <div className="plan-price">
                  {plan.price} <span className="plan-currency">₸</span>
                </div>
                <div className="plan-period">в месяц, без НДС</div>
              </div>

              <button
                type="button"
                className="btn btn-primary plan-order-btn"
                onClick={() =>
                  openConsultationModalWith({
                    subject: `Заказ тарифа: ${plan.model} (${plan.ram}, ${plan.ssd})`,
                  })
                }
              >
                Заказать
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
