import { navigate } from "astro:transitions/client";
import {
  setLocale,
  LOCALES,
  LOCALE_LABELS,
  type Locale,
} from "./store";
import { useLocale } from "./LocaleProvider";
import { switchLocalePath } from "./routes";

export function LanguageSwitcher() {
  const current = useLocale();

  function handleSwitch(locale: Locale) {
    setLocale(locale);
    const target = switchLocalePath(window.location.pathname, locale);
    navigate(target);
  }

  return (
    <div className="inline-flex items-center gap-0.5 text-[11px] font-sans uppercase tracking-[0.1em]">
      {LOCALES.map((locale, i) => (
        <span key={locale} className="inline-flex items-center">
          {i > 0 && <span className="mx-1 opacity-50">/</span>}
          <button
            onClick={() => handleSwitch(locale)}
            className={`transition-colors ${
              current === locale ? "opacity-100" : "opacity-60 hover:opacity-90"
            }`}
            aria-label={`Switch to ${LOCALE_LABELS[locale]}`}
            aria-pressed={current === locale}
          >
            {locale.split("-")[0].toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
