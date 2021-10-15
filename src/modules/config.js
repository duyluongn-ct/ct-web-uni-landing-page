import fetch from 'isomorphic-fetch';
import { config } from '~app/config';

const GET_CHAPY_CONFIG = 'config/GET_CHAPY_CONFIG';
const GET_CHAPY_CONFIG_SUCCESS = 'config/GET_CHAPY_CONFIG_SUCCESS';
const GET_CHAPY_CONFIG_FAIL = 'config/GET_CHAPY_CONFIG_FAIL';

const initialState = {
  safeTips: null,
  loaded: false,
  chatEnable: false,
  rewardEnable: false,
  rewardHomepage: null,
  showRatingEnable: false,
  displayRating: {
    enable: false,
    categories: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CHAPY_CONFIG:
      return {
        ...state,
        loaded: false,
      };
    case GET_CHAPY_CONFIG_SUCCESS:
      return {
        ...state,
        appWrapperVersion: action?.result['app_wrapper_version'] || '2.0.45',
        safeTips: action.result.tips,
        chatEnable: action.result['chat.enable'],
        rewardEnable: action.result['features']['reward.enable'],
        rewardHomepage: action.result['features']['reward.homepage'],
        displayRating: {
          enable: action.result.features['display_rating.enable'] || false,
          categories: action.result.features['display_rating.enable.category'] || [],
        },
        loaded: true,
      };
    case GET_CHAPY_CONFIG_FAIL:
      return {
        ...state,
        loaded: false,
      };

    default:
      return state;
  }
}

export function getChapyConfig() {
  return (dispatch) => {
    dispatch({ type: GET_CHAPY_CONFIG });

    return fetch(`${config.gatewayUrl}/v1/public/chapy-pro/conf`)
      .then((data) => data.json())
      .then((result) => {
        dispatch({
          type: GET_CHAPY_CONFIG_SUCCESS,
          result,
        });
        return Promise.resolve(result);
      })
      .catch(() => {
        dispatch({
          type: GET_CHAPY_CONFIG_FAIL,
        });
        return Promise.resolve([]);
      });
  };
}
