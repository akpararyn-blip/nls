import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useCity } from "@/lib/city-context";
import { useLang } from "@/lib/lang-context";
import { SmartLink } from "./SmartLink";
import {
  ChevronDownIcon,
  ExternalIcon,
  InstagramIcon,
  LinkedinIcon,
  MenuIcon,
  PinIcon,
  YoutubeIcon,
} from "./Icons";
import {
  Wifi,
  ShieldCheck,
  Network,
  Server,
  Cloud,
  HardDrive,
  Container,
  Boxes,
  Database,
  CloudUpload,
} from "lucide-react";
import logoUrl from "@/assets/logo.svg";

export function Header() {
  const { city, openCityModal, openConsultationModal, setMobileNavOpen } = useCity();
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-left">
            <button
              type="button"
              className="city-btn-top"
              onClick={openCityModal}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <PinIcon width={16} height={16} />
              <span className="display-city">{t(city.name.ru, city.name.kz)}</span>
            </button>
            <div className="top-menu">
              <Link to="/about">{t("О компании", "Компания туралы")}</Link>
              <Link to="/hr">{t("Вакансии", "Бос жұмыс орындары")}</Link>
              <a href="https://meganet.kz" target="_blank" rel="noopener noreferrer">
                {t("Интернет для физических лиц", "Жеке тұлғаларға арналған интернет")}
              </a>
              <Link to="/contacts">{t("Контакты", "Байланыс")}</Link>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="social-icons">
              <a href="https://www.instagram.com/nlskazakhstan/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon width={18} height={18} />
              </a>
              <a href="https://www.linkedin.com/company/nlskz/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon width={18} height={18} />
              </a>
              <a
                href="https://www.youtube.com/@nlskazakhstan8630"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <YoutubeIcon width={18} height={18} />
              </a>
            </div>
            <div
              className={`lang-switcher${langOpen ? " open" : ""}`}
              ref={langRef}
            >
              <button
                type="button"
                className="lang-current"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((v) => !v);
                }}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span>{lang.toUpperCase()}</span>
                <ChevronDownIcon width={14} height={14} />
              </button>
              <div className="lang-dropdown" role="listbox">
                <div
                  role="option"
                  aria-selected={lang === "ru"}
                  onClick={() => {
                    setLang("ru");
                    setLangOpen(false);
                  }}
                >
                  <span>RU</span>
                  <span className="lang-beta">beta</span>
                </div>
                <div
                  role="option"
                  aria-selected={lang === "kz"}
                  onClick={() => {
                    setLang("kz");
                    setLangOpen(false);
                  }}
                >
                  <span>KZ</span>
                  <span className="lang-beta">beta</span>
                </div>
              </div>
            </div>
            <Link to="/login" className="btn btn-primary" style={{ padding: "4px 12px", fontSize: "0.8rem" }}>
              {t("Войти", "Кіру")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-left">
            <Link to="/" className="logo">
              <img src={logoUrl} alt="NLS Kazakhstan Logo" style={{ height: 40 }} />
            </Link>

            <nav className="main-nav">
              <ul>
                <li className="services-nav-item">
                  <button type="button" className="services-dropdown-btn modern-catalog-btn">
                    <MenuIcon className="catalog-icon" />
                    {t("Услуги", "Қызметтер")}
                    <ChevronDownIcon width={16} height={16} className="chevron-icon" />
                  </button>
                  <div className="dropdown-menu mega-menu">
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">{t("Интернет", "Интернет")}</div>
                      <SmartLink to="/internet" className="mega-menu-link">
                        <Wifi className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Интернет для бизнеса", "Бизнеске арналған интернет")}</span>
                      </SmartLink>
                    </div>
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">{t("IT услуги", "IT қызметтері")}</div>
                      <SmartLink to="/it" className="mega-menu-link">
                        <ShieldCheck className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("IT аутсорсинг", "IT аутсорсинг")}</span>
                      </SmartLink>
                      <SmartLink to="/it-sks" className="mega-menu-link">
                        <Network className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("СКС. Монтаж сетей", "ҚКЖ. Желілерді құру")}</span>
                      </SmartLink>
                    </div>
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">{t("Облачные решения", "Бұлттық шешімдер")}</div>
                      <SmartLink to="/iaas" className="mega-menu-link">
                        <Boxes className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Виртуальный дата‑центр", "Виртуалдық дата‑центр")}</span>
                      </SmartLink>
                      <SmartLink to="/vps" className="mega-menu-link">
                        <Cloud className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("VPS/VDS сервер", "VPS/VDS сервер")}</span>
                      </SmartLink>
                      <SmartLink to="/object-storage" className="mega-menu-link">
                        <Database className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Объектное хранилище S3", "S3 объектілік сақтау")}</span>
                      </SmartLink>
                      <SmartLink to="/cloud-storage" className="mega-menu-link">
                        <CloudUpload className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Облачное хранилище", "Бұлттық сақтау")}</span>
                      </SmartLink>
                    </div>
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">{t("Услуги дата-центра", "Дата-орталық қызметтері")}</div>
                      <SmartLink to="/colocation" className="mega-menu-link">
                        <HardDrive className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Размещение сервера", "Серверді орналастыру")}</span>
                      </SmartLink>
                      <SmartLink to="/colocation-full" className="mega-menu-link">
                        <Container className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Аренда стойки", "Тіректі жалға алу")}</span>
                      </SmartLink>
                      <SmartLink to="/dedicated" className="mega-menu-link">
                        <Server className="mega-menu-icon" size={18} strokeWidth={1.75} />
                        <span>{t("Аренда сервера", "Серверді жалға алу")}</span>
                      </SmartLink>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            <div className="header-contact">
              <span className="contact-label">{t("Отдел продаж", "Сату бөлімі")}</span>
              <a href={phoneHref} className="phone-link display-phone">
                {city.phone}
              </a>
            </div>
            <button type="button" className="btn btn-primary header-cta" onClick={openConsultationModal}>
              {t("Консультация", "Кеңес алу")}
            </button>
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileNavOpen(true)}
            aria-label={t("Меню", "Мәзір")}
          >
            <MenuIcon width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
