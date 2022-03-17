import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ChototIcons from '~assets/styles/chotot-icons.scss';
import Style from './AdBody.scss';
import FallbackImage from '../../FallbackImage/FallbackImage';
import { getDataByType } from '../../service/getDataByType';
import LabelAd from '../../LabelAd';

const AdBody = ({
  giftId,
  title,
  lastUpdatedTime,
  price,
  adTypeConfig,
  stickyAdType,
  priceAd,
  titleAd,
  ribbonAd,
  commonStyle,
  adParams,
  locationName,
  giveaway,
  // canDeposit,
}) => {
  const htmlLabelTitleAd = titleAd && (
    <LabelAd labelInfo={titleAd} commonClass={`${commonStyle.commonStyleLabelGrid}`} />
  );

  const htmlLabelPriceAd = priceAd && (
    <LabelAd labelInfo={priceAd} commonClass={`${commonStyle.commonStyleLabelPriceGrid}`} />
  );

  const _renderPrice = () => {
    if (giftId) {
      return (
        <span className={commonStyle.giftCode}>
          <span className={commonStyle.giftCodeText}>{price}</span>
        </span>
      );
    }
    if (giveaway === true) {
      return (
        <span className={commonStyle.giveaway}>
          <i className={`${ChototIcons.icon} ${commonStyle.giveaway_icon}`} />
          <span className={commonStyle.giveawayText}>Cho tặng</span>
        </span>
      );
    }
    return (
      <div className={Style.wrapperPrice}>
        {price.length > 0 && <span className={Style.price}>{price}</span>}
        {htmlLabelPriceAd}
      </div>
    );
  };

  const func = getDataByType(adTypeConfig.adType);
  const data = func({ adTypeConfig });

  const hasLabelAd = titleAd || ribbonAd || priceAd;
  const styleAdTitle = hasLabelAd
    ? `${commonStyle.adTitleGrid} ${commonStyle.adTitleBold}`
    : `${commonStyle.adTitleGrid}`;

  const {
    image: { src, width, height, round },
    displayedText,
  } = data;

  const roundStyle = round ? commonStyle.round : '';

  const breakTitle = title.length > 50;
  if (titleAd && title.length > 35) {
    title = title.substring(0, 35).concat('...');
  } else {
    title = breakTitle ? title.substring(0, 50).concat('...') : title;
  }

  return (
    <>
      <div className={Style.caption}>
        <div className={styleAdTitle}>
          {htmlLabelTitleAd}
          {title}
        </div>
        <div className={Style.conditionWrapper}>
          {adParams.length > 0 && <span className={Style.condition}>{adParams.join(' - ')}</span>}
        </div>
        {_renderPrice()}
      </div>

      <div className={Style.footer}>
        <div className={Style.adItemType}>
          <FallbackImage
            className={`${commonStyle.image} ${roundStyle}`}
            alt={displayedText}
            height={height}
            width={width}
            src={src}
            fallbackImg="https://static.chotot.com/storage/chotot-icons/svg/user.svg"
          />
        </div>
        <div className={commonStyle.deviderWrapper} />
        <div className={Style.adItemPostedTime}>
          {stickyAdType ? (
            <div className={Style.sticky}>
              <span className={Style.stickyIcon} />
              <span className={Style.stickyText}> Tin ưu tiên</span>
            </div>
          ) : (
            <span className={Style.text}>{lastUpdatedTime}</span>
          )}
        </div>
        {locationName && (
          <>
            <div className={commonStyle.deviderWrapper} />
            <span className={`${Style.adItemPostedTime} ${Style.location}`}>
              <span className={Style.text}>{locationName}</span>
            </span>
          </>
        )}
      </div>
    </>
  );
};

AdBody.defaultProps = {
  stickyAdType: '',
  ribbonAd: null,
  titleAd: null,
  priceAd: null,
  price: '',
  locationName: '',
  giveaway: false,
  adParams: [],
};

AdBody.propTypes = {
  stickyAdType: PropTypes.string,
  price: PropTypes.string,
  giftId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  lastUpdatedTime: PropTypes.string.isRequired,
  adTypeConfig: PropTypes.shape({
    adType: PropTypes.string,
  }).isRequired,
  commonStyle: PropTypes.objectOf(PropTypes.string).isRequired,
  ribbonAd: PropTypes.oneOfType([() => null, PropTypes.object]),
  titleAd: PropTypes.oneOfType([() => null, PropTypes.object]),
  priceAd: PropTypes.oneOfType([() => null, PropTypes.object]),
  locationName: PropTypes.string,
  giveaway: PropTypes.bool,
  adParams: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default memo(AdBody);
