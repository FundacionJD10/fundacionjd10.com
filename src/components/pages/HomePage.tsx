import { useStore } from "@nanostores/react";
import { useTranslation } from "@i18n/useTranslation";
import { localeStore } from "@i18n/store";
import { LOCALE_TO_LANG, localePath } from "@i18n/routes";
import { projects } from "@content/projects/data";
import { blogPosts } from "@content/blog/index";

export function HomePage() {
  const { t } = useTranslation("home");
  const locale = useStore(localeStore);
  const lang = LOCALE_TO_LANG[locale];

  return (
    <main className="flex-1">
      {/* Hero — full-bleed dark section, editorial oversized type */}
      <section className="relative min-h-screen bg-[var(--color-bg-accent)] text-white flex flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24 overflow-hidden">
        {/* Decorative accent line */}
        <div className="absolute top-0 left-[15%] w-px h-[40%] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full border border-white/10" />

        <div className="max-w-[1800px] mx-auto w-full">
          <h1 className="font-heading text-display max-w-[15ch] mb-8">
            {t("hero_title")}
          </h1>
          <div className="grid lg:grid-cols-asymmetric gap-12 items-end">
            <p className="text-lg lg:text-xl text-white/70 max-w-[50ch] leading-relaxed">
              {t("hero_subtitle")}
            </p>
            <div className="flex gap-4 lg:justify-end">
              <a
                href={localePath("projects", lang)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[var(--color-bg-accent)] text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
              >
                {t("hero_cta_projects")}
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={localePath("about", lang)}
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/40 text-white text-sm font-medium tracking-wide hover:border-white/70 transition-colors"
              >
                {t("hero_cta_about")}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="block w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </section>

      {/* Mission — split layout with oversized number */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
          <div>
            <span
              className="font-heading text-[8rem] lg:text-[12rem] leading-none text-[var(--color-border)] select-none"
              aria-hidden="true"
            >
              01
            </span>
          </div>
          <div className="lg:pt-16">
            <h2 className="font-heading text-headline text-[var(--color-text)] mb-6">
              {t("section_mission_preview")}
            </h2>
            <p className="text-xl lg:text-2xl text-[var(--color-text-secondary)] leading-relaxed max-w-[55ch]">
              {t("section_mission_text")}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="block w-12 h-px bg-[var(--color-text)]" />
              <a
                href={localePath("about", lang)}
                className="text-sm font-medium text-[var(--color-text)] hover:opacity-70 tracking-wide transition-opacity"
              >
                {t("hero_cta_about")} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band — horizontal scroll feel */}
      <section className="border-y border-[var(--color-border)] py-12 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <StatItem number="100%" label="Open Source" />
          <div className="hidden md:block w-px h-12 bg-[var(--color-border)]" />
          <StatItem number="3" label="Idiomas" />
          <div className="hidden md:block w-px h-12 bg-[var(--color-border)]" />
          <StatItem number="∞" label="Herramientas gratuitas" />
          <div className="hidden md:block w-px h-12 bg-[var(--color-border)]" />
          <StatItem number="0" label="Costo para la comunidad" />
        </div>
      </section>

      {/* Latest posts */}
      <section className="bg-[var(--color-bg-secondary)] py-section px-6 lg:px-12 border-y border-[var(--color-border)]">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <div>
            <h2 className="font-heading text-headline text-[var(--color-text)] mb-4">
              {t("section_latest_posts")}
            </h2>
            {blogPosts.length === 0 ? (
              <div className="border-l-2 border-[var(--color-border)] pl-6 py-2">
                <p className="text-[var(--color-text-muted)] italic">
                  Próximamente — Los artículos aparecerán aquí
                </p>
              </div>
            ) : (
              <ul className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <li key={post.meta.slug}>
                    <a
                      href={`/${lang}/blog/${post.meta.slug}`}
                      className="text-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                    >
                      {post.meta.title[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:text-right">
            <a
              href={localePath("blog", lang)}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] tracking-wide"
            >
              {t("hero_view_all")} →
            </a>
          </div>
        </div>
      </section>

      {/* Projects preview */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
          <div>
            <h2 className="font-heading text-headline text-[var(--color-text)] mb-4">
              {t("section_featured_projects")}
            </h2>
            {projects.length === 0 ? (
              <div className="border-l-2 border-[var(--color-border)] pl-6 py-2">
                <p className="text-[var(--color-text-muted)] italic">
                  Próximamente — Los proyectos aparecerán aquí
                </p>
              </div>
            ) : (
              <ul className="space-y-6">
                {projects.slice(0, 3).map((project) => (
                  <li
                    key={project.id}
                    className="border-l-2 border-[var(--color-border)] pl-6"
                  >
                    <h3 className="font-heading text-xl text-[var(--color-text)] mb-1">
                      {project.title[locale]}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch]">
                      {project.description[locale]}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:text-right">
            <a
              href={localePath("projects", lang)}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] tracking-wide"
            >
              {t("hero_cta_projects")} →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-heading text-4xl lg:text-5xl text-[var(--color-text)]">
        {number}
      </span>
      <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-1">
        {label}
      </span>
    </div>
  );
}
