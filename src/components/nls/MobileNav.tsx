import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useCity } from "@/lib/city-context";
import { useLang } from "@/lib/lang-context";
import { SmartLink } from "./SmartLink";
import {
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  PinIcon,
  GlobeIcon,
} from "./Icons";
import {
  Phone,
  Wifi,
  ShieldCheck,
  Network,
  Cloud,
  Boxes,
  Database,
  CloudUpload,
  HardDrive,
  Container,
  Server,
  Info,
  Briefcase,
  Mail,
  ExternalLink,
  Download,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import logoUrl from "@/assets/logo.svg";

type GroupKey = "internet" | "it" | "cloud" | "dc";

type Item = { to: string; label: string; Icon: LucideIcon };

export function MobileNav() {
  const {
    city,
    mobileNavOpen,
    setMobileNavOpen,
    openCityModal,
    openConsultationModal,
  } = useCity();
  const { lang, setLang, t } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const groupForPath = useMemo<GroupKey | null>(() => {
    if (pathname === "/internet") return "internet";
    if (pathname === "/it" || pathname === "/it-sks") return "it";
    if (["/iaas", "/vps", "/object-storage", "/cloud-storage", "/cloud"].includes(pathname)) return "cloud";
    if (["/colocation", "/colocation-full", "/dedicated"].includes(pathname)) return "dc";
    return null;
  }, [pathname]);

  const [openGroup, setOpenGroup] = useState<GroupKey | null>(groupForPath ?? "cloud");

  useEffect(() => {
    if (groupForPath) setOpenGroup(groupForPath);
  }, [groupForPath]);

  const close = () => setMobileNavOpen(false);

  useEffect(() => {
    if (mobileNavOpen) document.body.classList.add("mobile-nav-open");
    else document.body.classList.remove("mobile-nav-open");
    return () => document.body.classList.remove("mobile-nav-open");
  }, [mobileNavOpen]);

  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;

  const groups: Array<{ key: GroupKey; title: string; items: Item[] }> = [
    {
      key: "internet",
      title: t("Интернет", "Интернет"),
      items: [
        { to: "/internet", label: t("Интернет для бизнеса", "Бизнеске арналған интернет"), Icon: Wifi },
      ],
    },
    {
      key: "it",
      title: t("IT услуги", "IT қызметтері"),
      items: [
        { to: "/it", label: t("IT аутсорсинг", "IT аутсорсинг"), Icon: ShieldCheck },
        { to: "/it-sks", label: t("СКС. Монтаж сетей", "ҚКЖ. Желілерді құру"), Icon: Network },
      ],
    },
    {
      key: "cloud",
      title: t("Облачные решения", "Бұлттық шешімдер"),
      items: [
        { to: "/iaas", label: t("Виртуальный дата‑центр", "Виртуалды дата-орталық"), Icon: Boxes },
        { to: "/vps", label: t("VPS/VDS сервер", "VPS/VDS сервер"), Icon: Cloud },
        { to: "/object-storage", label: t("Объектное хранилище S3", "S3 объектілік сақтау"), Icon: Database },
        { to: "/cloud-storage", label: t("Облачное хранилище", "Бұлттық сақтау"), Icon: CloudUpload },
      ],
    },
    {
      key: "dc",
      title: t("Услуги дата-центра", "Дата-орталық қызметтері"),
      items: [
        { to: "/colocation", label: t("Размещение сервера", "Серверді орналастыру"), Icon: HardDrive },
        { to: "/colocation-full", label: t("Аренда стойки", "Тіректі жалға алу"), Icon: Container },
        { to: "/dedicated", label: t("Аренда сервера", "Серверді жалға алу"), Icon: Server },
      ],
    },
  ];

  const toggleGroup = (key: GroupKey) =>
    setOpenGroup((cur) => (cur === key ? null : key));

  return (
    <div className={`mobile-nav${mobileNavOpen ? " active" : ""}`}>
      {/* Sticky header */}
      <div className="mobile-nav__top">
        <Link to="/" onClick={close} aria-label="NLS Kazakhstan">
          <img src={logoUrl} alt="NLS" style={{ height: 28 }} />
        </Link>
        <button
          type="button"
          className="mobile-nav__close"
          onClick={close}
          aria-label={t("Закрыть", "Жабу")}
        >
          ×
        </button>
      </div>

      {/* Scrollable body */}
      <div className="mobile-nav__body">
        <div className="mobile-nav__settings">
          <button
            type="button"
            className="mobile-nav__chip"
            onClick={() => {
              close();
              openCityModal();
            }}
          >
            <PinIcon width={16} height={16} />
            <span className="display-city">{t(city.name.ru, city.name.kz)}</span>
          </button>
          <div className="mobile-nav__chip mobile-nav__chip--lang mobile-nav__lang-pill">
            <GlobeIcon width={16} height={16} />
            <div className="mobile-lang-pill" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={lang === "ru"}
                onClick={() => setLang("ru")}
                className={`mobile-lang-pill__btn${lang === "ru" ? " is-active" : ""}`}
              >
                RU
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={lang === "kz"}
                onClick={() => setLang("kz")}
                className={`mobile-lang-pill__btn${lang === "kz" ? " is-active" : ""}`}
              >
                KZ
              </button>
            </div>
          </div>
        </div>

        <div className="mobile-nav__cta-top">
          <button
            type="button"
            className="btn btn-primary mobile-nav__cta-btn"
            onClick={() => {
              close();
              openConsultationModal();
            }}
          >
            {t("Получить консультацию", "Кеңес алу")}
          </button>
        </div>


        <div className="mobile-nav__section-title">{t("Услуги", "Қызметтер")}</div>
        <ul className="mobile-nav__groups">
          {groups.map((g) => (
            <li key={g.key} className={`mobile-nav__group${openGroup === g.key ? " is-open" : ""}`}>
              <button
                type="button"
                className="mobile-nav__group-head"
                onClick={() => toggleGroup(g.key)}
                aria-expanded={openGroup === g.key}
              >
                <span>{g.title}</span>
                <ChevronDown size={18} strokeWidth={2} className="mobile-nav__chev" />
              </button>
              {openGroup === g.key && (
                <ul className="mobile-nav__group-items">
                  {g.items.map((it) => (
                    <li key={it.to}>
                      <SmartLink to={it.to} onClick={close} className="mobile-nav__item">
                        <it.Icon size={18} strokeWidth={1.8} />
                        <span>{it.label}</span>
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="mobile-nav__section-title">{t("Компания", "Компания")}</div>
        <ul className="mobile-nav__plain">
          <li>
            <Link to="/login" onClick={close} className="mobile-nav__item">
              <Download size={18} strokeWidth={1.8} />
              <span>{t("Скачать личный кабинет", "Жеке кабинетті жүктеу")}</span>
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={close} className="mobile-nav__item">
              <Info size={18} strokeWidth={1.8} />
              <span>{t("О компании", "Компания туралы")}</span>
            </Link>
          </li>
          <li>
            <Link to="/hr" onClick={close} className="mobile-nav__item">
              <Briefcase size={18} strokeWidth={1.8} />
              <span>{t("Вакансии", "Бос жұмыс орындары")}</span>
            </Link>
          </li>
          <li>
            <Link to="/contacts" onClick={close} className="mobile-nav__item">
              <Mail size={18} strokeWidth={1.8} />
              <span>{t("Контакты", "Байланыс")}</span>
            </Link>
          </li>
          <li>
            <a
              href="https://meganet.kz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mobile-nav__item"
            >
              <ExternalLink size={18} strokeWidth={1.8} />
              <span>{t("Интернет для физ. лиц", "Жеке тұлғаларға интернет")}</span>
            </a>
          </li>
        </ul>

        <div className="mobile-nav__socials">
          <a href="https://www.instagram.com/nlskazakhstan/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon width={20} height={20} />
          </a>
          <a href="https://www.linkedin.com/company/nlskz/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon width={20} height={20} />
          </a>
          <a href="https://www.youtube.com/@nlskazakhstan8630" target="_blank" rel="noreferrer" aria-label="YouTube">
            <YoutubeIcon width={20} height={20} />
          </a>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="mobile-nav__bottom">
        <a href={phoneHref} className="mobile-nav__phone" onClick={close}>
          <Phone size={18} strokeWidth={2} />
          <span>{city.phone}</span>
        </a>
      </div>
    </div>
  );
}
