/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-commonjs */
/**
 * remote-component.config.js
 *
 * Dependencies for Remote Components
 */
export const resolve = {
  react: require('react'),
  'react-dom': require('react-dom'),
  redux: require('redux'),
  'prop-types': require('prop-types'),
  'react-is': require('react-is'),
  'react-redux': require('react-redux'),
  'isomorphic-fetch': require('isomorphic-fetch'),
  'react-debounce-input': require('react-debounce-input'),
  // 'styled-components': require('styled-components'),
  'ct-helpers/Storage': require('ct-helpers/Storage'),
  'ct-helpers/convertQueryStringToObj': require('ct-helpers/convertQueryStringToObj'),
  'ct-helpers/getRelationCategory': require('ct-helpers/getRelationCategory'),
  'ct-helpers/queryBuilder': require('ct-helpers/queryBuilder'),
  'ct-helpers/isNone': require('ct-helpers/isNone'),
  'ct-helpers/ctRequest': require('ct-helpers/ctRequest'),
  'ct-helpers/formatThousandSeparation': require('ct-helpers/formatThousandSeparation'),
  'ct-helpers/getDisplayTime': require('ct-helpers/getDisplayTime'),
};
