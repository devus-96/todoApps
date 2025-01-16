import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bgLoging: "#E5E9F6",
        sidebarText: "#A6A6A8",
        terciary: '#ff2779',
        primary: "#151828",
      },
      backgroundColor: {
        btnColor: "#9eabe4",
        popup: 'rgba(0, 0, 0, .5)',
      },
      boxShadow: {
        myxl: '5px 5px 5px rgb(0 0 0 / 0.2), -5px -5px 5px rgb(0 0 0 / 0.2)'
      }
    },
  },
  plugins: [],
} satisfies Config;
