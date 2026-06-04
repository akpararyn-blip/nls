import {
  Battery,
  BatteryCharging,
  Plug,
  Gauge,
  Zap,
  Snowflake,
  Wind,
  Thermometer,
  Filter,
  Flame,
  Fingerprint,
  Camera,
  ServerCog,
  ShieldCheck,
  Activity,
  Clock,
  FileBadge2,
} from "lucide-react";
import { useT } from "@/lib/lang-context";

type CardItem = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  h: string;
  p: string;
};

function EnterpriseSection({
  eyebrow,
  title,
  subtitle,
  items,
  alt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  items: CardItem[];
  alt?: boolean;
}) {
  return (
    <section className={`enterprise-section${alt ? " enterprise-section--alt" : ""}`}>
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="enterprise-grid">
          {items.map(({ Icon, h, p }) => (
            <div className="enterprise-card" key={h}>
              <div className="enterprise-card-icon">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PowerSection() {
  const t = useT();
  const items: CardItem[] = [
    { Icon: BatteryCharging, h: t("2 автономных дизель-генератора", "2 автономды дизельді генераторы"), p: t("Мощность 380 кВт со встроенным баком — до 8 часов бесперебойной работы под нагрузкой.", "Кірістірілген багы бар 380 кВт қуат — жүктеме кезінде 8 сағатқа дейін үздіксіз жұмыс.") },
    { Icon: Battery, h: t("Двойное резервирование ИБП", "ҮҚК қос резервтеу"), p: t("Два модульных UPS по 200 kVA с КПД 95,5% обеспечивают мгновенный переход на резерв.", "ПӘК 95,5% болатын 200 kVA екі модульдік UPS резервке лезде ауысуды қамтамасыз етеді.") },
    { Icon: Zap, h: t("Автоматический ввод резерва (ATS)", "Автоматты резерв енгізу (ATS)"), p: t("Контакторы Schneider Electric (600 А). Переключение между вводами без потери питания.", "Schneider Electric контакторлары (600 А). Қуатты жоғалтпай кірістер арасында ауысу.") },
    { Icon: Plug, h: t("Выделенная буферная зона", "Бөлінген буферлік аймақ"), p: t("Массив из 80 кислотных батарей (12 V 250 Ah) в специальных изолированных шкафах.", "Арнайы оқшауланған шкафтардағы 80 қышқыл батареядан тұратын массив (12 V 250 Ah).") },
    { Icon: Gauge, h: t("Умное распределение в стойке", "Шкафтағы ақылды бөлу"), p: t("Интеллектуальные PDU (1 фаза, 40 А, 24 порта C13/C19) со встроенными счётчиками потребления.", "Кірістірілген тұтыну санауыштары бар интеллектуалды PDU (1 фаза, 40 А, 24 порт C13/C19).") },
  ];
  return (
    <EnterpriseSection
      eyebrow={t("Энергетика", "Энергетика")}
      title={t("Энергоснабжение со 100% защитой от сбоев", "Іркілістерден 100% қорғалған энергиямен қамту")}
      subtitle={t("Многоуровневая архитектура питания 2N: два независимых ввода, ИБП и резервная генерация.", "Көп деңгейлі 2N қуат сәулеті: екі тәуелсіз кіріс, ҮҚК және резервтік генерация.")}
      items={items}
    />
  );
}

export function ClimateSection() {
  const t = useT();
  const items: CardItem[] = [
    { Icon: Snowflake, h: t("Изолированный холодный коридор", "Оқшауланған суық дәліз"), p: t("Cold Aisle Containment со слайд-дверьми.", "Слайд-есіктері бар Cold Aisle Containment.") },
    { Icon: Thermometer, h: t("Экстремальная стойкость", "Экстремалды төзімділік"), p: t("Старт и работа фреонового контура при уличных температурах от −40 °C до +45 °C.", "Көше температурасы −40 °C-тан +45 °C-қа дейінгі фреон контурын іске қосу және жұмыс істеу.") },
    { Icon: Wind, h: t("Снятие тепловой нагрузки", "Жылу жүктемесін алу"), p: t("6 внутрирядных (InRow) прецизионных кондиционеров по 35 кВт каждый.", "Әрқайсысы 35 кВт болатын 6 қатарішілік (InRow) прецизиялық кондиционер.") },
    { Icon: Filter, h: t("Непрерывная очистка воздуха", "Ауаны үздіксіз тазалау"), p: t("Приток свежего отфильтрованного воздуха 400 м³/ч и вытяжка 1300 м³/ч.", "400 м³/сағ сүзілген таза ауа және 1300 м³/сағ сорып шығару.") },
    { Icon: ServerCog, h: t("Стабилизация электрощитовых", "Электр қалқандарын тұрақтандыру"), p: t("2 резервных кондиционера (7,5 кВт) с постоянным контролем температуры и влажности.", "Температура мен ылғалдылықты үнемі бақылайтын 2 резервтік кондиционер (7,5 кВт).") },
  ];
  return (
    <EnterpriseSection
      eyebrow={t("Климат", "Климат")}
      title={t("Экстремальная стойкость и прецизионное охлаждение", "Экстремалды төзімділік және прецизиялық салқындату")}
      subtitle={t("Архитектура холодного коридора и InRow-охлаждение поддерживают точные параметры микроклимата.", "Суық дәліз сәулеті мен InRow салқындатуы микроклиматтың дәл параметрлерін ұстап тұрады.")}
      items={items}
      alt
    />
  );
}

export function SecuritySection() {
  const t = useT();
  const items: CardItem[] = [
    { Icon: Flame, h: t("Автоматика пожаротушения FM200", "FM200 өрт сөндіру автоматикасы"), p: t("190 кг гептафторпропана подавляют возгорание на молекулярном уровне без ущерба оборудованию. При срабатывании отключается вентиляция и активируются клапаны сброса давления.", "190 кг гептафторпропан жанып кетуді жабдыққа зиян келтірмей молекулалық деңгейде басады. Іске қосылған кезде желдеткіш сөнеді және қысымды босату клапандары іске қосылады.") },
    { Icon: Fingerprint, h: t("Биометрический доступ", "Биометрикалық қол жеткізу"), p: t("Face ID, RFID-карты и отпечаток пальца. База рассчитана на 50 000 пользователей.", "Face ID, RFID-карталар және саусақ ізі. База 50 000 пайдаланушыға арналған.") },
    { Icon: Camera, h: t("Визуальный и сенсорный контроль", "Көрнекі және сенсорлық бақылау"), p: t("6 HD-камер с архивом 30 дней, датчики температуры, влажности, задымления и протечек.", "30 күн мұрағатымен 6 HD-камера, температура, ылғалдылық, түтін және ағып кету датчиктері.") },
    { Icon: Activity, h: t("Единый управляющий центр", "Біртұтас басқару орталығы"), p: t("Сервер на Linux собирает данные с 200+ модулей и отправляет уведомления через SMS, Email и Telegram 24/7.", "Linux сервері 200+ модульден деректер жинап, SMS, Email және Telegram арқылы 24/7 хабарландыру жібереді.") },
  ];
  return (
    <EnterpriseSection
      eyebrow={t("Безопасность", "Қауіпсіздік")}
      title={t("Многоуровневый контроль доступа и иммунитет к инцидентам", "Көп деңгейлі қол жеткізу бақылауы және оқиғаларға иммунитет")}
      subtitle={t("Физическая защита оборудования и непрерывный мониторинг каждой подсистемы дата-центра.", "Жабдықты физикалық қорғау және дата-орталықтың әр ішкі жүйесін үздіксіз бақылау.")}
      items={items}
    />
  );
}

export function SlaSection() {
  const t = useT();
  const stats = [
    { value: "99,982%", label: t("Доступность по SLA", "SLA бойынша қолжетімділік"), text: t("Ежеквартальные отчёты и прозрачный портал клиента с актуальными метриками.", "Тоқсан сайынғы есептер және өзекті метрикалары бар ашық клиент порталы.") },
    { value: t("≤ 15 мин", "≤ 15 мин"), label: t("Реакция инженера", "Инженердің реакциясы"), text: t("Круглосуточный мониторинг 24/7/365, выделенный NOC и мгновенные уведомления.", "24/7/365 тәулік бойы бақылау, бөлінген NOC және лезде хабарландырулар.") },
    { value: "2N", label: t("Отказоустойчивость Tier III", "Tier III істен шықпауы"), text: t("Параллельные пути электропитания и охлаждения, плановые работы без остановки сервисов.", "Электр қуаты мен салқындатудың параллель жолдары, сервистерді тоқтатпай жоспарлы жұмыстар.") },
  ];
  return (
    <section className="enterprise-section enterprise-section--alt">
      <div className="container">
        <div className="section-title">
          <span className="section-eyebrow">Tier III · SLA</span>
          <h2>
            {t("Инфраструктура стандарта", "Стандарт инфрақұрылымы")}{" "}
            <span style={{ color: "var(--color-orange)" }}>Tier III</span>{" "}
            {t("с гарантией доступности", "қолжетімділік кепілдігімен")}
          </h2>
          <p>{t("Прозрачные обязательства, измеримые метрики и регулярный аудит соответствия.", "Ашық міндеттемелер, өлшенетін метрикалар және сәйкестікті жүйелі түрде тексеру.")}</p>
        </div>
        <div className="sla-stats">
          {stats.map((s) => {
            const isReaction = s.label === t("Реакция инженера", "Инженердің реакциясы");
            const isTier = s.label === t("Отказоустойчивость Tier III", "Tier III істен шықпауы");
            const isReg = s.label === t("Соответствие регуляторам", "Реттеушілерге сәйкестік");
            return (
              <div className="sla-stat" key={s.label}>
                <div className="sla-stat-value">{s.value}</div>
                <div className="sla-stat-label">
                  {isReg ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <FileBadge2 size={16} /> {s.label}
                    </span>
                  ) : isReaction ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <Clock size={16} /> {s.label}
                    </span>
                  ) : isTier ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <ShieldCheck size={16} /> {s.label}
                    </span>
                  ) : (
                    s.label
                  )}
                </div>
                <div className="sla-stat-text">{s.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EnterpriseDataCenterBlocks() {
  return (
    <>
      <PowerSection />
      <ClimateSection />
      <SecuritySection />
      <SlaSection />
    </>
  );
}
