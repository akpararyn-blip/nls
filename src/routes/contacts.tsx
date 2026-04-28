import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import {
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Headphones,
  Briefcase,
  Users,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Контакты NLS Kazakhstan: телефоны отдела продаж и адреса офисов в Алматы, Астане и Шымкенте.",
      },
      { property: "og:title", content: "Контакты NLS Kazakhstan" },
      {
        property: "og:description",
        content: "Единый номер +7 700 339 7777, офисы в трёх городах Казахстана.",
      },
    ],
  }),
  component: ContactsPage,
});

const UNIFIED_PHONE_DISPLAY = "+7 700 339 7777";
const UNIFIED_PHONE_TEL = "+77003397777";
const SALES_WA_DISPLAY = "+7 700 730 45 91";
const SALES_WA_NUMBER = "77007304591";

const CITIES = [
  {
    key: "almaty",
    name: "Алматы",
    phoneDisplay: "+7 727 339 77 77",
    phoneTel: "+77273397777",
    address:
      "050060 (A15E3X9) Республика Казахстан, г. Алматы, пр. Аль-Фараби, 95",
    map: "https://www.google.com/maps?q=пр.+Аль-Фараби+95,+Алматы&output=embed",
  },
  {
    key: "astana",
    name: "Астана",
    phoneDisplay: "+7 7172 72 55 55",
    phoneTel: "+771727 25555",
    address:
      "010000 (Z00Y7B8) Республика Казахстан, г. Астана, мкр. Караоткель-2, ул. Жылыой 13/1",
    map: "https://www.google.com/maps?q=ул.+Жылыой+13/1,+Астана&output=embed",
  },
  {
    key: "shymkent",
    name: "Шымкент",
    phoneDisplay: "+7 727 339 77 77",
    phoneTel: "+77273397777",
    address:
      "160021 Республика Казахстан, г. Шымкент, район Тұран, мкр. Малый Самал, дом 1695 (ул. Рыскулбекова, 13/1)",
    map: "https://www.google.com/maps?q=ул.+Рыскулбекова+13/1,+Шымкент&output=embed",
  },
];

function ContactsPage() {
  return (
    <SiteLayout>
      <ContactsHero />
      <CitiesSection />
      <DepartmentsSection />
      <SocialsSection />
    </SiteLayout>
  );
}

function ContactsHero() {
  return (
    <section className="contacts-hero">
      <div className="container">
        <span className="section-eyebrow">Контакты</span>
        <h1>Свяжитесь с нами удобным способом</h1>
        <p className="contacts-hero-sub">
          Единый номер для всех городов Казахстана. Работаем 24/7 для подключённых клиентов и в
          рабочее время для новых заявок.
        </p>

        <div className="contacts-hero-grid">
          <a href={`tel:${UNIFIED_PHONE_TEL}`} className="contacts-hero-card">
            <div className="contacts-hero-icon contacts-hero-icon--orange">
              <Phone size={24} />
            </div>
            <div>
              <span>Единый номер</span>
              <strong>{UNIFIED_PHONE_DISPLAY}</strong>
            </div>
          </a>
          <a href="tel:+77273397777" className="contacts-hero-card">
            <div className="contacts-hero-icon contacts-hero-icon--blue">
              <Headphones size={24} />
            </div>
            <div>
              <span>Отдел продаж</span>
              <strong>+7 727 339 77 77</strong>
            </div>
          </a>
          <a
            href={`https://wa.me/${SALES_WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="contacts-hero-card"
          >
            <div className="contacts-hero-icon contacts-hero-icon--green">
              <MessageCircle size={24} />
            </div>
            <div>
              <span>WhatsApp продаж</span>
              <strong>{SALES_WA_DISPLAY}</strong>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function CitiesSection() {
  return (
    <section className="contacts-cities-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Офисы</span>
          <h2>Контакты по городам</h2>
          <p>Приезжайте на встречу или свяжитесь с региональным менеджером.</p>
        </div>

        <div className="contacts-cities-grid">
          {CITIES.map((c) => (
            <article className="contacts-city-card" key={c.key}>
              <div className="contacts-city-map">
                <iframe
                  src={c.map}
                  loading="lazy"
                  title={`Карта офиса ${c.name}`}
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="contacts-city-body">
                <div className="contacts-city-head">
                  <div className="contacts-city-icon">
                    <Building2 size={18} />
                  </div>
                  <h3>{c.name}</h3>
                </div>
                <a href={`tel:${c.phoneTel}`} className="contacts-city-row">
                  <Phone size={16} />
                  <span>{c.phoneDisplay}</span>
                </a>
                <div className="contacts-city-row contacts-city-row--addr">
                  <MapPin size={16} />
                  <span>{c.address}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DepartmentsSection() {
  return (
    <section className="contacts-departments-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Отделы</span>
          <h2>Прямая связь с нужным отделом</h2>
        </div>

        <div className="contacts-departments-grid">
          <div className="contacts-dept-card">
            <div className="contacts-dept-icon contacts-dept-icon--blue">
              <Headphones size={26} />
            </div>
            <h3>Отдел поддержки</h3>
            <p>Помогаем подключённым клиентам в режиме 24/7.</p>
            <a href="mailto:support@nls.kz" className="contacts-dept-link">
              <Mail size={16} />
              support@nls.kz
            </a>
          </div>

          <div className="contacts-dept-card">
            <div className="contacts-dept-icon contacts-dept-icon--orange">
              <Briefcase size={26} />
            </div>
            <h3>Отдел продаж</h3>
            <p>Подберём услуги и подготовим коммерческое предложение.</p>
            <a href="mailto:sales@nls.kz" className="contacts-dept-link">
              <Mail size={16} />
              sales@nls.kz
            </a>
          </div>

          <div className="contacts-dept-card">
            <div className="contacts-dept-icon contacts-dept-icon--green">
              <Users size={26} />
            </div>
            <h3>Отдел HR</h3>
            <p>Открытые вакансии и сотрудничество с кандидатами.</p>
            <a
              href="https://wa.me/77081466043"
              target="_blank"
              rel="noreferrer"
              className="contacts-dept-link"
            >
              <MessageCircle size={16} />
              WhatsApp +7 708 146 60 43
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialsSection() {
  return (
    <section className="contacts-socials-section">
      <div className="container">
        <div className="contacts-socials-card">
          <div>
            <span className="section-eyebrow section-eyebrow--light">Соцсети</span>
            <h2>Мы в социальных сетях</h2>
            <p>Подписывайтесь — публикуем кейсы, новости и приглашения на мероприятия.</p>
          </div>
          <div className="contacts-socials-list">
            <a
              href="https://www.instagram.com/nlskazakhstan/"
              target="_blank"
              rel="noreferrer"
              className="contacts-social"
              aria-label="Instagram"
            >
              <Instagram size={22} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/company/nlskz/"
              target="_blank"
              rel="noreferrer"
              className="contacts-social"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.youtube.com/@nlskazakhstan8630"
              target="_blank"
              rel="noreferrer"
              className="contacts-social"
              aria-label="YouTube"
            >
              <Youtube size={22} />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
