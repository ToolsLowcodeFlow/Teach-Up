"use client";

import { LanguageProvider } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/shared/language-switcher";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider defaultLocale="en">
      <LanguageSwitcher />
      {children}
    </LanguageProvider>
  );
}
