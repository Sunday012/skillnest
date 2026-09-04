/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#17201c',
        ivory: '#f7f2e8',
        coral: '#e65f4f',
        mint: '#a8e6c1',
        gold: '#f2b84b',
      },
    },
  },
  plugins: [],
}
