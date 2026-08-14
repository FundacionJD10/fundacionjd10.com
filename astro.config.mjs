import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || "https://fundacionjd10.com",
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [react(), tailwind(), sitemap()],
  vite: {
    server: {
      allowedHosts: ["dev.fundacionjd10.com"],
    },
  },
});
