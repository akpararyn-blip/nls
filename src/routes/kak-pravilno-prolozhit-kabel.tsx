import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { ArticleLayout } from "@/components/nls/ArticleLayout";

const META = {
  slug: "kak-pravilno-prolozhit-kabel",
  title: "Как правильно проложить кабель в офисе: гайд от инженеров NLS",
  description:
    "Разбираем, как спроектировать трассы, выбрать категорию кабеля и избежать ошибок при прокладке СКС в офисе.",
  publishedTime: "2026-06-01T09:00:00+05:00",
  readingMinutes: 6,
  section: "СКС",
};

export const Route = createFileRoute("/kak-pravilno-prolozhit-kabel")({
  head: () => ({
    meta: [
      { title: `${META.title} — NLS Kazakhstan` },
      { name: "description", content: META.description },
      {
        name: "keywords",
        content:
          "прокладка кабеля, монтаж СКС, кабельные трассы, витая пара, UTP, кабель-канал, локальная сеть офис",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/${META.slug}` },
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "article:published_time", content: META.publishedTime },
      { property: "article:section", content: META.section },
      { property: "article:author", content: "NLS Kazakhstan" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <SiteLayout>
      <ArticleLayout meta={META}>
        <p>
          Грамотно проложенная кабельная система — это основа надёжной локальной
          сети офиса. От качества монтажа зависит стабильность интернета, работа
          IP-телефонии, систем видеонаблюдения и сетевых принтеров.
        </p>

        <h2>1. Проектирование трасс</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. До начала работ
          инженер выезжает на объект, делает замеры и формирует план прокладки —
          с учётом расположения рабочих мест, серверной и розеточных групп.
        </p>

        <h2>2. Выбор кабеля и компонентов</h2>
        <ul>
          <li>UTP Cat.5e — оптимально для базовых офисных задач до 1 Гбит/с.</li>
          <li>UTP/FTP Cat.6 — запас на будущее, поддержка 10G на коротких линках.</li>
          <li>Оптика — для магистралей между этажами и зданиями.</li>
        </ul>

        <h2>3. Монтаж и маркировка</h2>
        <p>
          Каждый кабель маркируется с двух сторон, фиксируется в кабель-каналах
          или лотках. После монтажа линии тестируются сертифицированным
          оборудованием — заказчик получает протоколы измерений.
        </p>

        <h2>4. Что важно проверить после сдачи</h2>
        <p>
          Lorem ipsum: схемы трасс, протоколы тестирования, маркировку портов
          патч-панели, гарантийные обязательства. Эти документы пригодятся при
          расширении сети или поиске неисправностей.
        </p>
      </ArticleLayout>
    </SiteLayout>
  );
}
