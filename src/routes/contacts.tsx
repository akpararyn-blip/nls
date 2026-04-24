import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/nls/StubPage";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — NLS Kazakhstan" },
      {
        name: "description",
        content: "Контакты NLS Kazakhstan: телефоны и адреса в Алматы, Астане и Шымкенте.",
      },
    ],
  }),
  component: () => (
    <StubPage
      title="КОНТАКТЫ"
      description="Скоро здесь появятся подробные контакты офисов в Алматы, Астане и Шымкенте."
    />
  ),
});
