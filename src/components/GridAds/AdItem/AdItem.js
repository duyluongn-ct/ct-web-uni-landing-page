import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { mappingAdListingFeatures, getFeatureAdByKey } from '~app/utils/adFeaturesHelpers';
import { getConfig } from '~app/utils/adItemType';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import RibbonAd from '../LabelAd';
import AdThumbnail from './AdThumbnail/AdThumbnail';
import AdBody from './AdBody/AdBody';
import SaveAd from '../SaveAd/SaveAd';
import Styles from './AdItem.scss';
import commonStyle from '../commonStyle.scss';

const Item = styled.div`
  padding: 12px;

  ${mediaBreakPointDown(
    'ltmd',
    `
    padding: 8px 8px 12px 8px;
    :hover {
      z-index: 2;
    }
  `
  )};
`;

const AdItem = ({
  adInfo,
  index,
  sectionId,
  mappingFeaturesAdData,
  adViewUrl,
  handleClickAdView,
  adItemLocation,
  adParams,
}) => {
  const handleImplementClickAdView = (event) => {
    if (event && handleClickAdView) {
      handleClickAdView(sectionId, index + 1, adInfo.ad_id);
    }
  };

  const adTypeConfig = getConfig(adInfo);
  const adFeatures = mappingAdListingFeatures(adInfo, mappingFeaturesAdData);

  const ribbonAd = getFeatureAdByKey(adFeatures, 'ribbon');
  const titleAd = getFeatureAdByKey(adFeatures, 'title');
  const priceAd = getFeatureAdByKey(adFeatures, 'price');

  let locationName = '';

  if (adItemLocation === '') {
    locationName = adInfo.region_name;
  } else {
    locationName = adItemLocation === 'ward' ? adInfo.ward_name : adInfo.area_name;
  }

  const saveAdButton = (
    <SaveAd
      size={20}
      category={adInfo.category}
      listId={adInfo.list_id}
      customClassName={Styles.saveAd}
      subject={adInfo.subject || ''}
    />
  );

  return (
    <Item className={Styles.item}>
      <div className={Styles.wrapperLink}>
        <a
          className={Styles.wrapperLinkHref}
          href={adViewUrl}
          onClick={(e) => handleImplementClickAdView(e)}
        >
          <AdThumbnail
            saveAdButton={saveAdButton}
            image={adInfo.image || ''}
            title={adInfo.subject || ''}
            numberOfImages={adInfo.number_of_images}
            adViewUrl={adViewUrl}
            ribbonAd={ribbonAd && <RibbonAd labelInfo={ribbonAd} commonClass={Styles.ribbonAd} />}
            canDeposit={adInfo['can_deposit']}
          />
          <AdBody
            giftId={adInfo.gift_id || 0}
            title={adInfo.subject || ''}
            lastUpdatedTime={adInfo.date}
            adTypeConfig={adTypeConfig}
            price={adInfo.price_string && adInfo.price_string}
            commonStyle={commonStyle}
            stickyAdType={adInfo.sticky_ad_type}
            ribbonAd={ribbonAd}
            titleAd={titleAd}
            priceAd={priceAd}
            adParams={adParams}
            adViewUrl={adViewUrl}
            locationName={locationName}
            giveaway={adInfo.giveaway}
          />
        </a>
      </div>
    </Item>
  );
};

AdItem.propTypes = {
  adInfo: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
    ])
  ).isRequired,
  mappingFeaturesAdData: PropTypes.shape({}),
  handleClickAdView: PropTypes.func.isRequired,
  adViewUrl: PropTypes.string.isRequired,
  adItemLocation: PropTypes.string,
  adParams: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

AdItem.defaultProps = {
  mappingFeaturesAdData: {},
  adItemLocation: '',
  adParams: [],
};

export default memo(AdItem);
