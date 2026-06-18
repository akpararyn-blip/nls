import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Clock, Users, Star, Headphones } from "lucide-react";
import { useT } from "@/lib/lang-context";

interface Ticket {
  key: string;
  id: string;
  initials: string;
  problemRu: string;
  problemKz: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatId(d: Date): string {
  return `${pad(d.getDate())}${pad(d.getMonth() + 1)}${d.getFullYear()}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

const SEEDS: Array<Omit<Ticket, "key" | "id">> = [
  { initials: "А.П", problemRu: "Не открывается панель управления хостингом", problemKz: "Хостинг басқару тақтасы ашылмайды" },
  { initials: "М.С", problemRu: "Нужна помощь с переносом сайта на новый сервер", problemKz: "Сайтты жаңа серверге көшіруге көмек керек" },
  { initials: "Д.К", problemRu: "Высокая нагрузка на CPU виртуальной машины", problemKz: "Виртуалды машинаның CPU жүктемесі жоғары" },
  { initials: "Е.Н", problemRu: "Настроить резервное копирование Veeam", problemKz: "Veeam сақтық көшірмесін баптау" },
  { initials: "Т.Б", problemRu: "Проблема с подключением по SSH к dedicated", problemKz: "Dedicated-ке SSH арқылы қосылу мәселесі" },
  { initials: "О.Ж", problemRu: "Не приходит письмо для подтверждения почты", problemKz: "Поштаны растау хаты келмейді" },
  { initials: "И.Р", problemRu: "Заменить диск в colocation-шкафу", problemKz: "Colocation шкафында дискіні ауыстыру" },
  { initials: "С.А", problemRu: "Открыть дополнительный порт в firewall", problemKz: "Firewall-да қосымша портты ашу" },
];

export function SupportPromo() {
  const t = useT();

  const tickets = useMemo<Ticket[]>(() => {
    const now = new Date();
    let offset = 0;
    return SEEDS.map((s, i) => {
      offset += 7 + ((i * 13) % 19);
      const d = new Date(now.getTime() - offset * 1000);
      return {
        ...s,
        key: `tk-${i}`,
        id: formatId(d),
      };
    });
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [resolvedSet, setResolvedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // ДОБАВЛЕНО: Проверяем, является ли устройство мобильным (ширина экрана до 768px)
    const isMobile = window.matchMedia?.("(max-width: 768px)").matches; 

    // Отключаем тяжелые вычисления JS для мобильных и при prefers-reduced-motion
    if (reduce || isMobile) {
      const all = new Set<string>();
      containerRef.current?.querySelectorAll<HTMLElement>("[data-ticket-uid]").forEach((el) => {
        const uid = el.dataset.ticketUid;
        if (uid) all.add(uid);
      });
      setResolvedSet(all);
      return; // Выходим из useEffect, не запуская requestAnimationFrame
    }

    let raf = 0;
    let last = 0;
    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (ts - last < 140) return;
      last = ts;
      const c = containerRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const cards = c.querySelectorAll<HTMLElement>("[data-ticket-uid]");
      let next: Set<string> | null = null;
      cards.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const uid = el.dataset.ticketUid!;
        const should = center < midY;
        const has = resolvedSet.has(uid);
        if (should && !has) {
          if (!next) next = new Set(resolvedSet);
          next.add(uid);
        } else if (!should && has) {
          if (!next) next = new Set(resolvedSet);
          next.delete(uid);
        }
      });
      if (next) setResolvedSet(next);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [resolvedSet]);

  const loop = [...tickets, ...tickets];

  return (
    <section className="support-promo" aria-label={t("Превосходная техподдержка 24/7", "Тамаша техникалық қолдау 24/7")}>
      <div className="container">
        <div className="support-promo__inner">
          <div className="support-promo__left">
            <span className="support-promo__eyebrow">
              <Headphones size={16} strokeWidth={2} />
              {t("Превосходная техподдержка", "Тамаша техникалық қолдау")}
            </span>
            <h2 className="support-promo__title">24/7</h2>
            <p className="support-promo__desc">
              {t(
                "Наши инженеры решают любые технические вопросы — помощь с переносом сайта, настройками хостинга или сервера. Обращайтесь в любое время суток, даже в выходные и праздники, и получайте ответ за считанные минуты.",
                "Біздің инженерлер кез келген техникалық сұрақты тегін шешеді — сайтты көшіру, хостинг пен сервер баптауларына көмек. Тәулік бойы, тіпті демалыс пен мерекелерде де хабарласыңыз — жауапты бірнеше минут ішінде аласыз."
              )}
            </p>

            <div className="support-metrics">
              <div className="support-metric">
                <div className="support-metric__icon"><Users size={18} strokeWidth={2} /></div>
                <div className="support-metric__value">25+</div>
                <div className="support-metric__label">{t("человек в команде поддержки", "қолдау командасындағы маман")}</div>
              </div>
              <div className="support-metric">
                <div className="support-metric__icon"><Clock size={18} strokeWidth={2} /></div>
                <div className="support-metric__value">3:45<span className="support-metric__unit">{t(" мин", " мин")}</span></div>
                <div className="support-metric__label">{t("среднее время реакции на запрос", "өтінімге орташа жауап беру уақыты")}</div>
              </div>
              <div className="support-metric">
                <div className="support-metric__icon"><Star size={18} strokeWidth={2} /></div>
                <div className="support-metric__value">4.55</div>
                <div className="support-metric__label">{t("средняя оценка качества поддержки", "қолдау сапасының орташа бағасы")}</div>
              </div>
            </div>
          </div>

          <div className="support-promo__right" aria-hidden="true">
            <div className="support-tickets" ref={containerRef}>
              <div className="support-tickets__track">
                {loop.map((tk, idx) => {
                  const uid = `${tk.key}-${idx}`;
                  const resolved = resolvedSet.has(uid);
                  return (
                    <article
                      key={uid}
                      data-ticket-uid={uid}
                      className={`ticket-card${resolved ? " ticket-card--resolved" : ""}`}
                    >
                      <header className="ticket-card__head">
                        <span className="ticket-card__id">Ticket #{tk.id}</span>
                        <span className={`ticket-card__status ${resolved ? "ticket-card__status--resolved" : "ticket-card__status--inwork"}`}>
                          {resolved ? (
                            <>
                              <Check size={12} strokeWidth={3} />
                              {t("Решено", "Шешілді")}
                            </>
                          ) : (
                            <>
                              <span className="ticket-card__dot" />
                              {t("В работе", "Жұмыста")}
                            </>
                          )}
                        </span>
                      </header>
                      <div className="ticket-card__body">
                        {/* ИСПРАВЛЕНО: добавлена обертка t() для корректной локализации */}
                        <span className="ticket-card__line ticket-card__line--lg">{t(tk.problemRu, tk.problemKz)}</span>
                        <span className="ticket-card__line ticket-card__line--sm">{t(tk.problemRu, tk.problemKz)}</span>
                      </div>
                      <footer className="ticket-card__foot">
                        <span className="ticket-card__avatar">{tk.initials}</span>
                        <span className="ticket-card__line ticket-card__line--xs">client@example.com · +7 (***) ***-**-**</span>
                      </footer>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}