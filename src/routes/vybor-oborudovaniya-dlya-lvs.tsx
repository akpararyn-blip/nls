import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { ArticleLayout } from "@/components/nls/ArticleLayout";

const META = {
  slug: "vybor-oborudovaniya-dlya-lvs",
  title: "Как выбрать оборудование для ЛВС: коммутаторы, точки доступа, патч-панели",
  description:
    "Сравниваем классы коммутаторов, Wi-Fi точек и пассивного оборудования для локальной сети офиса.",
  publishedTime: "2026-06-05T09:00:00+05:00",
  readingMinutes: 7,
  section: "СКС",
};

export const Route = createFileRoute("/vybor-oborudovaniya-dlya-lvs")({
  head: () => ({
    meta: [
      { title: `${META.title} — NLS Kazakhstan` },
      { name: "description", content: META.description },
      {
        name: "keywords",
        content:
          "оборудование ЛВС, коммутатор для офиса, Wi-Fi точка доступа, патч-панель, серверный шкаф, активное оборудование сети",
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
          Lorem ipsum dolor sit amet. Подбор оборудования для локальной сети —
          ключевой этап после проектирования. От него зависит скорость, надёжность
          и стоимость владения сетью на годы вперёд.
        </p>

        <h2>Активное оборудование</h2>
        <p>
          Коммутаторы делятся на неуправляемые, smart и L2/L3 управляемые.
          Выбор зависит от количества VLAN, требований к QoS и PoE-питанию для
          IP-телефонов и камер.
        </p>

        <h2>Wi-Fi инфраструктура</h2>
        <ul>
          <li>Wi-Fi 6 / 6E — для современных офисов с десятками устройств на точку.</li>
          <li>Бесшовный роуминг через контроллер или mesh.</li>
          <li>PoE+ для упрощённого монтажа точек на потолке.</li>
        </ul>

        <h2>Пассивное оборудование</h2>
        <p>
          Lorem ipsum: патч-панели, кросс-боксы, серверные шкафы, организаторы
          кабеля. Качественная пассивка продлевает жизнь сети и упрощает
          обслуживание.
        </p>
      </ArticleLayout>
    </SiteLayout>
  );
}
