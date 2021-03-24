import fetch from 'isomorphic-fetch';
import Cookies from 'cookies-js';
import { config } from '~app/config';
import seoDefaultData from './default/data';

// region
const GET_REGIONS = 'regions/GET_REGIONS';
const GET_REGIONS_SUCCESS = 'regions/GET_REGIONS_SUCCESS';
const GET_REGIONS_FAIL = 'regions/GET_REGIONS_FAIL';

export const GET_CONFIG = 'marketPrice/LOADING';
export const GET_CONFIG_SUCCESS = 'marketPrice/SUCCESS';
export const GET_CONFIG_FAIL = 'marketPrice/FAIL';
export const SET_REGION = 'marketPrice/SET_REGION';
export const SET_AREA = 'marketPrice/SET_AREA';
export const SET_CATEGORY = 'marketPrice/SET_CATEGORY';

export const LOAD_DEEP_LINK_RESOVLER = 'nav/LOAD_DEEP_LINK_RESOVLER';
export const LOAD_DEEP_LINK_RESOVLER_SUCCESS = 'nav/LOAD_DEEP_LINK_RESOVLER_SUCCESS';
export const LOAD_DEEP_LINK_RESOVLER_FAIL = 'nav/LOAD_DEEP_LINK_RESOVLER_FAIL';

export const getConfigs = () => ({
  types: [GET_CONFIG, GET_CONFIG_SUCCESS, GET_CONFIG_FAIL],
  promise: async () => {
    const url = `${config.gatewayUrl}/v1/public/chapy-pro/landing-page-index-conf`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((data) => data.json())
        .then((result) => {
          return resolve(result);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
});

export const getRegions = () => ({
  types: [GET_REGIONS, GET_REGIONS_SUCCESS, GET_REGIONS_FAIL],
  promise: async () => {
    const url = `${config.gatewayUrl}/v1/public/web-proxy-api/loadRegions`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((data) => data.json())
        .then((result) => {
          return resolve(result);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
});

export const getNavObj = (path) => ({
  types: [LOAD_DEEP_LINK_RESOVLER, LOAD_DEEP_LINK_RESOVLER_SUCCESS, LOAD_DEEP_LINK_RESOVLER_FAIL],
  promise: async () => {
    const url = `${config.gatewayUrl}/v1/public/deeplink-resolver?url=${encodeURIComponent(path)}`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((data) => data.json())
        .then((result) => {
          return resolve(result);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  },
});

export const setRegion = (data) => {
  return {
    type: SET_REGION,
    payload: data,
  };
};

export const setArea = (data) => {
  return {
    type: SET_AREA,
    payload: data,
  };
};

export const setCategory = (data) => {
  return {
    type: SET_CATEGORY,
    payload: data,
  };
};

export function getCategories() {
  const url = `${config.gatewayUrl}/v7/public/chapy-pro/newcats`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        const { categories, code } = result;
        if (code === 'SUCCESS') {
          return resolve(categories);
        }
        return resolve([]);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getBanners() {
  const url = `${config.gatewayUrl}/v1/public/buyer-collection/banners?mode=PTY`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        const { banners, status } = result;
        if (status === 'success') {
          return resolve(banners);
        }
        return resolve([]);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getSeo() {
  const url = `${config.gatewayUrl}/v1/public/seo-api/tag?siteId=3&uri=homepage-pty`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        if (data.errors) {
          return resolve(seoDefaultData);
        }
        return resolve(data);
      })
      .catch(() => {
        return resolve(seoDefaultData);
      });
  });
}

export function getTotalSK() {
  const url = `${config.gatewayUrl}/v1/public/ad-listing/count?cg=1000&limit=10&st=s,k`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getTotalUH() {
  const url = `${config.gatewayUrl}/v1/public/ad-listing/count?cg=1000&limit=10&st=u,h`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getAdsSK(region) {
  let regionString = ``;
  if (region.regionValue > 0) {
    regionString += `${'&region_v2=' + region.regionValue}`;
  }
  if (region.subRegionValue > 0) {
    regionString += `${'&area_v2=' + region.subRegionValue}`;
  }
  if (region.wardValue > 0) {
    regionString += `${'&ward=' + region.wardValue}`;
  }
  const url = `${config.gatewayUrl}/v1/public/ad-listing?cg=1000&limit=8&st=s,k${regionString}&key_param_included=true`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getAdsUH(region) {
  let regionString = ``;
  if (region.regionValue > 0) {
    regionString += `${'&region_v2=' + region.regionValue}`;
  }
  if (region.subRegionValue > 0) {
    regionString += `${'&area_v2=' + region.subRegionValue}`;
  }
  if (region.wardValue > 0) {
    regionString += `${'&ward=' + region.wardValue}`;
  }
  const url = `${config.gatewayUrl}/v1/public/ad-listing?cg=1000&limit=8&st=u,h${regionString}&key_param_included=true`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getTotalProject() {
  const url = `${config.gatewayUrl}/v1/public/xproperty/projects/_search?limit=8&status=active`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getTotalProjectAgent() {
  const url = `${config.gatewayUrl}/v1/public/shops/search?limit=8`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getTotalBlog() {
  const url = `${config.propertyURL}/kinh-nghiem/wp-json/wp/v2/posts?per_page=8&order=desc&orderby=date`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        const res = {
          data: [],
          isDone: true,
        };
        for (let i = 0; i < result.length; i++) {
          const desc =
            result[i].excerpt.rendered !== ''
              ? result[i].excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')
              : '';
          const ad = {
            id: result[i].id || 1,
            image: result[i].images.medium || '',
            title: result[i].title.rendered || '',
            intro: (result[i].yoast_meta[0] && result[i].yoast_meta[0].content) || desc,
            url: result[i].link || '',
          };
          res.data.push(ad);
        }

        return resolve(res);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getAds(url) {
  // const url = `${config.gatewayUrl}/v1/public/ad-listing?cg=${cg}&st=s,k&limit=10&key_param_included=true`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getAdsRecommend({ authenticated = false, account_id: accountId }) {
  let fingerPrint = Cookies.get('ctfp');
  if (authenticated) {
    fingerPrint = accountId;
  }
  const url = `${config.gatewayUrl}/v1/public/recommender/recommend_for_you?fingerprint=${fingerPrint}&page=1&preview=false&cg=2000&limit=10`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getChartData(cat, region) {
  const url = `${config.gatewayUrl}/v1/public/pty-landing-page/chart?cg=${cat.value}&region=${region.regionValue}&area=${region.subRegionValue}`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export function getTotalCount(type, cat, region) {
  const url = `${config.gatewayUrl}/v1/public/ad-listing/count?cg=${cat.value}&region_v2=${region.regionValue}&area_v2=${region.subRegionValue}&st=s,k&market_price_type=${type}`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        result.isDone = true;
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
}

export const getBlocks = () => {
  const url = `https://www.chotot.org/landing-page-admin/config/`;

  return new Promise((resolve) => {
    fetch(url)
      .then((data) => data.json())
      .then((result) => {
        return resolve(result);
      })
      .catch(() => {
        return resolve([]);
      });
  });
};
