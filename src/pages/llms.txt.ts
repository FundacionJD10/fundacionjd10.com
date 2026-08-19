import type { APIRoute } from "astro";
import { PAGES, localePath, type LangPrefix } from "@i18n/routes";
import { blogPosts } from "@content/blog/index";

// LLM-friendly English descriptions per page (name comes from PAGES titles).
const PAGE_DESCRIPTIONS: Record<string, string> = {
  home: "Overview of the foundation, its mission, featured projects, and latest posts.",
  about:
    "Who we are, our vision of responsible technology use, and what we do.",
  projects: "Free, open-source tools and initiatives built by the foundation.",
  blog: "Articles on responsible AI use, education, and the foundation's work.",
  tax: "Special Tax Regime status and legal/fiscal information (Colombia).",
  transparency:
    "Financial transparency: income, expenses, and how funds are used.",
  contact: "How to reach the foundation and get involved.",
};

// Order pages the way they appear in navigation.
const PAGE_ORDER = [
  "home",
  "about",
  "projects",
  "blog",
  "tax",
  "transparency",
  "contact",
];

// English is the most LLM-friendly entry point; other languages are linked as optional.
const PRIMARY_LANG: LangPrefix = "en";

function getLlmsTxt(site: URL): string {
  const url = (path: string) => new URL(path, site).toString();

  const pageLines = PAGE_ORDER.map((pageId) => {
    const page = PAGES[pageId];
    if (!page) return null;
    const name =
      pageId === "home"
        ? "Home"
        : page.titles["en-US"].replace(" - Fundación JD10", "").trim();
    const desc = PAGE_DESCRIPTIONS[pageId];
    return `- [${name}](${url(localePath(pageId, PRIMARY_LANG))})${desc ? `: ${desc}` : ""}`;
  }).filter(Boolean);

  const postLines = blogPosts.map((post) => {
    const name = post.meta.title["en-US"];
    const excerpt = post.meta.excerpt["en-US"];
    return `- [${name}](${url(`/${PRIMARY_LANG}/blog/${post.meta.slug}/`)})${excerpt ? `: ${excerpt}` : ""}`;
  });

  const sections: string[] = [
    "# Fundación JD10",
    "",
    "> Nonprofit foundation promoting the responsible use of technology in Latin America. We teach responsible AI use and build free, open-source tools.",
    "",
    "Fundación JD10 is a Latin American NGO. The site is available in Spanish (es), English (en), and Portuguese (pt); the links below use the English versions. Content is served from a static site — HTML pages, not markdown.",
    "",
    "## Pages",
    "",
    pageLines.join("\n"),
  ];

  if (postLines.length > 0) {
    sections.push("", "## Blog posts", "", postLines.join("\n"));
  }

  sections.push(
    "",
    "## Optional",
    "",
    [
      `- [Spanish site (español)](${url("/es/")})`,
      `- [Portuguese site (português)](${url("/pt/")})`,
      `- [Sitemap](${url("/sitemap-index.xml")})`,
    ].join("\n"),
    "",
  );

  return sections.join("\n");
}

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response("Missing site configuration", { status: 500 });
  }

  return new Response(getLlmsTxt(site), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
