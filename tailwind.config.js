/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0B0F1A',
        'glow-pink': '#FF7EB6',
        'glow-orange': '#FFB347',
        'glow-purple': '#A78BFA',
        'glow-teal': '#6EE7B7',
        accent: '#FDE68A',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
