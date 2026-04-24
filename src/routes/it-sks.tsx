import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/nls/StubPage";

export const Route = createFileRoute("/it-sks")({
  head: () => ({
    meta: [
      { title: "СКС. Монтаж локальных сетей — NLS Kazakhstan" },
      {
        name: "description",
        content: "Проектирование и монтаж структурированных кабельных сетей любой сложности.",
      },
    ],
  }),
  component: () => (
    <StubPage
      title="СКС. МОНТАЖ ЛОКАЛЬНЫХ СЕТЕЙ"
      description="Проектируем и монтируем структурированные кабельные сети для офисов и бизнес-центров."
    />
  ),
});
