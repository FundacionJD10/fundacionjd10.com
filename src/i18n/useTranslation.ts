import { useStore } from "@nanostores/react";
import { localeStore, type Locale } from "./store";

type Translations = Record<string, Record<string, string>>;

const modules = import.meta.glob<{ default: Record<string, string> }>(
  "./translations/**/*.json",
  { eager: true },
);

const translations: Record<Locale, Record<string, Record<string, string>>> = {
  "es-419": {},
  "en-US": {},
  "pt-BR": {},
};

for (const [path, mod] of Object.entries(modules)) {
  const parts = path
    .replace("./translations/", "")
    .replace(".json", "")
    .split("/");
  const locale = parts[0] as Locale;
  const namespace = parts[1];
  if (translations[locale]) {
    translations[locale][namespace] = mod.default;
  }
}

export function useTranslation(namespace: string) {
  const locale = useStore(localeStore);

  function t(key: string, replacements?: Record<string, string>): string {
    const value = translations[locale]?.[namespace]?.[key] ?? key;
    if (!replacements) return value;
    return Object.entries(replacements).reduce(
      (str, [k, v]) => str.replace(`{{${k}}}`, v),
      value,
    );
  }

  return { t, locale };
}
