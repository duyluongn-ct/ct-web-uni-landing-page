import { LOADING, SUCCESS, MAPPING_SUCCESS, FAIL } from './action';

const initialState = {
  loaded: false,
  loading: true,
  mapping: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,
        config: action.result,
        loaded: true,
        loading: false,
        error: null,
      };
    case MAPPING_SUCCESS:
      return {
        ...state,
        mapping: action.result,
        loaded: true,
        loading: false,
        error: null,
      };
    case FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error.message,
      };
    default:
      return state;
  }
}
