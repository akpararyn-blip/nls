# Страница /iaas — Облачный сервер (VMware Cloud Director)

## Что создаём

Новый маршрут `src/routes/iaas.tsx` (файл уже зарегистрирован в `src/config/links.ts` и сгенерирован в `routeTree.gen.ts`). Страница состоит из двух блоков:

1. **Hero** — eyebrow «Cloud Director», заголовок «Облачный сервер», подпись «Виртуальный дата-центр на базе VMware», две кнопки: «Заказать» (открывает модалку консультации) и «Конфигуратор» (скролл к калькулятору).
2. **Калькулятор ВДЦ** — пользователь добавляет несколько независимых дата-центров, каждый со своим городом, кластером и ресурсами.

Логика скидок, мобильная плашка с раскрытием по клику/свайпу, клик-вне-закрытие и `useMobileBarVisibility` переиспользуются по той же схеме, что и на `/dedicated`.

## Модель данных

```ts
LOCATIONS = {
  almaty: [
    { id: 'epyc',   name: 'Epyc 9754, DDR5, SSD, HDD',
      prices: { cpu:1600, ram:3500, ssd:100, hdd:38, ip:2400, veeam:12000, archive:10 } },
    { id: 'e5v4',   name: 'E5-2680 v4, SSD, HDD',
      prices: { cpu:1500, ram:3500, ssd:100, hdd:38, ip:2400, veeam:12000, archive:10 } },
  ],
  astana:  [{ id:'e5v3', name:'E5-2643 v3, DDR4, SSD',
      prices: { cpu:2300, ram:3500, ssd:100, hdd:null, ip:2400, veeam:12000, archive:10 } }],
  shymkent:[{ id:'e5v3', name:'E5-2643 v3, DDR4, SSD',
      prices: { cpu:2300, ram:3500, ssd:100, hdd:null, ip:2400, veeam:12000, archive:10 } }],
}
```

Когда у кластера `hdd === null`, ползунок и строка vHDD скрываются, значение принудительно = 0.

## Диапазоны ресурсов (мин/макс, шаг)

| Поле | Min | Max | Шаг | Старт |
|---|---|---|---|---|
| vCPU | 1 | 1024 | 1 | 2 |
| vRAM, ГБ | 1 | 10240 | 1 | 4 |
| vSSD, ГБ | 1 | 512000 | 10 | 50 |
| vHDD, ГБ | 1 | 512000 | 10 | 1 (если доступен; иначе 0 и скрыт) |
| IP | 1 | 256 | 1 | 1 |
| Архив, ГБ | 1 | 512000 | 10 | 1 |
| Veeam (шт.) | 0 | 100 | 1 | 0 |

vSSD / vHDD / Архив имеют ввод-поле + кнопки −/+ (как в VPS). vCPU / vRAM / IP / Veeam — тоже поле ввода + −/+. Логика ввода (только цифры, округление к шагу, подсказки) копируется из калькулятора `vps.tsx`.

## Состояние

```ts
type Vdc = {
  id: string;
  city: 'almaty' | 'astana' | 'shymkent';
  clusterId: string;
  cpu: number; ram: number; ssd: number; hdd: number;
  ip: number; veeam: number; archive: number;
  // строковые буферы для полей ввода
}
const [vdcs, setVdcs] = useState<Vdc[]>([createDefaultVdc()])
const [period, setPeriod] = useState<1 | 6 | 12>(1)
```

Смена города → автоматически выбирается первый кластер города. Смена кластера без HDD → `hdd` обнуляется.

## Расчёт цены

Для каждого ВДЦ: `monthly = cpu*pCpu + ram*pRam + ssd*pSsd + hdd*pHdd + ip*pIp + veeam*pVeeam + archive*pArchive`.

`total = Σ monthly`. С учётом периода: `final = total * period * (1 - discount[period])`, где `discount = {1:0, 6:0.03, 12:0.06}` — те же константы и переключатель `CALC_DISCOUNT_ENABLED`, что в `dedicated.tsx`.

## UI

**Шапка калькулятора:** переключатель периода (1/6/12 мес.) — капсулы с бейджами −3% / −6% над активными опциями (компонент-переключатель копируется один в один из dedicated).

**Левая колонка (ВДЦ):** список карточек `.vdc-card`. Каждая карточка содержит:
- Заголовок «Дата-центр N» + кнопка «Удалить» (показывается только если ВДЦ > 1).
- Группа кнопок-табов «Алматы / Астана / Шымкент».
- Группа кнопок-табов «Кластер: …» (зависит от города).
- Строки ресурсов (label + цена за единицу + поле ввода + −/+) для vCPU, vRAM, vSSD, vHDD (если есть), IP, Veeam (шт), Архив.
- Под каждой карточкой — стоимость данного ВДЦ за месяц.

Под списком — кнопка «+ Добавить дата-центр» с пунктирной рамкой (новый стиль `.btn-add-vdc` в `src/styles/nls.css`).

**Правая колонка (sticky):** `.summary-card` с раскладкой по каждому ВДЦ (город, кластер, перечень параметров с подытогами), строка «Итого за N мес.» с учётом скидки и кнопка «Заказать». Содержание (subject) для модалки — текстовая сводка всех ВДЦ.

**Мобильная нижняя плашка:** копия паттерна из `dedicated.tsx` — `mobile-calc-bar` с `mobileExpanded`, `mobileBarRef`, клик-вне-закрытие, `useMobileBarVisibility('iaas-calculator')`, `body.has-mobile-bar` уже добавлен глобально.

## Стили

В `src/styles/nls.css` добавить минимальные новые правила:
- `.vdc-card`, `.vdc-card__header`, `.vdc-tabs`, `.vdc-tab`, `.vdc-tab.is-active`
- `.btn-add-vdc` (пунктирная рамка, акцентный цвет)
- `.vdc-resource-row` (если паттерн `.calc-row` из vps/dedicated не подходит 1-в-1 — иначе переиспользуем)

Все остальные стили (`.calc-section`, `.calc-grid`, `.calc-form`, `.summary-card`, `.plan-period-switch`, `.mobile-calc-bar`, hero) — уже существуют и используются как есть.

## SEO / head

```
title:       Облачный сервер VMware Cloud Director — NLS Kazakhstan
description: Виртуальный дата-центр на базе VMware. Гибкая конфигурация vCPU, vRAM, SSD/HDD, резервные копии Veeam. Дата-центры в Алматы, Астане и Шымкенте.
og:title / og:description — то же.
```

## Что НЕ меняется

- `index.tsx`, `Header`, `Footer`, `MobileNav`, `config/links.ts`, `routeTree.gen.ts` — уже содержат ссылку на `/iaas` с предыдущего хода.
- Логика `SmartLink` / `USE_INTERNAL_ROUTING` работает автоматически (iaas.nls.kz уже в карте поддоменов).
- Страницы `dedicated`, `vps`, `cloud` не трогаются.

## Файлы

- **создать:** `src/routes/iaas.tsx`
- **отредактировать:** `src/styles/nls.css` (несколько новых классов для карточки ВДЦ и кнопки «Добавить»)
