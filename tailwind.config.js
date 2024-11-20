/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          card: '#1a1b23',
          hover: '#2a2b35',
          input: '#ffffff'
        }
      }
    },
  },
  plugins: [],
}