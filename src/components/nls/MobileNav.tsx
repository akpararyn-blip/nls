import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCity } from "@/lib/city-context";
import { useLang } from "@/lib/lang-context";
import { SmartLink } from "./SmartLink";
import { CloseIcon, GlobeIcon, PinIcon } from "./Icons";
import { Phone } from "lucide-react";
import logoUrl from "@/assets/logo.svg";

export function MobileNav() {
  const { city, mobileNavOpen, setMobileNavOpen, openCityModal } = useCity();
  const { lang, setLang, t } = useLang();

  const close = () => setMobileNavOpen(false);

  useEffect(() => {
    if (mobileNavOpen) document.body.classList.add("mobile-nav-open");
    else document.body.classList.remove("mobile-nav-open");
    return () => document.body.classList.remove("mobile-nav-open");
  }, [mobileNavOpen]);

  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;

  return (
    <div className={`mobile-nav${mobileNavOpen ? " active" : ""}`}>
      <div className="mobile-nav-header">
        <img src={logoUrl} alt="Logo" style={{ height: 30 }} />
        <button
          type="button"
          className="mobile-close-btn"
          onClick={close}
          aria-label={t("Закрыть", "Жабу")}
        >
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
          <span className="display-city">{t(city.name.ru, city.name.kz)}</span>
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
          <button
            type="button"
            onClick={() => setLang("ru")}
            className={`mobile-lang-btn${lang === "ru" ? " active" : ""}`}
          >
            RU<span className="lang-beta">beta</span>
          </button>
          <span style={{ opacity: 0.4 }}>/</span>
          <button
            type="button"
            onClick={() => setLang("kz")}
            className={`mobile-lang-btn${lang === "kz" ? " active" : ""}`}
          >
            KZ<span className="lang-beta">beta</span>
          </button>
        </div>
        <a href={phoneHref} className="mobile-nav-phone" onClick={close}>
          <Phone size={18} strokeWidth={2} />
          <span>{city.phone}</span>
        </a>
      </div>
      <ul>
        <li>
          <div className="mobile-nav-group-title">{t("Интернет", "Интернет")}</div>
          <ul className="mobile-nav-group">
            <li>
              <SmartLink to="/internet" onClick={close}>
                {t("Интернет для бизнеса", "Бизнеске арналған интернет")}
              </SmartLink>
            </li>
          </ul>
        </li>
        <li>
          <div className="mobile-nav-group-title">{t("IT услуги", "IT қызметтері")}</div>
          <ul className="mobile-nav-group">
            <li>
              <SmartLink to="/it" onClick={close}>
                {t("IT аутсорсинг", "IT аутсорсинг")}
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/it-sks" onClick={close}>
                {t("СКС. Монтаж сетей", "ҚКЖ. Желілерді құру")}
              </SmartLink>
            </li>
          </ul>
        </li>
        <li>
          <div className="mobile-nav-group-title">{t("Серверы", "Серверлер")}</div>
          <ul className="mobile-nav-group">
            <li>
              <SmartLink to="/dedicated" onClick={close}>
                {t("Dedicated сервер", "Dedicated сервер")}
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/vps" onClick={close}>
                {t("VPS/VDS сервер", "VPS/VDS сервер")}
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/iaas" onClick={close}>
                {t("Виртуальный дата‑центр", "Виртуалдық дата‑центр")}
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/colocation" onClick={close}>
                Colocation
              </SmartLink>
            </li>
            <li>
              <SmartLink to="/colocation-full" onClick={close}>
                {t("Аренда стойки", "Тіректерді жалға алу")}
              </SmartLink>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/about" onClick={close}>
            {t("О компании", "Компания туралы")}
          </Link>
        </li>
        <li>
          <Link to="/hr" onClick={close}>
            {t("Вакансии", "Бос жұмыс орындары")}
          </Link>
        </li>
        <li>
          <a href="https://meganet.kz" target="_blank" rel="noopener noreferrer" onClick={close}>
            {t("Интернет для физ. лиц", "Жеке тұлғаларға интернет")}
          </a>
        </li>
        <li>
          <Link to="/contacts" onClick={close}>
            {t("Контакты", "Байланыс")}
          </Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={close}
        aria-label={t("Закрыть меню", "Мәзірді жабу")}
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
