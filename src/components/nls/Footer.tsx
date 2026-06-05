import { Link } from "@tanstack/react-router";
import { useCity, CITIES } from "@/lib/city-context";
import { useT } from "@/lib/lang-context";
import { SmartLink } from "./SmartLink";
import { InstagramIcon, LinkedinIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import { StoreBadges } from "./StoreBadges";
import logoLightUrl from "@/assets/logo-light.svg";

export function Footer() {
  const { city } = useCity();
  const t = useT();
  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;
  const waSupportHref = `https://wa.me/${city.whatsapp.replace("+", "")}`;
  const waSalesHref = `https://wa.me/${city.whatsappSales.replace("+", "")}`;

  const cities = [CITIES.Almaty, CITIES.Astana, CITIES.Shymkent];

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-col footer-col--about">
            <img src={logoLightUrl} alt="NLS Kazakhstan" style={{ height: 40, marginBottom: 20 }} />
            <p className="footer-about-text">
              {t(
                "NLS Kazakhstan — единый оператор связи и IT-инфраструктуры, предоставляющий полный спектр решений в области телекоммуникаций и информационных технологий для бизнеса любого масштаба.",
                "NLS Kazakhstan — кез келген ауқымдағы бизнес үшін телекоммуникация және ақпараттық технологиялар саласындағы шешімдердің толық кешенін ұсынатын байланыс және IT-инфрақұрылымның бірыңғай операторы."
              )}
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/nlskazakhstan/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon width={20} height={20} />
              </a>
              <a href="https://www.linkedin.com/company/nlskz/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon width={20} height={20} />
              </a>
              <a
                href="https://www.youtube.com/@nlskazakhstan8630"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <YoutubeIcon width={20} height={20} />
              </a>
            </div>
          </div>

          {/* Internet & IT */}
          <div className="footer-col">
            <h4>{t("Интернет и IT", "Интернет және IT")}</h4>
            <ul>
              <li>
                <SmartLink to="/internet">
                  {t("Интернет для бизнеса", "Бизнеске арналған интернет")}
                </SmartLink>
              </li>
              <li>
                <a href="https://meganet.kz" target="_blank" rel="noopener noreferrer" className="footer-link-external">
                  {t("Интернет для физических лиц", "Жеке тұлғаларға арналған интернет")}
                </a>
              </li>
              <li>
                <SmartLink to="/it">{t("IT аутсорсинг", "IT аутсорсинг")}</SmartLink>
              </li>
              <li>
                <SmartLink to="/it-sks">{t("СКС. Монтаж сетей", "ҚКЖ. Желілерді құру")}</SmartLink>
              </li>
            </ul>
          </div>

          {/* Servers */}
          <div className="footer-col">
            <h4>{t("Серверы и ЦОД", "Серверлер және Дата-орталығы")}</h4>
            <ul>
              <li>
                <SmartLink to="/dedicated">{t("Dedicated сервер", "Dedicated сервер")}</SmartLink>
              </li>
              <li>
                <SmartLink to="/vps">{t("VPS/VDS сервер", "VPS/VDS сервер")}</SmartLink>
              </li>
              <li>
                <SmartLink to="/colocation">Colocation</SmartLink>
              </li>
              <li>
                <SmartLink to="/colocation-full">{t("Аренда стойки", "Тіректерді жалға алу")}</SmartLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>{t("Компания", "Компания")}</h4>
            <ul>
              <li>
                <Link to="/about">{t("О компании", "Компания туралы")}</Link>
              </li>
              <li>
                <Link to="/hr">{t("Вакансии", "Бос жұмыс орындары")}</Link>
              </li>
              <li>
                <Link to="/contacts">{t("Контакты", "Байланыс")}</Link>
              </li>
              <li>
                <Link to="/login">{t("Личный кабинет", "Жеке кабинет")}</Link>
              </li>
              <li>
                <Link to="/requisites">{t("Реквизиты", "Деректемелер")}</Link>
              </li>
              <li>
                <Link to="/privacy">{t("Политика конфиденциальности", "Құпиялылық саясаты")}</Link>
              </li>

            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-col footer-col--contacts">
            <h4>{t("Контакты", "Байланыс")}</h4>
            <ul>
              <li>
                <a href={phoneHref} className="display-phone footer-phone">
                  {city.phone}
                </a>
              </li>
              <li>
                <a href={waSalesHref} className="display-whatsapp footer-wa" target="_blank" rel="noreferrer">
                  <WhatsAppIcon width={16} height={16} />
                  {t("WhatsApp · Отдел продаж", "WhatsApp · Сату бөлімі")}
                </a>
              </li>
              <li>
                <a href={waSupportHref} className="display-whatsapp footer-wa" target="_blank" rel="noreferrer">
                  <WhatsAppIcon width={16} height={16} />
                  {t("WhatsApp · Техподдержка", "WhatsApp · Техқолдау")}
                </a>
              </li>
              <li className="footer-contact-row">
                <span className="footer-contact-label">{t("Продажи:", "Сату:")}</span>
                <a href="mailto:sales@nls.kz">sales@nls.kz</a>
              </li>
              <li className="footer-contact-row">
                <span className="footer-contact-label">{t("Поддержка:", "Қолдау:")}</span>
                <a href="mailto:support@nls.kz">support@nls.kz</a>
              </li>
              <li className="footer-contact-row">
                <span className="footer-contact-label">HR:</span>
                <a href="https://wa.me/77081466043" target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* App download CTA */}
        <div className="footer-app-cta">
          <div className="footer-app-cta-text">
            <h4>{t("Личный кабинет в кармане", "Жеке кабинет қалтаңызда")}</h4>
            <p>
              {t(
                "Устанавливайте приложение и используйте личный кабинет с удобством.",
                "Қосымшаны орнатып, жеке кабинетті ыңғайлы пайдаланыңыз."
              )}
            </p>
          </div>
          <StoreBadges />
        </div>

        {/* Cities & addresses */}
        <div className="footer-cities">
          {cities.map((c) => (
            <div className="footer-city-card" key={c.name.ru}>
              <h5>{t(c.name.ru, c.name.kz)}</h5>
              <p>{t(c.address.ru, c.address.kz)}</p>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}{" "}
            {t("ТОО «NLS Kazakhstan». Все права защищены.", "«NLS Kazakhstan» ЖШС. Барлық құқықтар қорғалған.")}
          </span>
          <Link to="/privacy" className="footer-bottom-link">
            {t("Политика конфиденциальности", "Құпиялылық саясаты")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
