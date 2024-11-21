import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"]
      },
      fontSize: {
        "caption": ["14px", {lineHeight: "16px"}],
        "body-extra-small": ["12px", {lineHeight: "24px"}],
        "body-small": ["14px", {lineHeight: "24px"}],
        "body-regular": ["16px", {lineHeight: "24px"}],
        "body-large": ["20px", {lineHeight: "32px"}],
        "heading-6": ["16px", {lineHeight: "24px"}],
        "heading-5": ["20px", {lineHeight: "24px"}],
        "heading-4": ["24px", {lineHeight: "32px"}],
        "heading-3": ["32px", {lineHeight: "40px"}],
        "heading-2": ["48px", {lineHeight: "56px"}],
        "heading-1": ["64px", {lineHeight: "80px"}]
      },
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        error: "var(--error)",
        input: "var(--input)",
        card: "var(--card)",
        text: "var(--text)",
      },
      borderRadius: {
        main: "10px"
      }
    },
  },
  safelist: [
    'text-heading-1',
    'text-heading-2',
    'text-heading-3',
    'text-heading-4',
    'text-heading-5',
    'text-heading-6',
  ],
  plugins: [],
} satisfies Config;
