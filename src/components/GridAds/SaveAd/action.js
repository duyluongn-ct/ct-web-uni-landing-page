import SavedAdClient from './SavedAdClient';

export const LOAD_SAVED_AD = 'adlisting/LOAD_SAVED_AD';
export const LOAD_SAVED_AD_SUCCESS = 'adlisting/LOAD_SAVED_AD_SUCCESS';
export const LOAD_SAVED_AD_FAIL = 'adlisting/LOAD_SAVED_AD_FAIL';

export const SAVE_AD = 'adlisting/SAVE_AD';
export const SAVE_AD_SUCCESS = 'adlisting/SAVE_AD_SUCCESS';
export const SAVE_AD_FAIL = 'adlisting/SAVE_AD_FAIL ';

export const UNSAVE_AD = 'adlisting/UNSAVE_AD';
export const UNSAVE_AD_SUCCESS = 'adlisting/UNSAVE_AD_SUCCESS';
export const UNSAVE_AD_FAIL = 'adlisting/UNSAVE_AD_FAIL ';

export const RESET_MESSAGE = 'adlisting/RESET_MESSAGE ';

const savedAdClient = new SavedAdClient();

export function loadSavedAd() {
  return {
    types: [LOAD_SAVED_AD, LOAD_SAVED_AD_SUCCESS, LOAD_SAVED_AD_FAIL],
    promise: (client) => savedAdClient.with(client).loadSavedAd(),
  };
}

export function saveAd(listId) {
  return {
    types: [SAVE_AD, SAVE_AD_SUCCESS, SAVE_AD_FAIL],
    payload: {
      listId,
    },
    promise: (client) => savedAdClient.with(client).saveAd(listId),
  };
}

export function unsaveAd(listId, statusAd = null) {
  return {
    types: [UNSAVE_AD, UNSAVE_AD_SUCCESS, UNSAVE_AD_FAIL],
    payload: {
      listId,
      statusAd,
    },
    promise: (client) => savedAdClient.with(client).unsaveAd(listId),
  };
}

export const SAVE_AD_ACTION = {
  success: (res) => {
    const {
      state,
      action: {
        payload: { listId },
        result: { status, message },
      },
    } = res;
    const activeAds = {
      ...state.activeAds,
      [listId]: true,
    };

    return {
      success: status === 'success' ? true : false,
      count: state.count + 1,
      message,
      activeAds,
    };
  },

  failed: (res) => {
    const {
      error: { message },
    } = res.action.error;
    return {
      success: false,
      message,
    };
  },
};

export const UNSAVE_AD_ACTION = {
  success: (res) => {
    const {
      state,
      action: {
        payload: { listId },
        result: { status, message },
      },
    } = res;
    const activeAds = {
      ...state.activeAds,
    };

    if (activeAds[listId]) {
      delete activeAds[listId];
    }

    return {
      success: status === 'success' ? true : false,
      count: state.count - 1,
      message,
      activeAds,
    };
  },

  failed: (res) => {
    const {
      error: { message },
    } = res.action.error;
    return {
      success: false,
      message,
    };
  },
};

export function resetMessage() {
  return {
    type: RESET_MESSAGE,
  };
}
