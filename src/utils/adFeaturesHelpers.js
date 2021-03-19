import { config } from '~app/config';

const B2C_CATEGORIES = [
  2010,
  2020,
  10010,
  10020,
  10030,
  1010,
  1020,
  1030,
  1040,
  1050,
  5000,
  5010,
  5020,
  5030,
  5040,
  5050,
  5060,
  5070,
];

function validateFeatures(featureItem) {
  const expiredTime = featureItem.expiredTime * 1000;
  if (expiredTime < Date.now()) {
    return false;
  }
  return true;
}

export function mappingAdListingFeatures(adInfo, mappingData) {
  if (!adInfo || !adInfo.ad_features || !mappingData) {
    return [];
  }
  const adFeatures = adInfo.ad_features;
  const valuesAfterMapping = [];
  for (let i = 0; i < adFeatures.length; i++) {
    if (mappingData[adFeatures[i].mapping_id]) {
      const featureItem = {
        name: adFeatures[i].name,
        mappingData: mappingData[adFeatures[i].mapping_id],
        expiredTime: adFeatures[i].expired_time,
      };
      if (validateFeatures(featureItem)) {
        valuesAfterMapping.push(featureItem);
      }
    }
  }
  return valuesAfterMapping;
}

export function getFeatureAdByKey(adFeatures, key) {
  for (let i = 0; i < adFeatures.length; i++) {
    if (adFeatures[i].name === key && adFeatures[i].mappingData) {
      return JSON.parse(adFeatures[i].mappingData);
    }
  }
  return null;
}

export function isOwnerOfAd(adInfo, accountId) {
  return adInfo.account_id === parseInt(accountId, 10);
}

function isC2CCategory(adInfo) {
  return B2C_CATEGORIES.indexOf(adInfo.category) < 0;
}

export function checkShouldShowPromptAlert(adInfo, accountId, currentSearch) {
  if (adInfo && adInfo.list_time && adInfo.account_id && adInfo.category && config.onPromptAlert) {
    if (
      isOwnerOfAd(adInfo, accountId) &&
      isC2CCategory(adInfo) &&
      adInfo.adIndex > 15 &&
      !currentSearch
    ) {
      return true;
    }
  }
  return false;
}

export function getConfigDistanceGallery(ABTestPagination) {
  return ABTestPagination === 'loadMore'
    ? config.distanceGalleryAdLoadMore
    : config.distanceGalleryAd;
}

export function isPaginationABTest(ABTestPagination) {
  return ABTestPagination === 'pagination';
}
