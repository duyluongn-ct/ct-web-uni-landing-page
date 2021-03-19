// const purgecss = require('@fullhuman/postcss-purgecss');
const postcssPresetEnv = require('postcss-preset-env');

// eslint-disable-next-line import/no-commonjs
module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      autoprefixer: {
        grid: false,
        flexbox: 'no-2009',
        Browserslist: ['last 20 versions'],
      },
    }),
    // process.env.NODE_ENV === 'production'
    //   ? purgecss({
    //       content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx', './src/**/*.js'],
    //       defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    //     })
    //   : null,
  ],
};
