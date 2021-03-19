/* eslint import/no-extraneous-dependencies: off, global-require: off, import/no-commonjs: off */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const { version } = require('./buildid.json');
require('dotenv').config();

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {};
  require.extensions['.css'] = () => {};
  require.extensions['.scss'] = () => {};
  require.extensions['.png'] = () => {};
  require.extensions['.svg'] = () => {};
  require.extensions['.jpg'] = () => {};
}

const nextConfig = {
  distDir: process.env.NODE_ENV === 'production' ? version : '.next',
  assetPrefix: process.env.ASSET_PREFIX
    ? `${process.env.ASSET_PREFIX}${process.env.BUILD_ID || version}`
    : '',
  compress: true,
  generateBuildId: async () => {
    return 'build';
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public',
  },
  webpack(config) {
    // config.output.publicPath = `${assetPrefix}${config.output.publicPath}`;
    const minimizers = config.optimization.minimizer || [];
    minimizers.push(new OptimizeCSSAssetsPlugin({}));

    minimizers.forEach((minimizer) => {
      if (minimizer.options && minimizer.options.terserOptions) {
        // turn on drop_console during build for prod
        minimizer.options.terserOptions = {
          ...minimizer.options.terserOptions,
          compress: {
            drop_console: process.env.ENV !== 'development',
          },
        };
      }
    });

    config.optimization.minimizer = minimizers;
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      options: {
        limit: 10240,
        mimetype: 'image/svg+xml',
      },
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|woff(2)?|ttf|eot)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'static/css',
          },
        },
        // {
        //   loader: 'url-loader'
        // }
      ],
    });
    config.resolve.alias['remote-component.config.js'] = path.join(
      __dirname,
      'remote-component.config.js'
    );
    return config;
  },
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    TEST_VAR: process.env.TEST_VAR,
  },
};

module.exports = withBundleAnalyzer(
  withSass({
    ...withCss({ ...nextConfig, cssModules: false }),
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
  })
);
