import ApiClient from '~app/utils/ApiClient';

class AdFeatureClient extends ApiClient {
  loadConfig() {
    return this.get('/v3/public/ad-features/categories');
  }

  loadAllMapping() {
    return this.get('/v1/public/ad-features/mappings');
  }

  loadSafeTips() {
    return this.get('/v1/public/chapy-pro/conf');
  }
}
export default AdFeatureClient;
