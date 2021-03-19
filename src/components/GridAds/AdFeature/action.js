import AdFeatureClient from './AdFeatureClient';

export const LOADING = 'adFeature/LOADING';
export const SUCCESS = 'adFeature/SUCCESS';
export const FAIL = 'adFeature/FAIL';
export const MAPPING_SUCCESS = 'adFeature/MAPPING_SUCCESS';
export const DEFAULT = 'adFeature/DEFAULT';

const adFeatureClient = new AdFeatureClient();

export function loadOnServer() {
  return {
    types: [LOADING, SUCCESS, FAIL],
    promise: (client) => adFeatureClient.with(client).loadConfig(),
  };
}

export function loadAdFeature() {
  return {
    types: [DEFAULT, MAPPING_SUCCESS, DEFAULT],
    promise: (client) => adFeatureClient.with(client).loadAllMapping(),
  };
}
