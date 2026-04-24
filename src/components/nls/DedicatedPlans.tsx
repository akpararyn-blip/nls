import { useCity } from "@/lib/city-context";

type Plan = {
  id: string;
  model: string;
  cpu: string;
  freq: string;
  ram: string;
  ssd: string;
  extras: string;
  price: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: "dl380-g9-64",
    model: "Сервер HP DL380 Gen9",
    cpu: "2 × Intel® Xeon® E5-2680 v4",
    freq: "2.40 GHz",
    ram: "64 GB",
    ssd: "4 × 480 GB",
    extras: "RAID p240 · 100 Мбит/с · 1 IP",
    price: "201 450",
  },
  {
    id: "dl360-g9-128",
    model: "Сервер HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2680 v4",
    freq: "2.40 GHz",
    ram: "128 GB",
    ssd: "2 × 960 GB",
    extras: "RAID p240 · 100 Мбит/с · 4 IP",
    price: "227 320",
    popular: true,
  },
  {
    id: "dl360-g9-64",
    model: "Сервер HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2690 v3",
    freq: "2.60 GHz",
    ram: "64 GB",
    ssd: "2 × 960 GB",
    extras: "RAID p240 · 100 Мбит/с · 4 IP",
    price: "204 200",
  },
  {
    id: "dl360-g9-256",
    model: "Сервер HP DL360 Gen9",
    cpu: "2 × Intel® Xeon® E5-2690 v3",
    freq: "2.60 GHz",
    ram: "256 GB",
    ssd: "2 × 1.92 TB",
    extras: "RAID p240 · 100 Мбит/с · 1 IP",
    price: "269 110",
  },
];

export function DedicatedPlans() {
  const { openConsultationModal } = useCity();

  return (
    <section className="plans-section">
      <div className="container">
        <div className="plans-head">
          <h2>Готовые конфигурации</h2>
          <p>Выберите подходящий тариф или соберите свой в конфигураторе ниже</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article key={plan.id} className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}>
              {plan.popular && <div className="plan-badge">Популярный</div>}

              <h3 className="plan-title">{plan.model}</h3>

              <dl className="plan-specs">
                <div className="plan-spec-row">
                  <dt className="plan-spec-value">{plan.cpu}</dt>
                  <dd className="plan-spec-label">Проц.</dd>
                </div>
                <div className="plan-spec-row">
                  <dt className="plan-spec-value">{plan.freq}</dt>
                  <dd className="plan-spec-label">Частота</dd>
                </div>
                <div className="plan-spec-row">
                  <dt className="plan-spec-value">{plan.ram}</dt>
                  <dd className="plan-spec-label">RAM</dd>
                </div>
                <div className="plan-spec-row">
                  <dt className="plan-spec-value">{plan.ssd}</dt>
                  <dd className="plan-spec-label">SSD</dd>
                </div>
              </dl>

              <p className="plan-extras">{plan.extras}</p>

              <div className="plan-price-block">
                <div className="plan-price">
                  {plan.price} <span className="plan-currency">₸</span>
                </div>
                <div className="plan-period">в месяц</div>
              </div>

              <button
                type="button"
                className="btn btn-primary plan-order-btn"
                onClick={() =>
                  openConsultationModal({
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
