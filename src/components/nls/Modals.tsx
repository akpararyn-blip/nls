import { useCity, type CityKey } from "@/lib/city-context";
import { CloseIcon, SendIcon } from "./Icons";
import { useEffect, type FormEvent } from "react";

const CITY_OPTIONS: { key: CityKey; label: string }[] = [
  { key: "Almaty", label: "Алматы" },
  { key: "Astana", label: "Астана" },
  { key: "Shymkent", label: "Шымкент" },
  { key: "Other", label: "Другие города" },
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^7?/, "");
  const m = digits.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  if (!m) return "+7";
  const [, a, b, c, d] = m;
  return "+7 " + (a || "") + (b ? " " + b : "") + (c ? "-" + c : "") + (d ? "-" + d : "");
}

export function Modals() {
  const { modal, closeModals, cityKey, setCity, consultation } = useCity();

  // Close on Escape
  useEffect(() => {
    if (!modal.city && !modal.consultation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModals();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeModals]);

  const onPhoneInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = formatPhone(input.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Здесь будет реальная отправка заявки. Сейчас просто имитация.
    closeModals();
    alert("Спасибо! Менеджер свяжется с вами в течение 15 минут.");
  };

  return (
    <>
      {/* City Modal */}
      <div
        className={`modal-overlay${modal.city ? " active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModals();
        }}
      >
        <div className="modal-content">
          <span className="close-modal" onClick={closeModals} role="button" aria-label="Закрыть">
            ×
          </span>
          <h3 style={{ marginBottom: 10 }}>Выберите ваш город</h3>
          <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
            Контактная информация будет обновлена в зависимости от выбранного города.
          </p>

          <div className="city-list">
            {CITY_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                className={`city-btn${cityKey === opt.key ? " active" : ""}`}
                onClick={() => setCity(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <div
        className={`modal-overlay${modal.consultation ? " active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModals();
        }}
      >
        <div className="modal-content form-modal-content">
          <button type="button" className="close-modal" onClick={closeModals} aria-label="Закрыть">
            <CloseIcon />
          </button>

          <div className="modal-header">
            <h3>Оставить заявку</h3>
            <p>Заполните форму, и наш менеджер свяжется с вами в течение 15 минут.</p>
          </div>

          <form className="modern-form" onSubmit={onSubmit}>
            <div className="form-floating">
              <input type="text" id="modal-company" className="form-control" placeholder=" " required />
              <label htmlFor="modal-company">Название компании или ИИН/БИН</label>
            </div>
            <div className="form-floating">
              <input type="text" id="modal-name" className="form-control" placeholder=" " required />
              <label htmlFor="modal-name">Ваше имя</label>
            </div>
            <div className="form-floating">
              <input
                type="tel"
                id="modal-phone"
                className="form-control"
                placeholder=" "
                required
                onInput={onPhoneInput}
              />
              <label htmlFor="modal-phone">Номер телефона</label>
            </div>
            <div className="form-floating">
              <textarea
                id="modal-message"
                className="form-control"
                placeholder=" "
                rows={2}
                defaultValue={consultation.subject ?? ""}
                key={consultation.subject ?? "empty"}
              />
              <label htmlFor="modal-message">Комментарий (необязательно)</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Отправить заявку
              <SendIcon />
            </button>
            <p className="disclaimer">
              Нажимая кнопку, вы соглашаетесь с <a href="#">политикой конфиденциальности</a>.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
