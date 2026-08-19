import { useTranslation } from "@i18n/useTranslation";
import { useStore } from "@nanostores/react";
import { localeStore } from "@i18n/store";
import { LOCALE_TO_LANG } from "@i18n/routes";
import type { BlogPostMeta } from "@types/blog";
import { CATEGORIES } from "@types/blog";

interface Props {
  post: BlogPostMeta;
}

export function ArticleCard({ post }: Props) {
  const { t } = useTranslation("blog");
  const locale = useStore(localeStore);
  const href = `/${LOCALE_TO_LANG[locale]}/blog/${post.slug}/`;

  const categories = CATEGORIES.filter((c) => post.categories.includes(c.id));

  return (
    <article className="group">
      {post.featuredImage && (
        <a href={href} className="block overflow-hidden mb-4">
          <img
            src={post.featuredImage}
            alt={post.title[locale]}
            className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
        </a>
      )}
      <div className="flex flex-wrap gap-3 mb-3">
        {categories.map((cat) => (
          <span
            key={cat.id}
            className="text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]"
          >
            {cat.label[locale]}
          </span>
        ))}
      </div>
      <h3 className="font-heading text-xl lg:text-2xl text-[var(--color-text)] mb-3 leading-tight">
        <a
          href={href}
          className="hover:opacity-70 transition-opacity"
        >
          {post.title[locale]}
        </a>
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3">
        {post.excerpt[locale]}
      </p>
      <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        {post.readingTime?.[locale] && (
          <>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingTime[locale]} {t("min_read")}
            </span>
          </>
        )}
      </div>
    </article>
  );
}
