import { Link } from "@tanstack/react-router";
import { useCity } from "@/lib/city-context";
import { ChevronDownIcon, CloseIcon, GlobeIcon, PinIcon } from "./Icons";
import logoUrl from "@/assets/logo.svg";
import { useState } from "react";

export function MobileNav() {
  const { city, mobileNavOpen, setMobileNavOpen, openCityModal } = useCity();
  const [servicesOpen, setServicesOpen] = useState(false);

  const close = () => setMobileNavOpen(false);

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
      </div>
      <ul>
        <li>
          <a
            href="#"
            className="mobile-services-toggle"
            style={{ display: "flex", justifyContent: "space-between" }}
            onClick={(e) => {
              e.preventDefault();
              setServicesOpen((s) => !s);
            }}
          >
            Услуги <ChevronDownIcon width={16} height={16} />
          </a>
          <ul className={`sub-menu${servicesOpen ? " open" : ""}`}>
            <li>
              <Link to="/internet" onClick={close}>
                Интернет для бизнеса
              </Link>
            </li>
            <li>
              <a href="https://nlsit.kz" target="_blank" rel="noopener noreferrer">
                IT аутсорсинг
              </a>
            </li>
            <li>
              <Link to="/it-sks" onClick={close}>
                СКС. Монтаж сетей
              </Link>
            </li>
            <li>
              <Link to="/dedicated" onClick={close}>
                Аренда сервера Dedicated
              </Link>
            </li>
            <li>
              <Link to="/vps" onClick={close}>
                Виртуальный сервер VPS
              </Link>
            </li>
            <li>
              <Link to="/colocation" onClick={close}>
                Размещение в ЦОД
              </Link>
            </li>
            <li>
              <Link to="/colocation-full" onClick={close}>
                Аренда серверного шкафа
              </Link>
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
          <a href="#" onClick={close}>
            Услуги для физ. лиц
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
