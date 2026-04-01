"use client";

import { useLanguage } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="lang-switcher-global fixed top-4 right-4 z-100 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
      style={{
        border: "1px solid #EAEBEB",
        color: "#414042",
        fontFamily: "'Abel', sans-serif",
      }}
      title={locale === "en" ? "Switch to Hebrew" : "Switch to English"}
    >
      <Globe className="w-4 h-4" style={{ color: "#4C96FF" }} />
      {locale === "en" ? "עב" : "EN"}
    </button>
  );
}
