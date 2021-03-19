/**
 * Object to store client config
 */
export default class ClientConfig {
  constructor(config, req, res) {
    this.config = config;
    this.req = req;
    this.res = res;
  }
}
