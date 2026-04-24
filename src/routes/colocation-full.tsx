import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/nls/StubPage";

export const Route = createFileRoute("/colocation-full")({
  head: () => ({
    meta: [
      { title: "Аренда серверного шкафа — NLS Kazakhstan" },
      {
        name: "description",
        content: "Аренда серверного шкафа (full rack) в дата-центрах NLS Kazakhstan.",
      },
    ],
  }),
  component: () => (
    <StubPage
      title="АРЕНДА СЕРВЕРНОГО ШКАФА"
      description="Полнообъёмная аренда серверного шкафа (full rack) в наших дата-центрах."
    />
  ),
});
