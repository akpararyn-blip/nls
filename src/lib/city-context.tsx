import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CityKey = "Almaty" | "Astana" | "Shymkent" | "Other";

export interface LocalizedString {
  ru: string;
  kz: string;
}

export interface CityData {
  name: LocalizedString;
  phone: string;
  /** WhatsApp техподдержки (исторический whatsapp поля). */
  whatsapp: string;
  /** WhatsApp отдела продаж. */
  whatsappSales: string;
  address: LocalizedString;
}

const UNIFIED_PHONE = "+7 700 339 7777";
/** Техподдержка */
const SUPPORT_WHATSAPP = "+77003397777";
/** Отдел продаж */
const SALES_WHATSAPP = "+77007304591";

export const CITIES: Record<CityKey, CityData> = {
  Almaty: {
    name: { ru: "Алматы", kz: "Алматы" },
    phone: UNIFIED_PHONE,
    whatsapp: SUPPORT_WHATSAPP,
    whatsappSales: SALES_WHATSAPP,
    address: {
      ru: "050060 (A15E3X9) Республика Казахстан, г. Алматы, пр. Аль Фараби, 95",
      kz: "050060 (A15E3X9) Қазақстан Республикасы, Алматы қ., Әл-Фараби даңғ., 95",
    },
  },
  Astana: {
    name: { ru: "Астана", kz: "Астана" },
    phone: UNIFIED_PHONE,
    whatsapp: SUPPORT_WHATSAPP,
    whatsappSales: SALES_WHATSAPP,
    address: {
      ru: "010000 (Z00Y7B8) Республика Казахстан, г. Астана, Мкр. Караоткель-2, ул. Жылыой 13/1",
      kz: "010000 (Z00Y7B8) Қазақстан Республикасы, Астана қ., Қараөткел-2 ы.а., Жылыой к-сі 13/1",
    },
  },
  Shymkent: {
    name: { ru: "Шымкент", kz: "Шымкент" },
    phone: UNIFIED_PHONE,
    whatsapp: SUPPORT_WHATSAPP,
    whatsappSales: SALES_WHATSAPP,
    address: {
      ru: "160021 Республика Казахстан, г. Шымкент, район Тұран, мкр. Малый Самал, дом 1695 (Улица Рыскулбекова, 13/1)",
      kz: "160021 Қазақстан Республикасы, Шымкент қ., Тұран ауданы, Кіші Самал ы.а., 1695 үй (Рысқұлбеков көшесі, 13/1)",
    },
  },
  Other: {
    name: { ru: "Другие города", kz: "Басқа қалалар" },
    phone: UNIFIED_PHONE,
    whatsapp: SUPPORT_WHATSAPP,
    whatsappSales: SALES_WHATSAPP,
    address: {
      ru: "г. Алматы, пр. Аль Фараби, 95 (Головной офис)",
      kz: "Алматы қ., Әл-Фараби даңғ., 95 (Бас кеңсе)",
    },
  },
};

interface ModalState {
  city: boolean;
  consultation: boolean;
}

export interface ConsultationOptions {
  subject?: string;
  /** Предзаполненный текст комментария (если не задан — используется subject) */
  defaultMessage?: string;
  /** Доп. поля, которые попадут в Telegram-сообщение */
  extraFields?: Record<string, string>;
  /** Принудительно сделать поле комментария редактируемым / только для чтения */
  messageReadOnly?: boolean;
}

interface CityContextValue {
  cityKey: CityKey;
  city: CityData;
  setCity: (key: CityKey) => void;
  modal: ModalState;
  consultation: ConsultationOptions;
  openCityModal: () => void;
  openConsultationModal: () => void;
  openConsultationModalWith: (options: ConsultationOptions) => void;
  closeModals: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

const CityContext = createContext<CityContextValue | null>(null);

const STORAGE_KEY = "nls_selected_city";

export function CityProvider({ children }: { children: React.ReactNode }) {
  const [cityKey, setCityKey] = useState<CityKey>("Almaty");
  const [modal, setModal] = useState<ModalState>({ city: false, consultation: false });
  const [consultation, setConsultation] = useState<ConsultationOptions>({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as CityKey | null;
    if (saved && saved in CITIES) setCityKey(saved);
  }, []);

  const setCity = useCallback((key: CityKey) => {
    setCityKey(key);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, key);
    }
    setModal((m) => ({ ...m, city: false }));
  }, []);

  const openCityModal = useCallback(() => {
    setModal({ city: true, consultation: false });
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }, []);

  const openConsultationModal = useCallback(() => {
    setConsultation({});
    setModal({ city: false, consultation: true });
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }, []);

  const openConsultationModalWith = useCallback((options: ConsultationOptions) => {
    setConsultation(options);
    setModal({ city: false, consultation: true });
    if (typeof document !== "undefined") document.body.style.overflow = "hidden";
  }, []);

  const closeModals = useCallback(() => {
    setModal({ city: false, consultation: false });
    if (typeof document !== "undefined") document.body.style.overflow = "";
  }, []);

  const value = useMemo<CityContextValue>(
    () => ({
      cityKey,
      city: CITIES[cityKey],
      setCity,
      modal,
      consultation,
      openCityModal,
      openConsultationModal,
      openConsultationModalWith,
      closeModals,
      mobileNavOpen,
      setMobileNavOpen,
    }),
    [
      cityKey,
      modal,
      consultation,
      setCity,
      openCityModal,
      openConsultationModal,
      openConsultationModalWith,
      closeModals,
      mobileNavOpen,
    ]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity must be used within CityProvider");
  return ctx;
}
