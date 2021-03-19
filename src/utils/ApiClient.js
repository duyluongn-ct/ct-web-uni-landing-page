import Cookies from 'cookies-js';
import superagent from 'superagent';
import isUrl from 'is-url';
import { isServer } from '~app/utils';

function formatUrl(rootUrl = '', path = '') {
  if (isUrl(path)) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return rootUrl + adjustedPath;
}

function createApiMethod(method) {
  return function requestMethod(
    path,
    { params, headers, data, timeout } = { params: null, headers: null, data: null, timeout: 0 },
    shouldTrial = true,
    isJson = true
  ) {
    const { gatewayUrl, config } = this;
    return new Promise((resolve, reject) => {
      const request = superagent[method](formatUrl(gatewayUrl, path));
      request.timeout(timeout || config.requestTimeout);
      if (params) {
        request.query(params);
      }

      if (headers) {
        request.set(headers);
      }

      if (data) {
        if (isJson) {
          request.send(data);
        } else {
          for (const key in data) {
            const value = data[key];
            request.send(`${key}=${value}`);
          }
        }
      }

      request.end((err, response = {}) => {
        if (!response) {
          return reject();
        }
        const { status, body, header } = response;
        if (err) {
          if (shouldTrial && (status === 401 || status === 403)) {
            return this.refreshToken().then(
              (result) => {
                if (headers?.Authorization) {
                  headers.Authorization = 'Bearer ' + result.access_token;
                }
                return this[method](path, { params, headers, data }, false).then(
                  (finalResult) => {
                    resolve(finalResult);
                  },
                  (finalError) => {
                    reject(finalError);
                  }
                );
              },
              (error) => {
                reject(error);
              }
            );
          }
          if (!body && !err.status) {
            return reject(new Error('Không có kết nối mạng. Vui lòng kiểm tra Wi-Fi hoặc 3G.'));
          }
          return reject(body || err);
        }

        let result = { header };
        if (Array.isArray(body)) {
          result = Object.assign(result, {
            data: body,
          });
        } else {
          result = Object.assign(result, body);
        }
        // if (__SERVER__)
        // console.log(`Result from API ${path}`, result);
        return resolve(result);
      });
    });
  };
}

/**
 * API client for each API end point
 */
class ApiClient {
  constructor() {
    // why not [].forEach? because this will help implicit type checking and code autocompletion
    this.get = createApiMethod('get');
    this.post = createApiMethod('post');
    this.put = createApiMethod('put');
    this.patch = createApiMethod('patch');
    this.del = createApiMethod('del');
  }

  /**
   * Inject client config to this client. If config already set and rootUrl is unchanged, reuse existing one
   */
  /**
   * @param  {Object} client
   * @param  {Object} client.config
   * @param  {Object} [client.req]
   * @param  {Object} [client.res]
   * @return {Object} description
   */
  with(client = { config: null, req: null, res: null }) {
    const {
      config,
      config: { gatewayUrl = '' },
      req,
      res,
    } = client;
    if (this.gatewayUrl && this.gatewayUrl === gatewayUrl) {
      return this;
    }
    // apply config
    this.req = req;
    this.res = res;
    this.config = config;
    this.gatewayUrl = gatewayUrl;

    return this;
  }

  refreshToken() {
    const { gatewayUrl } = this;
    return new Promise((resolve, reject) => {
      const that = this;
      const refreshToken = this.getCookie('refreshToken');
      const request = superagent.post(`${gatewayUrl}/v1/public/auth/token`);
      request.send({
        refresh_token: refreshToken,
      });

      request.end((err, { body }) => {
        if (err) {
          reject(body || err);
        } else {
          that.setCookie('privateToken', body.access_token);
          that.setCookie('refreshToken', body.refresh_token);
          resolve(body);
        }
      });
    });
  }

  getCookie(key) {
    if (isServer()) {
      return this.req.cookies[key];
    }
    return Cookies.get(key);
  }

  setCookie(key, value) {
    const { config } = this;
    if (isServer()) {
      const cookieOption = {
        path: '/',
        domain: config.cookieDomain,
        httpOnly: false,
        maxAge: config.cookieMaxAge * 86400000,
      };
      this.res.cookie(key, value, cookieOption);
      this.req.cookies[key] = value;
    } else {
      const cookieOption = {
        expires: config.cookieMaxAge,
        path: '/',
        domain: config.cookieDomain,
      };
      Cookies.set(key, value, cookieOption);
    }
  }

  getAuthorizationHeader() {
    const accessToken = this.getCookie('privateToken');
    return {
      Authorization: 'Bearer ' + accessToken,
    };
  }
}

export default ApiClient;
