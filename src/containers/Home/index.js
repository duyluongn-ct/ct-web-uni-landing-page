import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Cookies from 'cookies-js';
import styled from 'styled-components';
import Keywords from '~app/components/Keywords';
import Description from '~app/components/Description';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import gtmTracking, { gtmTrackingWithRegion } from '~app/utils/gtmTracking';
import { getAds } from '~app/containers/Home/actions';
import GridAds from '~app/components/GridAds/GridAds';
import { config } from '~app/config';
import SnackBar from '~app/components/SnackBar/SnackBar';
import { resetMessage } from '~app/components/GridAds/SaveAd/action';
import { Cats } from '~app/components/Cats/Cats';

const WrapperHome = styled.div`
  margin: 0 auto;
  max-width: 960px;
  ${mediaBreakPointDown(
    'sm',
    `
    padding: 0 !important;
  `
  )};
`;

const Section = styled.div`
  margin: 0 auto;
  padding: 12px;
  margin-bottom: 12px;
  max-width: 960px;
  position: relative;
  background: url('https://static.chotot.com/storage/default_images/landing/section.jpg') no-repeat;
  background-size: cover;
  align-items: center;
  background-color: #fff;

  p {
    text-align: center;
  }

  .text {
    font-family: Helvetica;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 14px;
    letter-spacing: normal;
    color: #9b9b9b;
  }
`;

const ContainerBanner = styled.div`
  margin: 0 auto;
  max-width: 960px;
  position: relative;
`;

const Gradient = styled.div`
  position: absolute;
  height: 113px;
  width: 100%;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
  bottom: 0;
`;

const Row = styled.div`
  &:after {
    clear: both;
  }
`;

// const Btn = styled.a`
//   height: 30px;
//   text-align: center;
//   text-transform: uppercase;
//   background: #fc9807;
//   color: #fff;
//   font-size: 14px;
//   font-stretch: normal;
//   font-style: normal;
//   font-weight: bold;
//   line-height: 0.33;
//   letter-spacing: normal;
//   border-radius: 4px;
//   padding: 9.5px 30px;
//   text-decoration: none;
//   border: none;
// `;

const Container = styled.div`
  padding: 32px 12px 12px 12px;
  /* background-color: #fff; */
`;

const Home = ({ isMobile, auth, blocks = [], seo: { seoData, keywords }, dispatch }) => {
  const [isDone, setIsDone] = useState({
    isDoneAdCat1: false,
    isDoneAdCat2: false,
    isDoneAdCat3: false,
  });
  const [ads, setAds] = useState({
    adCat1: [],
    adCat2: [],
    adCat3: [],
  });
  const [region, setRegion] = useState({
    regionValue: 0,
    regionUrl: 'toan-quoc',
    regionName: 'Toàn quốc',
    subRegionValue: 0,
    subRegionUrl: '',
    subRegionName: 'Tất cả',
  });
  const categories = useSelector((state) => state.categories);
  const { categoriesFollowId: allCategoriesFollowId } = categories;

  const saveAdMessage = useSelector((state) => state.savedAd.message);
  const mappingFeaturesAdData = useSelector((state) => state.adFeature.mapping);

  useEffect(() => {
    let regionLocation = Cookies.get('regionParams');
    if (!regionLocation) {
      regionLocation = {
        regionValue: 0,
        regionUrl: 'toan-quoc',
        regionName: 'Toàn quốc',
        subRegionValue: 0,
        subRegionUrl: '',
        subRegionName: '',
        wardValue: 0,
        wardName: '',
        wardUrl: '',
      };
    } else {
      regionLocation = JSON.parse(regionLocation);
    }

    async function fetchMyAPI() {
      const [
        { ads: adCat1 = [], isDone: isDoneAdCat1 = true },
        { ads: adCat2 = [], isDone: isDoneAdCat2 = true },
        { ads: adCat3 = [], isDone: isDoneAdCat3 = true },
      ] = await Promise.all([getAds({ cg: 1040 }), getAds({ cg: 1010 }), getAds({ cg: 1020 })]);

      setIsDone({
        isDoneAdCat1,
        isDoneAdCat2,
        isDoneAdCat3,
      });
      const adsList = {
        ...ads,
        adCat1,
        adCat2,
        adCat3,
      };
      setAds({ ...adsList });
      setRegion(regionLocation);
    }
    if (auth?.loaded) {
      fetchMyAPI();
    }
  }, [auth?.loaded]);

  const handlePopularKeywordClick = (item) => {
    gtmTracking('popular_keywords', item.title.replace(/\s+/g, '_').toLowerCase());
  };

  const handleClickAdView = (labelT, categoryT, action = 'click_ad') => {
    gtmTrackingWithRegion(categoryT, labelT, action);
  };

  const handleClickLoadMore = (labelT, categoryT) => {
    gtmTrackingWithRegion(categoryT, labelT, 'click_see_more');
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.meta.map((item, index) => (
          <meta key={index.toString()} {...item} />
        ))}
      </Head>

      <WrapperHome>
        {blocks.map((block) => {
          let sec = null;
          switch (block.type) {
            case 'banner':
              sec = (
                <ContainerBanner key={`sec-${block.id}`}>
                  <img
                    width="100%"
                    alt="Chương trình ưu đãi"
                    src="https://static.chotot.com/storage/default_images/landing/banner-landing.jpg"
                  />
                  <Gradient />
                </ContainerBanner>
              );
              break;
            case 'shortcut':
              sec = (
                <Cats
                  key={`sec-${block.id}`}
                  data={block.shortcut}
                  border={false}
                  isMobile={isMobile}
                />
              );
              break;
            case 'linked-image':
              sec = (
                <Section key={`sec-${block.id}`}>
                  <a href={`${block.link}`}>
                    <img width="100%" alt="Chương trình ưu đãi" src={block.linkImage} />
                  </a>
                </Section>
              );
              break;
            case 'filtered-ads':
              sec = (
                <GridAds
                  key={`sec-${block.id}`}
                  type="adCat1"
                  isMobile={isMobile}
                  isDone={isDone.isDoneAdCat1}
                  imgTitle={[
                    block.headerBg,
                    block.headerBgMobile
                      ? block.headerBgMobile
                      : 'https://static.chotot.com/storage/default_images/landing/type-1-m.jpg',
                  ]}
                  title=""
                  urlApi={block.filterAd}
                  link={`${config.propertyURL}/${region.regionUrl}/mua-ban-dat`}
                  region={region}
                  ads={ads.adCat1}
                  total={0}
                  mappingFeaturesAdData={mappingFeaturesAdData}
                  allCategoriesFollowId={allCategoriesFollowId}
                  handleClickAdView={handleClickAdView}
                  handleClickLoadMore={handleClickLoadMore}
                />
              );
              break;

            default:
              break;
          }
          return sec;
        })}

        {seoData.catDescription && (
          <Container>
            {seoData.catDescription && <Description content={seoData.catDescription} />}
            {keywords.length > 0 && (
              <Row className="hidden-xs">
                <Keywords
                  onClick={(item) => handlePopularKeywordClick(item)}
                  dataSource={keywords}
                />
              </Row>
            )}
          </Container>
        )}
        {saveAdMessage && (
          <SnackBar hideCallBack={() => dispatch(resetMessage())} message={saveAdMessage} />
        )}
      </WrapperHome>
    </>
  );
};

export default Home;
