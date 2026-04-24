import { Link } from "@tanstack/react-router";
import { useCity } from "@/lib/city-context";
import { ExternalIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import logoLightUrl from "@/assets/logo-light.svg";

export function Footer() {
  const { city } = useCity();
  const phoneHref = `tel:${city.phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${city.whatsapp.replace("+", "")}`;

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col" style={{ maxWidth: 300 }}>
            <img src={logoLightUrl} alt="NLS Logo" style={{ height: 40, marginBottom: 20 }} />
            <p style={{ fontSize: "0.9rem", color: "#ddd", marginBottom: 20 }}>
              NLS Kazakhstan единый оператор связи, предоставляющий полный спектр решений в области
              телекоммуникаций и информационных технологий, которые способны покрыть любые потребности как
              малого и среднего бизнеса, так и крупной корпорации.
            </p>
            <div className="social-icons" style={{ display: "flex", gap: 15 }}>
              <a href="https://www.instagram.com/nlskazakhstan/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <InstagramIcon width={24} height={24} />
              </a>
              <a href="https://www.linkedin.com/company/nlskz/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon width={24} height={24} />
              </a>
              <a
                href="https://www.youtube.com/@nlskazakhstan8630"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <YoutubeIcon width={24} height={24} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Услуги</h4>
            <ul>
              <li>
                <Link to="/internet">Интернет для бизнеса</Link>
              </li>
              <li>
                <a
                  href="https://nlsit.kz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  IT аутсорсинг
                  <ExternalIcon width={14} height={14} style={{ marginLeft: 4, opacity: 0.8 }} />
                </a>
              </li>
              <li>
                <Link to="/it-sks">СКС</Link>
              </li>
              <li>
                <Link to="/colocation">Размещение оборудования</Link>
              </li>
              <li>
                <Link to="/dedicated">Dedicated серверы</Link>
              </li>
              <li>
                <Link to="/vps">VPS серверы</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Навигация</h4>
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
            </ul>
          </div>

          <div className="footer-col">
            <h4>
              Контакты (<span className="display-city">{city.name}</span>)
            </h4>
            <ul>
              <li>
                <a
                  href={phoneHref}
                  className="display-phone"
                  style={{ fontWeight: 600, fontSize: "1.1rem", color: "var(--color-orange)" }}
                >
                  {city.phone}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  className="display-whatsapp"
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon width={16} height={16} />
                  WhatsApp Отдел Продаж
                </a>
              </li>
              <li
                className="display-address"
                style={{ marginTop: 15, fontSize: "0.9rem", color: "#bbb" }}
              >
                {city.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">© {new Date().getFullYear()} ТОО «NLS Kazakhstan». Все права защищены.</div>
      </div>
    </footer>
  );
}
