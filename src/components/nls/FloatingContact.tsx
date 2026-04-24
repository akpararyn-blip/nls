import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

const PHONE_TEL = "+77003397777";
const PHONE_DISPLAY = "+7 700 339 7777";
const WHATSAPP_URL = "https://wa.me/77003397777";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stop pulsing while user is scrolling, resume after 2s of idle.
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
              <strong>Позвонить</strong>
              <small>{PHONE_DISPLAY}</small>
            </span>
          </a>
          <a
            href={WHATSAPP_URL}
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
              <strong>WhatsApp</strong>
              <small>Написать в чат</small>
            </span>
          </a>
        </div>
      )}

      <button
        type="button"
        className={`float-contact-btn${pulse && !open ? " is-pulsing" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрыть меню связи" : "Связаться с нами"}
        aria-expanded={open}
      >
        {open ? <X size={24} strokeWidth={2.2} /> : <Phone size={24} strokeWidth={2.2} />}
      </button>
    </div>
  );
}
