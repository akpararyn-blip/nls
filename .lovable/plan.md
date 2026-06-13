
# Новые страницы: Объектное S3 и Облачное хранилище

## Маршруты
- `src/routes/object-storage.tsx` → `/object-storage` — S3, 110 ₸/ГБ
- `src/routes/cloud-storage.tsx` → `/cloud-storage` — Cloud, 100 ₸/ГБ, скидки 6 мес = −3%, 12 мес = −6%

TanStack Router сам обновит `routeTree.gen.ts` после создания файлов.

## Структура каждой страницы
По образцу `vps.tsx` / `iaas.tsx` через `SiteLayout`:

1. **Hero** — H1, подзаголовок, 2 CTA («Рассчитать стоимость», «Получить консультацию»), иллюстрация.
2. **Преимущества** — 4–6 карточек (Tier III ЦОД в Казахстане, SLA 99.9%, S3-совместимый API / снэпшоты и версионирование, шифрование на лету, гео-репликация, оплата по факту).
3. **Калькулятор** + `<CalculatorDisclaimer />`.
4. **Use-cases / для кого** — 3–4 карточки (бэкапы, медиа, статика сайтов, аналитика; для cloud — командное файловое хранилище, архивы, обмен файлами).
5. **FAQ** — 3–5 вопросов в формате других страниц.
6. **`<SupportPromo />`** — блок «Превосходная техподдержка 24/7» (тот же, что и на серверных страницах).
7. **«С этим покупают» / `<RelatedServices exclude="object-storage" />`** (или `"cloud-storage"`) — обновлённый блок «Что ещё может пригодиться», см. ниже.

Формы и CTA переиспользуют `openConsultationModal` из `useCity()` — новых форм не создаём.

## Калькулятор — `src/components/nls/StorageCalculator.tsx`

Props:
```ts
{
  pricePerGb: number;          // 110 или 100
  discounts?: { months: number; percent: number }[]; // только для cloud: [{6,3},{12,6}]
  storageId: "object" | "cloud";
}
```

UX:
- **Слайдер** с нелинейной шкалой через массив из 20 опорных значений:
  `[1, 100, 200, …, 1000, 2000, …, 10000]`. Реализация: `<input type="range" min=0 max=19 step=1>`, отображаемое значение = `steps[index]`.
- **Числовое поле** рядом — ручной ввод точного объёма в ГБ (1…10 000); цена считается от введённого значения, ближайшая точка слайдера подсвечивается.
- **Быстрые пресеты-кнопки:** `100 / 500 / 1 000 / 5 000 / 10 000 ГБ`.
- По умолчанию **1 ГБ**.
- Большой блок результата:
  - Месячная цена: `volume × pricePerGb` (с `formatPrice` и `₸/мес`).
  - Для cloud: segmented control **1 мес / 6 мес / 12 мес**. При выборе 6/12 — итог за период со скидкой, бейдж «−3%»/«−6%», подпись «эквивалент … ₸/мес».
- CTA «Заказать» → `openConsultationModal`.

Стили — новые классы в `src/styles/nls.css` (`.storage-calc`, `.storage-calc__slider`, `.storage-calc__presets`, `.storage-calc__result`, `.storage-calc__period`), переиспользуем существующие CSS-переменные.

## Обновление мега-меню и MobileNav

В Header (мега-меню, группа «Серверы») и в `MobileNav.tsx` (группа «Серверы», после IaaS) добавляем 2 ссылки:
- `/object-storage` — «Объектное хранилище S3» (иконка `Database`)
- `/cloud-storage` — «Облачное хранилище» (иконка `CloudUpload` / `FolderCloud`)

IaaS в мега-меню сейчас отсутствует — добавляем и его (иконка `Cloud`/`Boxes`), чтобы группа Серверы была полной. В мобильном меню IaaS уже есть.

## Блок «Что ещё может пригодиться» / «С этим покупают»

`src/components/nls/RelatedServices.tsx`:
- Расширяем тип:
  ```ts
  type RelatedServiceId =
    | "dedicated" | "vps" | "colocation" | "colocation-full"
    | "iaas" | "object-storage" | "cloud-storage";
  ```
- Добавляем 2 элемента (icon, title, desc, 3 буллита RU/KZ, ссылка на новую страницу). После `filter(exclude)` всегда показываем ровно **6 карточек**.

Оптимизация сетки `.related-grid` в `src/styles/nls.css` под 6 карточек:
- ≥1200px: `grid-template-columns: repeat(3, 1fr)` (2 ряда × 3).
- 768–1199px: `repeat(2, 1fr)`.
- <768px: 1 колонка.
- Чуть уменьшаем внутренние отступы карточек и `line-clamp: 3` для `.related-card__desc`, чтобы 6 карточек выглядели опрятно.

На существующих 5 серверных страницах **код менять не нужно** — `<RelatedServices />` сам подтянет 6 услуг. На двух новых страницах вставляем `<RelatedServices exclude="object-storage" />` / `"cloud-storage"`.

## SupportPromo
На обеих новых страницах вставляем `<SupportPromo />` сразу перед `<RelatedServices />` — компонент уже существует и используется без пропсов.

## i18n
Все строки через `useT()` с парой RU/KZ — стиль как на других страницах.

## SEO
В `createFileRoute(...).head` обеих страниц: `<title>` ≤60, meta description ≤160, og:title / og:description. Один `<h1>` в Hero.

## Что НЕ трогаем
- Калькуляторы и формы существующих страниц.
- Главную, About, Contacts, Internet, IT, IT-СКС, HR.
- Footer / Modals / FloatingContact логику.
- Компонент `SupportPromo`.

## Файлы
- created: `src/routes/object-storage.tsx`
- created: `src/routes/cloud-storage.tsx`
- created: `src/components/nls/StorageCalculator.tsx`
- edited: `src/components/nls/RelatedServices.tsx`
- edited: `src/components/nls/Header.tsx`
- edited: `src/components/nls/MobileNav.tsx`
- edited: `src/styles/nls.css`
- авто: `src/routeTree.gen.ts`
