/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'js-cookie';
import ApiClient from '~app/utils/ApiClient';

class SavedAdClient extends ApiClient {
  constructor() {
    super();
    this.privateToken = Cookies.get('privateToken');
  }

  loadSavedAd() {
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.privateToken,
      },
      params: null,
      data: null,
      timeout: 0,
    };
    return this.get('v1/private/saved-ad', options);
  }

  saveAd(listId) {
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.privateToken,
      },
      params: null,
      data: { list_id: listId },
      timeout: 0,
    };
    return this.post('v1/private/saved-ad', options);
  }

  unsaveAd(listId) {
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.privateToken,
      },
      params: null,
      data: { list_id: listId },
      timeout: 0,
    };
    return this.del(`v1/private/saved-ad/ad/${listId}`, options);
  }
}
export default SavedAdClient;
