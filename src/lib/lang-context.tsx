import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "ru" | "kz";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** t(ru, kz) — выбирает нужную строку */
  t: (ru: string, kz: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "nls_lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "ru" || saved === "kz") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "kz" ? "kk" : "ru";
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const t = useCallback(
    (ru: string, kz: string) => (lang === "kz" ? kz : ru),
    [lang]
  );

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

/** Удобный хук — возвращает только t() */
export function useT() {
  return useLang().t;
}
