/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    screens: {
      'xs': '500px',
      'sm': '640px', 
      'md': '768px', 
      'lg': '1024px', 
    },
    extend: {},
  },
  plugins: [],
};

