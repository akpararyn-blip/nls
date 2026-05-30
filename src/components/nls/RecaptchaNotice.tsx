import { useT } from "@/lib/lang-context";

export function RecaptchaNotice() {
  const t = useT();
  return (
    <p
      style={{
        fontSize: "0.72rem",
        color: "var(--color-text-light, #999)",
        marginTop: 8,
        lineHeight: 1.4,
      }}
    >
      {t("Защищено reCAPTCHA. Применяются ", "reCAPTCHA арқылы қорғалған. Google-дың ")}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
        {t("Политика конфиденциальности", "Құпиялылық саясаты")}
      </a>{" "}
      {t("и", "және")}{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
        {t("Условия использования", "Пайдалану шарттары")}
      </a>{" "}
      {t("Google.", "қолданылады.")}
    </p>
  );
}
