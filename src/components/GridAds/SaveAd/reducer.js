import {
  LOAD_SAVED_AD,
  LOAD_SAVED_AD_SUCCESS,
  LOAD_SAVED_AD_FAIL,
  UNSAVE_AD_SUCCESS,
  SAVE_AD_SUCCESS,
  SAVE_AD_ACTION,
  UNSAVE_AD_ACTION,
  RESET_MESSAGE,
} from './action';

const INITIAL_STATE = {
  success: false,
  activeAds: {},
  message: '',
  count: 0,
  data: [],
  limitAds: 50,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOAD_SAVED_AD:
      return { ...state };

    case LOAD_SAVED_AD_SUCCESS: {
      const { ads = [], limit } = action.result;
      const activeAds = {};

      ads.forEach((item) => {
        activeAds[item.list_id] = true;
      });

      return {
        ...state,
        activeAds,
        success: true,
        data: ads,
        count: ads.length,
        limitAds: limit,
      };
    }

    case LOAD_SAVED_AD_FAIL:
      return {
        ...state,
        activeAds: {},
        success: false,
        error: action.error,
      };

    case SAVE_AD_SUCCESS: {
      const { status } = action.result;
      const data = SAVE_AD_ACTION[status]({ action, state });
      return {
        ...state,
        ...data,
      };
    }

    case UNSAVE_AD_SUCCESS: {
      const { status } = action.result;
      const data = UNSAVE_AD_ACTION[status]({ action, state });
      return {
        ...state,
        ...data,
      };
    }

    case RESET_MESSAGE: {
      return {
        ...state,
        message: '',
      };
    }

    default:
      return state;
  }
}
