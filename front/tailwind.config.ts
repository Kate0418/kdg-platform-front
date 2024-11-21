import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent-color)",
          0.6: "var(--accent-color-60)",
        },
        base: {
          DEFAULT: "var(--base-color)",
        },
        text: {
          DEFAULT: "var(--text-color)",
          0.6: "var(--text-color-60)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
