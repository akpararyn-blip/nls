import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, X, PhoneCall } from "lucide-react";
import { useCity } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";

const PHONE_TEL = "+77003397777";
const PHONE_DISPLAY = "+7 700 339 7777";
const WHATSAPP_SALES_URL = "https://wa.me/77007304591";
const WHATSAPP_SALES_DISPLAY = "+7 700 730 4591";
const WHATSAPP_SUPPORT_URL = "https://wa.me/77003397777";
const WHATSAPP_SUPPORT_DISPLAY = "+7 700 339 7777";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openConsultationModalWith } = useCity();
  const t = useT();

  useEffect(() => {
    const onScroll = () => {
      setPulse(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setPulse(true), 2000);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCallback = () => {
    setOpen(false);
    openConsultationModalWith({
      subject: t("Обратный звонок", "Кері қоңырау"),
    });
  };

  return (
    <div className="float-contact" aria-live="polite">
      {open && (
        <div className="float-contact-menu" role="menu">
          <a
            href={`tel:${PHONE_TEL}`}
            className="float-contact-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="float-contact-icon float-contact-icon--call">
              <Phone size={18} strokeWidth={2.2} />
            </span>
            <span className="float-contact-text">
              <strong>{t("Позвонить", "Қоңырау шалу")}</strong>
              <small>{PHONE_DISPLAY}</small>
            </span>
          </a>
          <a
            href={WHATSAPP_SALES_URL}
            target="_blank"
            rel="noreferrer"
            className="float-contact-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="float-contact-icon float-contact-icon--wa">
              <MessageCircle size={18} strokeWidth={2.2} />
            </span>
            <span className="float-contact-text">
              <strong>{t("WhatsApp · Отдел продаж", "WhatsApp · Сату бөлімі")}</strong>
              <small>{WHATSAPP_SALES_DISPLAY}</small>
            </span>
          </a>
          <a
            href={WHATSAPP_SUPPORT_URL}
            target="_blank"
            rel="noreferrer"
            className="float-contact-item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <span className="float-contact-icon float-contact-icon--wa">
              <MessageCircle size={18} strokeWidth={2.2} />
            </span>
            <span className="float-contact-text">
              <strong>{t("WhatsApp · Техподдержка", "WhatsApp · Техқолдау")}</strong>
              <small>{WHATSAPP_SUPPORT_DISPLAY}</small>
            </span>
          </a>
          <button
            type="button"
            className="float-contact-item float-contact-item--btn"
            role="menuitem"
            onClick={handleCallback}
          >
            <span className="float-contact-icon float-contact-icon--callback">
              <PhoneCall size={18} strokeWidth={2.2} />
            </span>
            <span className="float-contact-text">
              <strong>{t("Заказать обратный звонок", "Кері қоңырауға тапсырыс беру")}</strong>
              <small>{t("Перезвоним за 5 минут", "5 минут ішінде қайта қоңырау шаламыз")}</small>
            </span>
          </button>
        </div>
      )}

      <button
        type="button"
        className={`float-contact-btn${pulse && !open ? " is-pulsing" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("Закрыть меню связи", "Байланыс мәзірін жабу") : t("Связаться с нами", "Бізбен байланысу")}
        aria-expanded={open}
      >
        {open ? <X size={24} strokeWidth={2.2} /> : <Phone size={24} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
