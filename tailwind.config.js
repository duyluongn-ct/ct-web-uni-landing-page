/* eslint-disable import/no-commonjs */
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    screens: {
      ip5: { max: '320px' },
      sm: { max: '767px' },
      md: { min: '768px' },
      lg: { min: '1024px' },
    },
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      gray: {
        100: '#f7fafc',
        500: '#1a202c',
      },
      primary: '#ffba00',
      secondary: '#fc9807',
      text: '#222',
    },
    fontSize: {
      10: '1rem',
      12: '1.2rem',
      13: '1.3rem',
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
    },
  },
  corePlugins: {
    float: false,
    preflight: false,
  },
  variants: {
    appearance: [],
  },
  plugins: [],
};
