/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      start: '18px',
    },
    fontFamily: {
      ms: ["MS-Sans-Serif"],
    },
    extend: {
      colors: {
        'desktop': '#018281',
        'silver': '#c0c0c0',
        'border': '#fafafa',
        'border2': '#5a5a5a',
      },
    }
  }
}