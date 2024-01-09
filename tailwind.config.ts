import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border : "var(--border)",
        // input : ;
        // ring : ;
        background : "var(--background)",
        foreground : "var(--foreground)",
        accent: "var(--accent)",

        primary: "var(--primary)",
        primaryHover: "var(--primary-foreground)",
        secondary: "var(--secondary)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textComplementary : "var(--text-complementary)",
        
      },
    },
  },
  plugins: [],
}
export default config
