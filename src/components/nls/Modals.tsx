import { useCity, type CityKey } from "@/lib/city-context";
import { CloseIcon } from "./Icons";
import { LeadForm } from "@/components/forms/LeadForm";
import { useEffect } from "react";

const CITY_OPTIONS: { key: CityKey; label: string }[] = [
  { key: "Almaty", label: "Алматы" },
  { key: "Astana", label: "Астана" },
  { key: "Shymkent", label: "Шымкент" },
  { key: "Other", label: "Другие города" },
];

export function Modals() {
  const { modal, closeModals, cityKey, setCity, consultation } = useCity();

  useEffect(() => {
    if (!modal.city && !modal.consultation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModals();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeModals]);

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

          {modal.consultation && (
            <LeadForm
              key={consultation.subject ?? "modal"}
              formName={
                consultation.subject
                  ? `Модальное окно — ${consultation.subject}`
                  : "Модальное окно — консультация"
              }
              action="consultation_modal"
              idPrefix="modal"
              companyLabel="Название компании или ИИН/БИН"
              messageLabel="Комментарий (необязательно)"
              messageFieldKey="Комментарий"
              messageRows={2}
              defaultMessage={consultation.subject ?? undefined}
              subject={consultation.subject ?? undefined}
              onSuccess={closeModals}
            />
          )}
        </div>
      </div>
    </>
  );
}
