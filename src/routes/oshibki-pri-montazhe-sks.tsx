import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { ArticleLayout } from "@/components/nls/ArticleLayout";

const META = {
  slug: "oshibki-pri-montazhe-sks",
  title: "5 типичных ошибок при монтаже СКС и как их избежать",
  description:
    "Что чаще всего портит локальную сеть: неправильные радиусы изгиба, общие трассы с силовым кабелем, отсутствие маркировки и другие ошибки.",
  publishedTime: "2026-06-10T09:00:00+05:00",
  readingMinutes: 5,
  section: "СКС",
};

export const Route = createFileRoute("/oshibki-pri-montazhe-sks")({
  head: () => ({
    meta: [
      { title: `${META.title} — NLS Kazakhstan` },
      { name: "description", content: META.description },
      {
        name: "keywords",
        content:
          "ошибки монтажа СКС, наводки в сети, обжим витой пары, маркировка кабеля, типовые проблемы ЛВС",
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Большинство
          проблем с локальной сетью закладываются ещё на этапе монтажа. Вот
          ошибки, которые чаще всего встречаются на объектах.
        </p>

        <h2>1. Совместная трасса с силовым кабелем</h2>
        <p>
          Наводки от 220 В резко увеличивают потери пакетов. Минимальное
          расстояние между силовой и слаботочной линиями — 30 см, а пересечения
          выполняются строго под 90°.
        </p>

        <h2>2. Нарушение радиуса изгиба</h2>
        <p>
          Слишком крутые изгибы ломают геометрию пар внутри кабеля. Для UTP Cat.6
          радиус — не менее 4 диаметров кабеля.
        </p>

        <h2>3. Отсутствие маркировки</h2>
        <p>
          Без маркировки любой ремонт превращается в перебор всех розеток. Каждая
          линия должна иметь уникальный номер на обоих концах и в схеме.
        </p>

        <h2>4. Дешёвый обжим и кустарные коннекторы</h2>
        <p>Lorem ipsum: экономия на коннекторах и патч-кордах стабильно «съедает» скорость на гигабитных линках.</p>

        <h2>5. Нет финального тестирования</h2>
        <p>
          После монтажа линии обязательно проверяются кабельным тестером — это
          гарантия того, что сеть выдержит заявленную скорость.
        </p>
      </ArticleLayout>
    </SiteLayout>
  );
}
