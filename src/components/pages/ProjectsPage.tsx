import { useTranslation } from "@i18n/useTranslation";
import type { Locale } from "@i18n/store";
import { useStore } from "@nanostores/react";
import { localeStore } from "@i18n/store";
import { projects } from "@content/projects/data";

export function ProjectsPage() {
  const { t } = useTranslation("projects");
  const locale = useStore(localeStore);

  const statusLabel: Record<string, string> = {
    active: "● Activo",
    completed: "✓ Completo",
    planned: "○ Planeado",
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[var(--color-bg-accent)] text-white px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="font-heading text-display max-w-[12ch]">
            {t("page_title")}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-[50ch]">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Projects list - editorial stacked, not grid cards */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          {projects.map((project, i) => (
            <article
              key={project.id}
              className="grid lg:grid-cols-[1fr_3fr] gap-8 lg:gap-16 py-12 border-b border-[var(--color-border)] last:border-b-0"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-[var(--color-text-muted)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {statusLabel[project.status] ?? project.status}
                </span>
              </div>

              <div>
                <h3 className="font-heading text-2xl lg:text-3xl text-[var(--color-text)] mb-4">
                  {project.title[locale]}
                </h3>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-[60ch]">
                  {project.description[locale]}
                </p>
                {project.details && (
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-[65ch]">
                    {project.details[locale]}
                  </p>
                )}
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] border border-[var(--color-border)] px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] hover:opacity-70 transition-opacity"
                  >
                    {t("view_project")} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
