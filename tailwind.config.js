/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#080808',
        surface: '#111111',
        surface2: '#191919',
        line: 'rgba(242, 237, 228, 0.1)',
        accent: '#FF5C00',
        ink: '#F2EDE4',
        muted: '#8F8A84',
        wave: '#4ADE80',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'clamp-hero': ['clamp(3.5rem, 11vw, 9rem)', { lineHeight: '0.88' }],
        'clamp-h2': ['clamp(2.75rem, 8vw, 6rem)', { lineHeight: '0.92' }],
      },
    },
  },
  plugins: [],
}
