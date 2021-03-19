/* eslint-disable import/no-commonjs */
const nextRoutes = require('next-routes');

// eslint-disable-next-line no-multi-assign
const routes = (module.exports = nextRoutes());

routes.add('index', '/tham-khao-gia');
// routes.add('detail', '/tham-khao-gia/:region');
routes.add({
  name: 'detailWithRegion',
  pattern: '/tham-khao-gia/:region/:category/:rest*',
  page: 'detail',
});
routes.add({
  name: 'detailWithSubRegion',
  pattern: '/tham-khao-gia/:region/:area/:category/:rest*',
  page: 'detail',
});
module.exports = routes;
