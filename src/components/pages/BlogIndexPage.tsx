import { useState } from "react";
import { useTranslation } from "@i18n/useTranslation";
import { useStore } from "@nanostores/react";
import { localeStore } from "@i18n/store";
import { blogPosts } from "@content/blog/index";
import { CATEGORIES } from "@types/blog";
import { ArticleCard } from "@components/blog/ArticleCard";

export function BlogIndexPage() {
  const { t } = useTranslation("blog");
  const locale = useStore(localeStore);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? blogPosts.filter((p) => p.meta.categories.includes(activeCategory))
    : blogPosts;

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-[var(--color-bg-accent)] text-white px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="font-heading text-display max-w-[10ch]">
            {t("page_title")}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-[50ch]">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Category filter - minimal text tabs */}
      <section className="border-b border-[var(--color-border)] px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto flex items-center gap-6 overflow-x-auto py-4">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
              activeCategory === null
                ? "text-[var(--color-text)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {t("filter_all")}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? "text-[var(--color-text)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {cat.label[locale]}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          {sortedPosts.length === 0 ? (
            <p className="text-[var(--color-text-muted)]">{t("no_posts")}</p>
          ) : (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <ArticleCard key={post.meta.slug} post={post.meta} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
