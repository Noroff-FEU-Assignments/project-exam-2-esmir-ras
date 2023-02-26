/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: 'linear-gradient(132deg, rgb(255, 206, 236), rgb(151, 150, 240));',
      },
      dropShadow: {
        text: '1px 2px 1px rgb(0 0 0 / 0.6)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
};
