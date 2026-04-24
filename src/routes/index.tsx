import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NLS — Синхронизация работает" },
      {
        name: "description",
        content:
          "Тестовая страница NLS для проверки синхронизации Lovable и GitHub.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <section className="max-w-xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          NLS
        </p>
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Синхронизация с GitHub работает ✅
        </h1>
        <p className="text-lg text-muted-foreground">
          Это тестовая страница. Если вы видите её в превью и в коммите вашего
          репозитория — связка Lovable ↔ GitHub настроена корректно.
        </p>
      </section>
    </main>
  );
}
