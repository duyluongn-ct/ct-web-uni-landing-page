import Cookies from 'cookies-js';
import { dataLayerPush } from 'ct-web-gtm';
import objectMapper from 'object-mapper';

// import { config } from '~app/config';

const customDimensionUserMapping = {
  user: [
    {
      key: 'account_id',
      transform: (value) => (value ? value.account_id : null),
    },
    {
      key: 'account_oid',
      transform: (value) => (value ? value.account_oid : null),
    },
    {
      key: 'gender',
      transform: (value) => {
        let gender = 'none';
        if (value && Object.prototype.hasOwnProperty.call(value, 'gender')) {
          switch (value.gender) {
            case 'm':
              gender = 'male';
              break;
            case 'f':
              gender = 'female';
              break;
            case 'u':
              gender = 'other';
              break;
            default:
              gender = 'none';
              break;
          }
        }
        return gender;
      },
      default: 'none',
    },
  ],
};

const gtmTracking = (category = 'pty_homepage', label, action = 'click') => {
  const payload = {
    event: 'track_event',
    event_category: category,
    event_action: action,
    event_label: label,
  };
  return dataLayerPush(payload);
};

export const gtmTrackingWithRegion = (category = 'pty_homepage', label, action = 'click') => {
  let regionLocation = Cookies.get('regionParams');
  if (!regionLocation) {
    regionLocation = {
      regionValue: 0,
      regionUrl: 'toan-quoc',
      regionName: 'Toàn quốc',
      subRegionValue: 0,
      subRegionUrl: '',
      subRegionName: 'Tất cả',
    };
  } else {
    regionLocation = JSON.parse(regionLocation);
  }
  const payload = {
    event: 'track_event',
    event_category: category,
    event_action: action,
    event_label: label,
    region_id: regionLocation.regionValue,
  };
  return dataLayerPush(payload);
};

export function clickReviewRating({ listId }) {
  const payload = {
    event: 'track_event',
    event_category: 'rating_&_review',
    event_action: 'send',
    event_label: `${listId}`,
  };
  return dataLayerPush(payload);
}

export function clickReviewRatingTab({ tabName }) {
  const payload = {
    event: 'track_event',
    event_category: 'rating_&_review',
    event_action: 'tab',
    event_label: `${tabName}`,
  };
  return dataLayerPush(payload);
}

export function pushPageMetadata(pageType) {
  let regionLocation = Cookies.get('regionParams');
  if (!regionLocation) {
    regionLocation = {
      regionValue: 0,
      regionUrl: 'toan-quoc',
      regionName: 'Toàn quốc',
      subRegionValue: 0,
      subRegionUrl: '',
      subRegionName: 'Tất cả',
    };
  } else {
    regionLocation = JSON.parse(regionLocation);
  }
  return dataLayerPush({
    event: 'page_metadata',
    page_type: pageType || 'pty_homepage',
    // experiment: `${config.experiment.newhome.id}.1`,
    category_id: 1000,
    region_id: regionLocation.regionValue,
    region_name: regionLocation.regionName,
  });
}

export function pushPageMetadataIsLogin(auth) {
  const fingerPrint = Cookies.get('ctfp');
  const cdUserDimension = objectMapper(auth, customDimensionUserMapping);
  dataLayerPush({
    event: 'cd_user_id',
    event_category: 'datalayer',
    event_action: 'push',
    event_label: 'cd_user_id',
    ...cdUserDimension,
    finger_print: fingerPrint || 'none',
  });
  return dataLayerPush({
    event: 'cd_identifier_category',
    identifier_category: auth.authenticated ? 'logged_in' : 'non-logged_in',
  });
}

export default gtmTracking;
