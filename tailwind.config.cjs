/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ultramarine' : '#3566FF',
        'white' : '#FFFFFF',
        'dark-blue' : '#232B53',
        'black' : '#000000',
        'ultramarine-max' : '#4249FF',
        'ultramarine-min' : '#00D1FF'
      }
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss')
  ],
};

module.exports = config;
