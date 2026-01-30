import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        skymesh: {
          blue: "#0066CC"
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
