import en from "./en";
import he from "./he";
import type { Locale } from "./types";

// Widen literal string types to plain string for cross-locale compatibility
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof en>;

const dictionaries: Record<Locale, Dictionary> = { en, he };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getDirection(locale: Locale) {
  return locale === "he" ? "rtl" : "ltr";
}
