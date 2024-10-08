/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/**/*.js", "./**/*.html"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
