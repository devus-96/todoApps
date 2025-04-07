import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			primary: '#333',
			secondary: '#222',
  			bgLoging: '#E5E9F6',
  			sidebarText: '#A6A6A8',
  			terciary: '#ff2779',
			btnColor: '#9eabe4',
			borderCard: '#494949',
			holder: "#444"
  		},
  		backgroundColor: {
  			btnColor: '#9eabe4',
  			popup: 'rgba(0, 0, 0, .8)'
  		},
  		boxShadow: {
  			myxl: '5px 5px 5px rgb(0 0 0 / 0.2), -5px -5px 5px rgb(0 0 0 / 0.2)'
  		},
  	}
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
	require("tailwindcss-animate")
  ],
} satisfies Config;
