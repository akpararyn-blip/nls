import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CityKey = "Almaty" | "Astana" | "Shymkent" | "Other";

export interface CityData {
  name: string;
  phone: string;
  whatsapp: string;
  address: string;
}

export const CITIES: Record<CityKey, CityData> = {
  Almaty: {
    name: "Алматы",
    phone: "+7 727 339 77 77",
    whatsapp: "+77007304591",
    address: "050060 (A15E3X9) Республика Казахстан, г. Алматы, пр. Аль Фараби, 95",
  },
  Astana: {
    name: "Астана",
    phone: "+7 7172 72 55 55",
    whatsapp: "+77007304591",
    address: "010000 (Z00Y7B8) Республика Казахстан, г. Астана, Мкр. Караоткель-2, ул. Жылыой 13/1",
  },
  Shymkent: {
    name: "Шымкент",
    phone: "+7 727 339 77 77",
    whatsapp: "+77007304591",
    address:
      "160021 Республика Казахстан, г. Шымкент, район Тұран, мкр. Малый Самал, дом 1695 (Улица Рыскулбекова, 13/1)",
  },
  Other: {
    name: "Другие города",
    phone: "+7 727 339 77 77",
    whatsapp: "+77007304591",
    address: "г. Алматы, пр. Аль Фараби, 95 (Головной офис)",
  },
};

interface ModalState {
  city: boolean;
  consultation: boolean;
}

export interface ConsultationOptions {
  subject?: string;
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
      openCityModal,
      openConsultationModal,
      closeModals,
      mobileNavOpen,
      setMobileNavOpen,
    }),
    [cityKey, modal, setCity, openCityModal, openConsultationModal, closeModals, mobileNavOpen]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity must be used within CityProvider");
  return ctx;
}
