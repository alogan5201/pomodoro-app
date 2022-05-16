module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [  require('flowbite/plugin')],
}