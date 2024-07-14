/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '400px',
      md: '768px',
      lg: '1020px',
      xl: '1520px',
    },
    colors: {
      'lowBlack': '#3B3E46',
      'highBlack': '#23262F'
    },
    fontFamily: {
    },
    extend: {},
  },
  plugins: [],
}
