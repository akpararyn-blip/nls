import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/nls/StubPage";

export const Route = createFileRoute("/colocation")({
  head: () => ({
    meta: [
      { title: "Colocation — Размещение в ЦОД — NLS Kazakhstan" },
      {
        name: "description",
        content: "Размещение серверов и оборудования в собственных дата-центрах NLS в Алматы и Астане.",
      },
    ],
  }),
  component: () => (
    <StubPage
      title="РАЗМЕЩЕНИЕ В ЦОД (COLOCATION)"
      description="Размещение серверов в наших дата-центрах с резервированием и поддержкой 24/7."
    />
  ),
});
