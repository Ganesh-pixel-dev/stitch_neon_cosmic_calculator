/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0c1f',
        primary: {
          DEFAULT: '#81ecff',
          glow: 'rgba(129, 236, 255, 0.4)',
        },
        secondary: {
          DEFAULT: '#ff51fa',
          glow: 'rgba(255, 81, 250, 0.4)',
        },
        tertiary: {
          DEFAULT: '#f3ffca',
          glow: 'rgba(243, 255, 202, 0.4)',
        },
        surface: {
          DEFAULT: '#0b0c1f',
          container: '#101127',
          highest: '#22233f',
        }
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(129, 236, 255, 0.5), 0 0 30px rgba(129, 236, 255, 0.2)',
        'neon-magenta': '0 0 15px rgba(255, 81, 250, 0.5), 0 0 30px rgba(255, 81, 250, 0.2)',
        'neon-lime': '0 0 15px rgba(243, 255, 202, 0.5), 0 0 30px rgba(243, 255, 202, 0.2)',
        '3d-button': '0 6px 0 rgb(16, 17, 39), 0 10px 20px rgba(0, 0, 0, 0.5)',
        '3d-active': '0 2px 0 rgb(16, 17, 39), 0 4px 10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
