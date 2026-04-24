import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/nls/StubPage";

export const Route = createFileRoute("/hr")({
  head: () => ({
    meta: [
      { title: "Вакансии — NLS Kazakhstan" },
      {
        name: "description",
        content: "Открытые вакансии в NLS Kazakhstan: телеком и IT-инфраструктура.",
      },
    ],
  }),
  component: () => (
    <StubPage
      title="ВАКАНСИИ"
      description="Скоро здесь будет список открытых вакансий и форма отклика."
    />
  ),
});
