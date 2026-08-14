/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
        },
        accent: {
          50: "var(--color-accent-50)",
          100: "var(--color-accent-100)",
          200: "var(--color-accent-200)",
          300: "var(--color-accent-300)",
          400: "var(--color-accent-400)",
          500: "var(--color-accent-500)",
          600: "var(--color-accent-600)",
          700: "var(--color-accent-700)",
          800: "var(--color-accent-800)",
          900: "var(--color-accent-900)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(3rem, 8vw, 7rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
        headline: [
          "clamp(2rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
      },
      gridTemplateColumns: {
        editorial: "1fr min(65ch, 100%) 1fr",
        asymmetric: "2fr 1fr",
        "asymmetric-r": "1fr 2fr",
      },
      spacing: {
        section: "clamp(4rem, 10vh, 8rem)",
      },
    },
  },
  plugins: [],
};
