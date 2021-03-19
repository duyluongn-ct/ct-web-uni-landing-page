/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-commonjs */
/* eslint-disable global-require */
/**
 * remote-component.config.js
 *
 * Dependencies for Remote Components
 */

module.exports = {
  resolve: {
    react: require('react'),
    'react-dom': require('react-dom'),
    redux: require('redux'),
    'prop-types': require('prop-types'),
    'react-is': require('react-is'),
    'isomorphic-fetch': require('isomorphic-fetch'),
    'react-debounce-input': require('react-debounce-input'),
    'styled-components': require('styled-components'),
  },
};
