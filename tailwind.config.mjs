/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E4F4C',
          hover: '#0a3c39',
          dark: '#16302E',
          light: '#CFE3DD',
        },
        'bg-top': '#FCEEE0',
        'bg-bottom': '#EAF3EC',
        surface: '#FFFFFF',
        'accent-wa': '#25D366',
        'accent-wa-hover': '#1eb956',
        star: '#F5A524',
        'text-primary': '#17181A',
        'text-secondary': '#6E7378',
        'text-muted': '#9CA0A6',
        border: '#EFE7DA',
        'border-light': '#F3ECE1',
      },
      borderRadius: {
        card: '20px',
        button: '10px',
        pill: '999px',
        image: '20px',
        sm: '8px',
        md: '12px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.04)',
        hover: '0 8px 24px rgba(14, 79, 76, 0.10)',
        modal: '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        main: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        container: '1140px',
      },
      height: {
        hero: '300px',
        'hero-sm': '220px',
        map: '340px',
      },
      zIndex: {
        navbar: '1000',
        modal: '2000',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
      },
    },
  },
  plugins: [],
}
