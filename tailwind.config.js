/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '400px',
      md: '930px',
      lg: '1000px',
      xl: '1500px',
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
