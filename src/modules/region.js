// region
const GET_REGIONS = 'regions/GET_REGIONS';
const GET_REGIONS_SUCCESS = 'regions/GET_REGIONS_SUCCESS';
const GET_REGIONS_FAIL = 'regions/GET_REGIONS_FAIL';

const DEFAULT_REGION = {
  address_code: '0',
  suffix: '0',
  blocket_area_id: null,
  blocket_region_id: null,
  created_at: null,
  id: '0',
  is_active: true,
  is_deleted: false,
  name: 'Toàn quốc',
  name_city: null,
  name_district: null,
  parent: null,
  type: 'Province',
  updated_at: null,
  name_url: 'toan-quoc',
  displayText: 'Toàn quốc',
  url: 'toan-quoc',
};

const initialState = {
  defaultRegions: DEFAULT_REGION,
  allRegions: [],
  topRegions: [],
  otherRegions: [],
  searchRegions: {},
  cacheAreas: {},
  areas: [],
  wards: [],
  activeRegion: DEFAULT_REGION,
  error: null,
  loaded: false,
  regionsFollowUrl: {},
  regionsFollowId: {},
  orderRegionList: {},
  selectedAreas: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_REGIONS:
      return {
        ...state,
        loaded: false,
      };
    case GET_REGIONS_SUCCESS:
      return {
        ...state,
        regionsFollowUrl: action.result.regionFollowUrl.entities.regions,
        regionsFollowId: action.result.regionFollowId.entities.regions,
        orderRegionList: action.result.regionFollowId.result,
        loaded: true,
      };
    case GET_REGIONS_FAIL:
      return {
        ...state,
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
}
