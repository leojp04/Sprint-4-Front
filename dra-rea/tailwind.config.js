/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#a1203a',
        ink: '#111827',
      },
    },
  },
  plugins: [],
}
