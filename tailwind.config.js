/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // This will scan all files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#46BB1C',
        primaryLight: '#F5FFF2',
        stroke:'#DADADA',
        purple:'#0482EF',
        purpleLight:'#D7DDFF',
        brown:'#B38736',
        brownLight:'#FFF7DF',
        primaryDark:'#0E5617'
      }
    },
  },
  plugins: [],
}