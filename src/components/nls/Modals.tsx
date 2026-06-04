import { useCity, type CityKey } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { CloseIcon } from "./Icons";
import { LeadForm } from "@/components/forms/LeadForm";
import { useEffect } from "react";

export function Modals() {
  const { modal, closeModals, cityKey, setCity, consultation } = useCity();
  const t = useT();

  const CITY_OPTIONS: { key: CityKey; label: string }[] = [
    { key: "Almaty", label: t("Алматы", "Алматы") },
    { key: "Astana", label: t("Астана", "Астана") },
    { key: "Shymkent", label: t("Шымкент", "Шымкент") },
    { key: "Other", label: t("Другие города", "Басқа қалалар") },
  ];

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
          <span className="close-modal" onClick={closeModals} role="button" aria-label={t("Закрыть", "Жабу")}>
            ×
          </span>
          <h3 style={{ marginBottom: 10 }}>{t("Выберите ваш город", "Қалаңызды таңдаңыз")}</h3>
          <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
            {t(
              "Контактная информация будет обновлена в зависимости от выбранного города.",
              "Байланыс ақпараты таңдалған қалаға қарай жаңартылады."
            )}
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
          <button type="button" className="close-modal" onClick={closeModals} aria-label={t("Закрыть", "Жабу")}>
            <CloseIcon />
          </button>

          <div className="modal-header">
            <h3>{t("Оставить заявку", "Өтінім қалдыру")}</h3>
            <p>{t("Заполните форму, и наш менеджер свяжется с вами в течение 15 минут в рабочее время.", "Форманы толтырыңыз, менеджеріміз жұмыс уақытында 15 минут ішінде байланысады.")}</p>
          </div>

          {modal.consultation && (() => {
            const showAddress =
              typeof window !== "undefined" &&
              (window.location.pathname.startsWith("/internet") ||
                window.location.hostname === "internet.nls.kz");
            return (
              <LeadForm
                key={consultation.subject ?? "modal"}
                formName={
                  consultation.subject
                    ? `Модальное окно — ${consultation.subject}`
                    : "Модальное окно — консультация"
                }
                action="consultation_modal"
                idPrefix="modal"
                companyLabel={t("Название компании или ИИН/БИН", "Компания атауы немесе ЖСН/БСН")}
                messageLabel={t("Комментарий (необязательно)", "Пікір (міндетті емес)")}
                messageFieldKey="Комментарий"
                messageRows={2}
                defaultMessage={consultation.subject ?? undefined}
                subject={consultation.subject ?? undefined}
                onSuccess={closeModals}
                showAddress={showAddress}
              />
            );
          })()}

        </div>
      </div>
    </>
  );
}
