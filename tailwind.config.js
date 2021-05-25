module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "cyan": "#4DFFF4"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
}
