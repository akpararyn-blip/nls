import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import { useMobileBarVisibility } from "@/hooks/use-mobile-bar";
import colocationHero from "@/assets/colocation.png";
import { useMemo, useState, type FormEvent } from "react";
import {
  ShieldCheck,
  Snowflake,
  Flame,
  Fingerprint,
  Thermometer,
  ChevronDown,
  Plus,
  X,
  Server as ServerIcon,
  HelpCircle,
} from "lucide-react";

export const Route = createFileRoute("/colocation")({
  head: () => ({
    meta: [
      { title: "Размещение серверов в ЦОД (Colocation) — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Размещение оборудования в собственном дата-центре уровня Tier III в Казахстане. Бесперебойное питание, охлаждение и безопасность 24/7.",
      },
      { property: "og:title", content: "Размещение серверов в ЦОД (Colocation) — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Доступность 99,982% по SLA, круглосуточный мониторинг и собственная инфраструктура Infinity B40 Cluster.",
      },
    ],
  }),
  component: ColocationPage,
});

// === Цены ===
const PRICE_BASE_UNIT = 28500;
const PRICE_EXTRA_UNIT = 15000;
const PRICE_POWER_100W = 2000;
const PRICE_ETH_PORT = 2500;
const PRICE_EXTRA_IP = 2250;

function formatPrice(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

function scrollToTabs() {
  const el = document.getElementById("colo-tabs");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ColocationPage() {
  return (
    <SiteLayout>
      <Hero />
      <Advantages />
      <Configurator />
      <Faq />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Colocation · Tier III
          </span>
          <h1>
            Размещение серверов <br />
            в надёжном ЦОД
            <br />
            <span className="hero-h1-small" style={{ color: "var(--color-orange)" }}>
              colocation
            </span>
          </h1>
          <p className="hero-subtitle">
            Разместите ваше оборудование в нашем собственном дата-центре уровня Tier III в
            Казахстане. Обеспечиваем бесперебойное питание, охлаждение и безопасность 24/7.
          </p>

          <ul className="hero-bullets">
            {[
              "Доступность 99,982% по SLA",
              "Бесперебойная работа оборудования (аптайм)",
              "Круглосуточная поддержка и мониторинг",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <div className="hero-dedicated-actions" style={{ marginTop: 24 }}>
            <button type="button" className="btn btn-primary" onClick={scrollToTabs}>
              Рассчитать стоимость
            </button>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              Получить консультацию
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img
              src={colocationHero}
              alt="Colocation — размещение оборудования в ЦОД"
              width={1024}
              height={1024}
            />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const items = [
    {
      Icon: ShieldCheck,
      h: "Отказоустойчивость Tier III",
      p: "Многоуровневая архитектура N+1, два независимых энерговвода, ИБП и дизель-генераторы с автозапуском.",
    },
    {
      Icon: Snowflake,
      h: "Изолированный холодный коридор",
      p: "24 серверных шкафа с автоматическим открытием потолка и прецизионным охлаждением (InRow по 35 кВт).",
    },
    {
      Icon: Flame,
      h: "Газовое пожаротушение",
      p: "Система FM200 (гептафторпропан). Мгновенно подавляет возгорание на молекулярном уровне, безопасна для оборудования.",
    },
    {
      Icon: Fingerprint,
      h: "Биометрический контроль",
      p: "7 уровней доступа (Face ID, RFID, отпечаток пальца) и круглосуточное видеонаблюдение с архивом 30 дней.",
    },
    {
      Icon: Thermometer,
      h: "Климат-контроль",
      p: "Адаптация к климату от −40 °C до +45 °C. Непрерывный мониторинг температуры и влажности.",
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Инфраструктура</span>
          <h2>
            Технологии и безопасность{" "}
            <span style={{ color: "var(--color-orange)" }}>Infinity B40 Cluster</span>
          </h2>
          <p>Собственный дата-центр уровня Tier III с резервированием по всем подсистемам.</p>
        </div>

        <div className="trust-grid trust-grid--5">
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

// ====== Calculator (tabs) ======
type ServerCfg = {
  extraUnits: number;
  extraPower100w: number; // шагов по 100 Вт
  extraEthPorts: number;
  extraIPs: number; // дополнительные IPv4 сверх 1 бесплатного
};

const newServer = (): ServerCfg => ({
  extraUnits: 0,
  extraPower100w: 0,
  extraEthPorts: 0,
  extraIPs: 0,
});

function calcServer(s: ServerCfg) {
  const base = PRICE_BASE_UNIT;
  const extraUnits = s.extraUnits * PRICE_EXTRA_UNIT;
  const power = s.extraPower100w * PRICE_POWER_100W;
  const eth = s.extraEthPorts * PRICE_ETH_PORT;
  const ips = s.extraIPs * PRICE_EXTRA_IP;
  return { base, extraUnits, power, eth, ips, total: base + extraUnits + power + eth + ips };
}

function Configurator() {
  const { openConsultationModalWith } = useCity();
  const barVisible = useMobileBarVisibility("colo-tabs");
  const [tab, setTab] = useState<"calc" | "list">("calc");
  const [servers, setServers] = useState<ServerCfg[]>([newServer()]);
  const [active, setActive] = useState(0);

  const addServer = () => {
    if (servers.length >= 3) return;
    setServers((s) => [...s, newServer()]);
    setActive(servers.length);
  };
  const removeServer = (i: number) => {
    if (servers.length <= 1) return;
    const next = servers.filter((_, idx) => idx !== i);
    setServers(next);
    setActive((a) => Math.max(0, Math.min(a, next.length - 1)));
  };
  const update = (i: number, patch: Partial<ServerCfg>) => {
    setServers((arr) => arr.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  };

  const totals = useMemo(() => servers.map(calcServer), [servers]);
  const grandTotal = totals.reduce((acc, t) => acc + t.total, 0);

  const cur = servers[active];
  const curCalc = totals[active];

  return (
    <section className="calc-section" id="colo-tabs">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Расчёт стоимости</span>
          <h2>Конфигуратор и тарифы Colocation</h2>
          <p>Канал до 100 Мбит/с и безлимитный трафик включены в стоимость по умолчанию.</p>
        </div>

        <div className="colo-tabs">
          <button
            type="button"
            className={`colo-tab${tab === "calc" ? " is-active" : ""}`}
            onClick={() => setTab("calc")}
          >
            Конфигуратор размещения
          </button>
          <button
            type="button"
            className={`colo-tab${tab === "list" ? " is-active" : ""}`}
            onClick={() => setTab("list")}
          >
            Тарифы списком
          </button>
        </div>

        {tab === "calc" && (
          <div className="colo-calc">
            <div className="colo-server-tabs">
              {servers.map((_, i) => (
                <div
                  key={i}
                  className={`colo-server-tab${active === i ? " is-active" : ""}`}
                >
                  <button
                    type="button"
                    className="colo-server-tab-btn"
                    onClick={() => setActive(i)}
                  >
                    <ServerIcon size={16} strokeWidth={1.8} />
                    Сервер {i + 1}
                  </button>
                  {servers.length > 1 && (
                    <button
                      type="button"
                      className="colo-server-tab-close"
                      onClick={() => removeServer(i)}
                      aria-label={`Удалить сервер ${i + 1}`}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {servers.length < 3 && (
                <button type="button" className="colo-add-server" onClick={addServer}>
                  <Plus size={16} /> Добавить ещё сервер
                </button>
              )}
            </div>

            <div className="calc-grid">
              <div className="calc-form">
                {/* Основной Unit — обязательный */}
                <div className="colo-row colo-row--locked">
                  <div className="colo-row-head">
                    <div className="colo-row-label">
                      Основной Unit{" "}
                      <span className="colo-row-required">обязательно</span>
                    </div>
                    <div className="colo-row-hint">
                      Размещение оборудования до 1 Unit, БП до 500 Вт и 1 розетка электропитания.
                    </div>
                  </div>
                  <div className="colo-row-control">
                    <label className="colo-checkbox">
                      <input type="checkbox" checked disabled readOnly />
                      <span>Включено</span>
                    </label>
                    <div className="colo-row-price">{formatPrice(PRICE_BASE_UNIT)} / мес</div>
                  </div>
                </div>

                <ColoCounterRow
                  label="Дополнительный Unit"
                  hint="Розетка электропитания не предоставляется"
                  hintTip="Нужен, если сервер по размеру больше 1 unit или нужно разместить коммутатор. Розетка электропитания не предоставляется."
                  unit="шт"
                  step={1}
                  min={0}
                  value={cur.extraUnits}
                  pricePerStep={PRICE_EXTRA_UNIT}
                  onChange={(v) => update(active, { extraUnits: v })}
                />

                <ColoCounterRow
                  label="Дополнительная мощность электропитания"
                  hint="Сверх базовых 500 Вт"
                  hintTip="Если мощность вашего блока питания превышает базовые 500 Вт."
                  unit="× 100 Вт"
                  step={1}
                  min={0}
                  value={cur.extraPower100w}
                  pricePerStep={PRICE_POWER_100W}
                  onChange={(v) => update(active, { extraPower100w: v })}
                />

                <ColoCounterRow
                  label="Дополнительный Ethernet-порт"
                  hint="Пропускная способность до 100 Mb/s."
                  unit="шт"
                  step={1}
                  min={0}
                  value={cur.extraEthPorts}
                  pricePerStep={PRICE_ETH_PORT}
                  onChange={(v) => update(active, { extraEthPorts: v })}
                />

                <ColoCounterRow
                  label="Дополнительный IPv4-адрес"
                  hint="Первый IPv4-адрес предоставляется бесплатно."
                  unit="шт"
                  step={1}
                  min={0}
                  value={cur.extraIPs}
                  pricePerStep={PRICE_EXTRA_IP}
                  baseLabel="1 шт включена"
                  onChange={(v) => update(active, { extraIPs: v })}
                />
              </div>

              <div className="calc-summary">
                <div className="summary-card">
                  <div className="summary-header">
                    Сервер {active + 1} — конфигурация
                  </div>
                  <div className="summary-body">
                    <SumLine title="Основной Unit" detail="до 1U, БП 500 Вт, 1 розетка" price={curCalc.base} />
                    <SumLine
                      title="Доп. Unit"
                      detail={cur.extraUnits ? `${cur.extraUnits} шт` : "—"}
                      price={curCalc.extraUnits}
                    />
                    <SumLine
                      title="Доп. мощность"
                      detail={cur.extraPower100w ? `+${cur.extraPower100w * 100} Вт` : "—"}
                      price={curCalc.power}
                    />
                    <SumLine
                      title="Доп. Ethernet"
                      detail={cur.extraEthPorts ? `${cur.extraEthPorts} шт` : "—"}
                      price={curCalc.eth}
                    />
                    <SumLine
                      title="Доп. IPv4"
                      detail={cur.extraIPs ? `${cur.extraIPs} шт сверх включённого` : "1 шт включена"}
                      price={curCalc.ips}
                    />
                  </div>
                  <div className="summary-footer">
                    {servers.length > 1 && (
                      <div className="summary-servers-breakdown">
                        {totals.map((t, i) => (
                          <div className="summary-subrow" key={i}>
                            <span>Сервер {i + 1}</span>
                            <strong>{formatPrice(t.total)} / мес</strong>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="summary-total-row">
                      <span className="summary-total-label">
                        Итого ({servers.length} серв.)
                      </span>
                      <span className="summary-total-amount">{formatPrice(grandTotal)}</span>
                    </div>
                    <p className="summary-vat">Цены указаны без учёта НДС</p>
                    <button
                      type="button"
                      className="btn btn-primary calc-order-btn"
                      onClick={() =>
                        openConsultationModalWith({
                          subject: `Заказ Colocation: ${servers.length} серв., итого ${formatPrice(grandTotal)}/мес`,
                        })
                      }
                    >
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mobile-calc-bar${barVisible ? " is-visible" : ""}`}>
              <div className="mobile-bar-main">
                <div className="mobile-bar-left">
                  <div className="mobile-bar-label">
                    Итого за {servers.length} серв., 1 мес
                  </div>
                  <div className="mobile-bar-price">{formatPrice(grandTotal)}</div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary calc-order-btn"
                  onClick={() =>
                    openConsultationModalWith({
                      subject: `Заказ Colocation: ${servers.length} серв., итого ${formatPrice(grandTotal)}/мес`,
                    })
                  }
                >
                  Заказать
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "list" && <PriceList />}
      </div>
    </section>
  );
}

function ColoCounterRow({
  label,
  hint,
  unit,
  step,
  min,
  value,
  pricePerStep,
  baseLabel,
  onChange,
}: {
  label: string;
  hint: string;
  unit: string;
  step: number;
  min: number;
  value: number;
  pricePerStep: number;
  baseLabel?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="vps-resource">
      <div className="vps-resource-head">
        <div className="vps-resource-text">
          <div className="vps-resource-label">{label}</div>
          <div className="vps-resource-hint">
            {pricePerStep.toLocaleString("ru-RU")} ₸ / шаг · {hint}
          </div>
        </div>
      </div>
      <div className="vps-resource-control">
        <button
          type="button"
          className="calc-counter-btn"
          onClick={() => onChange(Math.max(min, value - step))}
        >
          −
        </button>
        <div className="vps-resource-value">
          <span className="vps-resource-num">{value}</span>
          <span className="vps-resource-unit">{unit}</span>
        </div>
        <button
          type="button"
          className="calc-counter-btn"
          onClick={() => onChange(value + step)}
        >
          +
        </button>
      </div>
      {baseLabel && value === 0 && <div className="vps-resource-flash">{baseLabel} — бесплатно</div>}
    </div>
  );
}

function SumLine({ title, detail, price }: { title: string; detail: string; price: number }) {
  return (
    <div className="summary-category">
      <div className="sum-row">
        <span className="sum-label">{title}</span>
        <span className={`sum-value${price === 0 ? " muted" : ""}`}>
          {price === 0 ? "—" : formatPrice(price)}
        </span>
      </div>
      <div className="sum-detail">{detail}</div>
    </div>
  );
}

const priceListItems: { label: string; price: string }[] = [
  { label: "Установка сервера в дата-центр", price: "Бесплатно" },
  {
    label:
      "Размещение 19″ оборудования (до 1 Unit, БП до 500 Вт, 1 розетка) — абонентская плата за месяц",
    price: "28 500 ₸",
  },
  {
    label: "Размещение дополнительного 19″ оборудования, за 1 Unit (без розетки)",
    price: "15 000 ₸",
  },
  { label: "Дополнительный Ethernet-порт коммутатора (100 Mb/s)", price: "2 500 ₸" },
  { label: "Розетка электропитания для БП до 500 Вт", price: "Бесплатно" },
  { label: "Превышение потребляемой мощности — за каждые 100 Вт", price: "2 000 ₸" },
  { label: "Аренда доп. розетки для резервного (redundant) БП до 500 Вт", price: "2 000 ₸" },
  { label: "Аренда IPv4-адреса (1 шт)", price: "Бесплатно" },
  { label: "Аренда дополнительного IPv4-адреса", price: "2 250 ₸ / шт" },
];

function PriceList() {
  return (
    <div className="colo-pricelist">
      {priceListItems.map((item) => (
        <div className="colo-pricelist-row" key={item.label}>
          <span className="colo-pricelist-label">{item.label}</span>
          <span className="colo-pricelist-price">{item.price}</span>
        </div>
      ))}
      <p className="colo-pricelist-note">Цены указаны за месяц, без учёта НДС.</p>
    </div>
  );
}

const faqItems = [
  {
    q: "Включён ли интернет-канал в базовую стоимость?",
    a: "Да, в базовую стоимость (28 500 ₸) уже включён выделенный Ethernet-канал до 100 Мбит/с с безлимитным трафиком, а также один статический IPv4-адрес.",
  },
  {
    q: "Что делать, если моему серверу нужно больше 500 Вт питания?",
    a: "Вы можете докупить необходимую мощность. Каждые дополнительные 100 Вт сверх базовых 500 Вт стоят 2 000 ₸/мес. Укажите это в конфигураторе при расчёте.",
  },
  {
    q: "Как обеспечивается физическая безопасность оборудования?",
    a: "Доступ в ЦОД строго регламентирован. Мы используем 7 уровней контроля доступа, включая Face ID, RFID-карты и биометрию по отпечатку пальца. Ведётся круглосуточное видеонаблюдение (HD-камеры) с хранением архива до 30 дней.",
  },
  {
    q: "Могу ли я арендовать целый шкаф?",
    a: "Да, для масштабных проектов у нас предусмотрена услуга Full Rack Colocation (аренда стойки целиком на 42 Unit). Для неё действуют индивидуальные тарифы — оставьте заявку для расчёта.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sks-faq-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">FAQ</span>
          <h2>Частые вопросы</h2>
        </div>

        <div className="sks-faq-list">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`sks-faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="sks-faq-question"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown className="sks-faq-chevron" size={20} />
                </button>
                {isOpen && <div className="sks-faq-answer">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [consent, setConsent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    alert("Заявка отправлена! Менеджер свяжется с вами в течение 15 минут.");
  };
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">Заявка</span>
          <h2>Оставьте заявку на размещение оборудования</h2>
        </div>

        <div className="contact-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="colo-company">Название компании</label>
              <input type="text" id="colo-company" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="colo-name">ФИО</label>
              <input type="text" id="colo-name" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="colo-phone">Телефон</label>
              <input
                type="tel"
                id="colo-phone"
                className="form-control"
                placeholder="+7 7__ ___ __ __"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="colo-message">Сообщение</label>
              <textarea id="colo-message" className="form-control" rows={4} />
            </div>

            <ConsentCheckbox id="colo-consent" checked={consent} onChange={setConsent} />

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", fontSize: "1.1rem" }}
              disabled={!consent}
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
