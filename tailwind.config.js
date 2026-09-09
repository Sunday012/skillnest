/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#EC1257',
          dark: '#C10E48',
          tint: '#FDE8EF',
        },
        navy: '#0B1220',
        ink: '#10172A',
        gray: {
          body: '#5B6472',
          muted: '#93A0B4',
        },
        bg: {
          alt: '#F6F7FB',
        },
        border: '#E7E9F1',
        green: '#17A34A',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
