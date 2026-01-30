import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skymesh: {
          // Primary brand colors (matched from actual site)
          orange: "#F97316",      // Skymesh orange
          "orange-hover": "#EA580C",
          // Navy palette
          navy: "#1A2940",
          "navy-light": "#253750",
          // Teal accents
          teal: "#1A6B6B",
          "teal-light": "#E8F4F4",
          // Neutrals
          dark: "#1A1A2E",
          slate: "#4A5568",
          muted: "#718096",
          cream: "#FFF7F1",
          sand: "#FDEDDC"
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(15, 23, 42, 0.08)",
        card: "0 6px 20px rgba(15, 23, 42, 0.08)",
        input: "0 4px 12px rgba(15, 23, 42, 0.06)",
        luxe: "0 20px 40px rgba(15, 23, 42, 0.14), 0 8px 18px rgba(249, 115, 22, 0.18)",
        glow: "0 0 0 1px rgba(249, 115, 22, 0.18), 0 14px 30px rgba(249, 115, 22, 0.25)"
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Times New Roman', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
