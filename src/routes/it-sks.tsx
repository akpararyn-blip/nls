import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { useCity } from "@/lib/city-context";
import { CheckIcon } from "@/components/nls/Icons";
import { ConsentCheckbox } from "@/components/nls/ConsentCheckbox";
import sksHero from "@/assets/sks-hero.png";
import sksBefore from "@/assets/sks-before.jpg";
import sksAfter from "@/assets/sks-after.jpg";
import { useState, type FormEvent } from "react";
import {
  Wifi,
  Phone,
  Cctv,
  Printer,
  Globe,
  Wrench,
  PackageCheck,
  ShieldCheck,
  Hammer,
  ArrowRight,
  ChevronDown,
  Building2,
  Store,
  Warehouse,
  Factory,
  Landmark,
  Plane,
  Coffee,
} from "lucide-react";

export const Route = createFileRoute("/it-sks")({
  head: () => ({
    meta: [
      { title: "СКС. Монтаж локальных сетей под ключ — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Проектирование и монтаж структурированных кабельных систем (СКС) и ЛВС для офисов, ТРЦ, складов и заводов в Казахстане. Гарантия 1 год.",
      },
      { property: "og:title", content: "СКС. Монтаж локальных сетей — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Построим локальную сеть под ключ: проектирование, поставка оборудования и монтаж. Работаем по всему Казахстану.",
      },
    ],
  }),
  component: SksPage,
});

function SksPage() {
  return (
    <SiteLayout>
      <Hero />
      <WhyMatters />
      <Stages />
      <Advantages />
      <CrossSell />
      <Process />
      <Audience />
      <Faq />
      <FinalCTA />
    </SiteLayout>
  );
}

function Hero() {
  const { openConsultationModal } = useCity();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            <span style={{ color: "var(--color-orange)" }}>Локальные сети</span> любой сложности: от
            офиса до завода
          </h1>
          <p className="hero-subtitle">
            Построим ИТ-инфраструктуру, которая будет работать без сбоев. Продумаем проект на вырост,
            поставим оборудование по ценам партнёров и настроим всё под ключ.
          </p>

          <ul className="hero-bullets">
            {[
              "Проектирование и монтаж под ключ",
              "Оборудование по партнёрским ценам",
              "Гарантия 1 год на работы",
              "Опыт на объектах любого масштаба",
            ].map((t) => (
              <li key={t}>
                <CheckIcon />
                {t}
              </li>
            ))}
          </ul>

          <button type="button" className="btn btn-primary" onClick={openConsultationModal}>
            Получить консультацию
          </button>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={sksHero} alt="Монтаж СКС" />
            <div className="hero-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

const whyItems = [
  {
    icon: Globe,
    title: "Быстрый интернет",
    text: "Стабильный сигнал и высокая скорость на каждом рабочем месте.",
  },
  {
    icon: Wifi,
    title: "Бесшовный Wi-Fi",
    text:
      "Просчитываем расстояния и радиопокрытие, чтобы сеть охватывала весь офис эффективно. Вам не придётся покупать лишние точки доступа.",
  },
  {
    icon: Phone,
    title: "IP-телефония",
    text: "Чистый звук без задержек, шумов и внезапных обрывов звонков.",
  },
  {
    icon: Cctv,
    title: "Видеонаблюдение и СКУД",
    text: "Бесперебойная запись с камер и корректная работа систем контроля доступа.",
  },
  {
    icon: Printer,
    title: "Оргтехника",
    text: "Корректная работа всех сетевых устройств и доступ к общим файловым хранилищам.",
  },
];

function WhyMatters() {
  return (
    <section className="sks-why-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Зачем нужна СКС</span>
          <h2>Что зависит от качества локальной сети?</h2>
          <p>
            Правильно построенная сеть — основа стабильной работы офиса, склада или производства.
          </p>
        </div>

        <div className="sks-why-grid">
          {whyItems.map((it) => {
            const Icon = it.icon;
            return (
              <article className="sks-why-card" key={it.title}>
                <div className="sks-why-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Stages() {
  return (
    <section className="sks-stages-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Этап ремонта</span>
          <h2>Работаем на любой стадии ремонта</h2>
          <p>Подбираем способ монтажа в зависимости от готовности помещения.</p>
        </div>

        <div className="sks-stages-grid">
          <article className="sks-stage-card">
            <div className="sks-stage-image">
              <img src={sksBefore} alt="Монтаж СКС до ремонта" loading="lazy" width={1024} height={768} />
              <span className="sks-stage-badge">До ремонта</span>
            </div>
            <div className="sks-stage-body">
              <h3>До ремонта</h3>
              <p>
                Спроектируем сеть заранее. Проложим кабели скрытым способом за фальш-стенами, под
                потолком или в стяжке. Идеальный вариант для эстетики — никаких видимых проводов.
              </p>
            </div>
          </article>

          <article className="sks-stage-card">
            <div className="sks-stage-image">
              <img src={sksAfter} alt="Монтаж СКС после ремонта" loading="lazy" width={1024} height={768} />
              <span className="sks-stage-badge">После ремонта</span>
            </div>
            <div className="sks-stage-body">
              <h3>После ремонта</h3>
              <p>
                Если помещение уже готово, а рабочие места нужно подключить, мы аккуратно смонтируем
                кабельные трассы в кабель-каналах, не повредив вашу отделку.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const advantages = [
  {
    icon: PackageCheck,
    h: "Всё под ключ",
    p: "Сами составим схему, подберём оборудование и всё настроим. Вам не придётся вникать в технические детали.",
  },
  {
    icon: Wrench,
    h: "Без лишних подрядчиков",
    p: "Вы получаете комплектующие напрямую от нас. Без наценок и сложной логистики.",
  },
  {
    icon: ShieldCheck,
    h: "Гарантия 1 год",
    p: "Если что-то перестанет работать — приедем и починим без лишних разговоров.",
  },
  {
    icon: Hammer,
    h: "Качественный монтаж",
    p: "Прокладываем аккуратно и используем надёжные материалы — не экономим на важном.",
  },
];

function Advantages() {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Преимущества</span>
          <h2>
            Почему нам доверяют монтаж <span style={{ color: "var(--color-orange)" }}>СКС</span>
          </h2>
          <p>Берём ответственность за результат — от первого замера до сдачи объекта.</p>
        </div>

        <div className="trust-grid">
          {advantages.map((it) => {
            const Icon = it.icon;
            return (
              <div className="trust-card" key={it.h}>
                <div className="trust-icon">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3>{it.h}</h3>
                <p>{it.p}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CrossSell() {
  return (
    <section className="sks-crosssell-section">
      <div className="container">
        <div className="sks-crosssell-card">
          <div className="sks-crosssell-body">
            <span className="section-eyebrow">IT-аутсорсинг</span>
            <h2>Комплексные IT-решения</h2>
            <p>
              Мы не только прокладываем сеть, но и можем взять всю ИТ-инфраструктуру вашей компании
              на обслуживание. В рамках услуги IT-аутсорсинга мы:
            </p>
            <ul className="sks-crosssell-list">
              <li>
                <CheckIcon />
                Подберём и закупим ПК, серверы и сетевое оборудование по ценам для партнёров.
              </li>
              <li>
                <CheckIcon />
                Обеспечим компанию стабильным и быстрым интернетом.
              </li>
              <li>
                <CheckIcon />
                Настроим рабочие места, почту, серверы и IP-телефонию.
              </li>
            </ul>
            <Link to="/it-outsourcing" className="btn btn-outline">
              Узнать про IT-аутсорсинг
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const processSteps = [
  {
    h: "Созвон и брифинг",
    p: "Вы рассказываете задачи. Мы задаём уточняющие вопросы и договариваемся про выезд.",
  },
  {
    h: "Выезд на объект",
    p: "Осматриваем место, считаем количество точек, составляем план работ.",
  },
  {
    h: "Схема и смета",
    p: "Проектируем схему. Считаем материалы, установку и настройку оборудования.",
  },
  {
    h: "Монтаж и подключение",
    p: "Аккуратно монтируем кабели на надёжных креплениях. Подключаем всё необходимое.",
  },
  {
    h: "Проверка и сдача",
    p: "Тестируем каждую точку, настраиваем оборудование и показываем результат.",
  },
  {
    h: "Поддержка",
    p: "Остаёмся на связи по гарантии, консультируем и подключаемся к новым задачам.",
  },
];

function Process() {
  return (
    <section className="sks-process-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Процесс</span>
          <h2>Этапы реализации проекта</h2>
          <p>Прозрачная схема работы — от первого звонка до запуска и поддержки.</p>
        </div>

        <ol className="sks-timeline">
          {processSteps.map((s, i) => (
            <li className="sks-timeline-item" key={s.h}>
              <div className="sks-timeline-marker">{String(i + 1).padStart(2, "0")}</div>
              <div className="sks-timeline-body">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const audienceTags = [
  { icon: Building2, label: "Офисы и бизнес-центры" },
  { icon: Store, label: "ТРЦ и магазины" },
  { icon: Warehouse, label: "Склады и логистика" },
  { icon: Factory, label: "Заводы и производство" },
  { icon: Landmark, label: "Госучреждения" },
  { icon: Plane, label: "Аэропорты и инфраструктура" },
  { icon: Coffee, label: "HoReCa: кафе, рестораны, отели" },
];

function Audience() {
  return (
    <section className="sks-audience-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">С кем мы работаем</span>
          <h2>Понимаем специфику объектов любого масштаба</h2>
          <p>
            Наша компания проектирует, прокладывает и обслуживает структурированные кабельные системы
            (СКС) и локально-вычислительные сети (ЛВС) для предприятий различных отраслей на
            территории Республики Казахстан. Мы реализуем проекты для следующих типов объектов:
          </p>
        </div>

        <div className="sks-audience-grid">
          {audienceTags.map((t) => {
            const Icon = t.icon;
            return (
              <div className="sks-audience-tag" key={t.label}>
                <Icon size={20} strokeWidth={1.8} />
                <span>{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    q: "От чего зависит цена?",
    a: "Стоимость формируется из количества рабочих мест, метража кабеля, архитектуры помещения и выбранного оборудования (бренда). Точную смету за рабочее место (включая материалы и работу) мы предоставляем после выезда инженера и замеров.",
  },
  {
    q: "Сколько времени занимает монтаж?",
    a: "В среднем от 3 до 10 рабочих дней, но всё сильно зависит от объёма и условий объекта. Мы заранее согласовываем графики и строго соблюдаем сроки.",
  },
  {
    q: "Можем ли мы рассчитать точки для Wi-Fi?",
    a: "Да. Мы просчитываем площади, учитываем толщину стен, перекрытий и возможные радиопомехи. На основе этих данных мы планируем оптимальное расположение и количество точек доступа, чтобы Wi-Fi работал бесшовно по всему объекту, а вам не пришлось докупать лишнее оборудование.",
  },
  {
    q: 'Что входит в "монтаж под ключ"?',
    a: "В стоимость входит всё: материалы (кабель, розетки, серверные шкафы, кабель-каналы), непосредственно монтажные работы, настройка и тестирование. Вам не нужно ни о чём дополнительно заботиться.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sks-faq-section">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">FAQ</span>
          <h2>Частые вопросы</h2>
        </div>

        <div className="sks-faq-list">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`sks-faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="sks-faq-question"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown className="sks-faq-chevron" size={20} />
                </button>
                {isOpen && <div className="sks-faq-answer">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const [consent, setConsent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    alert("Заявка отправлена! Менеджер свяжется с вами в течение 15 минут.");
  };
  return (
    <section className="cta-section">
      <div className="container">
        <div className="section-title section-title--light">
          <span className="section-eyebrow">Заявка</span>
          <h2>Оставьте заявку — рассчитаем проект и согласуем выезд инженера</h2>
        </div>

        <div className="contact-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="sks-company">Название компании или проекта</label>
              <input type="text" id="sks-company" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="sks-name">ФИО</label>
              <input type="text" id="sks-name" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="sks-phone">Телефон</label>
              <input
                type="tel"
                id="sks-phone"
                className="form-control"
                placeholder="+7 7__ ___ __ __"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sks-message">Кратко опишите задачу (необязательно)</label>
              <textarea id="sks-message" className="form-control" rows={4} />
            </div>

            <ConsentCheckbox id="sks-consent" checked={consent} onChange={setConsent} />

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", fontSize: "1.1rem" }}
              disabled={!consent}
            >
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
