import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skymesh: {
          // Primary brand colors (matched from actual site)
          orange: "#F7941D",      // Golden amber - primary CTA
          "orange-hover": "#E8850A",
          // Navy palette
          navy: "#1A2940",
          "navy-light": "#253750",
          // Teal accents
          teal: "#1A6B6B",
          "teal-light": "#E8F4F4",
          // Neutrals
          dark: "#1A1A2E",
          slate: "#4A5568",
          muted: "#718096"
        }
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        card: "0 2px 12px rgba(0, 0, 0, 0.06)",
        input: "0 2px 8px rgba(0, 0, 0, 0.04)"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
