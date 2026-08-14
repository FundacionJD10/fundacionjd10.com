import { atom } from "nanostores";

export type Theme = "light" | "dark" | "system";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function getInitialTheme(): Theme {
  const stored = getCookie("theme");
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;
  return "system";
}

export const themeStore = atom<Theme>(getInitialTheme());

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

export function setTheme(theme: Theme) {
  setCookie("theme", theme, 365);
  themeStore.set(theme);
  applyTheme(theme);
}

if (typeof window !== "undefined") {
  applyTheme(themeStore.get());
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (themeStore.get() === "system") applyTheme("system");
    });
}
