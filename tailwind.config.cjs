/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      }
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss')
  ],
};

module.exports = config;
