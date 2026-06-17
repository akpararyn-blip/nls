import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CalculatorDisclaimer } from "@/components/nls/CalculatorDisclaimer";
import { RelatedServices } from "@/components/nls/RelatedServices";
import { SupportPromo } from "@/components/nls/SupportPromo";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CheckIcon, ChevronUpIcon, CloseIcon } from "@/components/nls/Icons";
import { useMobileBarVisibility } from "@/hooks/use-mobile-bar";
import iaasHero from "@/assets/iaas-hero.png";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Cpu, MemoryStick, HardDrive, Database, Globe, Shield, Archive } from "lucide-react";

export const Route = createFileRoute("/iaas")({
  head: () => ({
    meta: [
      { title: "Виртуальный дата‑центр на VMware Cloud Director — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Виртуальный дата‑центр на базе VMware Cloud Director. Гибкая конфигурация vCPU, vRAM, SSD/HDD, резервные копии Veeam. Дата‑центры в Алматы, Астане и Шымкенте.",
      },
      {
        name: "keywords",
        content:
          "VMware Cloud Director, виртуальный дата-центр, IaaS Казахстан, vCPU, vRAM, Veeam Backup, облачная инфраструктура",
      },
      { property: "og:url", content: "/iaas" },
      { property: "og:title", content: "Виртуальный дата‑центр на VMware Cloud Director — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Соберите виртуальный дата‑центр на VMware Cloud Director: vCPU, vRAM, SSD/HDD, IP, Veeam Backup и архив.",
      },
    ],
  }),
  component: IaasPage,
});

// === Локации и кластеры ===
type CityId = "almaty" | "astana" | "shymkent";
type Prices = {
  cpu: number;
  ram: number;
  ssd: number;
  hdd: number | null;
  ip: number;
  veeam: number;
  archive: number;
};
type Cluster = { id: string; name: string; cpuFreq: string; prices: Prices };
type Location = { id: CityId; nameRu: string; nameKz: string; clusters: Cluster[] };

const LOCATIONS: Location[] = [
  {
    id: "almaty",
    nameRu: "Алматы",
    nameKz: "Алматы",
    clusters: [
      {
        id: "epyc",
        name: "AMD Epyc 9754, DDR5, SSD, HDD",
        cpuFreq: "2.4 ГГц",
        prices: { cpu: 1600, ram: 3500, ssd: 100, hdd: 38, ip: 2400, veeam: 12000, archive: 10 },
      },
      
    ],
  },
  {
    id: "astana",
    nameRu: "Астана",
    nameKz: "Астана",
    clusters: [
      {
        id: "e5v3",
        name: "Intel E5-2643 v3, DDR4, SSD",
        cpuFreq: "3.4 ГГц",
        prices: { cpu: 2300, ram: 3500, ssd: 100, hdd: null, ip: 2400, veeam: 12000, archive: 10 },
      },
    ],
  },
  {
    id: "shymkent",
    nameRu: "Шымкент",
    nameKz: "Шымкент",
    clusters: [
      {
        id: "e5v4-shy",
        name: "Intel E5-2680 v4, DDR4, SSD",
        cpuFreq: "2.4 ГГц",
        prices: { cpu: 2300, ram: 3500, ssd: 100, hdd: null, ip: 2400, veeam: 12000, archive: 10 },
      },
    ],
  },
];

function getLocation(city: CityId): Location {
  return LOCATIONS.find((l) => l.id === city)!;
}
function getCluster(city: CityId, clusterId: string): Cluster {
  const loc = getLocation(city);
  return loc.clusters.find((c) => c.id === clusterId) ?? loc.clusters[0];
}

// === Диапазоны ===
type FieldKey = "cpu" | "ram" | "ssd" | "hdd" | "ip" | "veeam" | "archive";
const RANGES: Record<FieldKey, { min: number; max: number; step: number }> = {
  cpu: { min: 1, max: 1024, step: 1 },
  ram: { min: 1, max: 10240, step: 1 },
  ssd: { min: 0, max: 512000, step: 1 },
  hdd: { min: 0, max: 512000, step: 1 },
  ip: { min: 1, max: 256, step: 1 },
  veeam: { min: 0, max: 100, step: 1 },
  archive: { min: 0, max: 512000, step: 1 },
};

type Period = 1 | 6 | 12;
const CALC_DISCOUNT_ENABLED = true;
const CALC_DISCOUNT: Record<Period, number> = { 1: 0, 6: 0.03, 12: 0.06 };

type Vdc = {
  id: number;
  city: CityId;
  clusterId: string;
  cpu: number;
  ram: number;
  ssd: number;
  hdd: number;
  ip: number;
  veeam: number;
  archive: number;
  // буферы строкового ввода
  iCpu: string;
  iRam: string;
  iSsd: string;
  iHdd: string;
  iIp: string;
  iVeeam: string;
  iArchive: string;
};

function makeVdc(id: number): Vdc {
  return {
    id,
    city: "almaty",
    clusterId: "epyc",
    cpu: 1,
    ram: 1,
    ssd: 0,
    hdd: 0,
    ip: 1,
    veeam: 0,
    archive: 0,
    iCpu: "1",
    iRam: "1",
    iSsd: "0",
    iHdd: "0",
    iIp: "1",
    iVeeam: "0",
    iArchive: "0",
  };
}

function formatPrice(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

function scrollToCalculator() {
  const el = document.getElementById("iaas-calculator");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function IaasPage() {
  return (
    <SiteLayout>
      <Hero />
      <Calculator />
      <SupportPromo />
      <RelatedServices exclude="iaas" />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  const t = useT();
  const bullets = [
    t("Виртуальный ДЦ под полным контролем", "Толық бақылаудағы виртуалды ДО"),
    t("VMware Cloud Director", "VMware Cloud Director"),
    t("Резервные копии Veeam Backup", "Veeam Backup сақтық көшірмелері"),
    t("Поддержка 24/7", "24/7 қолдау"),
  ];
  return (
    <section className="hero hero--no-image-mobile">
      <div className="container">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ marginBottom: 16, display: "inline-block" }}>
            Cloud Director
          </span>
          <h1>
            <span style={{ color: "var(--color-orange)" }}>{t("Виртуальный дата‑центр", "Виртуалдық дата‑центр")}</span>
          </h1>
          <p className="hero-subtitle">
            {t("Виртуальный дата‑центр на базе VMware", "VMware негізіндегі виртуалды дата-орталық")}
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
            <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
              {t("Заказать", "Тапсырыс беру")}
            </button>
            <button type="button" className="btn btn-outline" onClick={scrollToCalculator}>
              {t("Конфигуратор", "Конфигуратор")}
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img
              src={iaasHero}
              alt={t("Виртуальный дата‑центр VMware Cloud Director", "VMware Cloud Director виртуалды дата-орталығы")}
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

// === Калькулятор ===
function Calculator() {
  const { openConsultationModalWith } = useCity();
  const t = useT();
  const barVisible = useMobileBarVisibility("iaas-calculator");

  const [counter, setCounter] = useState(1);
  const [vdcs, setVdcs] = useState<Vdc[]>([makeVdc(1)]);
  const [period, setPeriod] = useState<Period>(1);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState<{ vdcId: number; field: FieldKey; text: string } | null>(null);

  useEffect(() => {
    if (!mobileExpanded) return;
    const onDocPointer = (e: MouseEvent | TouchEvent) => {
      if (mobileBarRef.current && !mobileBarRef.current.contains(e.target as Node)) {
        setMobileExpanded(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileExpanded(false);
    };
    document.addEventListener("mousedown", onDocPointer);
    document.addEventListener("touchstart", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocPointer);
      document.removeEventListener("touchstart", onDocPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileExpanded]);

  const showHint = (vdcId: number, field: FieldKey, text: string) => {
    setHint({ vdcId, field, text });
    window.setTimeout(() => {
      setHint((h) =>
        h && h.vdcId === vdcId && h.field === field && h.text === text ? null : h,
      );
    }, 3500);
  };

  const inputKey = (field: FieldKey): keyof Vdc => {
    const map: Record<FieldKey, keyof Vdc> = {
      cpu: "iCpu",
      ram: "iRam",
      ssd: "iSsd",
      hdd: "iHdd",
      ip: "iIp",
      veeam: "iVeeam",
      archive: "iArchive",
    };
    return map[field];
  };

  const updateVdc = (id: number, patch: Partial<Vdc>) =>
    setVdcs((arr) => arr.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const addVdc = () => {
    const next = counter + 1;
    setCounter(next);
    setVdcs((arr) => [...arr, makeVdc(next)]);
  };
  const removeVdc = (id: number) => setVdcs((arr) => arr.filter((v) => v.id !== id));

  const onCityChange = (id: number, city: CityId) => {
    const loc = getLocation(city);
    const cluster = loc.clusters[0];
    const hddAvail = cluster.prices.hdd !== null;
    updateVdc(id, {
      city,
      clusterId: cluster.id,
      hdd: hddAvail ? (vdcs.find((v) => v.id === id)?.hdd ?? 0) : 0,
      iHdd: hddAvail ? (vdcs.find((v) => v.id === id)?.iHdd ?? "0") : "0",
    });
  };
  const onClusterChange = (id: number, clusterId: string) => {
    const vdc = vdcs.find((v) => v.id === id);
    if (!vdc) return;
    const cluster = getCluster(vdc.city, clusterId);
    const hddAvail = cluster.prices.hdd !== null;
    updateVdc(id, {
      clusterId,
      hdd: hddAvail ? vdc.hdd : 0,
      iHdd: hddAvail ? vdc.iHdd : "0",
    });
  };

  const onInputChange = (id: number, field: FieldKey) => (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (/[^\d]/.test(raw)) {
      showHint(id, field, t("Можно вводить только цифры", "Тек сандарды енгізуге болады"));
    }
    updateVdc(id, { [inputKey(field)]: raw.replace(/\D/g, "") } as Partial<Vdc>);
  };

  const commitField = (id: number, field: FieldKey) => {
    const vdc = vdcs.find((v) => v.id === id);
    if (!vdc) return;
    const { min, max, step } = RANGES[field];
    let n = parseInt((vdc[inputKey(field)] as string) || "0", 10);
    if (Number.isNaN(n) || n < 0) n = 0;
    if (n < min) n = min;
    if (n > max) {
      n = max;
      showHint(id, field, t(`Максимум ${max}`, `Ең көп ${max}`));
    }
    updateVdc(id, { [field]: n, [inputKey(field)]: String(n) } as Partial<Vdc>);
  };

  const stepField = (id: number, field: FieldKey, dir: 1 | -1) => {
    const vdc = vdcs.find((v) => v.id === id);
    if (!vdc) return;
    const { min, max, step } = RANGES[field];
    let next = (vdc[field] as number) + dir * step;
    if (next < min) next = min;
    if (next > max) next = max;
    updateVdc(id, { [field]: next, [inputKey(field)]: String(next) } as Partial<Vdc>);
  };

  const vdcMonthly = (v: Vdc) => {
    const cluster = getCluster(v.city, v.clusterId);
    const p = cluster.prices;
    const hddCost = p.hdd !== null ? v.hdd * p.hdd : 0;
    return (
      v.cpu * p.cpu +
      v.ram * p.ram +
      v.ssd * p.ssd +
      hddCost +
      v.ip * p.ip +
      v.veeam * p.veeam +
      v.archive * p.archive
    );
  };

  const totalMonthly = useMemo(
    () => vdcs.reduce((s, v) => s + vdcMonthly(v), 0),
    [vdcs],
  );

  const discount = CALC_DISCOUNT_ENABLED ? CALC_DISCOUNT[period] : 0;
  const periodTotal = totalMonthly * period * (1 - discount);
  const periodSaving = totalMonthly * period * discount;
  const periodLabelRu = period === 1 ? "Итого за 1 месяц" : `Итого за ${period} мес.`;
  const periodLabelKz = period === 1 ? "1 айға барлығы" : `${period} айға барлығы`;

  const orderIssues = useMemo(() => {
    const issues: string[] = [];
    vdcs.forEach((v, idx) => {
      const cl = getCluster(v.city, v.clusterId);
      const hddAvail = cl.prices.hdd !== null;
      const noDisks = v.ssd === 0 && (!hddAvail || v.hdd === 0);
      if (noDisks) {
        issues.push(
          t(
            `Виртуальный дата‑центр ${idx + 1}: добавьте хотя бы 1 ГБ vSSD${hddAvail ? " или vHDD" : ""}.`,
            `Виртуалды дата-орталық ${idx + 1}: кемінде 1 ГБ vSSD${hddAvail ? " немесе vHDD" : ""} қосыңыз.`,
          ),
        );
      }
      if (v.veeam > 0 && v.archive === 0) {
        issues.push(
          t(
            `Виртуальный дата‑центр ${idx + 1}: для Veeam Backup укажите объём архивного диска.`,
            `Виртуалды дата-орталық ${idx + 1}: Veeam Backup үшін архивтік диск көлемін көрсетіңіз.`,
          ),
        );
      }
      if (v.veeam === 0 && v.archive > 0) {
        issues.push(
          t(
            `Виртуальный дата‑центр ${idx + 1}: для архивного диска добавьте лицензию Veeam Backup.`,
            `Виртуалды дата-орталық ${idx + 1}: архивтік диск үшін Veeam Backup лицензиясын қосыңыз.`,
          ),
        );
      }
    });
    return issues;
  }, [vdcs, t]);
  const canOrder = orderIssues.length === 0;

  const buildSubject = () => {
    const parts: string[] = ["Заказ облачного сервера (VMware Cloud Director):"];
    vdcs.forEach((v, idx) => {
      const loc = getLocation(v.city);
      const cl = getCluster(v.city, v.clusterId);
      const seg = [
        `Виртуальный дата‑центр ${idx + 1}: ${loc.nameRu} / ${cl.name}`,
        `vCPU ${v.cpu}`,
        `vRAM ${v.ram} ГБ`,
        `vSSD ${v.ssd} ГБ`,
      ];
      if (cl.prices.hdd !== null && v.hdd > 0) seg.push(`vHDD ${v.hdd} ГБ`);
      seg.push(`IP ${v.ip}`);
      if (v.veeam > 0) seg.push(`Veeam ${v.veeam} шт.`);
      if (v.archive > 0) seg.push(`Архив ${v.archive} ГБ`);
      seg.push(`${formatPrice(vdcMonthly(v))}/мес`);
      parts.push(seg.join(" | "));
    });
    parts.push(`Срок: ${period} мес.`);
    if (discount > 0) parts.push(`Скидка: ${Math.round(discount * 100)}%`);
    parts.push(`Итого: ${formatPrice(periodTotal)} за ${period} мес.`);
    return parts.join(" || ");
  };

  const orderClick = () => {
    if (!canOrder) return;
    openConsultationModalWith({ subject: buildSubject() });
  };

  return (
    <>
      <section className="calc-section" id="iaas-calculator">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">{t("Конструктор", "Құрастырғыш")}</span>
            <h2>{t("Конфигуратор виртуального дата‑центра", "Виртуалды дата-орталығының конфигураторы")}</h2>
            <p>
              {t(
                "Соберите конфигурацию под свою задачу — добавляйте несколько VDC в один заказ",
                "Тапсырмаңызға сай конфигурацияны жинақтаңыз — бір тапсырысқа бірнеше VDC қосыңыз",
              )}
            </p>
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
                  {d > 0 && <span className="plan-discount-badge">−{Math.round(d * 100)}%</span>}
                </button>
              );
            })}
          </div>

          <div className="calc-grid">
            <div className="calc-form">
              {vdcs.map((v, idx) => {
                const cluster = getCluster(v.city, v.clusterId);
                const hddAvail = cluster.prices.hdd !== null;
                const monthly = vdcMonthly(v);
                return (
                  <div key={v.id} className="vdc-card">
                    <div className="vdc-card__header">
                      <h3>{t(`Виртуальный дата‑центр ${idx + 1}`, `Виртуалды дата-орталық ${idx + 1}`)}</h3>
                      {vdcs.length > 1 && (
                        <button
                          type="button"
                          className="vdc-remove-btn"
                          onClick={() => removeVdc(v.id)}
                          title={t("Удалить", "Жою")}
                        >
                          <CloseIcon width={18} height={18} />
                        </button>
                      )}
                    </div>

                    <div className="calc-field">
                      <label className="calc-field-label">{t("Локация", "Орналасу")}</label>
                      <div className="vdc-tabs">
                        {LOCATIONS.map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            className={`vdc-tab${v.city === loc.id ? " is-active" : ""}`}
                            onClick={() => onCityChange(v.id, loc.id)}
                          >
                            {t(loc.nameRu, loc.nameKz)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="calc-field">
                      <label className="calc-field-label">{t("Кластер", "Кластер")}</label>
                      <div className="vdc-tabs vdc-tabs--clusters">
                        {getLocation(v.city).clusters.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            className={`vdc-tab${v.clusterId === c.id ? " is-active" : ""}`}
                            onClick={() => onClusterChange(v.id, c.id)}
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <ResourceRow
                      icon={<Cpu size={20} strokeWidth={1.8} />}
                      label={t(`vCPU (${cluster.cpuFreq})`, `vCPU (${cluster.cpuFreq})`)}
                      hint={t(`${cluster.prices.cpu} ₸ за ядро`, `ядро үшін ${cluster.prices.cpu} ₸`)}
                      unit="vCPU"
                      input={v.iCpu}
                      onMinus={() => stepField(v.id, "cpu", -1)}
                      onPlus={() => stepField(v.id, "cpu", 1)}
                      onChange={onInputChange(v.id, "cpu")}
                      onBlur={() => commitField(v.id, "cpu")}
                      flash={hint && hint.vdcId === v.id && hint.field === "cpu" ? hint.text : null}
                    />
                    <ResourceRow
                      icon={<MemoryStick size={20} strokeWidth={1.8} />}
                      label={t("vRAM", "vRAM")}
                      hint={t(`${cluster.prices.ram} ₸ за 1 ГБ`, `1 ГБ үшін ${cluster.prices.ram} ₸`)}
                      unit={t("ГБ", "ГБ")}
                      input={v.iRam}
                      onMinus={() => stepField(v.id, "ram", -1)}
                      onPlus={() => stepField(v.id, "ram", 1)}
                      onChange={onInputChange(v.id, "ram")}
                      onBlur={() => commitField(v.id, "ram")}
                      flash={hint && hint.vdcId === v.id && hint.field === "ram" ? hint.text : null}
                    />
                    <ResourceRow
                      icon={<HardDrive size={20} strokeWidth={1.8} />}
                      label={t("vSSD", "vSSD")}
                      hint={t(`${cluster.prices.ssd} ₸ за 1 ГБ`, `1 ГБ үшін ${cluster.prices.ssd} ₸`)}
                      unit={t("ГБ", "ГБ")}
                      input={v.iSsd}
                      onMinus={() => stepField(v.id, "ssd", -1)}
                      onPlus={() => stepField(v.id, "ssd", 1)}
                      onChange={onInputChange(v.id, "ssd")}
                      onBlur={() => commitField(v.id, "ssd")}
                      flash={hint && hint.vdcId === v.id && hint.field === "ssd" ? hint.text : null}
                    />
                    {hddAvail ? (
                      <ResourceRow
                        icon={<Database size={20} strokeWidth={1.8} />}
                        label={t("vHDD", "vHDD")}
                        hint={t(`${cluster.prices.hdd} ₸ за 1 ГБ`, `1 ГБ үшін ${cluster.prices.hdd} ₸`)}
                        unit={t("ГБ", "ГБ")}
                        input={v.iHdd}
                        onMinus={() => stepField(v.id, "hdd", -1)}
                        onPlus={() => stepField(v.id, "hdd", 1)}
                        onChange={onInputChange(v.id, "hdd")}
                        onBlur={() => commitField(v.id, "hdd")}
                        flash={hint && hint.vdcId === v.id && hint.field === "hdd" ? hint.text : null}
                      />
                    ) : (
                      <div className="vdc-unavailable">
                        <Database size={18} strokeWidth={1.8} />
                        <span>{t("vHDD недоступен в этом кластере", "Бұл кластерде vHDD қолжетімсіз")}</span>
                      </div>
                    )}
                    <ResourceRow
                      icon={<Globe size={20} strokeWidth={1.8} />}
                      label={t("IP адреса", "IP мекенжайлары")}
                      hint={t(`${cluster.prices.ip} ₸ за 1 IP`, `1 IP үшін ${cluster.prices.ip} ₸`)}
                      unit="IP"
                      input={v.iIp}
                      onMinus={() => stepField(v.id, "ip", -1)}
                      onPlus={() => stepField(v.id, "ip", 1)}
                      onChange={onInputChange(v.id, "ip")}
                      onBlur={() => commitField(v.id, "ip")}
                      flash={hint && hint.vdcId === v.id && hint.field === "ip" ? hint.text : null}
                    />
                    <ResourceRow
                      icon={<Shield size={20} strokeWidth={1.8} />}
                      label={t("Veeam Backup", "Veeam Backup")}
                      hint={t(`${cluster.prices.veeam} ₸ за 1 ВМ`, `1 ВМ үшін ${cluster.prices.veeam} ₸`)}
                      unit={t("шт.", "дана")}
                      input={v.iVeeam}
                      onMinus={() => stepField(v.id, "veeam", -1)}
                      onPlus={() => stepField(v.id, "veeam", 1)}
                      onChange={onInputChange(v.id, "veeam")}
                      onBlur={() => commitField(v.id, "veeam")}
                      flash={hint && hint.vdcId === v.id && hint.field === "veeam" ? hint.text : null}
                    />
                    {v.veeam === 0 && v.archive > 0 && (
                      <div className="calc-pair-warning">
                        {t(
                          "Для работы архивного диска требуется Veeam Backup — добавьте хотя бы одну лицензию.",
                          "Архивтік дискті пайдалану үшін Veeam Backup қажет — кемінде бір лицензия қосыңыз."
                        )}
                      </div>
                    )}
                    <ResourceRow
                      icon={<Archive size={20} strokeWidth={1.8} />}
                      label={t("Архивный диск", "Архивтік диск")}
                      hint={t(`${cluster.prices.archive} ₸ за 1 ГБ`, `1 ГБ үшін ${cluster.prices.archive} ₸`)}
                      unit={t("ГБ", "ГБ")}
                      input={v.iArchive}
                      onMinus={() => stepField(v.id, "archive", -1)}
                      onPlus={() => stepField(v.id, "archive", 1)}
                      onChange={onInputChange(v.id, "archive")}
                      onBlur={() => commitField(v.id, "archive")}
                      flash={hint && hint.vdcId === v.id && hint.field === "archive" ? hint.text : null}
                    />
                    {v.veeam > 0 && v.archive === 0 && (
                      <div className="calc-pair-warning">
                        {t(
                          "Veeam Backup сохраняет резервные копии на архивный диск — укажите его объём.",
                          "Veeam Backup сақтық көшірмелерді архивтік дискіге сақтайды — оның көлемін көрсетіңіз."
                        )}
                      </div>
                    )}

                    <div className="vdc-card__footer">
                      <span>{t("Стоимость VDC за 1 мес.", "Виртуалды дата-орталығының құны 1 айға")}</span>
                      <strong>{formatPrice(monthly)}</strong>
                    </div>
                  </div>
                );
              })}

              <button type="button" className="btn-add-vdc" onClick={addVdc}>
                + {t("Добавить дата‑центр", "Дата-орталық қосу")}
              </button>
            </div>

            <div className="calc-summary">
              <div className="summary-card">
                <div className="summary-header">{t("Ваша конфигурация", "Сіздің конфигурацияңыз")}</div>
                <div className="summary-body">
                  {vdcs.map((v, idx) => (
                    <VdcSummary key={v.id} vdc={v} index={idx} />
                  ))}
                </div>
                <div className="summary-footer">
                  <div className="summary-total-row">
                    <span className="summary-total-label">{t(periodLabelRu, periodLabelKz)}</span>
                    <span className="summary-total-amount">{formatPrice(periodTotal)}</span>
                  </div>
                  {periodSaving > 0 && (
                    <div className="plan-saving" style={{ marginTop: 4 }}>
                      {t(`Экономия: ${formatPrice(periodSaving)}`, `Үнемдеу: ${formatPrice(periodSaving)}`)}
                    </div>
                  )}
                  <p className="summary-vat">{t("Цены указаны без учёта НДС", "Бағалар ҚҚС-сыз көрсетілген")}</p>
                  {!canOrder && (
                    <div className="calc-order-block">
                      {orderIssues.map((msg, i) => (
                        <div key={i}>{msg}</div>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary calc-order-btn"
                    onClick={orderClick}
                    disabled={!canOrder}
                    aria-disabled={!canOrder}
                  >
                    {t("Заказать", "Тапсырыс беру")}
                  </button>
                </div>
              </div>
              <Recommendation />
              <CalculatorDisclaimer />
            </div>
          </div>
        </div>
      </section>

      <div ref={mobileBarRef} className={`mobile-calc-bar${barVisible ? " is-visible" : ""}`}>
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
            {vdcs.map((v, idx) => (
              <VdcSummary key={v.id} vdc={v} index={idx} />
            ))}
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-light)", marginTop: 8 }}>
              {t("Цены без учета НДС", "Бағалар ҚҚС-сыз")}
            </p>
          </div>
          <Recommendation />
          <CalculatorDisclaimer />
        </div>
        {!canOrder && (
          <div className="calc-order-block calc-order-block--mobile">
            {orderIssues.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </div>
        )}
        <div className="mobile-bar-main">
          <div className="mobile-bar-left">
            <div className="mobile-bar-label">{t(periodLabelRu, periodLabelKz)}</div>
            <div className="mobile-bar-price">{formatPrice(periodTotal)}</div>
            {periodSaving > 0 && (
              <div className="plan-saving" style={{ fontSize: "0.7rem" }}>
                −{formatPrice(periodSaving)}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary calc-order-btn"
            onClick={orderClick}
            disabled={!canOrder}
            aria-disabled={!canOrder}
          >
            {t("Заказать", "Тапсырыс беру")}
          </button>
        </div>
      </div>
    </>
  );
}

function ResourceRow({
  icon,
  label,
  hint,
  unit,
  input,
  onMinus,
  onPlus,
  onChange,
  onBlur,
  flash,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  unit: string;
  input: string;
  onMinus: () => void;
  onPlus: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  flash: string | null;
}) {
  return (
    <div className="vps-resource">
      <div className="vps-resource-head">
        <span className="vps-resource-icon">{icon}</span>
        <div className="vps-resource-text">
          <div className="vps-resource-label">{label}</div>
          <div className="vps-resource-hint">{hint}</div>
        </div>
      </div>
      <div className="vps-resource-control">
        <button type="button" className="calc-counter-btn" onClick={onMinus}>−</button>
        <div className="vps-resource-input-wrap">
          <input
            type="text"
            inputMode="numeric"
            className="vps-resource-input"
            value={input}
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
      {flash && <div className="vps-resource-flash">{flash}</div>}
    </div>
  );
}

function Recommendation() {
  const t = useT();
  return (
    <div className="calc-recommendation">
      <div className="calc-recommendation__title">
        {t("Рекомендуем также предусмотреть место:", "Сонымен қатар орын қарастырыңыз:")}
      </div>
      <ul className="calc-recommendation__list">
        <li>
          {t(
            "• Под ISO-образы для установки и обслуживания виртуальной машины",
            "• Виртуалды машинаны орнату және қызмет көрсетуге арналған ISO-бейнелер үшін",
          )}
        </li>
        <li>
          {t(
            "• Под снапшоты, если планируете их использовать",
            "• Снапшоттарды пайдалануды жоспарласаңыз, оларға арналған",
          )}
        </li>
      </ul>
    </div>
  );
}

function VdcSummary({ vdc, index }: { vdc: Vdc; index: number }) {
  const t = useT();
  const loc = getLocation(vdc.city);
  const cluster = getCluster(vdc.city, vdc.clusterId);
  const p = cluster.prices;
  type Line = { label: string; qty: string; price: number };
  const lines: Line[] = [
    { label: "vCPU", qty: `${vdc.cpu} × ${formatPrice(p.cpu)}`, price: vdc.cpu * p.cpu },
    { label: "vRAM", qty: `${vdc.ram} ГБ × ${formatPrice(p.ram)}`, price: vdc.ram * p.ram },
    { label: "vSSD", qty: `${vdc.ssd} ГБ × ${formatPrice(p.ssd)}`, price: vdc.ssd * p.ssd },
  ];
  if (p.hdd !== null && vdc.hdd > 0) {
    lines.push({ label: "vHDD", qty: `${vdc.hdd} ГБ × ${formatPrice(p.hdd)}`, price: vdc.hdd * p.hdd });
  }
  lines.push({ label: "IP", qty: `${vdc.ip} × ${formatPrice(p.ip)}`, price: vdc.ip * p.ip });
  if (vdc.veeam > 0) {
    lines.push({ label: "Veeam", qty: `${vdc.veeam} × ${formatPrice(p.veeam)}`, price: vdc.veeam * p.veeam });
  }
  if (vdc.archive > 0) {
    lines.push({
      label: t("Архив", "Архив"),
      qty: `${vdc.archive} ГБ × ${formatPrice(p.archive)}`,
      price: vdc.archive * p.archive,
    });
  }
  const sum = lines.reduce((s, l) => s + l.price, 0);

  return (
    <div className="summary-category iaas-summary">
      <div className="iaas-summary__head">
        <div className="iaas-summary__title">
          {t(`Виртуальный дата‑центр ${index + 1}`, `Виртуалды дата-орталық ${index + 1}`)}
        </div>
        <div className="iaas-summary__meta">
          {t(loc.nameRu, loc.nameKz)} · {cluster.name}
        </div>
      </div>
      <ul className="iaas-summary__list">
        {lines.map((l, i) => (
          <li key={i} className="iaas-summary__item">
            <span className="iaas-summary__label">{l.label}</span>
            <span className="iaas-summary__qty">{l.qty}</span>
            <span className="iaas-summary__price">{formatPrice(l.price)}</span>
          </li>
        ))}
      </ul>
      <div className="iaas-summary__subtotal">
        <span>{t("Итого за месяц", "Айға барлығы")}</span>
        <strong>{formatPrice(sum)}</strong>
      </div>
    </div>
  );
}
