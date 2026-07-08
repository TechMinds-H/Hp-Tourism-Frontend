/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          dark: '#1B4332',
        },
        accent: {
          DEFAULT: '#B7950B',
          light: '#D4AC0D',
          dark: '#9A7D0A',
        },
        cream: '#F8F5F0',
        'cream-dark': '#EDE8DF',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lato', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=80')",
      },
    },
  },
  plugins: [],
}
