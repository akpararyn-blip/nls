const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

export const RECAPTCHA_SITE_KEY = SITE_KEY;

/**
 * Выполняет reCAPTCHA v3 для указанного action и возвращает токен.
 * Если ключ не задан — возвращает пустую строку (форма всё равно отправится,
 * чтобы локальная разработка без ключа не ломалась).
 */
export async function executeRecaptcha(action: string): Promise<string> {
  if (typeof window === "undefined") return "";
  if (!SITE_KEY) {
    console.warn("[recaptcha] VITE_RECAPTCHA_SITE_KEY не задан — токен не будет получен");
    return "";
  }

  // Дождаться загрузки скрипта
  const start = Date.now();
  while (!window.grecaptcha || !window.grecaptcha.execute) {
    if (Date.now() - start > 8000) {
      throw new Error("reCAPTCHA не загрузилась. Проверьте подключение к Google.");
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve));
  return window.grecaptcha!.execute(SITE_KEY, { action });
}
