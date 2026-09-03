import { useTranslation } from "@i18n/useTranslation";
import type { Locale } from "@i18n/store";
import { LocaleProvider } from "@i18n/LocaleProvider";
import { CATEGORIES, TAGS, type BlogPost } from "@types/blog";
import { VideoEmbed } from "@components/blog/VideoEmbed";

interface Props {
  post: BlogPost;
  locale: Locale;
}

export function BlogPostPage({ post, locale }: Props) {
  const { t } = useTranslation("blog", locale);
  const { meta, components } = post;

  const ArticleComponent = components[locale] ?? components["es-419"];
  const categories = CATEGORIES.filter((c) => meta.categories.includes(c.id));
  const tags = TAGS.filter((tag) => meta.tags.includes(tag.id));

  return (
    <LocaleProvider locale={locale}>
      <main className="flex-1">
      {/* Article header - full-width teal band */}
      <header className="bg-[var(--color-bg-accent)] text-white px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-[11px] uppercase tracking-[0.15em] text-white/60"
              >
                {cat.label[locale]}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-4xl lg:text-6xl text-white max-w-[20ch] leading-tight mb-8">
            {meta.title[locale]}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>{meta.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {meta.readingTime?.[locale] && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {meta.readingTime[locale]} {t("min_read")}
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Article body */}
      <article className="py-section px-6 lg:px-12">
        <div className="max-w-[720px] mx-auto">
          {/* Video */}
          {meta.videoUrl && (
            <VideoEmbed url={meta.videoUrl} title={meta.title[locale]} />
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-p:leading-relaxed">
            {ArticleComponent && <ArticleComponent />}
          </div>

          {/* Tags */}
          <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] border border-[var(--color-border)] px-2 py-1"
                >
                  #{tag.label[locale]}
                </span>
              ))}
            </div>
          </footer>
        </div>
      </article>
      </main>
    </LocaleProvider>
  );
}
