export type Locale = "en" | "he";

export type Direction = "ltr" | "rtl";

export interface TranslationDict {
  [key: string]: string | TranslationDict;
}
