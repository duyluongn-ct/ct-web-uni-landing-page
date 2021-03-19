import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { clientMiddleware } from 'ct-helpers';
import thunk from 'redux-thunk';
import rootReducer from '~app/reducer';
import { logger } from '~app/middleware/logger';
import ClientConfig from '~app/utils/ClientConfig';
import { config } from '~app/config';
import createApiMiddleware from './middleware/createApiMiddleware';

const dev = process.env.NODE_ENV === 'development';
const _initialState = {};

export const initStore = (initialState = _initialState, { req, res }) => {
  const clientConfig = new ClientConfig(config, req, res);
  let middleware = applyMiddleware(
    logger,
    createApiMiddleware(clientConfig),
    clientMiddleware(),
    thunk
  );

  if (dev) {
    middleware = composeWithDevTools(middleware);
  }
  const store = createStore(rootReducer(), initialState, compose(middleware));
  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(rootReducer(store.asyncReducers));
    return store;
  };

  return store;
};
