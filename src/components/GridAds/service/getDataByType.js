import { AdTypeEnum, isPropertyCategory } from '~app/utils/adItemType';
import { WORD_BY_CATEGORY } from '~app/utils/constants';
import { config } from '~app/config';

const USER_ICON_TYPE = {
  private: `${config.staticUrl}chotot-icons/next/private.svg`,
  pro: `${config.staticUrl}chotot-icons/next/pro.svg`,
  shop: `${config.staticUrl}chotot-icons/next/shop.svg`,
  verified: `${config.staticUrl}chotot-icons/next/shop-verify.svg`,
};

export function getDataByType(type) {
  const ICONS = {
    [AdTypeEnum.PRIVATE]: ({ adTypeConfig }) => ({
      image: {
        src: adTypeConfig.avatar || USER_ICON_TYPE['private'],
        width: 16,
        height: 16,
        round: true,
      },
      anchor: {
        color: '#9B9B9B',
        pointerEvents: 'none',
      },
      displayedText: adTypeConfig.name || '',
    }),
    [AdTypeEnum.PRO]: ({ adTypeConfig }) => {
      let displayedText = adTypeConfig.name || '';
      if (displayedText) {
        if (adTypeConfig.adType === AdTypeEnum.PRO) {
          if (isPropertyCategory(adTypeConfig.categoryId)) {
            displayedText = 'Môi giới';
          } else {
            const wordingConfig =
              WORD_BY_CATEGORY[adTypeConfig.categoryId] || WORD_BY_CATEGORY['0'] || {};
            displayedText = wordingConfig.adListing.AD_TYPE_LABEL;
          }
        }
      }
      return {
        image: {
          src: USER_ICON_TYPE['pro'],
          width: 15,
        },
        anchor: {
          color: '#9B9B9B',
          pointerEvents: 'none',
        },
        displayedText,
      };
    },
    [AdTypeEnum.SHOP]: ({ adTypeConfig }) => ({
      image: {
        src: USER_ICON_TYPE['shop'],
        width: 16,
        height: 16,
      },
      anchor: {
        color: '#fe9900',
      },
      url: `${adTypeConfig.url}#ad_listing`,
      displayedText: adTypeConfig.name || '',
    }),
    [AdTypeEnum.SHOP_VERIFIED]: ({ adTypeConfig }) => ({
      image: {
        src: USER_ICON_TYPE['verified'],
        width: 26,
        height: 16,
      },
      anchor: {
        color: '#fe9900',
      },
      url: `${adTypeConfig.url}#ad_listing`,
      displayedText: adTypeConfig.name || '',
    }),
  };
  return ICONS[type] || ICONS[AdTypeEnum.PRIVATE];
}

export const getAdParams = (adInfo) => {
  const result = [];
  const { params = [] } = adInfo;
  params.forEach(({ value }) => {
    result.push(value);
  });
  return result;
};
