import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import vpsHero from "@/assets/vps-hero.png";
import { useMemo, useState, type ChangeEvent } from "react";
import { Cpu, MemoryStick, HardDrive, Database, MapPin, ShieldCheck, Zap, FileText } from "lucide-react";

export const Route = createFileRoute("/vps")({
  head: () => ({
    meta: [
      { title: "Аренда VPS/VDS серверов в Казахстане — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Виртуальные серверы VPS/VDS на базе KVM-виртуализации. Дата-центры в Алматы и Астане, моментальное масштабирование ресурсов.",
      },
      { property: "og:title", content: "Аренда VPS/VDS серверов в Казахстане — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Высокая производительность KVM, локальные дата-центры NLS, гибкая конфигурация и круглосуточная поддержка.",
      },
    ],
  }),
  component: VpsPage,
});

// === Pricing constants ===
const PRICE_CPU = 1200; // за ядро
const PRICE_RAM = 1500; // за 1 ГБ
const PRICE_SSD = 90; // за 1 ГБ
const PRICE_HDD = 38; // за 1 ГБ

const SSD_MIN = 10;
const SSD_STEP = 10;
const HDD_MIN = 0;
const HDD_STEP = 10;

type Plan = {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  ssd: number;
  price: number;
  popular?: boolean;
};

const plans: Plan[] = [
  { id: "light", name: "LIGHT PRO", cpu: 2, ram: 2, ssd: 60, price: 5880 },
  { id: "comfort", name: "COMFORT PRO", cpu: 4, ram: 4, ssd: 80, price: 15480 },
  { id: "comfort-plus", name: "COMFORT PRO+", cpu: 4, ram: 8, ssd: 100, price: 25080, popular: true },
  { id: "optima", name: "OPTIMA PRO", cpu: 8, ram: 16, ssd: 100, price: 41880 },
  { id: "full", name: "FULL PRO", cpu: 16, ram: 32, ssd: 200, price: 74280 },
];

function formatPrice(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

function scrollToCalculator() {
  const el = document.getElementById("vps-calculator");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
function scrollToTariffs() {
  const el = document.getElementById("vps-tariffs");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function VpsPage() {
  return (
    <SiteLayout>
      <Hero />
      <Tariffs />
      <Calculator />
      <Benefits />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            VPS / VDS
          </span>
          <h1>
            Аренда виртуальных серверов{" "}
            <span style={{ color: "var(--color-orange)" }}>VPS/VDS</span>
          </h1>
          <p className="hero-subtitle">
            Высокая производительность на базе KVM-виртуализации с размещением в собственных
            дата-центрах в Казахстане (Алматы, Астана).
          </p>

          <ul className="hero-bullets">
            {[
              "KVM-виртуализация с гарантированными ресурсами",
              "Дата-центры в Алматы и Астане",
              "Моментальное масштабирование ресурсов",
              "Техническая поддержка 24/7",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <div className="hero-dedicated-actions" style={{ marginTop: 24 }}>
            <button type="button" className="btn btn-primary" onClick={scrollToTariffs}>
              Выбрать тариф
            </button>
            <button type="button" className="btn btn-outline" onClick={scrollToCalculator}>
              Конфигуратор ресурсов
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={vpsHero} alt="VPS/VDS — виртуальные серверы" width={1024} height={1024} />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tariffs() {
  const { openConsultationModalWith } = useCity();
  return (
    <section className="plans-section" id="vps-tariffs">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Тарифы</span>
          <h2>Готовые тарифные планы</h2>
          <p>5 готовых конфигураций для типовых задач — от старта до высоконагруженных проектов</p>
        </div>

        <div className="vps-plans-grid">
          {plans.map((plan) => (
            <article key={plan.id} className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}>
              {plan.popular && <div className="plan-badge">Популярный</div>}
              <div className="plan-header">
                <span className="plan-vendor">VPS</span>
                <h3 className="plan-title">{plan.name}</h3>
              </div>

              <ul className="plan-specs">
                <li className="plan-spec">
                  <span className="plan-spec-icon"><Cpu size={20} strokeWidth={1.8} /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Ядра CPU</span>
                    <span className="plan-spec-value">x{plan.cpu}</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><MemoryStick size={20} strokeWidth={1.8} /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Память</span>
                    <span className="plan-spec-value">{plan.ram} ГБ</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><HardDrive size={20} strokeWidth={1.8} /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">Диск SSD</span>
                    <span className="plan-spec-value">{plan.ssd} ГБ</span>
                  </span>
                </li>
              </ul>

              <div className="plan-price-block">
                <div className="plan-price-label">от</div>
                <div className="plan-price">
                  {formatPrice(plan.price).replace(" ₸", "")} <span className="plan-currency">₸/мес</span>
                </div>
                <div className="plan-period">без учёта НДС</div>
              </div>

              <button
                type="button"
                className="btn btn-primary plan-order-btn"
                onClick={() =>
                  openConsultationModalWith({
                    subject: `Заказ VPS: ${plan.name} (CPU x${plan.cpu}, ${plan.ram} ГБ RAM, ${plan.ssd} ГБ SSD)`,
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

// ===== Calculator =====
type ResourceKey = "cpu" | "ram" | "ssd" | "hdd";

function Calculator() {
  const { openConsultationModalWith } = useCity();

  const [cpu, setCpu] = useState(2);
  const [ram, setRam] = useState(2);
  const [ssd, setSsd] = useState(20);
  const [hdd, setHdd] = useState(0);

  const [ssdInput, setSsdInput] = useState<string>("20");
  const [hddInput, setHddInput] = useState<string>("0");

  const [hint, setHint] = useState<{ field: ResourceKey; text: string } | null>(null);

  const showHint = (field: ResourceKey, text: string) => {
    setHint({ field, text });
    window.setTimeout(() => {
      setHint((h) => (h && h.field === field && h.text === text ? null : h));
    }, 3500);
  };

  const calc = useMemo(() => {
    const priceCpu = cpu * PRICE_CPU;
    const priceRam = ram * PRICE_RAM;
    const priceSsd = ssd * PRICE_SSD;
    const priceHdd = hdd * PRICE_HDD;
    return {
      priceCpu,
      priceRam,
      priceSsd,
      priceHdd,
      total: priceCpu + priceRam + priceSsd + priceHdd,
    };
  }, [cpu, ram, ssd, hdd]);

  // ввод текста для дисков — только цифры
  const onDiskInput =
    (field: "ssd" | "hdd") => (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // фильтруем не-цифры
      if (/[^\d]/.test(raw)) {
        showHint(field, "Можно вводить только цифры");
      }
      const cleaned = raw.replace(/\D/g, "");
      if (field === "ssd") setSsdInput(cleaned);
      else setHddInput(cleaned);
    };

  const commitDisk = (field: "ssd" | "hdd") => {
    const raw = field === "ssd" ? ssdInput : hddInput;
    const min = field === "ssd" ? SSD_MIN : HDD_MIN;
    const step = field === "ssd" ? SSD_STEP : HDD_STEP;
    let n = parseInt(raw || "0", 10);
    if (Number.isNaN(n) || n < 0) n = 0;
    if (n < min) n = min;
    if (n % step !== 0) {
      const rounded = Math.ceil(n / step) * step;
      showHint(field, `Шаг ${step} ГБ — округлили до ${rounded} ГБ`);
      n = rounded;
    }
    if (field === "ssd") {
      setSsd(n);
      setSsdInput(String(n));
    } else {
      setHdd(n);
      setHddInput(String(n));
    }
  };

  const stepDisk = (field: "ssd" | "hdd", dir: 1 | -1) => {
    const min = field === "ssd" ? SSD_MIN : HDD_MIN;
    const step = field === "ssd" ? SSD_STEP : HDD_STEP;
    const current = field === "ssd" ? ssd : hdd;
    let next = current + dir * step;
    if (next < min) next = min;
    if (field === "ssd") {
      setSsd(next);
      setSsdInput(String(next));
    } else {
      setHdd(next);
      setHddInput(String(next));
    }
  };

  return (
    <section className="calc-section" id="vps-calculator">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Конструктор</span>
          <h2>Калькулятор ресурсов</h2>
          <p>Соберите конфигурацию под свою задачу — изменения отражаются в стоимости мгновенно</p>
        </div>

        <div className="calc-grid">
          <div className="calc-form">
            <ResourceRow
              icon={<Cpu size={22} strokeWidth={1.8} />}
              label="CPU (2,1 ГГц)"
              hintLabel={`${PRICE_CPU} ₸ за ядро · шаг 1 ядро`}
              value={cpu}
              unit="ядер"
              onMinus={() => setCpu((v) => Math.max(1, v - 1))}
              onPlus={() => setCpu((v) => v + 1)}
            />

            <ResourceRow
              icon={<MemoryStick size={22} strokeWidth={1.8} />}
              label="Оперативная память (RAM)"
              hintLabel={`${PRICE_RAM} ₸ за 1 ГБ · шаг 1 ГБ`}
              value={ram}
              unit="ГБ"
              onMinus={() => setRam((v) => Math.max(1, v - 1))}
              onPlus={() => setRam((v) => v + 1)}
            />

            <ResourceInputRow
              icon={<HardDrive size={22} strokeWidth={1.8} />}
              label="Накопитель SSD"
              hintLabel={`${PRICE_SSD} ₸ за 1 ГБ · мин. ${SSD_MIN} ГБ · шаг ${SSD_STEP} ГБ`}
              inputValue={ssdInput}
              unit="ГБ"
              onMinus={() => stepDisk("ssd", -1)}
              onPlus={() => stepDisk("ssd", 1)}
              onChange={onDiskInput("ssd")}
              onBlur={() => commitDisk("ssd")}
              activeHint={hint && hint.field === "ssd" ? hint.text : null}
            />

            <ResourceInputRow
              icon={<Database size={22} strokeWidth={1.8} />}
              label="Накопитель HDD"
              hintLabel={`${PRICE_HDD} ₸ за 1 ГБ · мин. ${HDD_MIN} ГБ · шаг ${HDD_STEP} ГБ`}
              inputValue={hddInput}
              unit="ГБ"
              onMinus={() => stepDisk("hdd", -1)}
              onPlus={() => stepDisk("hdd", 1)}
              onChange={onDiskInput("hdd")}
              onBlur={() => commitDisk("hdd")}
              activeHint={hint && hint.field === "hdd" ? hint.text : null}
            />
          </div>

          <div className="calc-summary">
            <div className="summary-card">
              <div className="summary-header">Ваша конфигурация</div>
              <div className="summary-body">
                <SumLine title="CPU" detail={`${cpu} × ядро`} price={calc.priceCpu} />
                <SumLine title="RAM" detail={`${ram} ГБ`} price={calc.priceRam} />
                <SumLine title="SSD" detail={`${ssd} ГБ`} price={calc.priceSsd} />
                <SumLine title="HDD" detail={hdd === 0 ? "—" : `${hdd} ГБ`} price={calc.priceHdd} />
              </div>
              <div className="summary-footer">
                <div className="summary-total-row">
                  <span className="summary-total-label">Итого за 1 месяц</span>
                  <span className="summary-total-amount">{formatPrice(calc.total)}</span>
                </div>
                <p className="summary-vat">Цены указаны без учёта НДС</p>
                <button
                  type="button"
                  className="btn btn-primary calc-order-btn"
                  onClick={() =>
                    openConsultationModalWith({
                      subject: `Заказ VPS (конфигуратор): CPU x${cpu}, RAM ${ram} ГБ, SSD ${ssd} ГБ, HDD ${hdd} ГБ — ${formatPrice(calc.total)}/мес`,
                    })
                  }
                >
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-calc-bar">
          <div className="mobile-bar-main">
            <div className="mobile-bar-left">
              <div className="mobile-bar-label">Итого за 1 месяц</div>
              <div className="mobile-bar-price">{formatPrice(calc.total)}</div>
            </div>
            <button
              type="button"
              className="btn btn-primary calc-order-btn"
              onClick={() =>
                openConsultationModalWith({
                  subject: `Заказ VPS (конфигуратор): CPU x${cpu}, RAM ${ram} ГБ, SSD ${ssd} ГБ, HDD ${hdd} ГБ — ${formatPrice(calc.total)}/мес`,
                })
              }
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceRow({
  icon, label, hintLabel, value, unit, onMinus, onPlus,
}: {
  icon: React.ReactNode; label: string; hintLabel: string; value: number; unit: string;
  onMinus: () => void; onPlus: () => void;
}) {
  return (
    <div className="vps-resource">
      <div className="vps-resource-head">
        <span className="vps-resource-icon">{icon}</span>
        <div className="vps-resource-text">
          <div className="vps-resource-label">{label}</div>
          <div className="vps-resource-hint">{hintLabel}</div>
        </div>
      </div>
      <div className="vps-resource-control">
        <button type="button" className="calc-counter-btn" onClick={onMinus}>−</button>
        <div className="vps-resource-value">
          <span className="vps-resource-num">{value}</span>
          <span className="vps-resource-unit">{unit}</span>
        </div>
        <button type="button" className="calc-counter-btn" onClick={onPlus}>+</button>
      </div>
    </div>
  );
}

function ResourceInputRow({
  icon, label, hintLabel, inputValue, unit, onMinus, onPlus, onChange, onBlur, activeHint,
}: {
  icon: React.ReactNode; label: string; hintLabel: string; inputValue: string; unit: string;
  onMinus: () => void; onPlus: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  activeHint: string | null;
}) {
  return (
    <div className="vps-resource">
      <div className="vps-resource-head">
        <span className="vps-resource-icon">{icon}</span>
        <div className="vps-resource-text">
          <div className="vps-resource-label">{label}</div>
          <div className="vps-resource-hint">{hintLabel}</div>
        </div>
      </div>
      <div className="vps-resource-control">
        <button type="button" className="calc-counter-btn" onClick={onMinus}>−</button>
        <div className="vps-resource-input-wrap">
          <input
            type="text"
            inputMode="numeric"
            className="vps-resource-input"
            value={inputValue}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
          <span className="vps-resource-unit">{unit}</span>
        </div>
        <button type="button" className="calc-counter-btn" onClick={onPlus}>+</button>
      </div>
      {activeHint && <div className="vps-resource-flash">{activeHint}</div>}
    </div>
  );
}

function SumLine({ title, detail, price }: { title: string; detail: string; price: number }) {
  return (
    <div className="summary-category">
      <div className="sum-row">
        <span className="sum-label">{title}</span>
        <span className={`sum-value${price === 0 ? " muted" : ""}`}>{price === 0 ? "—" : formatPrice(price)}</span>
      </div>
      {price > 0 && <div className="sum-detail">{detail}</div>}
    </div>
  );
}

function Benefits() {
  const items = [
    {
      Icon: MapPin,
      h: "Локализация в Казахстане",
      p: "Серверы размещены в собственных дата-центрах NLS в Алматы и Астане — соответствие закону о хранении персональных данных РК.",
    },
    {
      Icon: ShieldCheck,
      h: "Надёжность 99.9%",
      p: "Гарантированный SLA-аптайм, резервированные каналы связи и круглосуточный мониторинг инфраструктуры.",
    },
    {
      Icon: Zap,
      h: "Мгновенное масштабирование",
      p: "Меняйте процессор, память и диски в любой момент через конфигуратор без простоев и долгих согласований.",
    },
    {
      Icon: FileText,
      h: "Полный документооборот",
      p: "Закрывающие документы для юридических лиц: ЭСФ, АВР, акты сверок — всё в личном кабинете в один клик.",
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Преимущества</span>
          <h2>
            Почему бизнес выбирает <span style={{ color: "var(--color-orange)" }}>VPS NLS</span>
          </h2>
          <p>Комплексное решение для размещения инфраструктуры в Казахстане.</p>
        </div>

        <div className="trust-grid">
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
