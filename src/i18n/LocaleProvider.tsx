import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useStore } from "@nanostores/react";
import { localeStore, type Locale } from "./store";

const LocaleContext = createContext<Locale | undefined>(undefined);

/**
 * Seeds the locale for a server-rendered island so SSR and the first client
 * render agree. Also syncs the shared store on the client for interactive UI.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    localeStore.set(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

/** Prefers the SSR-provided context locale, falling back to the client store. */
export function useLocale(): Locale {
  const contextLocale = useContext(LocaleContext);
  const storeLocale = useStore(localeStore);
  return contextLocale ?? storeLocale;
}
