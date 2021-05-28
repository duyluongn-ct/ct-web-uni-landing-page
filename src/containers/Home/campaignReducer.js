import { FETCH_CAMPAIGN, FETCH_CAMPAIGN_SUCCESS, FETCH_CAMPAIGN_FAILED } from './actions';

const initialState = {
  blocks: {
    blocks: [],
    siteName: 'c2c',
  },
  fetching: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CAMPAIGN:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_CAMPAIGN_SUCCESS:
      return {
        ...state,
        fetching: false,
        blocks: action.result,
      };
    case FETCH_CAMPAIGN_FAILED:
      return {
        ...state,
        error: action.error.message,
        fetching: false,
      };
    default:
      return state;
  }
}
