/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
    backgroundImage: {
      'hero-pattern': "url('assets/imgs/todo.jpg')"
    }
  },
  plugins: [],
}


