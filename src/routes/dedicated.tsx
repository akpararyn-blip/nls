import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { DedicatedPlans } from "@/components/nls/DedicatedPlans";
import { useCity } from "@/lib/city-context";
import { ChevronUpIcon, CloseIcon, ServerIcon } from "@/components/nls/Icons";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/dedicated")({
  head: () => ({
    meta: [
      { title: "Аренда Dedicated сервера — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Аренда выделенных серверов в дата-центре NLS. Конфигуратор: CPU, RAM, накопители, сеть, ПО. Серверы в Алматы и Астане.",
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

// === Pricing data (как в исходном dedicated.js) ===
type Option = { name: string; price: number };

const cpuOptions: Option[] = [
  { name: "2 x Intel® Xeon® E5-2680 v4, 2.4/3.3 ГГц, (28C/56T)", price: 130000 },
  { name: "2 x Intel® Xeon® E5-2690 v3, 2.6/3.5 ГГц, (24C/48T)", price: 130000 },
  { name: "2 x Intel® Xeon® Gold 6140, 2.3/3.7 ГГц, (36C/72T)", price: 140000 },
  { name: "2 x Intel® Xeon® Gold 6148, 2.4/3.7 ГГц, (40C/80T)", price: 382000 },
  { name: "2 x Intel® Xeon® Platinum 8168, 2.7/3.7 ГГц, (48C/96T)", price: 645000 },
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
  { name: "480 GB SSD", price: 8200 },
  { name: "960 GB SSD", price: 20000 },
  { name: "1,9 TB SSD", price: 38000 },
  { name: "3,84 TB SSD", price: 57600 },
  { name: "7,68 TB SSD", price: 85000 },
  { name: "1 TB HDD", price: 6000 },
  { name: "2 TB HDD", price: 11500 },
  { name: "4 TB HDD", price: 14500 },
  { name: "8 TB HDD", price: 23500 },
];

const networkOptions: Option[] = [
  { name: "1 Gbit/s", price: 1000 },
  { name: "10 Gbit/s", price: 30000 },
];

const softwareOptions: Option[] = [
  { name: "1C", price: 22000 },
  { name: "Proxmox", price: 22000 },
  { name: "SQL", price: 22000 },
];

const RAID_PRICE = 9000;
const IPMI_PRICE = 3000;
const IP_PRICE = 2250;

function formatPrice(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

interface DynamicRow {
  id: number;
  index: number | null; // index в массиве опций или null
}

function useDynamic() {
  const [rows, setRows] = useState<DynamicRow[]>([]);
  const [counter, setCounter] = useState(0);

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

function DedicatedPage() {
  return (
    <SiteLayout>
      <Hero />
      <DedicatedPlans />
      <CustomBuildCTA />
      <Calculator />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  const features = [
    "До 100 Мбит/с",
    "ЦОД Алматы и Астана",
    "Настройка под задачу",
    "Поддержка 24/7",
  ];
  return (
    <section className="hero-dedicated">
      <div className="container">
        <div className="hero-dedicated-icon">
          <ServerIcon />
        </div>
        <span className="hero-dedicated-eyebrow">Dedicated Servers</span>
        <h1>
          Аренда высокопроизводительных физических серверов в дата-центре{" "}
          <span style={{ color: "var(--color-orange)" }}>NLS</span>
        </h1>
        <p>
          Готовые конфигурации и сборка под ваши задачи. Серверы размещены в собственных дата-центрах
          NLS в Алматы и Астане с каналом до 100 Мбит/с.
        </p>

        <div className="hero-dedicated-chips">
          {features.map((f) => (
            <span className="hero-chip" key={f}>
              <span className="hero-chip-dot" />
              {f}
            </span>
          ))}
        </div>

        <div className="hero-dedicated-actions">
          <button type="button" className="btn btn-primary" onClick={scrollToCalculator}>
            Собрать сервер
          </button>
          <button type="button" className="btn btn-ghost-light" onClick={openConsultationModal}>
            Получить консультацию
          </button>
        </div>
      </div>
    </section>
  );
}

function CustomBuildCTA() {
  return (
    <section className="custom-build-cta">
      <div className="container">
        <div className="custom-build-card">
          <div className="custom-build-text">
            <h3>Не нашли подходящую конфигурацию?</h3>
            <p>Соберите сервер под свои задачи в конфигураторе — выберите процессор, память, накопители и сеть.</p>
          </div>
          <button type="button" className="btn btn-primary custom-build-btn" onClick={scrollToCalculator}>
            Собрать свой сервер
            <span aria-hidden className="custom-build-arrow">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const { openConsultationModal } = useCity();

  const [cpuIdx, setCpuIdx] = useState<number | null>(null);
  const [ramIdx, setRamIdx] = useState<number | null>(null);
  const [raid, setRaid] = useState(false);
  const [ipmi, setIpmi] = useState(false);
  const [ipCount, setIpCount] = useState(1);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const storage = useDynamic();
  const network = useDynamic();
  const software = useDynamic();

  const calc = useMemo(() => {
    const cpu = cpuIdx !== null ? cpuOptions[cpuIdx] : null;
    const ram = ramIdx !== null ? ramOptions[ramIdx] : null;

    const storageItems = storage.rows
      .filter((r) => r.index !== null)
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
    const priceIp = (ipCount - 1) * IP_PRICE;

    const extras: Option[] = [];
    if (priceRaid) extras.push({ name: "Аппаратный RAID", price: RAID_PRICE });
    if (priceIpmi) extras.push({ name: "IPMI", price: IPMI_PRICE });
    if (priceIp) extras.push({ name: `IP адрес x${ipCount} (1 бесплатный)`, price: priceIp });

    const total =
      priceCpu + priceRam + priceStorage + priceRaid + priceIpmi + priceIp + priceNetwork + priceSoftware;

    return {
      cpu,
      ram,
      storageItems,
      networkItems,
      softwareItems,
      extras,
      extrasTotal: priceRaid + priceIpmi + priceIp,
      priceCpu,
      priceRam,
      priceStorage,
      priceNetwork,
      priceSoftware,
      total,
    };
  }, [cpuIdx, ramIdx, raid, ipmi, ipCount, storage.rows, network.rows, software.rows]);

  return (
    <>
      <section className="calc-section" id="calculator">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Конструктор</span>
            <h2>Конфигуратор сервера</h2>
            <p>Выберите параметры и рассчитайте стоимость аренды</p>
          </div>
          <div className="calc-grid">
            {/* Form */}
            <div className="calc-form">
              {/* CPU */}
              <div className="calc-field">
                <label className="calc-field-label">Процессор</label>
                <select
                  className="calc-select"
                  value={cpuIdx ?? ""}
                  onChange={(e) => setCpuIdx(e.target.value === "" ? null : Number(e.target.value))}
                >
                  <option value="" disabled>
                    Выберите процессор
                  </option>
                  {cpuOptions.map((o, i) => (
                    <option key={i} value={i}>
                      {o.name} — {formatPrice(o.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* RAM */}
              <div className="calc-field">
                <label className="calc-field-label">Оперативная память (ОЗУ)</label>
                <select
                  className="calc-select"
                  value={ramIdx ?? ""}
                  onChange={(e) => setRamIdx(e.target.value === "" ? null : Number(e.target.value))}
                >
                  <option value="" disabled>
                    Выберите объем ОЗУ
                  </option>
                  {ramOptions.map((o, i) => (
                    <option key={i} value={i}>
                      {o.name} — {formatPrice(o.price)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage */}
              <DynamicSection
                label="Накопители"
                addLabel="Добавить накопитель"
                placeholder="Выберите накопитель"
                options={storageOptions}
                rows={storage.rows}
                onAdd={storage.add}
                onChange={storage.update}
                onRemove={storage.remove}
              />

              {/* Extras */}
              <div className="calc-field">
                <label className="calc-field-label">Дополнительно</label>
                <div className="calc-toggles">
                  <div className="calc-toggle-row">
                    <div className="calc-toggle-label">
                      Аппаратный RAID <span className="calc-toggle-price">9 000 ₸/мес</span>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={raid} onChange={(e) => setRaid(e.target.checked)} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                  <div className="calc-toggle-row">
                    <div className="calc-toggle-label">
                      Аппаратный IPMI <span className="calc-toggle-price">3 000 ₸/мес</span>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={ipmi} onChange={(e) => setIpmi(e.target.checked)} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>
              </div>

              {/* IP */}
              <div className="calc-field">
                <label className="calc-field-label">IP адрес (IPv4)</label>
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
                      ? "1 Публичный IPv4 бесплатно"
                      : `${ipCount} адресов — доплата ${formatPrice((ipCount - 1) * IP_PRICE)}`}
                  </span>
                </div>
              </div>

              {/* Network */}
              <DynamicSection
                label="Сетевой порт"
                addLabel="Добавить порт"
                placeholder="Выберите порт"
                options={networkOptions}
                rows={network.rows}
                onAdd={network.add}
                onChange={network.update}
                onRemove={network.remove}
              />

              {/* Software */}
              <DynamicSection
                label="Установка ПО"
                addLabel="Добавить ПО"
                placeholder="Выберите ПО"
                options={softwareOptions}
                rows={software.rows}
                onAdd={software.add}
                onChange={software.update}
                onRemove={software.remove}
              />
            </div>

            {/* Summary */}
            <div className="calc-summary">
              <div className="summary-card">
                <div className="summary-header">Ваша конфигурация</div>
                <div className="summary-body">
                  <SummarySection
                    title="Процессор"
                    total={calc.priceCpu}
                    items={calc.cpu ? [calc.cpu] : []}
                  />
                  <SummarySection
                    title="ОЗУ"
                    total={calc.priceRam}
                    items={calc.ram ? [calc.ram] : []}
                  />
                  <SummarySection
                    title="Накопители"
                    total={calc.priceStorage}
                    items={calc.storageItems}
                  />
                  <SummarySection
                    title="Дополнительно"
                    total={calc.extrasTotal}
                    items={calc.extras}
                  />
                  <SummarySection
                    title="Сетевой порт"
                    total={calc.priceNetwork}
                    items={calc.networkItems}
                  />
                  <SummarySection
                    title="Установка ПО"
                    total={calc.priceSoftware}
                    items={calc.softwareItems}
                  />
                </div>
                <div className="summary-footer">
                  <div className="summary-total-row">
                    <span className="summary-total-label">Итого за 1 месяц</span>
                    <span className="summary-total-amount">{formatPrice(calc.total)}</span>
                  </div>
                  <p className="summary-vat">Цены всех услуг указаны без учета НДС</p>
                  <button type="button" className="btn btn-primary calc-order-btn" onClick={openConsultationModal}>
                    Заказать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom bar */}
      <div className="mobile-calc-bar">
        <button
          type="button"
          className={`mobile-toggle-arrow${mobileExpanded ? " expanded" : ""}`}
          onClick={() => setMobileExpanded((e) => !e)}
          aria-label="Раскрыть детали"
        >
          <ChevronUpIcon />
        </button>
        <div className={`mobile-summary-detail${mobileExpanded ? " expanded" : ""}`}>
          <div className="mobile-summary-inner">
            <SummarySection title="Процессор" total={calc.priceCpu} items={calc.cpu ? [calc.cpu] : []} />
            <SummarySection title="ОЗУ" total={calc.priceRam} items={calc.ram ? [calc.ram] : []} />
            <SummarySection title="Накопители" total={calc.priceStorage} items={calc.storageItems} />
            <SummarySection title="Дополнительно" total={calc.extrasTotal} items={calc.extras} />
            <SummarySection title="Сетевой порт" total={calc.priceNetwork} items={calc.networkItems} />
            <SummarySection title="Установка ПО" total={calc.priceSoftware} items={calc.softwareItems} />
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-light)", marginTop: 8 }}>
              Цены без учета НДС
            </p>
          </div>
        </div>
        <div className="mobile-bar-main">
          <div className="mobile-bar-left">
            <div className="mobile-bar-label">Итого за 1 месяц</div>
            <div className="mobile-bar-price">{formatPrice(calc.total)}</div>
          </div>
          <button type="button" className="btn btn-primary calc-order-btn" onClick={openConsultationModal}>
            Заказать
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
  rows,
  onAdd,
  onChange,
  onRemove,
}: {
  label: string;
  addLabel: string;
  placeholder: string;
  options: Option[];
  rows: DynamicRow[];
  onAdd: () => void;
  onChange: (id: number, index: number | null) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="calc-field">
      <label className="calc-field-label">{label}</label>
      <div className="calc-add-row">
        <button type="button" className="calc-add-btn" onClick={onAdd}>
          + {addLabel}
        </button>
      </div>
      <div>
        {rows.map((row) => (
          <div className="calc-added-item visible" key={row.id}>
            <select
              className="calc-select"
              value={row.index ?? ""}
              onChange={(e) => onChange(row.id, e.target.value === "" ? null : Number(e.target.value))}
            >
              <option value="" disabled>
                {placeholder}
              </option>
              {options.map((o, i) => (
                <option key={i} value={i}>
                  {o.name} — {formatPrice(o.price)}
                </option>
              ))}
            </select>
            <button type="button" className="calc-remove-btn" onClick={() => onRemove(row.id)} title="Удалить">
              <CloseIcon width={18} height={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummarySection({
  title,
  total,
  items,
}: {
  title: string;
  total: number;
  items: Option[];
}) {
  if (total === 0) {
    return (
      <div className="summary-category">
        <div className="sum-row">
          <span className="sum-label">{title}</span>
          <span className="sum-value muted">—</span>
        </div>
      </div>
    );
  }
  return (
    <div className="summary-category">
      <div className="sum-row">
        <span className="sum-label">{title}</span>
        <span className="sum-value">{formatPrice(total)}</span>
      </div>
      {items.map((it, i) => (
        <div className="sum-detail" key={i}>
          {it.name} — {formatPrice(it.price)}
        </div>
      ))}
    </div>
  );
}
