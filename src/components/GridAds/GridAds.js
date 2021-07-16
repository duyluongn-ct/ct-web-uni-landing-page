import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { config } from '~app/config';
import { buildAdViewUrl } from '~app/utils';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import WrapperScroll from '~app/components/WrapperScroll/WrapperScroll';
import AdItem from './AdItem/AdItem';
import LoadMore from './LoadMore/LoadMore';
import { getAdParams } from './service/getDataByType';
import styles from './styles.scss';
import { getAds } from '~app/containers/Home/actions';

const Wrapper = styled.div`
  background: #ffffff;
  margin-bottom: 12px;

  ${mediaBreakPointDown(
    'md',
    `
    padding: 0;
  `
  )};
`;

const LinearBackground = styled.div`
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  .inter-draw {
    background: #fff;
    width: 100%;
    height: 100px;
    position: absolute;
    top: 100px;
  }

  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 1000px 104px;
  height: 200px;
  width: 192px;
  position: relative;
  padding: 12px;
  overflow: hidden;
  border: 12px solid #fff;

  .linearImg {
    height: 100px;
    background: #fff;
    margin-bottom: 12px;
  }

  .linearTitle {
    height: 10px;
    background: #fff;
    margin-bottom: 12px;
  }
`;

const Grid = styled.div`
  display: flex;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
  margin: 2px 0px;
  padding: 0 2px;

  ${mediaBreakPointDown(
    'ltmd',
    `
    border: none;
    padding-left: 4px;
  `
  )};
`;

const ImgTitle = styled.div`
  height: 64px;
  background: url(${({ src }) => (src ? src : '')}) no-repeat;
  background-size: 100% 100%;
  // margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: bold;
  margin: 0;
  padding: 12px 12px 9px 12px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #222222;

  ${mediaBreakPointDown(
    'md',
    `
    padding: 0 0 0 12px;
    font-size: 16px;
  `
  )};
`;

const GridAds = ({
  isMobile,
  imgTitle,
  title,
  sectionId,
  link,
  urlApi,
  total,
  mappingFeaturesAdData,
  allCategoriesFollowId,
  handleTitleClick,
  handleClickAdView,
  handleClickLoadMore,
  adItemLocation,
  adListingParams,
}) => {
  const [ads, setAds] = useState([]);
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      const { ads: adsList, isDone: isDoneLoad } = await getAds(urlApi);
      setIsDone(isDoneLoad);
      setAds(adsList);
    }
    fetchMyAPI();
  }, []);

  const listAdsHtml = [];
  for (let i = 0; i < ads.length; i += 1) {
    const ad = ads[i];
    const adViewUrl = `${config.baseURL}${buildAdViewUrl(ad, allCategoriesFollowId)}`;
    const adParams = getAdParams(ad, adListingParams);

    listAdsHtml.push(
      <React.Fragment key={`${ad.type}-${ad.ad_id}-${i}-${ad.account_id}`}>
        <AdItem
          adInfo={ad}
          index={i}
          sectionId={sectionId}
          mappingFeaturesAdData={mappingFeaturesAdData}
          handleClickAdView={handleClickAdView}
          adViewUrl={adViewUrl}
          adItemLocation={adItemLocation}
          adParams={adParams}
        />
      </React.Fragment>
    );
  }

  const titleClick = () => {
    handleTitleClick(sectionId);
    // setTimeout(() => {
    //   window.location.href = link;
    // }, 300);
  };

  return isDone === true && listAdsHtml.length === 0 ? null : (
    <Wrapper>
      {imgTitle && (
        <ImgTitle onClick={() => titleClick()} src={isMobile ? imgTitle[1] : imgTitle[0]} />
      )}
      {title && title !== '' && <Title onClick={() => titleClick()}>{title}</Title>}
      <WrapperScroll total={listAdsHtml.length} cols={4.6} className={styles.oneRowContent}>
        <Grid>
          {listAdsHtml.length === 0
            ? [
                <LinearBackground key="LinearBackground1_1">
                  <div className="linearImg" />
                  <div className="linearTitle" />
                  <div className="linearTitle" />
                </LinearBackground>,
                <LinearBackground key="LinearBackground1_2">
                  <div className="linearImg" />
                  <div className="linearTitle" />
                  <div className="linearTitle" />
                </LinearBackground>,
                <LinearBackground key="LinearBackground1_3">
                  <div className="linearImg" />
                  <div className="linearTitle" />
                  <div className="linearTitle" />
                </LinearBackground>,
                <LinearBackground key="LinearBackground1_4">
                  <div className="linearImg" />
                  <div className="linearTitle" />
                  <div className="linearTitle" />
                </LinearBackground>,
                <LinearBackground key="LinearBackground1_5">
                  <div className="linearImg" />
                  <div className="linearTitle" />
                  <div className="linearTitle" />
                </LinearBackground>,
              ]
            : listAdsHtml}
        </Grid>
      </WrapperScroll>
      <LoadMore
        sectionId={sectionId}
        link={link}
        total={total}
        handleClickLoadmore={handleClickLoadMore}
      />
    </Wrapper>
  );
};

GridAds.propTypes = {
  mappingFeaturesAdData: PropTypes.shape({}),
  handleClickAdView: PropTypes.func.isRequired,
  handleClickLoadMore: PropTypes.func.isRequired,
  allCategoriesFollowId: PropTypes.shape({}).isRequired,
  adItemLocation: PropTypes.string,
  adListingParams: PropTypes.arrayOf(PropTypes.object),
};

GridAds.defaultProps = {
  mappingFeaturesAdData: {},
  adItemLocation: '',
  adListingParams: [],
};

export default memo(GridAds);
