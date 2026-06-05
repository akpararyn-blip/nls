import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CalculatorDisclaimer } from "@/components/nls/CalculatorDisclaimer";
import { DedicatedPlans } from "@/components/nls/DedicatedPlans";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon, ChevronUpIcon, CloseIcon, ServerIcon } from "@/components/nls/Icons";
import { useMobileBarVisibility } from "@/hooks/use-mobile-bar";
import dedicatedHero from "@/assets/server-dedicated.png";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/dedicated")({
  head: () => ({
    meta: [
      { title: "Аренда Dedicated сервера — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Аренда выделенных серверов в дата-центре NLS. Конфигуратор: CPU, RAM, накопители, сеть, ПО. Серверы в Алматы и Астане. NLS дата-орталығында бөлінген серверлерді жалдау.",
      },
      { property: "og:title", content: "Аренда Dedicated сервера — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Готовые сервера с настраиваемой конфигурацией под ваши требования. Дата-центры NLS в Алматы и Астане.",
      },
    ],
  }),
  component: DedicatedPage,
});

type Option = { name: string; price: number; formFactor?: number; diskNumber?: number };

const cpuOptions: Option[] = [
  { name: "2 x Intel® Xeon® E5-2643 v3, 3.4/3.7 ГГц, (всего 12C/6T)", price: 90000, formFactor: 2.5, diskNumber: 10 },
  { name: "2 x Intel® Xeon® E5-2667 v4, 3.2/3.6 ГГц, (всего 16C/32T)", price: 100000, formFactor: 2.5, diskNumber: 10 },
  { name: "2 x Intel® Xeon® E5-2680 v4, 2.4/3.3 ГГц, SFF (всего 28C/56T)", price: 130000, formFactor: 2.5, diskNumber: 8 },
  { name: "2 x Intel® Xeon® E5-2680 v4, 2.4/3.3 ГГц, LFF (всего 28C/56T)", price: 130000, formFactor: 3.5, diskNumber: 4 },
  { name: "2 x Intel® Xeon® E5-2680 v4, 2.4/3.3 ГГц, LFF (всего 28C/56T)", price: 130000, formFactor: 3.5, diskNumber: 12 },
  { name: "2 x Intel® Xeon® E5-2690 v3, 2.6/3.5 ГГц, (всего 24C/48T)", price: 130000, formFactor: 2.5, diskNumber: 8 },
  { name: "2 x Intel® Xeon® Gold 6128, 3.4/3.7 ГГц, (всего 12C/24T)", price: 13000, formFactor: 3.5, diskNumber: 4 },
  { name: "2 x Intel® Xeon® Gold 6130, 2.1/3.7 ГГц, (всего 32C/64T)", price: 130000, formFactor: 3.5, diskNumber: 12 },
  { name: "2 x Intel® Xeon® Gold 6132, 2.6/3.7 ГГц, (всего 28C/56T)", price: 200000, formFactor: 2.5, diskNumber: 8 },
  { name: "2 x Intel® Xeon® Gold 6140, 2.3/3.7 ГГц, (всего 36C/72T)", price: 140000, formFactor: 2.5, diskNumber: 8 },
  { name: "2 x Intel® Xeon® Gold 6148, 2.4/3.7 ГГц, (всего 40C/80T)", price: 382000, formFactor: 2.5, diskNumber: 8 },
  { name: "2 x Intel® Xeon® Platinum 8168, 2.7/3.7 ГГц, (всего 48C/96T)", price: 645000, formFactor: 2.5, diskNumber: 16 },
];

const ramOptions: Option[] = [
  { name: "16 ГБ DDR4", price: 10800 },
  { name: "32 ГБ DDR4", price: 14400 },
  { name: "64 ГБ DDR4", price: 24000 },
  { name: "96 ГБ DDR4", price: 35000 },
  { name: "128 ГБ DDR4", price: 43000 },
  { name: "256 ГБ DDR4", price: 81000 },
  { name: "384 ГБ DDR4", price: 86400 },
  { name: "512 ГБ DDR4", price: 157000 },
  { name: "768 ГБ DDR4", price: 230000 },
];

const storageOptions: Option[] = [
  { name: "480 GB SSD", price: 8200, formFactor: 2.5 },
  { name: "960 GB SSD", price: 20000, formFactor: 2.5 },
  { name: "1,9 TB SSD", price: 38000, formFactor: 2.5 },
  { name: "3,84 TB SSD", price: 57600, formFactor: 2.5 },
  { name: "7,68 TB SSD", price: 85000, formFactor: 2.5 },
  { name: "1 TB HDD", price: 6000, formFactor: 3.5 },
  { name: "2 TB HDD", price: 11500, formFactor: 3.5 },
  { name: "4 TB HDD", price: 14500, formFactor: 3.5 },
  { name: "8 TB HDD", price: 23500, formFactor: 3.5 },
  { name: "10 TB HDD", price: 30500, formFactor: 3.5 },
  { name: "16 TB HDD", price: 47500, formFactor: 3.5 },
];

const networkOptions: Option[] = [
  { name: "100 Mbit/s", price: 0 },
  { name: "1 Gbit/s", price: 1000 },
  { name: "10 Gbit/s", price: 30000 },
];

const softwareOptions: Option[] = [
  { name: "1C", price: 22000 },
  { name: "Proxmox", price: 22000 },
  { name: "SQL", price: 22000 },
];

const RAID_PRICE = 9000;
const IPMI_PRICE = 0;
const IP_PRICE = 2250;

// === Переключатели скидок ===
// true  → скидки 3% / 6% отображаются
// false → скидки скрыты (цена считается без скидки, шильдики не показываются)
const PLANS_DISCOUNT_ENABLED = true;
const CALC_DISCOUNT_ENABLED = true;

type Period = 1 | 6 | 12;
const CALC_DISCOUNT: Record<Period, number> = { 1: 0, 6: 0.03, 12: 0.06 };


function formatPrice(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

interface DynamicRow {
  id: number;
  index: number | null;
}

function useDynamic(initial: Array<number | null> = []) {
  const [rows, setRows] = useState<DynamicRow[]>(
    initial.map((index, i) => ({ id: i + 1, index })),
  );
  const [counter, setCounter] = useState(initial.length);

  const add = () => {
    const id = counter + 1;
    setCounter(id);
    setRows((r) => [...r, { id, index: null }]);
  };
  const update = (id: number, index: number | null) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, index } : row)));
  const remove = (id: number) => setRows((r) => r.filter((row) => row.id !== id));

  return { rows, add, update, remove };
}


function scrollToCalculator() {
  const el = document.getElementById("calculator");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function DedicatedPage() {
  return (
    <SiteLayout>
      <Hero />
      <DedicatedPlans />
      <CustomBuildCTA />
      <Calculator />
      <AfterCalcCTA />
    </SiteLayout>
  );
}

function AfterCalcCTA() {
  const { openConsultationModal } = useCity();
  const t = useT();
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">{t("Нужна помощь", "Көмек керек")}</span>
          <h2>{t("Подберём конфигурацию под вашу задачу", "Тапсырмаңызға сай конфигурацияны таңдаймыз")}</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 720, margin: "0 auto" }}>
            {t(
              "Расскажите о проекте — наши инженеры подберут оптимальный сервер и подготовят индивидуальное предложение в течение 30 минут.",
              "Жоба туралы айтып беріңіз — инженерлеріміз оңтайлы серверді таңдап, 30 минут ішінде жеке ұсыныс дайындайды."
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
  const { openConsultationModal } = useCity();
  const t = useT();
  const features = [
    t("С каналом до 100 Мбит/с", "100 Мбит/с дейін арнамен"),
    t("Собственный ЦОД Tier III", "Меншікті Tier III дата-орталығы"),
    t("Размещены в Алматы и в Астане", "Алматы және Астанада орналасқан"),
    t("Поддержка 24/7", "24/7 қолдау"),
  ];
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Dedicated Servers
          </span>
          <h1>
            <span >{t("Аренда высокопроизводительных физических серверов", "Жоғары өнімді физикалық серверлерді жалдау")}</span>{" "}
            {t("в дата-центре NLS", "NLS дата-орталығында")}
          </h1>
          <p className="hero-subtitle">
            {t(
              "Готовые сервера с настраиваемой конфигурацией под ваши требования.",
              "Талаптарыңызға сай реттелетін конфигурациямен дайын серверлер."
            )}
          </p>


          <ul className="hero-bullets">
            {features.map((f) => (
              <li key={f}>
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>

          <div className="hero-dedicated-actions" style={{ marginTop: 24 }}>
            <button type="button" className="btn btn-primary" onClick={scrollToCalculator}>
              {t("Собрать сервер", "Серверді құрастыру")}
            </button>
            <button type="button" className="btn btn-outline" onClick={openConsultationModal}>
              {t("Получить консультацию", "Кеңес алу")}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={dedicatedHero} alt={t("Аренда выделенного сервера NLS", "NLS бөлінген серверін жалдау")} width={1024} height={1024} />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomBuildCTA() {
  const t = useT();
  return (
    <section className="custom-build-cta">
      <div className="container">
        <div className="custom-build-card">
          <div className="custom-build-text">
            <h3>{t("Не нашли подходящую конфигурацию?", "Сәйкес конфигурация табылмады ма?")}</h3>
            <p>
              {t(
                "Соберите сервер под свои задачи в конфигураторе — выберите процессор, память, накопители и сеть.",
                "Конфигураторда өз тапсырмаңызға сай серверді құрастырыңыз — процессорды, жадыны, жинақтаушыларды және желіні таңдаңыз."
              )}
            </p>
          </div>
          <button type="button" className="btn btn-primary custom-build-btn" onClick={scrollToCalculator}>
            {t("Собрать свой сервер", "Өз серверімді құрастыру")}
            <span aria-hidden className="custom-build-arrow">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const { openConsultationModalWith } = useCity();
  const t = useT();
  const barVisible = useMobileBarVisibility("calculator");

  const [cpuIdx, setCpuIdx] = useState<number | null>(null);
  const [ramIdx, setRamIdx] = useState<number | null>(null);
  const [raid, setRaid] = useState(false);
  const [ipmi] = useState(true); // IPMI всегда включён — отключить нельзя
  const [ipCount, setIpCount] = useState(1);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [period, setPeriod] = useState<Period>(1);

  const storage = useDynamic();
  // По умолчанию добавлен один сетевой порт «100 Mbit/s — 0 ₸»
  const network = useDynamic([0]);
  const software = useDynamic();


  // Формфактор накопителей фильтруем по выбранному CPU
  const cpuFF = cpuIdx !== null ? cpuOptions[cpuIdx].formFactor : undefined;
  const maxDisks = cpuIdx !== null ? (cpuOptions[cpuIdx].diskNumber ?? 25) : 25;
  const allowedStorageIdx = useMemo(() => {
    const result: number[] = [];
    storageOptions.forEach((o, i) => {
      if (cpuFF === undefined) result.push(i);
      else if (cpuFF === 3.5) result.push(i); // LFF корзины принимают и 2.5, и 3.5
      else if (o.formFactor === 2.5) result.push(i);
    });
    return result;
  }, [cpuFF]);

  // Мягкая обработка несовместимости: не удаляем диски, помечаем как "несовместимо"
  const incompatibleStorageIds = useMemo(() => {
    const s = new Set<number>();
    storage.rows.forEach((r) => {
      if (r.index !== null && !allowedStorageIdx.includes(r.index)) s.add(r.id);
    });
    return s;
  }, [storage.rows, allowedStorageIdx]);

  // Авто-активация RAID при 2+ совместимых накопителях
  const compatibleStorageCount = storage.rows.filter(
    (r) => r.index !== null && !incompatibleStorageIds.has(r.id)
  ).length;
  useEffect(() => {
    if (compatibleStorageCount >= 2) setRaid(true);
  }, [compatibleStorageCount]);

  const calc = useMemo(() => {
    const cpu = cpuIdx !== null ? cpuOptions[cpuIdx] : null;
    const ram = ramIdx !== null ? ramOptions[ramIdx] : null;

    const storageItems = storage.rows
      .filter((r) => r.index !== null && !incompatibleStorageIds.has(r.id))
      .map((r) => storageOptions[r.index as number]);
    const networkItems = network.rows
      .filter((r) => r.index !== null)
      .map((r) => networkOptions[r.index as number]);
    const softwareItems = software.rows
      .filter((r) => r.index !== null)
      .map((r) => softwareOptions[r.index as number]);

    const priceCpu = cpu?.price ?? 0;
    const priceRam = ram?.price ?? 0;
    const priceStorage = storageItems.reduce((s, i) => s + i.price, 0);
    const priceNetwork = networkItems.reduce((s, i) => s + i.price, 0);
    const priceSoftware = softwareItems.reduce((s, i) => s + i.price, 0);
    const priceRaid = raid ? RAID_PRICE : 0;
    const priceIpmi = ipmi ? IPMI_PRICE : 0;
    const extraIp = Math.max(0, ipCount - 1);
    const priceIp = extraIp * IP_PRICE;

    // Дополнительно (только RAID — IPMI идёт отдельной строкой раздела «Дополнительно» с ценой 0)
    const extras: Option[] = [];
    if (ipmi) extras.push({ name: "IPMI", price: 0 });
    if (priceRaid) extras.push({ name: t("Аппаратный RAID", "Аппараттық RAID"), price: RAID_PRICE });

    // Сетевой порт: пользователь сам управляет (по умолчанию добавлен 100 Mbit/s)
    const networkDisplay: Option[] = networkItems;
    const networkDisplayPrice = networkDisplay.reduce((s, i) => s + i.price, 0);


    // IP: всегда 1 бесплатный + при необходимости доп.
    const ipItems: Option[] = [
      { name: t("1 публичный IPv4", "1 публикалық IPv4"), price: 0 },
    ];
    if (extraIp > 0) {
      ipItems.push({
        name: t(`+${extraIp} IP адрес${extraIp > 1 ? "ов" : ""}`, `+${extraIp} IP мекенжай`),
        price: priceIp,
      });
    }

    const total =
      priceCpu + priceRam + priceStorage + priceRaid + priceIpmi + priceIp + priceNetwork + priceSoftware;

    return {
      cpu,
      ram,
      storageItems,
      networkDisplay,
      networkDisplayPrice,
      softwareItems,
      extras,
      extrasTotal: priceRaid + priceIpmi,
      ipItems,
      ipTotal: priceIp,
      priceCpu,
      priceRam,
      priceStorage,
      priceNetwork,
      priceSoftware,
      total,
    };
  }, [cpuIdx, ramIdx, raid, ipmi, ipCount, storage.rows, network.rows, software.rows, incompatibleStorageIds, t]);

  // Формирование текста для заявки
  const buildSubject = () => {
    const parts: string[] = ["Заказ сервера (конфигуратор):"];
    if (calc.cpu) parts.push(`CPU: ${calc.cpu.name}`);
    if (calc.ram) parts.push(`RAM: ${calc.ram.name}`);
    if (calc.storageItems.length)
      parts.push(`Накопители: ${calc.storageItems.map((i) => i.name).join(", ")}`);
    parts.push(`Сетевой порт: ${calc.networkDisplay.map((i) => i.name).join(" + ")}`);
    parts.push("Интернет: 100 Мбит/с");
    if (ipmi) parts.push("IPMI (бесплатно)");
    if (raid) parts.push("Аппаратный RAID");
    parts.push(`IP: ${calc.ipItems.map((i) => i.name).join(" + ")}`);
    parts.push(`Итого: ${formatPrice(calc.total)}/мес`);
    return parts.join(" | ");
  };

  const orderClick = () => openConsultationModalWith({ subject: buildSubject() });

  // === Расчёт с учётом периода и скидки ===
  const discount = CALC_DISCOUNT_ENABLED ? CALC_DISCOUNT[period] : 0;
  const periodTotal = calc.total * period * (1 - discount);
  const periodSaving = calc.total * period * discount;
  const periodLabelRu = period === 1 ? "Итого за 1 месяц" : `Итого за ${period} мес.`;
  const periodLabelKz = period === 1 ? "1 айға барлығы" : `${period} айға барлығы`;

  return (
    <>
      <section className="calc-section" id="calculator">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">{t("Конструктор", "Құрастырғыш")}</span>
            <h2>{t("Конфигуратор сервера", "Сервер конфигураторы")}</h2>
            <p>{t("Выберите параметры и рассчитайте стоимость аренды", "Параметрлерді таңдап, жалдау құнын есептеңіз")}</p>
          </div>

          <div className="plan-period-switch" role="tablist" aria-label={t("Период оплаты", "Төлем мерзімі")}>
            {([1, 6, 12] as Period[]).map((p) => {
              const d = CALC_DISCOUNT_ENABLED ? CALC_DISCOUNT[p] : 0;
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
                  {d > 0 && (
                    <span className="plan-discount-badge">−{Math.round(d * 100)}%</span>
                  )}
                </button>
              );
            })}
          </div>


          <div className="calc-grid">
            <div className="calc-form">
              <div className="calc-field">
                <label className="calc-field-label">{t("Процессор", "Процессор")}</label>
                <select
                  className="calc-select"
                  value={cpuIdx ?? ""}
                  onChange={(e) => setCpuIdx(e.target.value === "" ? null : Number(e.target.value))}
                >
                  <option value="" disabled>
                    {t("Выберите процессор", "Процессорды таңдаңыз")}
                  </option>
                  {cpuOptions.map((o, i) => (
                    <option key={i} value={i}>
                      {o.name} — {formatPrice(o.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="calc-field">
                <label className="calc-field-label">{t("Оперативная память (ОЗУ)", "Жедел жады (ЖЖҚ)")}</label>
                <select
                  className="calc-select"
                  value={ramIdx ?? ""}
                  onChange={(e) => setRamIdx(e.target.value === "" ? null : Number(e.target.value))}
                >
                  <option value="" disabled>
                    {t("Выберите объем ОЗУ", "ЖЖҚ көлемін таңдаңыз")}
                  </option>
                  {ramOptions.map((o, i) => (
                    <option key={i} value={i}>
                      {o.name} — {formatPrice(o.price)}
                    </option>
                  ))}
                </select>
              </div>

              <DynamicSection
                label={t("Накопители", "Жинақтаушылар")}
                addLabel={t("Добавить накопитель", "Жинақтаушы қосу")}
                placeholder={t("Выберите накопитель", "Жинақтаушыны таңдаңыз")}
                options={storageOptions}
                allowedIdx={allowedStorageIdx}
                maxRows={Math.min(25, maxDisks)}
                rows={storage.rows}
                onAdd={storage.add}
                onChange={storage.update}
                onRemove={storage.remove}
                incompatibleIds={incompatibleStorageIds}
                incompatibleMessage={t("Не соответствуют форм-фактору", "Форм-факторға сай келмейді")}
              />


              <div className="calc-field">
                <label className="calc-field-label">{t("Дополнительно", "Қосымша")}</label>
                <div className="calc-toggles">
                  <div className="calc-toggle-row">
                    <div className="calc-toggle-label">
                      {t("Аппаратный RAID", "Аппараттық RAID")} <span className="calc-toggle-price">9 000 {t("₸/мес", "₸/ай")}</span>
                      {compatibleStorageCount >= 2 && (
                        <span className="calc-toggle-price" style={{ marginLeft: 8, color: "var(--color-primary)" }}>
                          {t("(включён авто при 2+ дисках)", "(2+ диск кезінде авто қосылған)")}
                        </span>
                      )}
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={raid}
                        disabled={compatibleStorageCount >= 2}
                        onChange={(e) => setRaid(e.target.checked)}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                  <div className="calc-toggle-row">
                    <div className="calc-toggle-label">
                      {t("Аппаратный IPMI", "Аппараттық IPMI")} <span className="calc-toggle-price">{t("бесплатно", "тегін")}</span>
                    </div>
                    <label className="toggle-switch" title={t("IPMI всегда включён", "IPMI әрқашан қосулы")}>
                      <input type="checkbox" checked={ipmi} disabled readOnly />
                      <span className="toggle-slider" />
                    </label>

                  </div>
                </div>
              </div>

              <div className="calc-field">
                <label className="calc-field-label">{t("IP адрес (IPv4)", "IP мекенжай (IPv4)")}</label>
                <div className="calc-counter-wrap">
                  <div className="calc-counter">
                    <button
                      type="button"
                      className="calc-counter-btn"
                      onClick={() => setIpCount((c) => Math.max(1, c - 1))}
                    >
                      −
                    </button>
                    <div className="calc-counter-value">{ipCount}</div>
                    <button
                      type="button"
                      className="calc-counter-btn"
                      onClick={() => setIpCount((c) => c + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className={`ip-info ${ipCount === 1 ? "free" : "paid"}`}>
                    {ipCount === 1
                      ? t("1 Публичный IPv4 бесплатно", "1 публикалық IPv4 тегін")
                      : t(`${ipCount} адресов — доплата ${formatPrice((ipCount - 1) * IP_PRICE)}`, `${ipCount} мекенжай — қосымша төлем ${formatPrice((ipCount - 1) * IP_PRICE)}`)}
                  </span>
                </div>
              </div>

              <DynamicSection
                label={t("Сетевой порт", "Желілік порт")}
                addLabel={t("Добавить порт", "Порт қосу")}
                placeholder={t("Выберите порт", "Портты таңдаңыз")}
                options={networkOptions}
                maxRows={20}
                rows={network.rows}
                onAdd={network.add}
                onChange={network.update}
                onRemove={network.remove}
              />
            </div>


            <div className="calc-summary">
              <div className="summary-card">
                <div className="summary-header">{t("Ваша конфигурация", "Сіздің конфигурацияңыз")}</div>
                <div className="summary-body">
                  <SummarySection
                    title={t("Процессор", "Процессор")}
                    total={calc.priceCpu}
                    items={calc.cpu ? [calc.cpu] : []}
                  />
                  <SummarySection
                    title={t("ОЗУ", "ЖЖҚ")}
                    total={calc.priceRam}
                    items={calc.ram ? [calc.ram] : []}
                  />
                  <SummarySection
                    title={t("Накопители", "Жинақтаушылар")}
                    total={calc.priceStorage}
                    items={calc.storageItems}
                  />
                  <SummarySection
                    title={t("Дополнительно", "Қосымша")}
                    total={calc.extrasTotal}
                    items={calc.extras}
                    alwaysShow={ipmi || raid}
                  />
                  <SummarySection
                    title={t("Сетевой порт", "Желілік порт")}
                    total={calc.networkDisplayPrice}
                    items={calc.networkDisplay}
                    alwaysShow
                  />
                  <SummarySection
                    title={t("Интернет", "Интернет")}
                    total={0}
                    items={[{ name: t("100 Мбит/с", "100 Мбит/с"), price: 0 }]}
                    alwaysShow
                  />
                  <SummarySection
                    title={t("IP адрес", "IP мекенжай")}
                    total={calc.ipTotal}
                    items={calc.ipItems}
                    alwaysShow
                  />
                </div>
                <div className="summary-footer">
                  <div className="summary-total-row">
                    <span className="summary-total-label">{t(periodLabelRu, periodLabelKz)}</span>
                    <span className="summary-total-amount">{formatPrice(Math.round(periodTotal))}</span>
                  </div>
                  {periodSaving > 0 && (
                    <div className="plan-saving" style={{ marginTop: 4 }}>
                      {t(`Экономия: ${formatPrice(Math.round(periodSaving))}`, `Үнемдеу: ${formatPrice(Math.round(periodSaving))}`)}
                    </div>
                  )}
                  <p className="summary-vat">{t("Цены всех услуг указаны без учета НДС", "Барлық қызметтердің бағасы ҚҚС-сыз көрсетілген")}</p>
                  <button type="button" className="btn btn-primary calc-order-btn" onClick={orderClick}>
                    {t("Заказать", "Тапсырыс беру")}
                  </button>
                </div>

              </div>
              <CalculatorDisclaimer />
            </div>

          </div>
        </div>
      </section>

      <div className={`mobile-calc-bar${barVisible ? " is-visible" : ""}`}>
        <button
          type="button"
          className={`mobile-toggle-arrow${mobileExpanded ? " expanded" : ""}`}
          onClick={() => setMobileExpanded((e) => !e)}
          aria-label={t("Раскрыть детали", "Толығырақ ашу")}
        >
          <ChevronUpIcon />
        </button>
        <div className={`mobile-summary-detail${mobileExpanded ? " expanded" : ""}`}>
          <div className="mobile-summary-inner">
            <SummarySection title={t("Процессор", "Процессор")} total={calc.priceCpu} items={calc.cpu ? [calc.cpu] : []} />
            <SummarySection title={t("ОЗУ", "ЖЖҚ")} total={calc.priceRam} items={calc.ram ? [calc.ram] : []} />
            <SummarySection title={t("Накопители", "Жинақтаушылар")} total={calc.priceStorage} items={calc.storageItems} />
            <SummarySection title={t("Дополнительно", "Қосымша")} total={calc.extrasTotal} items={calc.extras} alwaysShow={ipmi || raid} />
            <SummarySection title={t("Сетевой порт", "Желілік порт")} total={calc.networkDisplayPrice} items={calc.networkDisplay} alwaysShow />
            <SummarySection title={t("Интернет", "Интернет")} total={0} items={[{ name: t("100 Мбит/с", "100 Мбит/с"), price: 0 }]} alwaysShow />
            <SummarySection title={t("IP адрес", "IP мекенжай")} total={calc.ipTotal} items={calc.ipItems} alwaysShow />

            <p style={{ fontSize: "0.75rem", color: "var(--color-text-light)", marginTop: 8 }}>
              {t("Цены без учета НДС", "Бағалар ҚҚС-сыз")}
            </p>
          </div>
          <CalculatorDisclaimer />
        </div>
        <div className="mobile-bar-main">
          <div className="mobile-bar-left">
            <div className="mobile-bar-label">{t("Итого за 1 месяц", "1 айға барлығы")}</div>
            <div className="mobile-bar-price">{formatPrice(calc.total)}</div>
          </div>
          <button type="button" className="btn btn-primary calc-order-btn" onClick={orderClick}>
            {t("Заказать", "Тапсырыс беру")}
          </button>
        </div>
      </div>
    </>
  );

}

function DynamicSection({
  label,
  addLabel,
  placeholder,
  options,
  allowedIdx,
  maxRows,
  rows,
  onAdd,
  onChange,
  onRemove,
  incompatibleIds,
  incompatibleMessage,
}: {
  label: string;
  addLabel: string;
  placeholder: string;
  options: Option[];
  allowedIdx?: number[];
  maxRows?: number;
  rows: DynamicRow[];
  onAdd: () => void;
  onChange: (id: number, index: number | null) => void;
  onRemove: (id: number) => void;
  incompatibleIds?: Set<number>;
  incompatibleMessage?: string;
}) {
  const t = useT();
  const limitReached = maxRows !== undefined && rows.length >= maxRows;
  const visibleOptions = options
    .map((o, i) => ({ o, i }))
    .filter(({ i }) => (allowedIdx ? allowedIdx.includes(i) : true));

  return (
    <div className="calc-field">
      <label className="calc-field-label">{label}</label>
      <div className="calc-add-row">
        <button
          type="button"
          className="calc-add-btn"
          onClick={onAdd}
          disabled={limitReached}
          title={limitReached ? t(`Максимум ${maxRows}`, `Ең көп ${maxRows}`) : undefined}
        >
          + {addLabel}
        </button>
      </div>
      <div>
        {rows.map((row) => {
          const isIncompatible = !!(incompatibleIds && incompatibleIds.has(row.id));
          const currentOption = row.index !== null ? options[row.index] : null;
          return (
            <div className={`calc-added-item visible${isIncompatible ? " is-error" : ""}`} key={row.id}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                <select
                  className={`calc-select${isIncompatible ? " is-error" : ""}`}
                  value={row.index ?? ""}
                  disabled={isIncompatible}
                  onChange={(e) => onChange(row.id, e.target.value === "" ? null : Number(e.target.value))}
                >
                  {isIncompatible && currentOption ? (
                    <option value={row.index ?? ""}>
                      {currentOption.name} — {formatPrice(currentOption.price)}
                    </option>
                  ) : (
                    <>
                      <option value="" disabled>
                        {placeholder}
                      </option>
                      {visibleOptions.map(({ o, i }) => (
                        <option key={i} value={i}>
                          {o.name} — {formatPrice(o.price)}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {isIncompatible && incompatibleMessage && (
                  <div className="calc-row-error">{incompatibleMessage}</div>
                )}
              </div>
              <button type="button" className="calc-remove-btn" onClick={() => onRemove(row.id)} title={t("Удалить", "Жою")}>
                <CloseIcon width={18} height={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


function SummarySection({
  title,
  total,
  items,
  alwaysShow,
}: {
  title: string;
  total: number;
  items: Option[];
  alwaysShow?: boolean;
}) {
  if (total === 0 && items.length === 0 && !alwaysShow) {
    return null;
  }

  return (
    <div className="summary-category">
      <div className="sum-row">
        <span className="sum-label">{title}</span>
        <span className={`sum-value${total === 0 ? " muted" : ""}`}>
          {total === 0 ? "0 ₸" : formatPrice(total)}
        </span>
      </div>
      {items.map((it, i) => (
        <div className="sum-detail" key={i}>
          {it.name}{it.price > 0 ? ` — ${formatPrice(it.price)}` : ` — 0 ₸`}
        </div>
      ))}
    </div>
  );
}

