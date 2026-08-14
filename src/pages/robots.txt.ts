import type { APIRoute } from "astro";

function getRobotsTxt(site: URL) {
  const sitemapURL = new URL("/sitemap-index.xml", site);

  return [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${sitemapURL.toString()}`,
  ].join("\n");
}

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response("Missing site configuration", { status: 500 });
  }

  return new Response(getRobotsTxt(site), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};