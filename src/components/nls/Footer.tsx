import { Link } from "@tanstack/react-router";
import { useCity, CITIES } from "@/lib/city-context";
import { SmartLink } from "./SmartLink";
import { ExternalIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import { StoreBadges } from "./StoreBadges";
import logoLightUrl from "@/assets/logo-light.svg";

export function Footer() {
  const { city } = useCity();
  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${city.whatsapp.replace("+", "")}`;

  const cities = [CITIES.Almaty, CITIES.Astana, CITIES.Shymkent];

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-col footer-col--about">
            <img src={logoLightUrl} alt="NLS Kazakhstan" style={{ height: 40, marginBottom: 20 }} />
            <p className="footer-about-text">
              NLS Kazakhstan — единый оператор связи, предоставляющий полный спектр решений в области
              телекоммуникаций и информационных технологий для бизнеса любого масштаба.
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
            <h4>Интернет и IT</h4>
            <ul>
              <li>
                <SmartLink to="/internet">Интернет для бизнеса</SmartLink>
              </li>
              <li>
                <a href="https://meganet.kz" target="_blank" rel="noopener noreferrer" className="footer-link-external">
                  Интернет для физ. лиц
                  <ExternalIcon width={12} height={12} />
                </a>
              </li>
              <li>
                <a href="https://nlsit.kz" target="_blank" rel="noopener noreferrer" className="footer-link-external">
                  IT аутсорсинг
                  <ExternalIcon width={12} height={12} />
                </a>
              </li>
              <li>
                <SmartLink to="/it-sks">СКС. Монтаж сетей</SmartLink>
              </li>
            </ul>
          </div>

          {/* Servers */}
          <div className="footer-col">
            <h4>Серверы и ЦОД</h4>
            <ul>
              <li>
                <SmartLink to="/dedicated">Dedicated сервер</SmartLink>
              </li>
              <li>
                <SmartLink to="/vps">VPS сервер</SmartLink>
              </li>
              <li>
                <SmartLink to="/colocation">Colocation</SmartLink>
              </li>
              <li>
                <SmartLink to="/colocation-full">Аренда стойки</SmartLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>Компания</h4>
            <ul>
              <li>
                <Link to="/about">О компании</Link>
              </li>
              <li>
                <Link to="/hr">Вакансии</Link>
              </li>
              <li>
                <Link to="/contacts">Контакты</Link>
              </li>
              <li>
                <Link to="/login">Личный кабинет</Link>
              </li>
              <li>
                <Link to="/privacy">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-col footer-col--contacts">
            <h4>Контакты</h4>
            <ul>
              <li>
                <a href={phoneHref} className="display-phone footer-phone">
                  {city.phone}
                </a>
              </li>
              <li>
                <a href={waHref} className="display-whatsapp footer-wa" target="_blank" rel="noreferrer">
                  <WhatsAppIcon width={16} height={16} />
                  WhatsApp · Отдел продаж
                </a>
              </li>
              <li className="footer-contact-row">
                <span className="footer-contact-label">Продажи:</span>
                <a href="mailto:sales@nls.kz">sales@nls.kz</a>
              </li>
              <li className="footer-contact-row">
                <span className="footer-contact-label">Поддержка:</span>
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
            <h4>Личный кабинет в кармане</h4>
            <p>Устанавливайте приложение и используйте личный кабинет с удобством.</p>
          </div>
          <StoreBadges />
        </div>

        {/* Cities & addresses */}
        <div className="footer-cities">
          {cities.map((c) => (
            <div className="footer-city-card" key={c.name}>
              <h5>{c.name}</h5>
              <p>{c.address}</p>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ТОО «NLS Kazakhstan». Все права защищены.</span>
          <Link to="/privacy" className="footer-bottom-link">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
