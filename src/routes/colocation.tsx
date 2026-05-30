import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CalculatorDisclaimer } from "@/components/nls/CalculatorDisclaimer";
import { EnterpriseDataCenterBlocks } from "@/components/nls/EnterpriseBlocks";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon } from "@/components/nls/Icons";
import { useMobileBarVisibility } from "@/hooks/use-mobile-bar";
import colocationHero from "@/assets/colocation.png";
import { useEffect, useMemo, useRef, useState } from "react";
import { LeadForm } from "@/components/forms/LeadForm";
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
          "Размещение оборудования в собственном дата-центре уровня Tier III в Казахстане. Бесперебойное питание, охлаждение и безопасность 24/7. Серверлерді дата-орталығында орналастыру.",
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

const PRICE_BASE_UNIT = 28500;
const PRICE_EXTRA_UNIT = 15000;
const PRICE_POWER_100W = 2000;
const PRICE_EXTRA_SOCKET = 2000;
const PRICE_ETH_PORT = 2500;
const PRICE_EXTRA_IP = 2250;

function formatPrice(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

function scrollToTabs() {
  const el = document.getElementById("colo-tabs");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ColocationPage() {
  return (
    <SiteLayout>
      <Hero />
      <Advantages />
      <EnterpriseDataCenterBlocks />
      <Configurator />
      <Faq />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  const t = useT();
  const bullets = [
    t("Доступность 99,982% по SLA", "SLA бойынша 99,982% қолжетімділік"),
    t("Бесперебойная работа оборудования (аптайм)", "Жабдықтың үздіксіз жұмысы (аптайм)"),
    t("Круглосуточная поддержка и мониторинг", "Тәулік бойы қолдау және мониторинг"),
  ];
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Colocation · Tier III
          </span>
          <h1>
            {t("Размещение серверов", "Серверлерді")} <br />
            {t("в надёжном ЦОД", "сенімді дата-орталығында орналастыру")}
          </h1>
          <p className="hero-subtitle">
            {t(
              "Разместите ваше оборудование в нашем собственном дата-центре уровня Tier III в Казахстане. Обеспечиваем бесперебойное питание, охлаждение и безопасность 24/7.",
              "Жабдықтарыңызды Қазақстандағы Tier III деңгейлі меншікті дата-орталығымызда орналастырыңыз. Үздіксіз қуат көзін, салқындатуды және 24/7 қауіпсіздікті қамтамасыз етеміз."
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
            <button type="button" className="btn btn-primary" onClick={scrollToTabs}>
              {t("Рассчитать стоимость", "Құнын есептеу")}
            </button>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              {t("Получить консультацию", "Кеңес алу")}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img
              src={colocationHero}
              alt={t("Colocation — размещение оборудования в ЦОД", "Colocation — жабдықты дата-орталығында орналастыру")}
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
  const t = useT();
  const items = [
    {
      Icon: ShieldCheck,
      h: t("Отказоустойчивость Tier III", "Tier III бас тартуға төзімділік"),
      p: t(
        "Многоуровневая архитектура N+1, два независимых энерговвода, ИБП и дизель-генераторы с автозапуском.",
        "N+1 көп деңгейлі архитектурасы, екі тәуелсіз энергия енгізілімі, ҮҚК және автоқосылатын дизельді генераторлар."
      ),
    },
    {
      Icon: Snowflake,
      h: t("Изолированный холодный коридор", "Оқшауланған суық дәліз"),
      p: t(
        "24 серверных шкафа с автоматическим открытием потолка и прецизионным охлаждением (InRow по 35 кВт).",
        "Төбенің автоматты ашылуы және прецизионды салқындатумен 24 серверлік шкаф (InRow 35 кВт)."
      ),
    },
    {
      Icon: Flame,
      h: t("Газовое пожаротушение", "Газды өрт сөндіру"),
      p: t(
        "Система FM200 (гептафторпропан). Мгновенно подавляет возгорание на молекулярном уровне, безопасна для оборудования.",
        "FM200 жүйесі (гептафторпропан). Молекулалық деңгейде өртті лезде басады, жабдық үшін қауіпсіз."
      ),
    },
    {
      Icon: Fingerprint,
      h: t("Биометрический контроль", "Биометриялық бақылау"),
      p: t(
        "7 уровней доступа (Face ID, RFID, отпечаток пальца) и круглосуточное видеонаблюдение с архивом 30 дней.",
        "7 деңгейлі қолжетімділік (Face ID, RFID, саусақ ізі) және 30 күндік мұрағатпен тәулік бойы видеобақылау."
      ),
    },
    {
      Icon: Thermometer,
      h: t("Климат-контроль", "Климат-бақылау"),
      p: t(
        "Адаптация к климату от −40 °C до +45 °C. Непрерывный мониторинг температуры и влажности.",
        "−40 °C-тан +45 °C-қа дейінгі климатқа бейімделу. Температура мен ылғалдылықты үздіксіз мониторингтеу."
      ),
    },
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Инфраструктура", "Инфрақұрылым")}</span>
          <h2>{t("Технологии и безопасность", "Технологиялар және қауіпсіздік")}</h2>
          <p>{t("Собственный дата-центр уровня Tier III с резервированием по всем подсистемам.", "Барлық ішкі жүйелер бойынша резервтелген Tier III деңгейлі меншікті дата-орталық.")}</p>
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
  extraPower100w: number;
  extraSockets: number;
  extraEthPorts: number;
  extraIPs: number;
};

const newServer = (): ServerCfg => ({
  extraUnits: 0,
  extraPower100w: 0,
  extraSockets: 0,
  extraEthPorts: 0,
  extraIPs: 0,
});

function calcServer(s: ServerCfg) {
  const base = PRICE_BASE_UNIT;
  const extraUnits = s.extraUnits * PRICE_EXTRA_UNIT;
  const power = s.extraPower100w * PRICE_POWER_100W;
  const sockets = s.extraSockets * PRICE_EXTRA_SOCKET;
  const eth = s.extraEthPorts * PRICE_ETH_PORT;
  const ips = s.extraIPs * PRICE_EXTRA_IP;
  return {
    base,
    extraUnits,
    power,
    sockets,
    eth,
    ips,
    total: base + extraUnits + power + sockets + eth + ips,
  };
}

function Configurator() {
  const { openConsultationModalWith } = useCity();
  const t = useT();
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
  const grandTotal = totals.reduce((acc, tot) => acc + tot.total, 0);

  const cur = servers[active];
  const curCalc = totals[active];

  return (
    <section className="calc-section" id="colo-tabs">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{t("Расчёт стоимости", "Құнын есептеу")}</span>
          <h2>{t("Конфигуратор и тарифы Colocation", "Colocation конфигураторы және тарифтері")}</h2>
          <p>{t("Канал до 100 Мбит/с и безлимитный трафик включены в стоимость по умолчанию.", "100 Мбит/с дейінгі арна және шектеусіз трафик әдепкі бойынша құнға кіреді.")}</p>
        </div>

        <div className="colo-tabs">
          <button
            type="button"
            className={`colo-tab${tab === "calc" ? " is-active" : ""}`}
            onClick={() => setTab("calc")}
          >
            {t("Конфигуратор размещения", "Орналастыру конфигураторы")}
          </button>
          <button
            type="button"
            className={`colo-tab${tab === "list" ? " is-active" : ""}`}
            onClick={() => setTab("list")}
          >
            {t("Тарифы списком", "Тарифтер тізімі")}
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
                    {t("Сервер", "Сервер")} {i + 1}
                  </button>
                  {servers.length > 1 && (
                    <button
                      type="button"
                      className="colo-server-tab-close"
                      onClick={() => removeServer(i)}
                      aria-label={t(`Удалить сервер ${i + 1}`, `${i + 1} серверді жою`)}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {servers.length < 3 && (
                <button type="button" className="colo-add-server" onClick={addServer}>
                  <Plus size={16} /> {t("Добавить ещё сервер", "Тағы сервер қосу")}
                </button>
              )}
            </div>

            <div className="calc-grid">
              <div className="calc-form">
                <div className="colo-row colo-row--locked">
                  <div className="colo-row-head">
                    <div className="colo-row-label">
                      {t("Основной Unit", "Негізгі Unit")}{" "}
                      <span className="colo-row-required">{t("обязательно", "міндетті")}</span>
                    </div>
                    <div className="colo-row-hint">
                      {t(
                        "Размещение оборудования до 1 Unit, БП до 500 Вт и 1 розетка электропитания.",
                        "1 Unit дейінгі жабдықты, 500 Вт дейінгі ҚК және 1 электр розеткасын орналастыру."
                      )}
                    </div>
                  </div>
                  <div className="colo-row-control">
                    <label className="colo-checkbox">
                      <input type="checkbox" checked disabled readOnly />
                      <span>{t("Включено", "Қосылған")}</span>
                    </label>
                    <div className="colo-row-price">{formatPrice(PRICE_BASE_UNIT)} / {t("мес", "ай")}</div>
                  </div>
                </div>

                <ColoCounterRow
                  label={t("Дополнительный Unit", "Қосымша Unit")}
                  hint={t("Розетка электропитания не предоставляется", "Электр розеткасы берілмейді")}
                  hintTip={t(
                    "Нужен, если сервер по размеру больше 1 unit или нужно разместить коммутатор. Розетка электропитания не предоставляется.",
                    "Сервер 1 unit-тен үлкен болса немесе коммутаторды орналастыру қажет болғанда керек. Электр розеткасы берілмейді."
                  )}
                  unit={t("шт", "дана")}
                  step={1}
                  min={0}
                  value={cur.extraUnits}
                  pricePerStep={PRICE_EXTRA_UNIT}
                  onChange={(v) => update(active, { extraUnits: v })}
                />

                <ColoCounterRow
                  label={t("Дополнительная мощность электропитания", "Қосымша электр қуаты")}
                  hint={t("Сверх базовых 500 Вт", "Базалық 500 Вт-тан жоғары")}
                  hintTip={t(
                    "Если мощность вашего блока питания превышает базовые 500 Вт.",
                    "Сіздің блок қуатыңыз базалық 500 Вт-тан асатын болса."
                  )}
                  unit={t("× 100 Вт", "× 100 Вт")}
                  step={1}
                  min={0}
                  value={cur.extraPower100w}
                  pricePerStep={PRICE_POWER_100W}
                  onChange={(v) => update(active, { extraPower100w: v })}
                />

                <ColoCounterRow
                  label={t("Дополнительная розетка", "Қосымша розетка")}
                  hint={t("Не более 500 Вт", "500 Вт-тан көп емес")}
                  hintTip={t(
                    "Аренда дополнительной резервной розетки сети электропитания для резервного (redundant) блока питания мощностью не более 500 Вт.",
                    "500 Вт-тан көп емес қуаттылықтағы резервтік (redundant) блок қуат үшін қосымша электр розеткасын жалдау."
                  )}
                  unit={t("шт", "дана")}
                  step={1}
                  min={0}
                  value={cur.extraSockets}
                  pricePerStep={PRICE_EXTRA_SOCKET}
                  onChange={(v) => update(active, { extraSockets: v })}
                />

                <ColoCounterRow
                  label={t("Дополнительный Ethernet-порт", "Қосымша Ethernet-порт")}
                  hint={t("Пропускная способность до 100 Mb/s.", "100 Mb/s дейінгі өткізу қабілеті.")}
                  unit={t("шт", "дана")}
                  step={1}
                  min={0}
                  value={cur.extraEthPorts}
                  pricePerStep={PRICE_ETH_PORT}
                  onChange={(v) => update(active, { extraEthPorts: v })}
                />

                <ColoCounterRow
                  label={t("Дополнительный IPv4-адрес", "Қосымша IPv4-мекенжай")}
                  hint={t("Первый IPv4-адрес предоставляется бесплатно.", "Бірінші IPv4-мекенжай тегін беріледі.")}
                  unit={t("шт", "дана")}
                  step={1}
                  min={0}
                  value={cur.extraIPs}
                  pricePerStep={PRICE_EXTRA_IP}
                  baseLabel={t("1 шт включена", "1 дана қосылған")}
                  onChange={(v) => update(active, { extraIPs: v })}
                />
              </div>

              <div className="calc-summary">
                <div className="summary-card">
                  <div className="summary-header">
                    {t("Сервер", "Сервер")} {active + 1} — {t("конфигурация", "конфигурация")}
                  </div>
                  <div className="summary-body">
                    <SumLine title={t("Основной Unit", "Негізгі Unit")} detail={t("до 1U, ҚК 500 Вт, 1 розетка", "1U дейін, ҚК 500 Вт, 1 розетка")} price={curCalc.base} />
                    <SumLine
                      title={t("Доп. Unit", "Қос. Unit")}
                      detail={cur.extraUnits ? `${cur.extraUnits} ${t("шт", "дана")}` : "—"}
                      price={curCalc.extraUnits}
                    />
                    <SumLine
                      title={t("Доп. мощность", "Қос. қуат")}
                      detail={cur.extraPower100w ? `+${cur.extraPower100w * 100} Вт` : "—"}
                      price={curCalc.power}
                    />
                    <SumLine
                      title={t("Доп. розетка", "Қос. розетка")}
                      detail={cur.extraSockets ? `${cur.extraSockets} ${t("шт", "дана")}` : "—"}
                      price={curCalc.sockets}
                    />
                    <SumLine
                      title={t("Доп. Ethernet", "Қос. Ethernet")}
                      detail={cur.extraEthPorts ? `${cur.extraEthPorts} ${t("шт", "дана")}` : "—"}
                      price={curCalc.eth}
                    />
                    <SumLine
                      title={t("Доп. IPv4", "Қос. IPv4")}
                      detail={cur.extraIPs ? t(`${cur.extraIPs} шт сверх включённого`, `Қосылғаннан тыс ${cur.extraIPs} дана`) : t("1 шт включена", "1 дана қосылған")}
                      price={curCalc.ips}
                    />
                  </div>
                  <div className="summary-footer">
                    {servers.length > 1 && (
                      <div className="summary-servers-breakdown">
                        {totals.map((tot, i) => (
                          <div className="summary-subrow" key={i}>
                            <span>{t("Сервер", "Сервер")} {i + 1}</span>
                            <strong>{formatPrice(tot.total)} / {t("мес", "ай")}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="summary-total-row">
                      <span className="summary-total-label">
                        {t(`Итого (${servers.length} серв.)`, `Барлығы (${servers.length} серв.)`)}
                      </span>
                      <span className="summary-total-amount">{formatPrice(grandTotal)}</span>
                    </div>
                    <p className="summary-vat">{t("Цены указаны без учёта НДС", "Бағалар ҚҚС-сыз көрсетілген")}</p>
                    <button
                      type="button"
                      className="btn btn-primary calc-order-btn"
                      onClick={() =>
                        openConsultationModalWith({
                          subject: `Заказ Colocation: ${servers.length} серв., итого ${formatPrice(grandTotal)}/мес`,
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
                  <div className="mobile-bar-label">
                    {t(`Итого за ${servers.length} серв., 1 мес`, `${servers.length} серв. үшін барлығы, 1 ай`)}
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
                  {t("Заказать", "Тапсырыс беру")}
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

function HintTip({ text }: { text: string }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <button
      ref={ref}
      type="button"
      className={`calc-hint-tip${open ? " is-open" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen((v) => !v);
      }}
      aria-label={t("Подробнее", "Толығырақ")}
    >
      <HelpCircle size={12} strokeWidth={2.2} />
      <span className="calc-hint-bubble" role="tooltip">
        {text}
      </span>
    </button>
  );
}

function ColoCounterRow({
  label,
  hint,
  hintTip,
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
  hintTip?: string;
  unit: string;
  step: number;
  min: number;
  value: number;
  pricePerStep: number;
  baseLabel?: string;
  onChange: (v: number) => void;
}) {
  const t = useT();
  return (
    <div className="vps-resource">
      <div className="vps-resource-head">
        <div className="vps-resource-text">
          <div className="vps-resource-label">
            {label}
            {hintTip && <HintTip text={hintTip} />}
          </div>
          <div className="vps-resource-hint">
            {pricePerStep.toLocaleString("ru-RU")} ₸ / {t("шаг", "қадам")} · {hint}
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
      {baseLabel && value === 0 && <div className="vps-resource-flash">{baseLabel} — {t("бесплатно", "тегін")}</div>}
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

function PriceList() {
  const t = useT();
  const priceListItems: { label: string; price: string }[] = [
    { label: t("Установка сервера в дата-центр", "Серверді дата-орталыққа орнату"), price: t("Бесплатно", "Тегін") },
    {
      label: t(
        "Размещение 19″ оборудования (до 1 Unit, БП до 500 Вт, 1 розетка) — абонентская плата за месяц",
        "19″ жабдықты орналастыру (1 Unit дейін, 500 Вт дейін ҚК, 1 розетка) — айлық абоненттік төлем"
      ),
      price: "28 500 ₸",
    },
    {
      label: t(
        "Размещение дополнительного 19″ оборудования, за 1 Unit (без розетки)",
        "Қосымша 19″ жабдықты орналастыру, 1 Unit үшін (розеткасыз)"
      ),
      price: "15 000 ₸",
    },
    { label: t("Дополнительный Ethernet-порт коммутатора (100 Mb/s)", "Қосымша коммутатор Ethernet-порты (100 Mb/s)"), price: "2 500 ₸" },
    { label: t("Розетка электропитания для ҚК до 500 Вт", "500 Вт дейінгі ҚК-ға электр розеткасы"), price: t("Бесплатно", "Тегін") },
    { label: t("Превышение потребляемой мощности — за каждые 100 Вт", "Тұтынылатын қуаттың асып кетуі — әр 100 Вт үшін"), price: "2 000 ₸" },
    { label: t("Аренда доп. розетки для резервного (redundant) ҚК до 500 Вт", "500 Вт дейінгі резервтік (redundant) ҚК-ға қос. розетка жалдау"), price: "2 000 ₸" },
    { label: t("Аренда IPv4-адреса (1 шт)", "IPv4-мекенжай жалдау (1 дана)"), price: t("Бесплатно", "Тегін") },
    { label: t("Аренда дополнительного IPv4-адреса", "Қосымша IPv4-мекенжай жалдау"), price: t("2 250 ₸ / шт", "2 250 ₸ / дана") },
  ];
  return (
    <div className="colo-pricelist">
      {priceListItems.map((item) => (
        <div className="colo-pricelist-row" key={item.label}>
          <span className="colo-pricelist-label">{item.label}</span>
          <span className="colo-pricelist-price">{item.price}</span>
        </div>
      ))}
      <p className="colo-pricelist-note">{t("Цены указаны за месяц, без учёта НДС.", "Бағалар айына, ҚҚС-сыз көрсетілген.")}</p>
    </div>
  );
}

function Faq() {
  const t = useT();
  const faqItems = [
    {
      q: t("Включён ли интернет-канал в базовую стоимость?", "Интернет-арна базалық құнға кіреді ме?"),
      a: t(
        "Да, в базовую стоимость (28 500 ₸) уже включён выделенный Ethernet-канал до 100 Мбит/с с безлимитным трафиком, а также один статический IPv4-адрес.",
        "Иә, базалық құнға (28 500 ₸) 100 Мбит/с дейінгі бөлінген Ethernet-арна шектеусіз трафикпен, сондай-ақ бір статикалық IPv4-мекенжай кіреді."
      ),
    },
    {
      q: t("Что делать, если моему серверу нужно больше 500 Вт питания?", "Серверіме 500 Вт-тан көп қуат қажет болса не істеуім керек?"),
      a: t(
        "Вы можете докупить необходимую мощность. Каждые дополнительные 100 Вт сверх базовых 500 Вт стоят 2 000 ₸/мес. Укажите это в конфигураторе при расчёте.",
        "Қажетті қуатты қосымша сатып ала аласыз. Базалық 500 Вт-тан тыс әрбір қосымша 100 Вт 2 000 ₸/ай тұрады. Есептеу кезінде мұны конфигураторда көрсетіңіз."
      ),
    },
    {
      q: t("Как обеспечивается физическая безопасность оборудования?", "Жабдықтың физикалық қауіпсіздігі қалай қамтамасыз етіледі?"),
      a: t(
        "Доступ в ЦОД строго регламентирован. Мы используем 7 уровней контроля доступа, включая Face ID, RFID-карты и биометрию по отпечатку пальца. Ведётся круглосуточное видеонаблюдение (HD-камеры) с хранением архива до 30 дней.",
        "Дата-орталығына кіру қатаң реттелген. Біз Face ID, RFID-карта және саусақ ізі бойынша биометрияны қоса алғанда, 7 деңгейлі қолжетімділік бақылауын қолданамыз. 30 күнге дейін мұрағатты сақтаумен тәулік бойы видеобақылау (HD-камералар) жүргізіледі."
      ),
    },
    {
      q: t("Могу ли я арендовать целый шкаф?", "Шкафты толығымен жалдай аламын ба?"),
      a: t(
        "Да, для масштабных проектов у нас предусмотрена услуга Full Rack Colocation (аренда стойки целиком на 42 Unit). Для неё действуют индивидуальные тарифы — оставьте заявку для расчёта.",
        "Иә, ауқымды жобалар үшін бізде Full Rack Colocation қызметі бар (42 Unit-ке тіректерді толығымен жалдау). Оған жеке тарифтер қолданылады — есептеу үшін өтінім қалдырыңыз."
      ),
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sks-faq-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">FAQ</span>
          <h2>{t("Частые вопросы", "Жиі қойылатын сұрақтар")}</h2>
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
  const t = useT();
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">{t("Заявка", "Өтінім")}</span>
          <h2>{t("Оставьте заявку на размещение оборудования", "Жабдықты орналастыру үшін өтінім қалдырыңыз")}</h2>
        </div>

        <div className="contact-form">
          <LeadForm
            formName="Colocation — заявка на размещение"
            action="colocation_cta"
            idPrefix="colo"
            companyLabel={t("Название компании", "Компания атауы")}
            messageLabel={t("Сообщение", "Хабарлама")}
          />
        </div>
      </div>
    </section>
  );
}
