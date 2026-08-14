import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

const site = import.meta.env.PUBLIC_SITE_URL || "https://fundacionjd10.com";
const normalizedSite = site.endsWith("/") ? site.slice(0, -1) : site;

export default defineConfig({
  site,
  output: "static",
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
          en: "en-US",
          pt: "pt-BR",
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
