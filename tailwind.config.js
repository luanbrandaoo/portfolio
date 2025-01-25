/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      title: '26px',
      big: '20px',
      window: '18px',
      start: '18px',
      clock: '15px',
      mini: '10px',
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
        'selection': '#000076',
        'windowblue': '#00007c',
        'windowsilver': '#7a7c79',
        'silvertext': '#c0c4c8',
        'aftereffects': '#3d3d3d',
        'afterorange': '#a2790f',
      },
    }
  }
}