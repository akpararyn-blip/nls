import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CalculatorDisclaimer } from "@/components/nls/CalculatorDisclaimer";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "@/components/nls/Icons";
import { useMobileBarVisibility } from "@/hooks/use-mobile-bar";
import vpsHero from "@/assets/vpsvds.png";
import { useMemo, useState, type ChangeEvent } from "react";
import { Cpu, MemoryStick, HardDrive, Database, MapPin, ShieldCheck, Zap, FileText } from "lucide-react";

export const Route = createFileRoute("/vps")({
  head: () => ({
    meta: [
      { title: "Аренда VPS/VDS серверов в Казахстане — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Виртуальные серверы VPS/VDS на базе KVM-виртуализации. Дата-центры в Алматы и Астане, моментальное масштабирование ресурсов. Қазақстанда VPS/VDS серверлерін жалдау.",
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
const PRICE_CPU = 1200;
const PRICE_RAM = 1500;
const PRICE_SSD = 90;
const PRICE_HDD = 38;

const SSD_MIN = 10;
const SSD_STEP = 1;
const HDD_MIN = 0;
const HDD_STEP = 1;


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

export function VpsPage() {
  return (
    <SiteLayout>
      <Hero />
      <Tariffs />
      <Calculator />
      <Benefits />
      <VpsCTA />
    </SiteLayout>
  );
}

function VpsCTA() {
  const { openConsultationModal } = useCity();
  const t = useT();
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">{t("Готовы начать", "Бастауға дайынбыз")}</span>
          <h2>{t("Запустите VPS/VDS-сервер за 15 минут", "VPS/VDS серверін 15 минутта іске қосыңыз")}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 720, margin: "0 auto" }}>
            {t(
              "Подберём конфигурацию под нагрузку, поможем с миграцией и настройкой. Техническая поддержка 24/7 на русском языке.",
              "Жүктемеге сай конфигурацияны таңдаймыз, көшіру және баптауға көмектесеміз. Тәулік бойы орыс тілінде техникалық қолдау."
            )}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
            {t("Получить консультацию", "Кеңес алу")}
          </button>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const t = useT();
  const bullets = [
    t("KVM-виртуализация с гарантированными ресурсами", "Кепілдендірілген ресурстары бар KVM виртуалдандыруы"),
    t("Собственный дата-центр NLS", "NLS меншікті дата-орталығы"),
    t("Моментальное масштабирование ресурсов", "Ресурстарды лезде масштабтау"),
    t("Техническая поддержка 24/7", "24/7 техникалық қолдау"),
  ];
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            VPS / VDS
          </span>
          <h1>
            {t("Аренда виртуальных серверов", "Виртуалды серверлерді жалдау")}{" "}
            <span style={{ color: "var(--color-orange)" }}>VPS/VDS</span>
          </h1>
          <p className="hero-subtitle">
            {t(
              "Высокая производительность на базе KVM-виртуализации с размещением в собственном дата-центре NLS.",
              "NLS меншікті дата-орталығында орналасқан KVM виртуалдандыруына негізделген жоғары өнімділік."
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
            <button type="button" className="btn btn-primary" onClick={scrollToTariffs}>
              {t("Выбрать тариф", "Тарифті таңдау")}
            </button>
            <button type="button" className="btn btn-outline" onClick={scrollToCalculator}>
              {t("Конфигуратор ресурсов", "Ресурстар конфигураторы")}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={vpsHero} alt={t("VPS/VDS — виртуальные серверы", "VPS/VDS — виртуалды серверлер")} width={1024} height={1024} />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tariffs() {
  const { openConsultationModalWith } = useCity();
  const t = useT();
  return (
    <section className="plans-section" id="vps-tariffs">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Тарифы", "Тарифтер")}</span>
          <h2>{t("Готовые тарифные планы", "Дайын тарифтік жоспарлар")}</h2>
          <p>
            {t(
              "5 готовых конфигураций для типовых задач — от старта до высоконагруженных проектов",
              "Типтік міндеттерге арналған 5 дайын конфигурация — стартқа дейін жоғары жүктемелі жобаларға дейін"
            )}
          </p>
        </div>

        <div className="vps-plans-grid">
          {plans.map((plan) => (
            <article key={plan.id} className={`plan-card${plan.popular ? " plan-card--popular" : ""}`}>
              {plan.popular && <div className="plan-badge">{t("Популярный", "Танымал")}</div>}
              <div className="plan-header">
                <span className="plan-vendor">VPS</span>
                <h3 className="plan-title">{plan.name}</h3>
              </div>

              <ul className="plan-specs">
                <li className="plan-spec">
                  <span className="plan-spec-icon"><Cpu size={20} strokeWidth={1.8} /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">{t("Ядра CPU", "CPU ядролары")}</span>
                    <span className="plan-spec-value">x{plan.cpu}</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><MemoryStick size={20} strokeWidth={1.8} /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">{t("Память", "Жады")}</span>
                    <span className="plan-spec-value">{plan.ram} {t("ГБ", "ГБ")}</span>
                  </span>
                </li>
                <li className="plan-spec">
                  <span className="plan-spec-icon"><HardDrive size={20} strokeWidth={1.8} /></span>
                  <span className="plan-spec-text">
                    <span className="plan-spec-label">{t("Диск SSD", "SSD диск")}</span>
                    <span className="plan-spec-value">{plan.ssd} {t("ГБ", "ГБ")}</span>
                  </span>
                </li>
              </ul>

              <div className="plan-price-block">
                <div className="plan-price-label">{t("от", "бастап")}</div>
                <div className="plan-price">
                  {formatPrice(plan.price).replace(" ₸", "")}{" "}
                  <span className="plan-currency">{t("₸/мес", "₸/ай")}</span>
                </div>
                <div className="plan-period">{t("без учёта НДС", "ҚҚС-сыз")}</div>
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
                {t("Заказать", "Тапсырыс беру")}
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
  const { openConsultationModalWith, cityKey } = useCity();
  const t = useT();
  const barVisible = useMobileBarVisibility("vps-calculator");
  const showHdd = cityKey !== "Astana";

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

  const onDiskInput =
    (field: "ssd" | "hdd") => (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (/[^\d]/.test(raw)) {
        showHint(field, t("Можно вводить только цифры", "Тек сандарды енгізуге болады"));
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
      showHint(
        field,
        t(
          `Шаг ${step} ГБ — округлили до ${rounded} ГБ`,
          `Қадам ${step} ГБ — ${rounded} ГБ-қа дейін домалақталды`
        )
      );
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
          <span className="section-eyebrow">{t("Конструктор", "Құрастырғыш")}</span>
          <h2>{t("Калькулятор ресурсов", "Ресурстар калькуляторы")}</h2>
          <p>
            {t(
              "Соберите конфигурацию под свою задачу — изменения отражаются в стоимости мгновенно",
              "Тапсырмаңызға сай конфигурацияны жинақтаңыз — өзгерістер құнда лезде көрсетіледі"
            )}
          </p>
        </div>

        <div className="calc-grid">
          <div className="calc-form">
            <ResourceRow
              icon={<Cpu size={22} strokeWidth={1.8} />}
              label={t("CPU (2,1 ГГц)", "CPU (2,1 ГГц)")}
              hintLabel={t(`${PRICE_CPU} ₸ за ядро`, `ядро үшін ${PRICE_CPU} ₸`)}
              value={cpu}
              unit="CPU"
              onMinus={() => setCpu((v) => Math.max(1, v - 1))}
              onPlus={() => setCpu((v) => v + 1)}
            />

            <ResourceRow
              icon={<MemoryStick size={22} strokeWidth={1.8} />}
              label={t("Оперативная память (RAM)", "Жедел жады (RAM)")}
              hintLabel={t(`${PRICE_RAM} ₸ за 1 ГБ`, `1 ГБ үшін ${PRICE_RAM} ₸`)}
              value={ram}
              unit={t("ГБ", "ГБ")}
              onMinus={() => setRam((v) => Math.max(1, v - 1))}
              onPlus={() => setRam((v) => v + 1)}
            />

            <ResourceInputRow
              icon={<HardDrive size={22} strokeWidth={1.8} />}
              label={t("Накопитель SSD", "SSD жинақтаушы")}
              hintLabel={t(`${PRICE_SSD} ₸ за 1 ГБ`, `1 ГБ үшін ${PRICE_SSD} ₸`)}
              inputValue={ssdInput}
              unit={t("ГБ", "ГБ")}
              onMinus={() => stepDisk("ssd", -1)}
              onPlus={() => stepDisk("ssd", 1)}
              onChange={onDiskInput("ssd")}
              onBlur={() => commitDisk("ssd")}
              activeHint={hint && hint.field === "ssd" ? hint.text : null}
            />

            {showHdd && (
              <ResourceInputRow
                icon={<Database size={22} strokeWidth={1.8} />}
                label={t("Накопитель HDD", "HDD жинақтаушы")}
                hintLabel={t(`${PRICE_HDD} ₸ за 1 ГБ`, `1 ГБ үшін ${PRICE_HDD} ₸`)}
                inputValue={hddInput}
                unit={t("ГБ", "ГБ")}
                onMinus={() => stepDisk("hdd", -1)}
                onPlus={() => stepDisk("hdd", 1)}
                onChange={onDiskInput("hdd")}
                onBlur={() => commitDisk("hdd")}
                activeHint={hint && hint.field === "hdd" ? hint.text : null}
              />
            )}

          </div>

          <div className="calc-summary">
            <div className="summary-card">
              <div className="summary-header">{t("Ваша конфигурация", "Сіздің конфигурацияңыз")}</div>
              <div className="summary-body">
                <SumLine title="CPU" detail={`${cpu} × ${t("ядро", "ядро")}`} price={calc.priceCpu} />
                <SumLine title="RAM" detail={`${ram} ${t("ГБ", "ГБ")}`} price={calc.priceRam} />
                <SumLine title="SSD" detail={`${ssd} ${t("ГБ", "ГБ")}`} price={calc.priceSsd} />
                {showHdd && <SumLine title="HDD" detail={hdd === 0 ? "—" : `${hdd} ${t("ГБ", "ГБ")}`} price={calc.priceHdd} />}
              </div>
              <div className="summary-footer">
                <div className="summary-total-row">
                  <span className="summary-total-label">{t("Итого за 1 месяц", "1 айға барлығы")}</span>
                  <span className="summary-total-amount">{formatPrice(calc.total)}</span>
                </div>
                <p className="summary-vat">{t("Цены указаны без учёта НДС", "Бағалар ҚҚС-сыз көрсетілген")}</p>
                <button
                  type="button"
                  className="btn btn-primary calc-order-btn"
                  onClick={() =>
                    openConsultationModalWith({
                      subject: `Заказ VPS (конфигуратор): CPU x${cpu}, RAM ${ram} ГБ, SSD ${ssd} ГБ, HDD ${hdd} ГБ — ${formatPrice(calc.total)}/мес`,
                    })
                  }
                >
                  {t("Заказать", "Тапсырыс беру")}
                </button>
              </div>
            </div>
            <CalculatorDisclaimer />
          </div>
        </div>

        <div className={`mobile-calc-bar${barVisible ? " is-visible" : ""}`}>
          <div className="mobile-bar-main">
            <div className="mobile-bar-left">
              <div className="mobile-bar-label">{t("Итого за 1 месяц", "1 айға барлығы")}</div>
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
              {t("Заказать", "Тапсырыс беру")}
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
  const t = useT();
  const items = [
    {
      Icon: MapPin,
      h: t("Локализация в Казахстане", "Қазақстанда локализация"),
      p: t(
        "Серверы размещены в собственном дата-центре NLS — соответствие закону о хранении персональных данных РК.",
        "Серверлер NLS меншікті дата-орталығында орналастырылған — ҚР дербес деректерді сақтау туралы заңға сәйкес келеді."
      ),
    },
    {
      Icon: ShieldCheck,
      h: t("Надёжность 99.9%", "99.9% сенімділік"),
      p: t(
        "Гарантированный SLA-аптайм, резервированные каналы связи и круглосуточный мониторинг инфраструктуры.",
        "Кепілдендірілген SLA-аптайм, резервтелген байланыс арналары және инфрақұрылымды тәулік бойы мониторингтеу."
      ),
    },
    {
      Icon: Zap,
      h: t("Мгновенное масштабирование", "Лезде масштабтау"),
      p: t(
        "Меняйте процессор, память и диски в любой момент через конфигуратор без простоев и долгих согласований.",
        "Процессор, жады және дискілерді кез келген сәтте конфигуратор арқылы тоқтап қалусыз және ұзақ келісімдерсіз өзгертіңіз."
      ),
    },
    {
      Icon: FileText,
      h: t("Полный документооборот", "Толық құжат айналымы"),
      p: t(
        "Закрывающие документы для юридических лиц: ЭСФ, АВР, акты сверок — всё в личном кабинете в один клик.",
        "Заңды тұлғаларға арналған жабатын құжаттар: ЭШФ, ОКА, салыстыру актілері — барлығы жеке кабинетте бір батырмамен."
      ),
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Преимущества", "Артықшылықтар")}</span>
          <h2>
            {t("Почему бизнес выбирает", "Бизнес неге")} <span style={{ color: "var(--color-orange)" }}>VPS/VDS</span> {t("", "таңдайды")}
          </h2>
          <p>{t("Комплексное решение для размещения инфраструктуры в Казахстане.", "Қазақстанда инфрақұрылымды орналастырудың кешенді шешімі.")}</p>
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
