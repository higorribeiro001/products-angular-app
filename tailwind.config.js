/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--md-sys-color-primary)',
      },
      keyframes: {
        'fade-left': {
          "0%": { opacity: "0", transform: 'translateX(20px)' },
          "100%": { opacity: "1", transform: 'translateX(0)' },
        },
        'fade-up': {
          "0%": { opacity: "0", transform: 'translateY(20px)' },
          "100%": { opacity: "1", transform: 'translateY(0)' },
        },
        'fade-down': {
          "0%": { opacity: "0", transform: 'translateY(0)' },
          "100%": { opacity: "1", transform: 'translateY(20px)' },
        }
      },
      animation: {
        'fade-left': "fade-left 0.5s ease-in-out",
        'fade-up': "fade-up 0.5s ease-in-out",
        'fade-down': "fade-down 0.5s ease-in-out"
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
