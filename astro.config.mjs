import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const site = import.meta.env.PUBLIC_SITE_URL || "https://fundacionjd10.com";
const normalizedSite = site.endsWith("/") ? site.slice(0, -1) : site;

export default defineConfig({
  site,
  output: "static",
  // Enforce a single canonical URL shape: every page is /path/ (trailing slash),
  // matching the built directory files and the sitemap URLs exactly (no redirects).
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    react(),
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es",
          en: "en",
          pt: "pt",
        },
      },
      filter: (page) => page !== `${normalizedSite}/`,
    }),
  ],
  vite: {
    server: {
      allowedHosts: ["dev.fundacionjd10.com"],
    },
  },
});
