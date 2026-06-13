import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/nls/SiteLayout";
import { CloudHub } from "@/components/nls/CloudHub";

export const Route = createFileRoute("/cloud")({
  head: () => ({
    meta: [
      { title: "Облачные решения и услуги дата-центра — NLS Kazakhstan" },
      {
        name: "description",
        content:
          "Облачные решения NLS: виртуальный дата-центр, VPS/VDS, объектное хранилище S3, облачное хранилище и услуги собственного дата-центра Tier III — colocation, аренда стойки, dedicated серверы.",
      },
      { property: "og:title", content: "Облачные решения и услуги дата-центра — NLS Kazakhstan" },
      {
        property: "og:description",
        content:
          "Виртуальный ЦОД, VPS, S3, облачное хранилище, colocation, аренда стойки и dedicated серверы — всё в одном месте.",
      },
    ],
  }),
  component: CloudPage,
});

export function CloudPage() {
  return (
    <SiteLayout>
      <CloudHub />
    </SiteLayout>
  );
}
