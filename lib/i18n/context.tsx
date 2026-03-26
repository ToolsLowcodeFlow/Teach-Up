"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { getDictionary, getDirection, type Dictionary } from "./index";
import type { Locale, Direction } from "./types";

interface LanguageContextType {
  locale: Locale;
  direction: Direction;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({
  children,
  defaultLocale = "en",
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [direction, setDirection] = useState<Direction>(getDirection(defaultLocale));
  const [t, setT] = useState<Dictionary>(getDictionary(defaultLocale));
  const localeRef = useRef<Locale>(defaultLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    localeRef.current = newLocale;
    setLocaleState(newLocale);
    setDirection(getDirection(newLocale));
    setT(getDictionary(newLocale));
    if (typeof window !== "undefined") {
      localStorage.setItem("teachup-locale", newLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    const next = localeRef.current === "en" ? "he" : "en";
    setLocale(next);
  }, [setLocale]);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("teachup-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "he")) {
      setLocale(saved);
    }
  }, [setLocale]);

  // Update html attributes when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction]);

  return (
    <LanguageContext.Provider
      value={{ locale, direction, t, setLocale, toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
