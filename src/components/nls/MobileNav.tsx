import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCity } from "@/lib/city-context";
import { SmartLink } from "./SmartLink";
import { CloseIcon, GlobeIcon, PinIcon } from "./Icons";
import { Phone } from "lucide-react";
import logoUrl from "@/assets/logo.svg";

export function MobileNav() {
  const { city, mobileNavOpen, setMobileNavOpen, openCityModal } = useCity();

  const close = () => setMobileNavOpen(false);

  // Toggle body class so the floating contact widget can hide behind the open menu
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("mobile-nav-open");
    }
    return () => document.body.classList.remove("mobile-nav-open");
  }, [mobileNavOpen]);

  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;

  return (
    <div className={`mobile-nav${mobileNavOpen ? " active" : ""}`}>
      <div className="mobile-nav-header">
        <img src={logoUrl} alt="Logo" style={{ height: 30 }} />
        <button type="button" className="mobile-close-btn" onClick={close} aria-label="Закрыть">
          ×
        </button>
      </div>
      <div className="mobile-nav-settings">
        <div
          onClick={() => {
            close();
            openCityModal();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--color-blue)",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <PinIcon width={18} height={18} />
          <span className="display-city">{city.name}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--color-blue)",
            fontWeight: 600,
          }}
        >
          <GlobeIcon width={18} height={18} />
          RU / KZ
        </div>
        <a href={phoneHref} className="mobile-nav-phone" onClick={close}>
          <Phone size={18} strokeWidth={2} />
          <span>{city.phone}</span>
        </a>
      </div>
      <ul>
        <li>
          <div className="mobile-nav-group-title">Интернет</div>
          <ul className="mobile-nav-group">
            <li>
              <SmartLink to="/internet" onClick={close}>
                Интернет для бизнеса
              </SmartLink>
            </li>
          </ul>
        </li>
        <li>
          <div className="mobile-nav-group-title">IT услуги</div>
          <ul className="mobile-nav-group">
            <li>
              <a href="https://nlsit.kz" target="_blank" rel="noopener noreferrer" onClick={close}>
                IT аутсорсинг
              </a>
            </li>
            <li>
              <SmartLink to="/it-sks" onClick={close}>
                СКС. Монтаж сетей
              </SmartLink>
            </li>
          </ul>
        </li>
        <li>
          <div className="mobile-nav-group-title">Серверы</div>
          <ul className="mobile-nav-group">
            <li>
              <SmartLink to="/dedicated" onClick={close}>
                Dedicated сервер
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/vps" onClick={close}>
                VPS сервер
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/colocation" onClick={close}>
                Colocation
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/colocation-full" onClick={close}>
                Аренда стойки
              </SmartLink>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about" onClick={close}>
            О компании
          </Link>
        </li>
        <li>
          <Link to="/hr" onClick={close}>
            Вакансии
          </Link>
        </li>
        <li>
          <a href="https://meganet.kz" target="_blank" rel="noopener noreferrer" onClick={close}>
            Интернет для физ. лиц
          </a>
        </li>
        <li>
          <Link to="/contacts" onClick={close}>
            Контакты
          </Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={close}
        aria-label="Закрыть меню"
        style={{
          position: "absolute",
          top: 20,
          right: 70,
          background: "none",
          border: "none",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

