import { Link } from "@tanstack/react-router";
import { useCity } from "@/lib/city-context";
import {
  ChevronDownIcon,
  ExternalIcon,
  InstagramIcon,
  LinkedinIcon,
  MenuIcon,
  PinIcon,
  YoutubeIcon,
} from "./Icons";
import logoUrl from "@/assets/logo.svg";

export function Header() {
  const { city, openCityModal, openConsultationModal, setMobileNavOpen } = useCity();

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
              <span className="display-city">{city.name}</span>
            </button>
            <div className="top-menu">
              <Link to="/about">О компании</Link>
              <Link to="/hr">Вакансии</Link>
              <a href="https://meganet.kz" target="_blank" rel="noopener noreferrer">Интернет для физ. лиц</a>
              <Link to="/contacts">Контакты</Link>
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
            <div className="lang-switcher">
              <div className="lang-current">
                <span>RU</span>
                <ChevronDownIcon width={14} height={14} />
              </div>
              <div className="lang-dropdown">
                <div>RU</div>
                <div>KZ</div>
              </div>
            </div>
            <a href="#" className="btn btn-primary" style={{ padding: "4px 12px", fontSize: "0.8rem" }}>
              Войти
            </a>
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
                    Услуги
                    <ChevronDownIcon width={16} height={16} className="chevron-icon" />
                  </button>
                  <div className="dropdown-menu mega-menu">
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">Интернет</div>
                      <Link to="/internet">Интернет для бизнеса</Link>
                    </div>
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">IT услуги</div>
                      <a
                        href="https://nlsit.kz"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        IT аутсорсинг
                        <ExternalIcon
                          width={14}
                          height={14}
                          style={{ marginLeft: 4, opacity: 0.8 }}
                        />
                      </a>
                      <Link to="/it-sks">СКС. Монтаж сетей</Link>
                    </div>
                    <div className="mega-menu-group">
                      <div className="mega-menu-group-title">Серверы</div>
                      <Link to="/dedicated">Dedicated сервер</Link>
                      <Link to="/vps">VPS сервер</Link>
                      <Link to="/colocation">Colocation</Link>
                      <Link to="/colocation-full">Аренда стойки</Link>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            <div className="header-contact">
              <span className="contact-label">Отдел продаж</span>
              <a href={phoneHref} className="phone-link display-phone">
                {city.phone}
              </a>
            </div>
            <button type="button" className="btn btn-primary header-cta" onClick={openConsultationModal}>
              Консультация
            </button>
          </div>

          <button type="button" className="mobile-menu-btn" onClick={() => setMobileNavOpen(true)} aria-label="Меню">
            <MenuIcon width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
