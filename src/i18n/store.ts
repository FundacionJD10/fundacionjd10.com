import { atom } from "nanostores";
import { getLocaleFromPath } from "./routes";

export type Locale = "es-419" | "en-US" | "pt-BR";

export const LOCALES: Locale[] = ["es-419", "en-US", "pt-BR"];

export const LOCALE_LABELS: Record<Locale, string> = {
  "es-419": "Español",
  "en-US": "English",
  "pt-BR": "Português",
};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const fromURL = getLocaleFromPath(window.location.pathname);
    if (fromURL) return fromURL;
  }
  const stored = getCookie("locale");
  if (stored && LOCALES.includes(stored as Locale)) return stored as Locale;
  return "es-419";
}

export const localeStore = atom<Locale>(getInitialLocale());

export function setLocale(locale: Locale) {
  setCookie("locale", locale, 365);
  localeStore.set(locale);
}

/** Sync locale from URL - call on every View Transitions navigation */
export function syncLocaleFromURL() {
  if (typeof window === "undefined") return;
  const fromURL = getLocaleFromPath(window.location.pathname);
  if (fromURL && fromURL !== localeStore.get()) {
    localeStore.set(fromURL);
  }
}

// Auto-sync locale after View Transitions navigation
if (typeof window !== "undefined") {
  document.addEventListener("astro:page-load", syncLocaleFromURL);
}
