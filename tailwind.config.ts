import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Malnad Realty brand
        brand: {
          red: "#D7242A",
          black: "#000000",
          white: "#FFFFFF",
          gray: "#8F8F8F",
        },
        // Semantic scale kept under the "forest" name so components need no
        // rename. 950–700 = ink/charcoal (dark bands, headings, borders);
        // 600–400 = brand red accent (buttons, highlights, hover).
        forest: {
          950: "#0a0a0b", // darkest background
          900: "#141416", // dark cards / footer
          800: "#1f1f22", // gradients / outline text
          700: "#2b2b2f", // borders, big neutral figures
          600: "#B31E23", // accent: deeper red (highlight text, button hover)
          500: "#D7242A", // accent: brand red (buttons, eyebrows, chips)
          400: "#E8595E", // accent: light red (on dark)
          300: "#b9b9bb", // light gray
        },
        // Light red accent used on dark backgrounds.
        moss: "#E8595E",
        // "Red soil" family — maroon/red (also fits the literal red soil).
        soil: {
          700: "#6e1519",
          600: "#8f1d22",
          500: "#b3242a",
          400: "#cf4247",
        },
        ivory: "#FFFFFF",
        cream: "#F4F4F3",
        sand: "#E7E7E6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        kannada: ["var(--font-kannada)", "var(--font-inter)", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      maxWidth: {
        prime: "1360px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,32,20,0.04), 0 8px 24px -12px rgba(16,32,20,0.18)",
        sheet: "0 -8px 40px -12px rgba(0,0,0,0.35)",
        float: "0 20px 50px -20px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "sheet-up": "sheet-up 0.35s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.3s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
