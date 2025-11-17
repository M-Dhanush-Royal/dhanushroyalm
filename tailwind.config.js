/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        'authentic': 'rgba(16, 185, 129, 0.95)',
        'suspicious': 'rgba(239, 68, 68, 0.95)',
        'analyzing': 'rgba(59, 130, 246, 0.95)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-logo': 'pulse-logo 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { 'from': { opacity: 0 }, 'to': { opacity: 1 } },
        fadeInDown: {
          'from': { opacity: 0, transform: 'translateY(-30px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          'from': { opacity: 0, transform: 'translateY(30px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInRight: {
          'from': { opacity: 0, transform: 'translateX(30px)' },
          'to': { opacity: 1, transform: 'translateX(0)' },
        },
        'pulse-logo': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
