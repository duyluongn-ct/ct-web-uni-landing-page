const isClient = typeof window !== 'undefined' ? true : false;
export const env = (isClient && window.ENV ? window.ENV : process.env.ENV) || 'development';
export const baseDomain =
  (isClient && window.BASE_DOMAIN ? window.BASE_DOMAIN : process.env.BASE_DOMAIN) || 'com';
const GTM_CONTAINERID =
  (isClient ? window.GTM_CONTAINER : process.env.GTM_CONTAINERID) || 'GTM-NZKHXF7';

const configs = require('ct-helpers')[env];

export const config = {
  ...configs,
  cookieDomain: env !== 'development' ? `.chotot.${baseDomain}` : 'localhost',
  googleAdDisplaySite: baseDomain === 'com' ? 1 : 2,
  gtmContainerId: GTM_CONTAINERID,
  baseURL: `https://www.chotot.${baseDomain}`,
  vehicleURL: `https://xe.chotot.${baseDomain}`,
  jobBaseUrl: `https://www.vieclamtot.${baseDomain}`,
  accountBaseUrl: `https://accounts.chotot.${baseDomain}`,
  gatewayUrl: `https://gateway.chotot.${baseDomain}`,
  propertyURL: `https://nha.chotot.${baseDomain}`,
  publicProfileUrl: `https://www.chotot.${baseDomain}/user`,
  chatBaseUrl: `https://chat.chotot.${baseDomain}`,
  shopUrl: {
    vehicle: `https://xe.chotot.${baseDomain}/cua-hang`,
    property: `https://nha.chotot.${baseDomain}/chuyen-trang`,
    electronic: `https://www.chotot.${baseDomain}/cua-hang-dien-tu`,
  },
  staticUrl: 'https://static.chotot.com/storage/',
  iconUrl: 'https://static.chotot.com/storage/icons/logos/ad-param/',
  seoAPI: 'http://seo-api.default.svc.cluster.local/graphql',
  bannerAPI: 'http://buyer-collection.default.svc.cluster.local/api',
  errorImgUrl: 'https://static.chotot.com/storage/empty_state/desktop/',
  appWrapper: {
    header: `https://static.chotot.com/storage/APP_WRAPPER/${env}/header.js`,
    footer: `https://static.chotot.com/storage/APP_WRAPPER/${env}/footer.js`,
    placeholder: `https://static.chotot.com/storage/APP_WRAPPER/${env}/placeholder.js`,
    savesearchbutton: `https://static.chotot.com/storage/APP_WRAPPER/${env}/savesearchbutton.js`,
  },
  experiment: {
    newhome: {
      id: env === 'production' ? 'k7hGJJ6sTp29YYab8VWBlg' : 'krW_R2H3RoO-EcnTf_OEIA',
    },
  },
};
