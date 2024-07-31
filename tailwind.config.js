/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '400px',
      sm: '499px',
      md: '599px',
      lg: '799px',
      xl: '1499px',
    },
    colors: {
      'wrapper': '#3B3E46',
      'black': '#23262F'
    },
    fontFamily: {
    },
    extend: {
      backgroundImage: {
        'top': "url('assets/bg.jpg')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [],
}
