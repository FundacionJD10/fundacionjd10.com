import type { Locale } from "./store";

export type LangPrefix = "es" | "en" | "pt";

export const LANG_TO_LOCALE: Record<LangPrefix, Locale> = {
  es: "es-419",
  en: "en-US",
  pt: "pt-BR",
};

export const LOCALE_TO_LANG: Record<Locale, LangPrefix> = {
  "es-419": "es",
  "en-US": "en",
  "pt-BR": "pt",
};

interface PageDef {
  slugs: Record<LangPrefix, string>;
  titles: Record<Locale, string>;
}

export const PAGES: Record<string, PageDef> = {
  home: {
    slugs: { es: "", en: "", pt: "" },
    titles: {
      "es-419": "Fundación JD10 - Hacia un uso responsable de la tecnología",
      "en-US": "Fundación JD10 - Towards a responsible use of technology",
      "pt-BR": "Fundación JD10 - Rumo a um uso responsável da tecnologia",
    },
  },
  about: {
    slugs: { es: "nosotros", en: "about", pt: "sobre-nos" },
    titles: {
      "es-419": "Sobre nosotros - Fundación JD10",
      "en-US": "About us - Fundación JD10",
      "pt-BR": "Sobre nós - Fundación JD10",
    },
  },
  projects: {
    slugs: { es: "proyectos", en: "projects", pt: "projetos" },
    titles: {
      "es-419": "Proyectos - Fundación JD10",
      "en-US": "Projects - Fundación JD10",
      "pt-BR": "Projetos - Fundación JD10",
    },
  },
  contact: {
    slugs: { es: "contacto", en: "contact", pt: "contato" },
    titles: {
      "es-419": "Contacto - Fundación JD10",
      "en-US": "Contact - Fundación JD10",
      "pt-BR": "Contato - Fundación JD10",
    },
  },
  tax: {
    slugs: {
      es: "regimen-tributario",
      en: "tax-regime",
      pt: "regime-tributario",
    },
    titles: {
      "es-419": "Régimen Tributario Especial - Fundación JD10",
      "en-US": "Special Tax Regime - Fundación JD10",
      "pt-BR": "Regime Tributário Especial - Fundación JD10",
    },
  },
  transparency: {
    slugs: { es: "transparencia", en: "transparency", pt: "transparencia" },
    titles: {
      "es-419": "Transparencia - Fundación JD10",
      "en-US": "Transparency - Fundación JD10",
      "pt-BR": "Transparência - Fundación JD10",
    },
  },
  blog: {
    slugs: { es: "blog", en: "blog", pt: "blog" },
    titles: {
      "es-419": "Blog - Fundación JD10",
      "en-US": "Blog - Fundación JD10",
      "pt-BR": "Blog - Fundación JD10",
    },
  },
};

/** Build a localized path: localePath("about", "en") → "/en/about" */
export function localePath(pageId: string, lang: LangPrefix): string {
  const page = PAGES[pageId];
  if (!page) return `/${lang}/`;
  const slug = page.slugs[lang];
  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

/** Resolve current URL to a page ID */
export function resolvePageFromPath(
  pathname: string,
): { pageId: string; lang: LangPrefix } | null {
  const match = pathname.match(/^\/(es|en|pt)(\/(.*))?$/);
  if (!match) return null;
  const lang = match[1] as LangPrefix;
  const slug = (match[3] || "").replace(/\/$/, "");

  for (const [pageId, page] of Object.entries(PAGES)) {
    if (page.slugs[lang] === slug) return { pageId, lang };
  }
  return null;
}

/** Get the equivalent path in a different locale (for language switcher) */
export function switchLocalePath(
  pathname: string,
  targetLocale: Locale,
): string {
  const targetLang = LOCALE_TO_LANG[targetLocale];

  // Try standard pages first
  const current = resolvePageFromPath(pathname);
  if (current) return localePath(current.pageId, targetLang);

  // Blog post paths: /es/blog/slug → /en/blog/slug
  const blogMatch = pathname.match(/^\/(es|en|pt)\/blog\/(.+)$/);
  if (blogMatch) return `/${targetLang}/blog/${blogMatch[2]}`;

  // Blog index
  const blogIndexMatch = pathname.match(/^\/(es|en|pt)\/blog\/?$/);
  if (blogIndexMatch) return `/${targetLang}/blog`;

  return `/${targetLang}/`;
}

/** Get locale from a URL path prefix */
export function getLocaleFromPath(pathname: string): Locale | undefined {
  const match = pathname.match(/^\/(es|en|pt)(\/|$)/);
  if (!match) return undefined;
  return LANG_TO_LOCALE[match[1] as LangPrefix];
}
