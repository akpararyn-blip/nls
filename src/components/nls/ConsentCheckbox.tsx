import type { ChangeEvent } from "react";
import { useT } from "@/lib/lang-context";

interface Props {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  variant?: "light" | "dark";
}

export function ConsentCheckbox({ id, checked, onChange, variant = "light" }: Props) {
  const t = useT();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked);
  return (
    <label className={`consent-checkbox consent-checkbox--${variant}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        required
      />
      <span className="consent-box" aria-hidden="true" />
      <span className="consent-text">
        {t("Отправляя форму, я даю согласие на ", "Форманы жіберу арқылы мен ")}
        <a href="/privacy" target="_blank" rel="noreferrer">
          {t("обработку персональных данных", "дербес деректерді өңдеуге келісім беремін")}
        </a>
        .
      </span>
    </label>
  );
}
