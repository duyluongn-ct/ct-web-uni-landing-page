import { combineReducers } from 'redux';
import { authReducer } from 'ct-auth';
import savedAdReducer from '~app/components/GridAds/SaveAd/reducer';
import adFeatureReducer from '~app/components/GridAds/AdFeature/reducer';
import marketPriceReducer from '~app/containers/Home/marketPriceReducer';
import campaignReducer from '~app/containers/Home/campaignReducer';
import config from './modules/config';
import adsReducer from './modules/adsReducer';
import regionsReducer from './modules/region';

export default function createReducer(asyncReducers) {
  return combineReducers({
    config,
    auth: authReducer,
    regions: regionsReducer,
    recommendations: adsReducer,
    savedAd: savedAdReducer,
    adFeature: adFeatureReducer,
    marketPrice: marketPriceReducer,
    campaign: campaignReducer,
    ...asyncReducers,
  });
}
