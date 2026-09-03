import { useTranslation } from "@i18n/useTranslation";
import type { Locale } from "@i18n/store";
import { LOCALE_TO_LANG, localePath } from "@i18n/routes";
import { ORGANIZATION, ORGANIZATION_ADDRESS } from "@content/organization";

export function Footer({ locale }: { locale: Locale }) {
  const { t } = useTranslation("common", locale);
  const lang = LOCALE_TO_LANG[locale];
  const currentYear = new Date().getFullYear();
  const foundingYear = 2026;
  const yearDisplay =
    currentYear === foundingYear
      ? `${foundingYear}`
      : `${foundingYear} – ${currentYear}`;

  return (
    <footer className="mt-auto border-t border-[var(--color-border)]">
      {/* Main footer */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="font-heading text-3xl lg:text-4xl text-[var(--color-text)] mb-4">
              <img
                src="/logo/footer.png"
                alt="Fundación JD10"
                className="h-20 w-auto invert dark:invert-0"
              />
            </p>
            <address className="not-italic text-sm text-[var(--color-text-secondary)] leading-relaxed space-y-1">
              <p className="text-[var(--color-text)] font-medium">
                {ORGANIZATION.legalName}
              </p>
              <p>
                <span className="text-[var(--color-text-muted)]">
                  {t("footer_address_label")}:{" "}
                </span>
                {ORGANIZATION_ADDRESS}
              </p>
              <p>
                <span className="text-[var(--color-text-muted)]">
                  {t("footer_charity_label")}:{" "}
                </span>
                {ORGANIZATION.nit}
              </p>
              <p>
                <a
                  href={`mailto:${ORGANIZATION.email}`}
                  className="hover:text-[var(--color-text)] transition-colors"
                >
                  {ORGANIZATION.email}
                </a>
              </p>
            </address>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4">
              Navegación
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { label: t("nav_about"), href: localePath("about", lang) },
                {
                  label: t("nav_projects"),
                  href: localePath("projects", lang),
                },
                { label: t("nav_blog"), href: localePath("blog", lang) },
                { label: t("nav_contact"), href: localePath("contact", lang) },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-4">
              Legal
            </p>
            <nav className="flex flex-col gap-2">
              <a
                href={localePath("tax", lang)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                {t("nav_tax")}
              </a>
              <a
                href={localePath("transparency", lang)}
                className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              >
                {t("nav_transparency")}
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border)] px-6 lg:px-12 py-6">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {yearDisplay} Fundación JD10. {t("footer_rights")}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {t("footer_charity_label")}: {ORGANIZATION.nit}
          </p>
        </div>
      </div>
    </footer>
  );
}
