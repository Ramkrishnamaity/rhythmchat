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
      'wrapper': '#dde1e7',
      'lowBlack': '#595959',
      'black': '#23262F',
      'blue': '#3498db',
      'border': '#717377'
    },
    fontFamily: {
      poppins: ["poppins", "sans sarif"]
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
