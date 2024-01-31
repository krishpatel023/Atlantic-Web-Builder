import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/package/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",

        //Website
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        accentLight: "var(--accent-light)",
        primary: "var(--primary)",
        primaryHover: "var(--primary-foreground)",
        secondary: "var(--secondary)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textComplementary: "var(--text-complementary)",

        // Atlantic UI styles
        aui_primary: "var(--aui-primary)",
        aui_text: "var(--aui-text)",
        aui_text_secondary: "var(--aui-text-secondary)",
        aui_accent: "var(--aui-accent)",
        aui_accent_hover: "var(--aui-accent-hover)",
        aui_text_accent: "var(--aui-text-accent)",
        aui_accent_secondary: "var(--aui-accent-secondary)",
        aui_border: "var(--aui-border)",
        aui_ring: "var(--aui-ring)",
      },
      screens: {
        aui_lg: "1000px",
        aui_md: "800px",
        aui_sm: "400px",
      },
    },
    screens: {
      lg: "1000px",
      md: "800px",
      sm: "400px",
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border|ring)-(aui_primary|aui_text|aui_text_secondary|aui_accent|aui_accent_hover|aui_text_accent|aui_accent_secondary|aui_border)/,
      variants: ["hover", "focus", "aui_sm", "aui_md", "aui_lg"],
    },
  ],
};
export default config;
