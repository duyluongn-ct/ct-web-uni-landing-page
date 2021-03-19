import * as routes from '~server/routes';

const { Router } = routes;

export const pushRouter = (href) => {
  Router.pushRoute(href, href, { shallow: true });
};
