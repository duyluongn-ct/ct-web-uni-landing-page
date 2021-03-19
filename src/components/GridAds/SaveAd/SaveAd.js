import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dataLayerPush } from 'ct-web-gtm';
import { config } from '~app/config';
import Style from './SaveAd.scss';
import { saveAd, unsaveAd } from './action';

const like = `${config.staticUrl}chotot-icons/next/save-ad.svg`;
const unlike = `${config.staticUrl}chotot-icons/next/save-ad-active.svg`;

const STATE = {
  like: {
    icon: { src: like, alt: 'like', label: 'Lưu tin' },
    action: saveAd,
  },
  unlike: {
    icon: { src: unlike, alt: 'unlike', label: 'Đã lưu' },
    action: unsaveAd,
  },
};

const SaveAd = ({
  size,
  fullView,
  listId,
  category,
  activeAds,
  customClassName,
  authenticated,
  dispatch,
  statusAd,
  subject,
  adDetail,
  // adId,
}) => {
  const state = activeAds[listId] ? 'unlike' : 'like';
  const { icon, action } = STATE[state];
  const handleOnClick = (e) => {
    e.preventDefault();
    const actionSaveAd = activeAds[listId] ? 'remove_from_save_ad' : 'save_ad';
    dataLayerPush({
      event: 'track_event',
      event_action: actionSaveAd,
      event_category: 'ad_list_recommendation',
      event_label: `${listId} | cat_${category} | ${subject}`,
    });
    if (authenticated) {
      dispatch(action(listId, statusAd));
    } else {
      window.location.href = `${config.accountBaseUrl}?continue=here`;
    }
  };

  const getItem = ({ label, alt, src }) =>
    ({
      true: () => (
        <button
          id="btn_save_ad"
          type="button"
          className={Style.btnSavedAdFull}
          onClick={(e) => handleOnClick(e)}
        >
          {label}
          &nbsp;
          <img width={size} src={src} alt={alt} />
        </button>
      ),
      false: () => (
        <button id="btn_save_ad" type="button" className={Style.btnSavedAd} onClick={handleOnClick}>
          <img width={size} src={src} alt={alt} />
        </button>
      ),
    }[fullView]);

  return (
    <div className={`${Style.saveAdWrapper} ${customClassName}`}>
      {!adDetail ? (
        getItem(icon)()
      ) : (
        <button type="button" className={Style.saveAdViewDetail} onClick={handleOnClick}>
          <p style={{ marginRight: '5px' }}>{state !== 'unlike' ? 'Lưu tin' : 'Đã lưu'} </p>
          {getItem(icon)()}
        </button>
      )}
    </div>
  );
};

SaveAd.defaultProps = {
  fullView: false,
  statusAd: null,
  size: 16,
  customClassName: '',
  adDetail: false,
};

SaveAd.propTypes = {
  size: PropTypes.number,
  fullView: PropTypes.bool,
  listId: PropTypes.number.isRequired,
  category: PropTypes.number.isRequired,
  activeAds: PropTypes.objectOf(PropTypes.bool).isRequired,
  customClassName: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  statusAd: PropTypes.string,
  // subject: PropTypes.string.isRequired,
  adDetail: PropTypes.bool,
  // adId: PropTypes.number.isRequired,
};

const mapStateToProps = ({ savedAd, auth }) => ({
  activeAds: savedAd.activeAds,
  authenticated: auth.authenticated,
});

export default connect(mapStateToProps, null)(memo(SaveAd));
