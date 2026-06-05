import { useState } from "react";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";

type Plan = {
  id: string;
  model: string;
  cpu: string;
  cores: string;
  freq: string;
  ram: string;
  ssd: string;
  raid: string;
  network: string;
  ip: string;
  ipmi: string;
  price: string;
  popular?: boolean;
};

const plansRaw: Plan[] = [
  {
    id: "dl380-g9-64",
    model: "HP DL380 Gen9",
    cpu: "2 × Intel® Xeon® E5-2680 v4",
    cores: "28C/56T",
    freq: "2.40 GHz",
    ram: "64 GB",
    ssd: "4 × 480 GB SSD",
    raid: "RAID",
    network: "100 Мбит/с",
    ipmi: "IPMI",
    ip: "1 IP",
    price: "201 450",
  },
  {
    id: "dl360-g9-128",
    model: "HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2680 v4",
    cores: "28C/56T",
    freq: "2.40 GHz",
    ram: "128 GB",
    ssd: "2 × 960 GB SSD",
    raid: "RAID",
    network: "100 Мбит/с",
    ip: "1 IP",
    ipmi: "IPMI",
    price: "227 320",
    popular: true,
  },
  {
    id: "dl360-g9-64",
    model: "HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2690 v3",
    cores: "24C/48T",
    freq: "2.60 GHz",
    ram: "64 GB",
    ssd: "2 × 960 GB SSD",
    raid: "RAID",
    network: "100 Мбит/с",
    ip: "1 IP",
    ipmi: "IPMI",
    price: "204 200",
  },
  {
    id: "dl360-g9-256",
    model: "HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2690 v3",
    cores: "24C/48T",
    freq: "2.60 GHz",
    ram: "256 GB",
    ssd: "2 × 1.92 TB SSD",
    raid: "RAID",
    network: "100 Мбит/с",
    ip: "1 IP",
    ipmi: "IPMI",
    price: "269 110",
  },
];

const plans: Plan[] = [...plansRaw].sort(
  (a, b) =>
    parseInt(a.price.replace(/\s/g, ""), 10) - parseInt(b.price.replace(/\s/g, ""), 10),
);

const CpuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
);
const CoresIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
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

type Period = 1 | 6 | 12;
// Переключатель скидок для готовых конфигураций.
// true  → отображаются скидки 3% / 6% (как сейчас)
// false → скидки скрыты, цена 6 / 12 мес. = цена × кол-во месяцев без скидки
const PLANS_DISCOUNT_ENABLED = false;
const RAW_DISCOUNT: Record<Period, number> = { 1: 0, 6: 0.03, 12: 0.06 };
const DISCOUNT: Record<Period, number> = PLANS_DISCOUNT_ENABLED
  ? RAW_DISCOUNT
  : { 1: 0, 6: 0, 12: 0 };

function formatPriceNumber(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function DedicatedPlans() {
  const { openConsultationModalWith } = useCity();
  const t = useT();
  const [period, setPeriod] = useState<Period>(1);

  return (
    <section className="plans-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Тарифы", "Тарифтер")}</span>
          <h2>{t("Готовые конфигурации", "Дайын конфигурациялар")}</h2>
          <p>{t("Выберите подходящий тариф или соберите свой в конфигураторе ниже", "Сәйкес тарифті таңдаңыз немесе төмендегі конфигураторда өзіңіздікін құрастырыңыз")}</p>
        </div>

        <div className="plan-period-switch" role="tablist" aria-label={t("Период оплаты", "Төлем мерзімі")}>
          {([1, 6, 12] as Period[]).map((p) => {
            const discount = DISCOUNT[p];
            return (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={period === p}
                className={`plan-period-btn${period === p ? " is-active" : ""}`}
                onClick={() => setPeriod(p)}
              >
                {p === 1
                  ? t("1 месяц", "1 ай")
                  : p === 6
                    ? t("6 месяцев", "6 ай")
                    : t("12 месяцев", "12 ай")}
                {discount > 0 && (
                  <span className="plan-discount-badge">−{Math.round(discount * 100)}%</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="plans-grid">
          {plans.map((plan) => {
            const baseMonthly = parseInt(plan.price.replace(/\s/g, ""), 10);
            const discount = DISCOUNT[period];
            const totalForPeriod = baseMonthly * period * (1 - discount);
            const saving = baseMonthly * period * discount;
            const periodLabelRu = period === 1 ? "в месяц" : `за ${period} мес.`;
            const periodLabelKz = period === 1 ? "айына" : `${period} айға`;

            return (
              <article key={plan.id} className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}>
                {plan.popular && <div className="plan-badge">{t("Популярный", "Танымал")}</div>}

                <div className="plan-header">
                  <span className="plan-vendor">{t("Сервер", "Сервер")}</span>
                  <h3 className="plan-title">{plan.model}</h3>
                </div>

                <ul className="plan-specs">
                  <li className="plan-spec">
                    <span className="plan-spec-icon"><CpuIcon /></span>
                    <span className="plan-spec-text">
                      <span className="plan-spec-label">{t("Процессор", "Процессор")}</span>
                      <span className="plan-spec-value">{plan.cpu}</span>
                    </span>
                  </li>
                  <li className="plan-spec">
                    <span className="plan-spec-icon"><CoresIcon /></span>
                    <span className="plan-spec-text">
                      <span className="plan-spec-label">{t("Всего ядер/потоков", "Барлық ядро/ағын")}</span>
                      <span className="plan-spec-value">{plan.cores}</span>
                    </span>
                  </li>
                  <li className="plan-spec">
                    <span className="plan-spec-icon"><FreqIcon /></span>
                    <span className="plan-spec-text">
                      <span className="plan-spec-label">{t("Частота", "Жиілік")}</span>
                      <span className="plan-spec-value">{plan.freq}</span>
                    </span>
                  </li>
                  <li className="plan-spec">
                    <span className="plan-spec-icon"><RamIcon /></span>
                    <span className="plan-spec-text">
                      <span className="plan-spec-label">{t("Память", "Жады")}</span>
                      <span className="plan-spec-value">{plan.ram}</span>
                    </span>
                  </li>
                  <li className="plan-spec">
                    <span className="plan-spec-icon"><DiskIcon /></span>
                    <span className="plan-spec-text">
                      <span className="plan-spec-label">{t("Накопители", "Жинақтаушылар")}</span>
                      <span className="plan-spec-value">{plan.ssd}</span>
                    </span>
                  </li>
                </ul>

                <div className="plan-extras">
                  <span className="plan-tag">{plan.raid}</span>
                  <span className="plan-tag">{plan.network}</span>
                  <span className="plan-tag">{plan.ip}</span>
                  <span className="plan-tag">{plan.ipmi}</span>
                </div>

                <div className="plan-price-block">
                  <div className="plan-price-label">{t("от", "бастап")}</div>
                  <div className="plan-price">
                    {formatPriceNumber(totalForPeriod)} <span className="plan-currency">₸</span>
                  </div>
                  <div className="plan-period">{t(`${periodLabelRu}, без НДС`, `${periodLabelKz}, ҚҚС-сыз`)}</div>
                  {saving > 0 && (
                    <div className="plan-saving">
                      {t(`Экономия: ${formatPriceNumber(saving)} ₸`, `Үнемдеу: ${formatPriceNumber(saving)} ₸`)}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary plan-order-btn"
                  onClick={() =>
                    openConsultationModalWith({
                      subject: `Заказ тарифа: ${plan.model} | CPU: ${plan.cpu} (${plan.cores}) | RAM: ${plan.ram} | Накопители: ${plan.ssd} | Сеть: ${plan.network} | ${plan.ip} | ${plan.ipmi} | Срок: ${period} мес. | Итого: ${formatPriceNumber(totalForPeriod)} ₸`,
                    })
                  }
                >
                  {t("Заказать", "Тапсырыс беру")}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
