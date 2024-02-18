/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./main/**/*.{html,js}"],
  theme: {
    fontFamily: {
      newFont: ["Playfair Display", 'serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      keyframes: {
        comingup: {
          '0%': { top: '100vh' },
          '100%': { top: '48vh' }
        },
        appearingEffects: {
          '0%': { opacity: '0' },
          '25%': { opacity: '30' },
          '50%': { opacity: '60' },
          '75%': { opacity: '80' },
          '100%': { opacity: '100' }
        },
        comesontop: {
          '0%': { top: '47vh' },
          '100%': { top: '10vh' }
        },
        comesontop2: {
          '0%': { top: '51vh' },
          '100%': { top: '14vh' }
        }
      },
    },
  },
  plugins: [],
}

