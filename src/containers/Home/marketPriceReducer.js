import {
  GET_CONFIG,
  GET_CONFIG_FAIL,
  GET_CONFIG_SUCCESS,
  SET_AREA,
  SET_CATEGORY,
  SET_REGION,
  LOAD_DEEP_LINK_RESOVLER,
  LOAD_DEEP_LINK_RESOVLER_SUCCESS,
  LOAD_DEEP_LINK_RESOVLER_FAIL,
} from './actions';

const initialState = {
  loaded: false,
  configs: {
    regions: [],
    categories: [],
  },
  region: {},
  area: {},
  category: {},
  params: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_CONFIG:
      return {
        ...state,
        loaded: false,
        error: null,
      };
    case GET_CONFIG_SUCCESS:
      return {
        ...state,
        configs: action.result,
        loaded: true,
        error: null,
      };
    case GET_CONFIG_FAIL:
      return {
        ...state,
        loaded: false,
        error: action.error.message,
      };
    case SET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case SET_AREA:
      return {
        ...state,
        area: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case LOAD_DEEP_LINK_RESOVLER:
      return {
        ...state,
        error: null,
      };
    case LOAD_DEEP_LINK_RESOVLER_SUCCESS:
      return {
        ...state,
        params: action.result,
        error: null,
      };
    case LOAD_DEEP_LINK_RESOVLER_FAIL:
      return {
        ...state,
        error: action.error.message,
      };
    default:
      return state;
  }
}
