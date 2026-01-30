import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skymesh: {
          orange: "#FF6B35",
          coral: "#E85A2C",
          lime: "#C5E063",
          teal: "#006B6B",
          dark: "#1A1A2E"
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
