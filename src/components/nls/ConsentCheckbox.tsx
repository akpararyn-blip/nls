import type { ChangeEvent } from "react";

interface Props {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  variant?: "light" | "dark";
}

export function ConsentCheckbox({ id, checked, onChange, variant = "light" }: Props) {
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
        Отправляя форму, я даю согласие на{" "}
        <a href="/privacy" target="_blank" rel="noreferrer">
          обработку персональных данных
        </a>
        .
      </span>
    </label>
  );
}
