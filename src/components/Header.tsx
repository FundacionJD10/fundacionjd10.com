import { useState, useEffect } from "react";
import { useTranslation } from "@i18n/useTranslation";
import type { Locale } from "@i18n/store";
import { LocaleProvider } from "@i18n/LocaleProvider";
import { LOCALE_TO_LANG, localePath } from "@i18n/routes";
import { LanguageSwitcher } from "@i18n/LanguageSwitcher";
import { ThemeSwitcher } from "@theme/ThemeSwitcher";

const NAV_ITEMS = [
  { key: "nav_home", pageId: "home" },
  { key: "nav_about", pageId: "about" },
  { key: "nav_projects", pageId: "projects" },
  { key: "nav_blog", pageId: "blog" },
  { key: "nav_tax", pageId: "tax" },
  { key: "nav_transparency", pageId: "transparency" },
  { key: "nav_contact", pageId: "contact" },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common", locale);
  const lang = LOCALE_TO_LANG[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <LocaleProvider locale={locale}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || mobileOpen
            ? "bg-[var(--color-bg)] border-b border-[var(--color-border)]"
            : "mix-blend-difference"
        }`}
      >
      <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          <a
            href={localePath("home", lang)}
            className={`relative z-10 font-heading text-xl tracking-tight transition-colors ${
              scrolled || mobileOpen ? "text-[var(--color-text)]" : "text-white"
            }`}
          >
            <img
              src="/logo/navbar.png"
              alt="Fundación JD10"
              className={`h-8 lg:h-10 ${
                scrolled || mobileOpen ? "invert dark:invert-0" : ""
              }`}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(({ key, pageId }) => (
              <a
                key={key}
                href={localePath(pageId, lang)}
                className={`text-[11px] font-sans font-medium uppercase tracking-[0.15em] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all ${
                  scrolled
                    ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] after:bg-[var(--color-text)]"
                    : "text-white/80 hover:text-white after:bg-white"
                } hover:after:w-full`}
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div
            className={`flex items-center gap-3 relative z-10 ${scrolled || mobileOpen ? "text-[var(--color-text)]" : "text-white"}`}
          >
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-5 h-px transition-transform ${scrolled || mobileOpen ? "bg-[var(--color-text)]" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block w-5 h-px transition-opacity ${scrolled || mobileOpen ? "bg-[var(--color-text)]" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-px transition-transform ${scrolled || mobileOpen ? "bg-[var(--color-text)]" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[var(--color-bg)] overflow-y-auto">
          <nav className="flex flex-col items-center gap-6 px-6 py-12">
            {NAV_ITEMS.map(({ key, pageId }) => (
              <a
                key={key}
                href={localePath(pageId, lang)}
                className="font-heading text-2xl sm:text-3xl text-[var(--color-text)] hover:text-[var(--color-text-secondary)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </a>
            ))}
            <div className="mt-6 pt-6 border-t border-[var(--color-border)] w-full flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
      </header>
    </LocaleProvider>
  );
}
