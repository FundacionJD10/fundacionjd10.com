import { useTranslation } from "@i18n/useTranslation";
import type { Locale } from "@i18n/store";
import { LOCALE_TO_LANG, localePath } from "@i18n/routes";

export function AboutPage({ locale }: { locale: Locale }) {
  const { t } = useTranslation("about", locale);
  const lang = LOCALE_TO_LANG[locale];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[var(--color-bg-accent)] text-white px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="font-heading text-display max-w-[12ch]">
            {t("page_title")}
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-section px-6 lg:px-12 border-b border-[var(--color-border)]">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-heading text-xl text-[var(--color-text)] lg:sticky lg:top-28">
              {t("mission_title")}
            </h2>
          </div>
          <div className="space-y-5 lg:space-y-6 max-w-[65ch] text-justify">
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t("mission_p1")}
            </p>
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t("mission_p2")}
            </p>
            <ol className="list-decimal list-outside ml-5 lg:ml-6 space-y-3 text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              <li>{t("mission_example_1")}</li>
              <li>{t("mission_example_2")}</li>
            </ol>
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t("mission_p3")}
            </p>
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t("mission_p4")}
            </p>
            <p className="text-base lg:text-lg text-[var(--color-text)] leading-relaxed font-medium">
              {t("mission_p5")}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="block w-12 h-px bg-[var(--color-text)]" />
              <a
                href={localePath("home", lang)}
                className="text-sm font-medium text-[var(--color-text)] hover:opacity-70 tracking-wide transition-opacity"
              >
                {t("cta_home")} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-section px-6 lg:px-12 border-b border-[var(--color-border)]">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-heading text-xl text-[var(--color-text)]">
              {t("vision_title")}
            </h2>
          </div>
          <div className="space-y-5 lg:space-y-6 max-w-[65ch]">
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t("vision_p1")}
            </p>
            <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {t("vision_p2")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <span className="block w-12 h-px bg-[var(--color-text)]" />
                <a
                  href={localePath("projects", lang)}
                  className="text-sm font-medium text-[var(--color-text)] hover:opacity-70 tracking-wide transition-opacity"
                >
                  {t("cta_projects")} →
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="block w-12 h-px bg-[var(--color-text)]" />
                <a
                  href={localePath("blog", lang)}
                  className="text-sm font-medium text-[var(--color-text)] hover:opacity-70 tracking-wide transition-opacity"
                >
                  {t("cta_blog")} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-heading text-xl text-[var(--color-text)] lg:sticky lg:top-28">
              {t("values_title")}
            </h2>
          </div>
          <div className="grid gap-10 lg:gap-16 max-w-[65ch]">
            {(
              [
                {
                  num: "01",
                  titleKey: "value_solidarity_title",
                  textKey: "value_solidarity_text",
                },
                {
                  num: "02",
                  titleKey: "value_responsibility_title",
                  textKey: "value_responsibility_text",
                },
                {
                  num: "03",
                  titleKey: "value_transparency_title",
                  textKey: "value_transparency_text",
                },
              ] as const
            ).map(({ num, titleKey, textKey }) => (
              <div key={num} className="flex gap-4 lg:gap-6 items-start">
                <span className="font-mono text-sm text-[var(--color-text-muted)] pt-1 shrink-0">
                  {num}
                </span>
                <div className="border-l border-[var(--color-border)] pl-4 lg:pl-6">
                  <h3 className="font-heading text-lg lg:text-2xl text-[var(--color-text)] mb-2 lg:mb-3">
                    {t(titleKey)}
                  </h3>
                  <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    {t(textKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-section px-6 lg:px-12 border-t border-[var(--color-border)]">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16">
          <div>
            <h2 className="font-heading text-xl text-[var(--color-text)] lg:sticky lg:top-28">
              {t("team_title")}
            </h2>
          </div>
          <div className="max-w-[65ch]">
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 items-start">
              {/* Photo placeholder */}
              <div className="shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[var(--color-bg-accent)]/10 border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
                  <span className="font-heading text-3xl lg:text-4xl text-[var(--color-text-muted)]">
                    JD
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl lg:text-2xl text-[var(--color-text)]">
                  {t("team_founder_name")}
                </h3>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-1 mb-4">
                  {t("team_founder_role")}
                </p>
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {t("team_founder_bio")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
