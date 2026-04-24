import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/nls/StubPage";

export const Route = createFileRoute("/vps")({
  head: () => ({
    meta: [
      { title: "VPS — Виртуальный сервер — NLS Kazakhstan" },
      {
        name: "description",
        content: "Аренда виртуальных серверов VPS/VDS в дата-центрах NLS Kazakhstan.",
      },
    ],
  }),
  component: () => (
    <StubPage
      title="ВИРТУАЛЬНЫЙ СЕРВЕР VPS"
      description="Виртуальные серверы (VPS/VDS) с гибкой конфигурацией и гарантированными ресурсами."
    />
  ),
});
