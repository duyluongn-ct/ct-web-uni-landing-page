import { nameToUrl } from 'ct-helpers';
import Cookies from 'cookies-js';
import {
  DIVISION_NUMBERS,
  SUFFIX_NUMBERS,
  DEFAULT_OBJECT_CATEGORY,
  DAYS_PER_MONTH,
} from './constants';

export const isClient = typeof window !== 'undefined';
export const isServer = !isClient;

function refineLocation(regionObject) {
  const { regionName, regionValue, subRegionName, subRegionValue } = regionObject;
  const array = [12000, 13000, 3017, 5027];
  // Tp HCM, Hà Nội, Đà Nẵng, Cần Thơ
  let region = '';
  if (regionValue === 0) {
    return `${regionName}`;
  }
  if (subRegionValue === 0) {
    return regionName;
  }
  array.forEach((element) => {
    if (regionValue === element) {
      region = subRegionName;
    }
  });
  return region || `${subRegionName} ${regionName}`;
}

export const checkIsMobile = (userAgent) => {
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      userAgent
    )
  ) {
    return true;
  }
  return false;
};

export const createNewObject = (target = {}) => {
  if (typeof target !== 'object') return {};
  return JSON.parse(JSON.stringify(target));
};

export const CATEGORY_FINDING = {
  isJob: (category) => {
    const categoryId = parseInt(category, 10);
    return categoryId >= 13000 && categoryId < 14000;
  },
  isProperty: (category) => {
    const categoryId = parseInt(category, 10);
    return categoryId >= 1000 && categoryId < 2000;
  },
};

export const numberWithSeparator = (x) =>
  x
    ? x
        .toString()
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : 'N/A';

function renderSufFix(lengthNumber) {
  return SUFFIX_NUMBERS[lengthNumber];
}

export function numberToText(number) {
  let textNumber = '';
  if (!number) {
    return textNumber;
  }
  const numberOfNumber = `${number}`.length;
  if (numberOfNumber < 4 || !number) {
    textNumber = `${number}đ`;
  } else {
    const sufFix = renderSufFix(numberOfNumber);
    const preFix = Math.round((number / DIVISION_NUMBERS[numberOfNumber]) * 100) / 100;
    textNumber = `${preFix} ${sufFix}`;
  }
  return textNumber;
}

/**
 *
 * 1001 -> 1000
 * 1999 -> 1000
 *
 * @param {*} category Category id as number or string (1000)
 * @returns {number} parent category
 */
export function getParentCategory(category) {
  const categoryInt = parseInt(category, 10);
  return Math.floor(categoryInt / 1000) * 1000;
}

export function formatPriceAd(number) {
  return {
    numberToText: numberToText(number),
    numberTextWithSeparator:
      numberWithSeparator(number) !== 'N/A' ? `${numberWithSeparator(number)} đ` : '',
  };
}

export function getPriceText(adInfo) {
  const JOB_FIND_EM_CATES = [13010];
  const EM_FIND_JOB_CATES = [13020];
  const categoryId = parseInt(adInfo.category, 10);
  if (JOB_FIND_EM_CATES.indexOf(categoryId) > -1) {
    if (adInfo.max_salary) {
      const priceFormated = formatPriceAd(adInfo.max_salary);
      return priceFormated.numberToText.indexOf('NaN') < 0 ? `${priceFormated.numberToText}` : '';
    }
    return '';
  }

  if (EM_FIND_JOB_CATES.indexOf(categoryId) > -1) {
    if (adInfo.min_salary) {
      const priceFormated = formatPriceAd(adInfo.min_salary);
      return priceFormated.numberToText.indexOf('NaN') < 0 ? `${priceFormated.numberToText}` : '';
    }
    return '';
  }
  return null;
}

export function isAuth() {
  if (typeof window !== 'undefined') {
    const accessToken = Cookies.get('privateToken');
    if (accessToken) {
      return true;
    }
    return false;
  }
  return false;
}

export function getObjectCategory(pattern, list, key) {
  let result = DEFAULT_OBJECT_CATEGORY;
  const condition =
    pattern === undefined ||
    list === null ||
    (list && list.entities === undefined) ||
    pattern === result.route ||
    pattern === result.value;
  if (condition) {
    return result;
  }

  const findSubCategory = () => {
    let resultSubCate = false;
    if (list.entities) {
      Object.keys(list.entities).forEach((keyName) => {
        const subCat = list.entities[keyName].subCategories;
        if (subCat && subCat.entities && subCat.entities[pattern]) {
          resultSubCate = subCat.entities[pattern];
        }
      });
    }
    return resultSubCate;
  };

  const mainCategory = list.entities[pattern];
  const objectFound = mainCategory || findSubCategory();
  if (objectFound) {
    result = {
      label: objectFound.name,
      value: objectFound.id,
      route: objectFound.name_url,
      id: objectFound.id,
      paramType: objectFound.param_type,
    };
    // if specify a key of object category => return value of this key.
    if (key) {
      return result[key];
    }
    return result;
  }
  return false;
}

const OVERRIDE_REGION_URL = {
  'quan-thu-duc-thanh-pho-thu-duc': 'quan-thu-duc',
  'quan-2-thanh-pho-thu-duc': 'quan-2',
  'quan-9-thanh-pho-thu-duc': 'quan-9',
};

export const buildAdViewUrl = (adInfo, allCategoriesFollowId) => {
  let fullAdViewUrl = '';
  let dashboardAdViewUrl;
  const isFriendlyAdType = adInfo.category >= 2000;
  const adViewParts = isFriendlyAdType
    ? ['category', 'area_name', 'region_name', 'list_id']
    : ['region_name', 'area_name', 'category', 'list_id'];
  const diviner = isFriendlyAdType ? '-' : '/';
  adViewParts.forEach((key) => {
    if (adInfo[key]) {
      switch (key) {
        case 'region_name': {
          fullAdViewUrl = `${fullAdViewUrl}${diviner}${nameToUrl(adInfo[key])}`;
          break;
        }
        case 'area_name': {
          const areaUrl = nameToUrl(adInfo[key]);
          const overrideArea = OVERRIDE_REGION_URL[areaUrl]
            ? OVERRIDE_REGION_URL[areaUrl]
            : areaUrl;
          fullAdViewUrl = `${fullAdViewUrl}${diviner}${overrideArea}`;
          break;
        }
        case 'category': {
          const catUrl = getObjectCategory(parseInt(adInfo[key], 10), allCategoriesFollowId).route;
          fullAdViewUrl = `${fullAdViewUrl}/${catUrl}`;
          break;
        }
        default: {
          fullAdViewUrl = `${fullAdViewUrl}/${adInfo[key]}`;
          break;
        }
      }
    } else {
      dashboardAdViewUrl = `/${adInfo.list_id}.htm`;
    }
  });
  fullAdViewUrl = `${fullAdViewUrl}.htm`;
  return dashboardAdViewUrl || fullAdViewUrl;
};

export function getHeadingContent(data) {
  const {
    brandId,
    modelId,
    category,
    regionObjV2: objRegion = {},
    categoryObj: objCategory = {},
    brandObj: objBrand = {},
    modelObj: objModel = {},

    seoData = {},
  } = data;
  let content = '';
  const { regionValue, regionName } = objRegion;
  // category || brand
  if (seoData && seoData.h1) {
    content = seoData.h1;
  } else {
    // model
    if (brandId && modelId !== '0' && category) {
      const ALIAS_TITLE = {
        'mua-ban-do-dung-me-va-be': () => 'Đồ dùng mẹ và bé',
        'mua-ban-dien-thoai-di-dong': () => 'Điện thoại',
        default: () => objCategory.label,
      };
      const result = [];
      const categoryFunc = ALIAS_TITLE[objCategory.route] || ALIAS_TITLE.default;
      const categoryContent = categoryFunc();

      result.push(categoryContent);

      if (objBrand.id) {
        result.push(objBrand.name);
      }
      if (objModel.id) {
        result.push(objModel.name);
      }

      // region
      const region = regionValue === 0 ? `trên ${regionName}` : `tại ${regionName}`;
      result.push(region);

      content = `Mua bán ${result.join(' ')}`;
    }
    return '';
  }
  return content;
}

export function formatSeoTitle(stringModel) {
  if (stringModel === undefined || stringModel === null) return stringModel;
  const removeSub = stringModel.split('-').join(' ');
  return removeSub.replace(/\b\w/g, (l) => l.toUpperCase());
}

export function replaceLocationSEO(str, location = '', brandName = '', modelName = '') {
  if (!str) return '';
  let newStr = str.replace(/(\[SEO_LOCATION\])/g, location);
  newStr = newStr.replace(/(\[BRAND\])/g, formatSeoTitle(brandName));
  newStr = newStr.replace(/(\[MODEL\])/g, formatSeoTitle(modelName));
  return newStr;
}

export function normalizeSEOContent({
  brand = { uri: '' },
  model = { uri: '' },
  regionObject,
  response,
}) {
  const { seoData = {}, keywords } = response;
  const { uri: brandUri } = brand;
  const { uri: modelUri } = model;
  seoData.title = replaceLocationSEO(
    seoData.title,
    refineLocation(regionObject),
    brandUri,
    modelUri
  );
  seoData.h1 = replaceLocationSEO(seoData.h1, refineLocation(regionObject), brandUri, modelUri);

  // replace location for SEO title cat description...
  seoData.catDescription = replaceLocationSEO(
    seoData.catDescription,
    refineLocation(regionObject),
    brandUri,
    modelUri
  );
  if (Array.isArray(seoData.meta)) {
    seoData.meta.forEach((item, index) => {
      seoData.meta[index].content = replaceLocationSEO(
        seoData.meta[index].content,
        refineLocation(regionObject),
        brandUri,
        modelUri
      );
    });
  }
  return {
    seoData,
    keywords,
  };
}

export const SEO_FUNC = {
  seo: {
    query: (data) => {
      const { category, brand, model } = data;
      const { value: categoryId = 0 } = category;
      const { id: brandId } = brand;
      const { id: modelId } = model;

      let params = '';
      if (categoryId !== undefined) {
        params = `categoryId: ${parseInt(categoryId, 10)}`;
      }

      if (categoryId !== undefined && brandId !== undefined) {
        params = `categoryId: ${parseInt(categoryId, 10)}, brandId: ${parseInt(brandId, 10)}`;
      }

      if (categoryId !== undefined && brandId !== undefined && modelId) {
        params = `categoryId: ${parseInt(categoryId, 10)}, brandId: ${parseInt(
          brandId,
          10
        )}, modelId: ${parseInt(modelId, 10)}`;
      }

      let locationQuery = '';
      const { regionObject } = data;
      const keyMapping = {
        regionValue: 'region',
        subRegionValue: 'area',
        wardValue: 'ward',
      };
      ['regionValue', 'subRegionValue', 'wardValue'].forEach((key) => {
        if (regionObject[key]) {
          locationQuery = `${locationQuery}, ${keyMapping[key]}: ${regionObject[key]}`;
        }
      });

      return `{
        seo(siteId: ${1}, ${params}, ${locationQuery}){
            seoData {
              categoryId
              brandId
              modelId
              uri
              h1
              title
              meta
              catDescription
            }
            keywords {
                title
                uri
            }
            trendingKeywords {
                title
                uri
            }
          }
        }
      `;
    },
  },
  attribute: {
    query: (data) => {
      const { category, categoryType } = data;
      const { id } = category;
      const { name, uri } = categoryType;

      const catId = parseInt(id, 10);
      return `{
          attribute(siteId: ${1}, categoryId: ${catId}, name: "${name}", uri: "${uri}") {
            seoData {
                uri
                title
                h1
                catDescription
                param
                meta
                siteId
            }
            keywords {
                title
                uri
            }
            trendingKeywords {
                title
                uri
            }
          }
        }
      `;
    },
  },
};

export function randomAdGroup() {
  const rand = Math.random();
  switch (false) {
    case !(rand < 0.09):
      return `ad_ex${Math.floor(100 * rand)}`;
    case !(rand < 0.1):
      return 'ad_bc';
    default:
      return 'ad_opt';
  }
}

export function mappingAdGroupForTargeting(targeting) {
  const targetingObject = targeting;
  targetingObject.ad_group = randomAdGroup();
  return targetingObject;
}

export function parseToOldRegion(regionString) {
  const regionId = parseInt(regionString, 10);
  return !Number.isNaN(regionId) && regionId < 1000
    ? regionId
    : parseInt((regionId / 1000).toString(), 10);
}

function first(arr, func) {
  for (let i = 0; i < arr.length; ++i) if (func(arr[i])) return arr[i];
}

function thresh(t, val) {
  val = Math.round(val);
  return val < t ? val : 0;
}

function humanize(duration) {
  let ago = duration < 0;
  duration = Math.abs(duration);
  duration = [
    { n: thresh(45, duration / 1000), units: 'giây' },
    { n: thresh(45, duration / (60 * 1000)), units: 'phút' },
    { n: thresh(22, duration / (60 * 60 * 1000)), units: 'giờ' },
    { n: thresh(26, duration / (24 * 60 * 60 * 1000)), units: 'ngày' },
    { n: thresh(11, duration / (DAYS_PER_MONTH * 24 * 60 * 60 * 1000)), units: 'tháng' },
    { n: thresh(Number.MAX_VALUE, duration / (365 * 24 * 60 * 60 * 1000)), units: 'năm' },
    { n: 'now', units: '' },
  ];
  duration = first(duration, (part) => part.n !== 0);
  ago = ago && duration.n !== 'now';
  if (duration.n === 1) duration.units = duration.units.replace(/s$/, '');
  duration = duration ? `${duration.n} ${duration.units}${ago ? ' trước' : ''}` : 'bây giờ';
  return duration.trim();
}
export function fromNow(date) {
  const now = new Date().getTime();
  if (!(date instanceof Date)) date = new Date(date);
  return humanize(date.getTime() - now);
}

export function removeUnicode(str) {
  let newStr = str;
  newStr = newStr.toLowerCase();
  newStr = newStr.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  newStr = newStr.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  newStr = newStr.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  newStr = newStr.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  newStr = newStr.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  newStr = newStr.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  newStr = newStr.replace(/đ/g, 'd');
  newStr = newStr.replace(
    // eslint-disable-next-line no-useless-escape
    /!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-'
  );

  newStr = newStr.replace(/-+-/g, '-'); // thay thế 2- thành 1-
  // eslint-disable-next-line no-useless-escape
  newStr = newStr.replace(/^\-+|\-+$/g, '');

  return newStr;
}

export function normalizeAreas(rawAreas) {
  return rawAreas.map((item) => {
    const nameUrl = nameToUrl(item.name);
    return {
      ...item,
      displayText: item.name,
      url: nameUrl,
      name_url: nameUrl,
      suffix: item.id,
    };
  });
}

export function formatDate(date) {
  const objDate = new Date(date);
  const mm = objDate.getMonth() + 1;
  const dd = objDate.getDate();
  const yy = objDate.getFullYear();
  return [(dd > 9 ? '' : '0') + dd, (mm > 9 ? '' : '0') + mm, (yy > 9 ? '' : '0') + yy].join('-');
}

export function numberWithCommas(x) {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const buildPathDefaultUrl = ({ regionId, areaId, regionsFollowId }) => {
  const regionName = regionsFollowId ? regionsFollowId[regionId].name_url : '';
  const subRegionName = regionsFollowId ? regionsFollowId[regionId].area[areaId].name_url : '';
  return `/${regionName}/${subRegionName}/mua-ban-nha-dat`;
};

export const buildPathUrl = ({ params }) => {
  if (!params) return '';
  const { region = '', subRegion = '', category = '', adType = 's,k' } = params;
  return `/${region}/${subRegion}/${adType === 's,k' ? 'mua-ban' : 'cho-thue'}-${category}`;
};

export const buildPathUrlWithCat = ({ params, cat = {}, allCategoriesFollowId = {} }) => {
  if (!params) return '';
  const { region = '', subRegion = '' } = params;
  const parentId = getParentCategory(cat.id);
  const subCategory = allCategoriesFollowId.entities
    ? allCategoriesFollowId.entities[parentId].subCategories.entities[cat.id]
    : {};
  return `/${region}/${subRegion}/${subCategory.name_url || ''}`;
};

export const buildPathUrlWithRegion = ({
  params,
  region = {},
  subRegion = {},
  regionsFollowId = {},
}) => {
  if (!params) return '';
  const { regionObjV2 = {}, category = '', adType = 's,k' } = params;
  const regionId = Object.keys(region).length > 0 ? region.id : regionObjV2.regionValue;
  if (subRegion.id) {
    const regionName = regionsFollowId ? regionsFollowId[regionId].name_url : '';
    const subRegionName = regionsFollowId
      ? regionsFollowId[regionId].area[subRegion.id].name_url
      : '';
    return `/${regionName}/${subRegionName}/${
      adType === 's,k' ? 'mua-ban' : 'cho-thue'
    }-${category}`;
  } else {
    const regionName = regionsFollowId ? regionsFollowId[region.id].name_url : '';
    return `/${regionName}/${adType === 's,k' ? 'mua-ban' : 'cho-thue'}-${category}`;
  }
};
