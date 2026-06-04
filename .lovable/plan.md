## 1. Страница `/vps` (`src/routes/vps.tsx`)

**1.1 Убрать HDD из конфигуратора**
- Удалить `PRICE_HDD`, `HDD_MIN`, `HDD_STEP`, состояния `hdd`/`hddInput`, `showHdd`/`cityKey`, блок `<ResourceInputRow>` для HDD, строку HDD в summary, и `hdd` из всех `subject`.
- Упростить `ResourceKey`, `onDiskInput`, `commitDisk`, `stepDisk` — оставить только SSD/RAM.

**1.2 RAM с возможностью ввода**
- Заменить `<ResourceRow>` для RAM на `<ResourceInputRow>` по аналогии с SSD: добавить `ramInput` state, валидацию (мин 1 ГБ, шаг 1).
- Обобщить `onDiskInput`/`commitDisk`/`stepDisk` чтобы работали с полями `ssd` и `ram` (мин/шаг параметром).

**1.3 Уменьшить «Ваша конфигурация»**
- В `src/styles/nls.css` ужать `.summary-card`: меньше padding, меньше шрифт `.summary-header`, `.summary-total-amount`, меньше gap в `.summary-body`.

**1.4 Мобильная версия — показать «Ваша конфигурация» под конфигуратором**
- В CSS убрать `display:none` на `.calc-summary` в мобильном брейкпоинте (или заменить на `display:block`), порядок уже даст вертикальная сетка. Нижняя плашка `.mobile-calc-bar` остаётся.

---

## 2. Страница `/dedicated` (`src/routes/dedicated.tsx` + `src/components/nls/DedicatedPlans.tsx`)

**2.1–2.4 Hero**
- H1: «Аренда серверов в дата-центре NLS» → «Аренда высокопроизводительных физических серверов в дата-центре NLS» (RU + KZ).
- Subtitle: → «Готовые сервера с настраиваемой конфигурацией под ваши требования.»
- `features`: «Настройка под задачу» → «Размещены в Алматы и в Астане»; «До 10 000 Мбит/с» → «С каналом до 100 Мбит/с».

**2.5 Готовые конфигурации — «Всего ядер/потоков»**
- В `DedicatedPlans.tsx` тип `Plan` расширить полем `cores: string` (например `"28C/56T"`).
- Заполнить для всех 4 карточек.
- В `plan-specs` после CPU добавить пункт с иконкой и подписью «Всего ядер/потоков» — значение `plan.cores`.

**2.6 Готовые конфигурации — IPMI в `plan-extras`**
- Добавить `<span className="plan-tag">IPMI</span>` после трёх существующих тегов.

**2.7 Конфигуратор — IPMI бесплатно по умолчанию**
- `ipmi` state по умолчанию `true`; цена IPMI = 0.
- UI «Аппаратный IPMI 3 000 ₸/мес» → «0 ₸/мес» (или «бесплатно»).
- В summary блок «Дополнительно» (или отдельный) показывать IPMI с ценой `0 ₸`, даже когда total раздела = 0 → ввести проп `alwaysShow` для `SummarySection`.

**2.8 Конфигуратор — `100 Mbit/s — 0 ₸` в сетевых портах**
- Добавить в `networkOptions` первой позицией `{ name: "100 Mbit/s", price: 0 }`.
- В summary отдельным разделом «Сетевой порт» рендерить фиксированный пункт `100 Mbit/s — 0 ₸` если в `networkItems` нет позиции с этим именем; пользовательские дополнительные порты добавляются ниже.

**2.9 «Ваша конфигурация» — раздел «Интернет»**
- После раздела «Сетевой порт» добавить `<SummarySection title="Интернет" items={[{ name: "100 Мбит/с", price: 0 }]} total={0} alwaysShow />` (RU+KZ).

**2.10 Лимиты в `DynamicSection`**
- Добавить проп `maxRows`: «Сетевой порт» = 20, «Накопители» = 25 (и/или `min(25, cpu.diskNumber)` — см. п.2.14).
- При достижении лимита кнопка «+ Добавить …» disabled/скрыта.

**2.11 Название плана в заявку (готовые конфигурации)**
- В `DedicatedPlans.tsx` уже передаётся `plan.model` — оставить, но проверить, что в subject именно `plan-title` (model). Subject: `Заказ тарифа: <plan.model> | <plan.ram>, <plan.ssd>, ...`.

**2.12 Параметры конфигуратора в заявку**
- В обеих кнопках «Заказать» (десктоп + `.mobile-calc-bar`) заменить `openConsultationModal` на `openConsultationModalWith({ subject })`.
- `buildSubject(calc, ipCount, raid, ipmi, period)` собирает строку: `Заказ сервера (конфигуратор): CPU=<name>; RAM=<name>; Накопители: <a>, <b>; Сетевой порт: 100 Mbit/s + доп; Интернет: 100 Мбит/с; IPMI; [RAID]; IP x<n>; Итого <total>/мес`.

**2.13 «Ваша конфигурация» — бесплатный IP**
- Вынести IP из `extras` в отдельный `SummarySection` «IP адрес» с `alwaysShow`: всегда строка «1 публичный IPv4 — 0 ₸», при `ipCount > 1` — дополнительная строка `+(n-1) IP — <price>`.

**2.14 Фильтрация накопителей по формфактору CPU**
- Поля `formFactor` и `diskNumber` уже есть в `cpuOptions`/`storageOptions` — использовать.
- В `Calculator()` вычислить `cpuFF = cpuOptions[cpuIdx]?.formFactor`.
- `allowedStorage = storageOptions.filter(o => !cpuFF ? true : cpuFF === 3.5 ? true : o.formFactor === 2.5)` — передать в `DynamicSection options`.
- При смене CPU сбрасывать `storage.rows[].index = null` для тех, чей текущий вариант больше не допустим.
- `maxStorageRows = Math.min(25, cpuOptions[cpuIdx]?.diskNumber ?? 25)` — передать как `maxRows`.

**2.15 Период оплаты (1 / 6 / 12 мес) в «Готовых конфигурациях»**
- В `DedicatedPlans.tsx` добавить state `period: 1 | 6 | 12` (общий, сверху над `.plans-grid`).
- Переключатель из трёх кнопок «1 месяц / 6 месяцев / 12 месяцев». На 6 и 12 — шильдики `−3%` и `−6%` (новые CSS-классы `.plan-period-switch`, `.plan-period-btn`, `.plan-discount-badge`).
- Цена в карточке:
  - 1 мес: `plan.price`
  - 6 мес: `round(plan.price * 6 * 0.97)`, экономия = `round(plan.price * 6 * 0.03)`
  - 12 мес: `round(plan.price * 12 * 0.94)`, экономия = `round(plan.price * 12 * 0.06)`
- В `.plan-price` показывать сумму и подпись `₸ за <n> мес.`
- Под ценой для 6/12 строка «Экономия: <amount> ₸» (`.plan-saving`).
- В `subject` кнопки «Заказать» добавить выбранный период и цену за период.

---

## Технические детали
- Все новые строки RU + KZ через `useT()`.
- Файлы:
  - edit: `src/routes/vps.tsx`, `src/routes/dedicated.tsx`, `src/components/nls/DedicatedPlans.tsx`, `src/styles/nls.css`.
