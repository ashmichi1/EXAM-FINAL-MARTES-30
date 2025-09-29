/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#8ecae6',
          DEFAULT: '#219ebc',
          dark: '#023047',
        },
        accent: '#ffb703',
        danger: '#e63946',
        grayish: '#f8f9fa',
      },
    },
  },
  plugins: [],
}
