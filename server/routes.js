/* eslint-disable import/no-commonjs */
const nextRoutes = require('next-routes');

// eslint-disable-next-line no-multi-assign
const routes = (module.exports = nextRoutes());

routes.add('index', '/chuong-trinh-vo-van-nha-dat');
module.exports = routes;
