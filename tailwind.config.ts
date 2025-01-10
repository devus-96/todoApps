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
        sidebarText: "#A6A6A8"
      },
      backgroundColor: {
        btnColor: "#9eabe4",
        primary: "#151828",
      },
    },
  },
  plugins: [],
} satisfies Config;
