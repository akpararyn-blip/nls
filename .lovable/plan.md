# Блок «Сопутствующие услуги» на серверных страницах

## Что делаем
Добавляем единый блок «Сопутствующие услуги» внизу страниц `dedicated`, `vps`, `colocation`, `colocation-full`, `iaas` — перед последним CTA / footer. На каждой странице показываем 4 другие серверные услуги (текущую исключаем).

## Состав услуг (5 шт.)

| ID            | Заголовок            | Путь               | Иконка (lucide)  |
|---------------|----------------------|--------------------|------------------|
| dedicated     | Dedicated серверы    | /dedicated         | Server           |
| vps           | VPS/VDS              | /vps               | MonitorCog       |
| colocation    | Colocation           | /colocation        | HardDrive        |
| colocation-full | Full Rack 42U      | /colocation-full   | Boxes            |
| iaas          | Виртуальный ДЦ (IaaS)| /iaas              | Cloud            |

Каждая карточка: иконка, заголовок, развёрнутое описание (2–3 строки, RU/KZ), 2–3 буллета-преимущества, кнопка-ссылка «Подробнее →».

## Внешний вид

**Десктоп (≥ 768px):**
- Сетка 4 колонки (`grid-template-columns: repeat(4, 1fr)`), карточки одинаковой высоты.
- Современный стиль: тёмная подложка карточки или светлая со стеклянным эффектом (в духе уже существующих `service-card` / `trust-card`), мягкая тень, акцент-бордер при hover, иконка в оранжевом круге, заголовок, описание, список буллетов с галочками, внизу кнопка-стрелка.
- Hover: лёгкий лифт + усиление тени + подсветка акцента.

**Мобильная версия (< 768px):**
- Горизонтальный snap-слайдер: `overflow-x: auto`, `scroll-snap-type: x mandatory`, карточки `min-width: 85%`, чтобы соседняя выглядывала.
- Скрытый скроллбар (`scrollbar-width: none`), точки-индикаторы под слайдером (опционально, по объёму времени — на этапе реализации решим).
- Стрелки навигации не показываем — нативный свайп.

## Реализация

1. **Новый компонент** `src/components/nls/RelatedServices.tsx`:
   - Принимает проп `exclude: ServiceId` — какую услугу исключить (текущую).
   - Внутри — массив из 5 услуг с локализованными RU/KZ полями через `useT()`.
   - Использует `<SmartLink to="/...">` для корректной работы и в SPA, и в режиме поддоменов (см. `src/components/nls/SmartLink.tsx`).
   - Один корневой `<section className="related-services">` с `<div className="container">`, заголовком и сеткой/слайдером карточек.

2. **CSS** — добавляем в `src/styles/nls.css` блок стилей `.related-services`, `.related-card`, `.related-card__icon`, `.related-card__bullets`, `.related-card__cta`, и медиа-запрос `@media (max-width: 767px)` с переключением grid → горизонтальный snap-скролл.

3. **Вставка на страницы** (только импорт + один JSX-тег перед последним блоком):
   - `src/routes/dedicated.tsx` — перед `<AfterCalcCTA />`: `<RelatedServices exclude="dedicated" />`.
   - `src/routes/vps.tsx` — перед `<VpsCTA />`: `<RelatedServices exclude="vps" />`.
   - `src/routes/colocation.tsx` — перед `<FinalCTA />`: `<RelatedServices exclude="colocation" />`.
   - `src/routes/colocation-full.tsx` — перед `<FinalCTA />`: `<RelatedServices exclude="colocation-full" />`.
   - `src/routes/iaas.tsx` — перед `</SiteLayout>` (там пока нет финального CTA): `<RelatedServices exclude="iaas" />`.

## Что не трогаем
- Логику калькуляторов, конфигураторы, формы, цены, существующие CTA — без изменений.
- Главную, About, Contacts, Internet, IT, IT-СКС — пользователь попросил только «серверные».
- Файлы маршрутов кроме перечисленных пяти.