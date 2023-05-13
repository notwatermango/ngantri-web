/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ultramarine' : '#3566FF'
      }
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss')
  ],
};

module.exports = config;
