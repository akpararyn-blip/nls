import { useMemo, useState, type ChangeEvent } from "react";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { HardDrive } from "lucide-react";

const STEPS: number[] = [
  1, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
  2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
];
const PRESETS: number[] = [100, 500, 1000, 5000, 10000];

type Discount = { months: number; percent: number };
type Period = number;

interface StorageCalculatorProps {
  storageId: "object" | "cloud";
  pricePerGb: number;
  discounts?: Discount[];
}

function formatPrice(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₸";
}

function nearestStepIndex(value: number) {
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < STEPS.length; i++) {
    const d = Math.abs(STEPS[i] - value);
    if (d < bestDiff) {
      bestDiff = d;
      best = i;
    }
  }
  return best;
}

export function StorageCalculator({ storageId, pricePerGb, discounts }: StorageCalculatorProps) {
  const t = useT();
  const { openConsultationModalWith } = useCity();
  const [volume, setVolume] = useState<number>(1);
  const [rawInput, setRawInput] = useState<string>("1");
  const [period, setPeriod] = useState<Period>(1);

  const periods: Period[] = useMemo(() => {
    const base: Period[] = [1];
    if (discounts) discounts.forEach((d) => base.push(d.months));
    return base;
  }, [discounts]);

  const discountPercent = useMemo(() => {
    if (!discounts || period === 1) return 0;
    return discounts.find((d) => d.months === period)?.percent ?? 0;
  }, [discounts, period]);

  const monthly = volume * pricePerGb;
  const grossPeriod = monthly * period;
  const discountAmount = grossPeriod * (discountPercent / 100);
  const netPeriod = grossPeriod - discountAmount;
  const effectiveMonthly = netPeriod / period;

  const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    const v = STEPS[idx];
    setVolume(v);
    setRawInput(String(v));
  };

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setRawInput(raw);
    let n = parseInt(raw || "0", 10);
    if (Number.isNaN(n)) n = 1;
    if (n < 1) n = 1;
    if (n > 10000) n = 10000;
    setVolume(n);
  };

  const onNumberBlur = () => {
    let n = parseInt(rawInput || "0", 10);
    if (Number.isNaN(n) || n < 1) n = 1;
    if (n > 10000) n = 10000;
    setVolume(n);
    setRawInput(String(n));
  };

  const setPreset = (v: number) => {
    setVolume(v);
    setRawInput(String(v));
  };

  const sliderIndex = nearestStepIndex(volume);

  const subject = () => {
    const label =
      storageId === "object"
        ? "Заказ объектного хранилища S3"
        : "Заказ облачного хранилища";
    const parts = [
      label,
      `Объём: ${volume} ГБ`,
      `Тариф: ${formatPrice(pricePerGb)}/ГБ в месяц`,
      `Срок: ${period} мес.`,
    ];
    if (discountPercent > 0) parts.push(`Скидка: ${discountPercent}%`);
    parts.push(`Итого: ${formatPrice(netPeriod)} за ${period} мес.`);
    return parts.join(" || ");
  };

  return (
    <div className="storage-calc">
      <div className="storage-calc__controls">
        <div className="storage-calc__head">
          <div className="storage-calc__head-icon">
            <HardDrive size={22} strokeWidth={1.8} />
          </div>
          <div>
            <div className="storage-calc__title">
              {t("Объём хранилища", "Сақтау орнының көлемі")}
            </div>
            <div className="storage-calc__sub">
              {t(
                `Тариф ${formatPrice(pricePerGb)} за 1 ГБ в месяц`,
                `Тариф айына 1 ГБ үшін ${formatPrice(pricePerGb)}`,
              )}
            </div>
          </div>
        </div>

        <div className="storage-calc__inputs">
          <input
            type="range"
            min={0}
            max={STEPS.length - 1}
            step={1}
            value={sliderIndex}
            onChange={onSliderChange}
            className="storage-calc__slider"
            aria-label={t("Объём в ГБ", "ГБ-тегі көлемі")}
          />
          <div className="storage-calc__slider-scale" aria-hidden="true">
            <span>1</span>
            <span>1 000</span>
            <span>5 000</span>
            <span>10 000</span>
          </div>

          <div className="storage-calc__number">
            <input
              type="text"
              inputMode="numeric"
              value={rawInput}
              onChange={onNumberChange}
              onBlur={onNumberBlur}
              aria-label={t("Точный объём в ГБ", "ГБ-тегі нақты көлем")}
            />
            <span>{t("ГБ", "ГБ")}</span>
          </div>
        </div>

        <div className="storage-calc__presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className={`storage-calc__preset${volume === p ? " is-active" : ""}`}
              onClick={() => setPreset(p)}
            >
              {p.toLocaleString("ru-RU")} {t("ГБ", "ГБ")}
            </button>
          ))}
        </div>

        {discounts && discounts.length > 0 && (
          <div className="storage-calc__period" role="tablist">
            {periods.map((p) => {
              const d = discounts.find((x) => x.months === p)?.percent ?? 0;
              return (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={period === p}
                  className={`storage-calc__period-btn${period === p ? " is-active" : ""}`}
                  onClick={() => setPeriod(p)}
                >
                  {p === 1
                    ? t("1 месяц", "1 ай")
                    : t(`${p} месяцев`, `${p} ай`)}
                  {d > 0 && <span className="storage-calc__period-badge">−{d}%</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="storage-calc__result">
        <div className="storage-calc__result-row">
          <span>{t("Объём", "Көлем")}</span>
          <strong>{volume.toLocaleString("ru-RU")} {t("ГБ", "ГБ")}</strong>
        </div>
        <div className="storage-calc__result-row">
          <span>{t("В месяц", "Айына")}</span>
          <strong>{formatPrice(monthly)}</strong>
        </div>
        {discountPercent > 0 && (
          <div className="storage-calc__result-row storage-calc__result-row--muted">
            <span>{t("Скидка", "Жеңілдік")}</span>
            <strong>−{formatPrice(discountAmount)}</strong>
          </div>
        )}
        <div className="storage-calc__result-total">
          <span>
            {period === 1
              ? t("Итого за 1 месяц", "1 айға барлығы")
              : t(`Итого за ${period} мес.`, `${period} айға барлығы`)}
          </span>
          <strong>{formatPrice(netPeriod)}</strong>
        </div>
        {period > 1 && (
          <div className="storage-calc__result-eq">
            {t(
              `Эквивалент ${formatPrice(effectiveMonthly)}/мес`,
              `Айына ${formatPrice(effectiveMonthly)} баламасы`,
            )}
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary storage-calc__cta"
          onClick={() => openConsultationModalWith({ subject: subject() })}
        >
          {t("Заказать", "Тапсырыс беру")}
        </button>
      </div>
    </div>
  );
}
