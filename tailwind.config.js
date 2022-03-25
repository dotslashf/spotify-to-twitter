module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      spotify: '#1DB954',
      twitter: '#1DA1F2',
      'twitter-dark': '#0F5079',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        spotify: {
          primary: '#0B4619',
          secondary: '#116530',
          accent: '#FFCC1D',
          neutral: '#E8E8CC',
          'base-100': '#E8E8CC',
        },
      },
    ],
  },
};
