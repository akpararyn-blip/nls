import { useEffect, useState } from "react";

const STORAGE_KEY = "nls_cookie_consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const t = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  const setConsent = (type: "all" | "necessary" | "declined") => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, type);
    setShow(false);
  };

  return (
    <div className={`cookie-banner${show ? " show" : ""}`} id="cookie-banner">
      <div className="container">
        <div className="cookie-content">
          <div className="cookie-text">
            Сайт www.nls.kz использует файлы cookie. Используя данный сайт, Вы подтверждаете свое согласие
            на использование файлов cookie, обработку Ваших персональных данных на условиях Политики. Если
            Вы не согласны, Вы можете отказаться от использования cookie, изменив настройки в браузере.
          </div>
          <div className="cookie-buttons">
            <button type="button" className="btn btn-primary" onClick={() => setConsent("all")}>
              Принять
            </button>
            <button type="button" className="btn btn-outline" onClick={() => setConsent("necessary")}>
              Принять только необходимые
            </button>
            <button
              type="button"
              className="btn"
              style={{ background: "#eee", color: "#333" }}
              onClick={() => setConsent("declined")}
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
