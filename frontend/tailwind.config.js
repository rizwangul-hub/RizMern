/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080912',
        midnight: '#0d0e1b',
        panel: '#121424',
        muted: '#a5a7bc',
        accent: {
          purple: '#a855f7',
          blue: '#6366f1',
          cyan: '#22d3ee',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(110deg, #a855f7 0%, #6366f1 52%, #22d3ee 100%)',
      },
      boxShadow: {
        glow: '0 0 38px rgba(99, 102, 241, 0.28)',
      },
    },
  },
  plugins: [],
}
