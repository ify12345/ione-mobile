/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.tsx", 
    "./app/**/*.{js,jsx,ts,tsx}", // This will scan all files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}