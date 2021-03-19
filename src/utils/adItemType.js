import { config } from '~app//config';
import { WORD_BY_CATEGORY } from './constants';

const PropertyCategories = [1000, 1010, 1020, 1030, 1040, 1050];
const MAPPING_SHOP_CATEGORY = [
  {
    shopType: 'vehicle',
    categories: [2010, 2020, 2000, 2030, 2050, 2060, 2090],
  },
  {
    shopType: 'property',
    categories: [10000, 10010, 10020, 10030, 1000, 1010, 1020, 1030, 1040, 1050],
  },
  {
    shopType: 'electronic',
    categories: [5000, 5010, 5020, 5030, 5040, 5050, 5060, 5070, 5080, 5090],
  },
];

export function isPropertyCategory(categoryIdInp) {
  const categoryId = parseInt(categoryIdInp, 10);
  if (isNaN(categoryId)) {
    return false;
  }
  return PropertyCategories.indexOf(categoryId) > -1;
}

export const AdTypeEnum = {
  SHOP: 'shop',
  PRO: 'pro',
  PRIVATE: 'private',
  SHOP_VERIFIED: 'shop_verified',
};

const AdTypeDefaultConfig = {};
AdTypeDefaultConfig[AdTypeEnum.SHOP] = {
  defaultIcon: 'shop',
  name: 'Shop',
  avatar: '',
  address: '',
  url: '',
  joinedDate: new Date(),
};
AdTypeDefaultConfig[AdTypeEnum.SHOP_VERIFIED] = {
  defaultIcon: 'shop_verified',
  name: 'Shop',
  avatar: '',
  address: '',
  url: '',
  joinedDate: new Date(),
};
AdTypeDefaultConfig[AdTypeEnum.PRO] = {
  defaultIcon: 'pro',
  name: 'Bán chuyên',
  avatar: '',
  address: '',
  url: config.publicProfileUrl,
  joinedDate: new Date(),
};
AdTypeDefaultConfig[AdTypeEnum.PRIVATE] = {
  defaultIcon: 'private',
  name: 'Cá nhân',
  avatar: '',
  address: '',
  url: config.publicProfileUrl,
  joinedDate: new Date(),
};

function getShopUrl(adCategory, shopUrl) {
  for (let i = 0; i < MAPPING_SHOP_CATEGORY.length; i += 1) {
    if (MAPPING_SHOP_CATEGORY[i].categories.indexOf(adCategory) > -1) {
      const { shopType } = MAPPING_SHOP_CATEGORY[i];
      return `${config.shopUrl[shopType]}/${shopUrl}`;
    }
  }
  return '#';
}

function getAdBodyParam(adInfo, profile) {
  if (!adInfo) {
    return {};
  }
  // when we are in adlisting page, there is no such profile info
  // fake it instead
  let profileInfo = profile;
  if (!profile) {
    profileInfo = {
      full_name: adInfo.account_name,
      avatar: '',
      address: '',
      start_time: '0',
    };
  }
  let adBodyParam = null;
  let date;
  if (adInfo.shop_alias && adInfo.shop && adInfo.shop.status === 'accepted') {
    const { shop } = adInfo;
    const shopUrl = shop.urls && shop.urls[0] && shop.urls[0].url ? shop.urls[0].url : shop.urls[0];
    const adCategory = adInfo.category;
    const fullShopUrl = getShopUrl(adCategory, shopUrl);
    adBodyParam = {
      categoryId: adInfo.category,
      adType: adInfo.shop.isVerified ? AdTypeEnum.SHOP_VERIFIED : AdTypeEnum.SHOP,
      name: shop.name,
      avatar: shop.profileImageUrl,
      address: shop.address,
      url: fullShopUrl,
      joinedDate: shop.createdDate,
    };
    // eslint-disable-next-line eqeqeq
  } else if (adInfo.company_ad == '1') {
    date = profileInfo.start_time ? profileInfo.start_time : profileInfo.create_time;
    adBodyParam = {
      categoryId: adInfo.category,
      adType: AdTypeEnum.PRO,
      name: profileInfo.full_name || adInfo.account_name,
      avatar: profileInfo.avatar,
      address: profileInfo.address,
      url: '',
      joinedDate: new Date(parseInt(date, 10) * 1000),
    };
  } else {
    date = profileInfo.start_time ? profileInfo.start_time : profileInfo.create_time;
    adBodyParam = {
      categoryId: adInfo.category,
      adType: AdTypeEnum.PRIVATE,
      name: profileInfo.full_name || adInfo.account_name,
      avatar: profileInfo.avatar || adInfo.avatar,
      address: profileInfo.address,
      url: '',
      joinedDate: new Date(parseInt(date, 10) * 1000),
    };
  }

  return adBodyParam;
}

export function getConfig(adInfo = {}, profile) {
  const param = getAdBodyParam(adInfo, profile);
  const wordingConfig = WORD_BY_CATEGORY[adInfo.category] || WORD_BY_CATEGORY['0'] || {};
  const result = { ...AdTypeDefaultConfig[param.adType] };
  if (param.adType === AdTypeEnum.PRO) {
    result.name = wordingConfig.adListing.AD_TYPE_LABEL;
  }
  Object.keys(param).forEach((key) => {
    if (param[key]) {
      result[key] = param[key];
    }
  });
  return result;
}
