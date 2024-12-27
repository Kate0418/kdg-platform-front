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
          500: "var(--accent-500)",
        },
        base: {
          500: "var(--base-500)",
        },
        text: {
          500: "var(--text-500)",
        },
      },
      animation: {
        "slide-in-blurred-bottom":
          "slide-in-blurred-bottom 0.5s cubic-bezier(0.230, 1.000, 0.320, 1.000)    both",
      },
      keyframes: {
        "slide-in-blurred-bottom": {
          "0%": {
            transform: "translateY(1000px) scaleY(2.5) scaleX(.2)",
            "transform-origin": "50% 100%",
            filter: "blur(40px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
