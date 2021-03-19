const express = require('express');
const morgan = require('morgan');
const flameGuard = require('flameguard');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const next = require('next');
const nextConfig = require('../next.config');
const routes = require('./routes');

const env = process.env.NODE_ENV || 'development';

const app = next({
  dev: env === 'development',
  // dir: path.resolve(__dirname, '../src'),
  conf: nextConfig,
});

const handle = routes.getRequestHandler(app, ({ req, res, route, query }) => {
  app.render(req, res, route.page, query);
});

const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const server = express();
  server.use(flameGuard);
  // eslint-disable-next-line no-shadow
  const flameGuardMiddleware = (req, res, next) => {
    req.route = { path: '_home' };
    next();
  };
  server.use(flameGuardMiddleware);
  server.use(compression());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());

  if (env !== 'development') {
    server.use(morgan('combined'));
  }

  const router = express.Router();

  server.get('/health-check', (req, res) => {
    res.send('OK');
  });

  router.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use(handle);

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
