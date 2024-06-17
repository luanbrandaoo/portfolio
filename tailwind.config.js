/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      window: '18px',
      start: '18px',
      clock: '15px',
    },
    fontFamily: {
      ms: ["MS-Sans-Serif"],
    },
    extend: {
      colors: {
        'desktop': '#018281',
        'sidebar': '#7a7c79',
        'silver': '#c0c0c0',
        'border': '#fafafa',
        'border2': '#5a5a5a',
        'selection': '#000076',
        'windowblue': '#00007c',
      },
    }
  }
}