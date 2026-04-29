export function RecaptchaNotice() {
  return (
    <p
      style={{
        fontSize: "0.72rem",
        color: "var(--color-text-light, #999)",
        marginTop: 8,
        lineHeight: 1.4,
      }}
    >
      Защищено reCAPTCHA. Применяются{" "}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
        Политика конфиденциальности
      </a>{" "}
      и{" "}
      <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
        Условия использования
      </a>{" "}
      Google.
    </p>
  );
}
