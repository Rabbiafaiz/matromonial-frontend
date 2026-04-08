import type { Config } from "tailwindcss";

export default {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--themeColor)",
        secondary: "var(--themeColor2)",
        lightGray: "var(--bgColor)",
        gray50: "var(--bgLight)",
        gray: "var(--border)",
        darkBlue: "var(--text)",
        darkGray: "var(--text2)",
        lightText: "var(--text3)",
        normal: "var(--text4)",
        lightBlue: "var(--lightBlue)",
      },
      fontFamily: {
        light: ['var(--light)', 'sans-serif'],
        regular: ['var(--regular)', 'sans-serif'],
        bold: ['var(--bold)', 'sans-serif'],
      },
      minHeight: {
        large: '500px',
      },
      screens: {
        xsm: "638px",
        mm: "450px",
      }
    },
  },
  plugins: [],
} satisfies Config;
