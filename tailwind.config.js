/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Controlled via 'dark' class on <html>
  theme: {
    extend: {
      colors: {
        // Colors mapped to CSS variables defined in src/index.css
        app: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          'surface-hover': 'var(--color-surface-hover)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          secondary: 'var(--color-secondary)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '14px', // 12-16px radius as requested
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 10px 25px -5px rgba(99, 102, 241, 0.15)',
      },
      transitionDuration: {
        'hover': '180ms', // 150-200ms subtle lift
      }
    },
  },
  plugins: [],
}
