import fetch from 'isomorphic-fetch';
import { config } from '~app/config';

const GET_RECOMMENDATIONS = 'ads/GET_RECOMMENDATIONS';
const GET_RECOMMENDATIONS_SUCCESS = 'ads/GET_RECOMMENDATIONS_SUCCESS';
const GET_RECOMMENDATIONS_DONE = 'ads/GET_RECOMMENDATIONS_DONE';
const GET_RECOMMENDATIONS_FAIL = 'ads/GET_RECOMMENDATIONS_FAIL';

const initialState = {
  ads: [],
  loaded: false,
  done: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_RECOMMENDATIONS:
      return {
        ...state,
        loaded: false,
      };
    case GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        ads: [...state.ads, ...action.result.data],
        loaded: true,
      };
    case GET_RECOMMENDATIONS_DONE:
      return {
        ...state,
        done: true,
      };
    case GET_RECOMMENDATIONS_FAIL:
      return {
        ...state,
        loaded: false,
      };

    default:
      return state;
  }
}

export function getRecommendations(fingerPrint, page) {
  return (dispatch) => {
    dispatch({ type: GET_RECOMMENDATIONS });
    return fetch(
      `${config.gatewayUrl}/v1/public/recommender/homepage?fingerprint=${fingerPrint}&page=${page}`
    )
      .then((data) => data.json())
      .then((result) => {
        if (result.data.length < 20) {
          dispatch({
            type: GET_RECOMMENDATIONS_DONE,
          });
        }
        dispatch({
          type: GET_RECOMMENDATIONS_SUCCESS,
          result,
        });
        return Promise.resolve(result);
      })
      .catch(() => {
        dispatch({
          type: GET_RECOMMENDATIONS_FAIL,
        });
        return Promise.resolve([]);
      });
  };
}
