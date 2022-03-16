import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Cookies from 'cookies-js';
import styled from 'styled-components';
import Keywords from '~app/components/Keywords';
import Description from '~app/components/Description';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import gtmTracking, { gtmTrackingWithRegion } from '~app/utils/gtmTracking';
import GridAds from '~app/components/GridAds/GridAds';
import SnackBar from '~app/components/SnackBar/SnackBar';
import { resetMessage } from '~app/components/GridAds/SaveAd/action';
import { Cats } from '~app/components/Cats/Cats';
import { config } from '~app/config';
import Iframe from '~app/components/Iframe/Iframe';

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
  // margin-bottom: 12px;
  max-width: 960px;
  position: relative;
  background: url('https://static.chotot.com/storage/default_images/landing/section.jpg') no-repeat;
  background-size: cover;
  align-items: center;
  background-color: #fff;

  p {
    text-align: center;
  }

  a {
    cursor: pointer;
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
  display: flex;
  margin: 0 auto;
  max-width: 960px;
  position: relative;
`;

// const Gradient = styled.div`
//   position: absolute;
//   height: 113px;
//   width: 100%;
//   background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
//   bottom: 0;
// `;

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

const Home = ({ isMobile, auth, blocks: dataBlock = [], seo: { seoData, keywords }, dispatch }) => {
  const [region, setRegion] = useState({
    regionValue: 0,
    regionUrl: 'toan-quoc',
    regionName: 'Toàn quốc',
    subRegionValue: 0,
    subRegionUrl: '',
    subRegionName: 'Tất cả',
  });
  const categories = useSelector((state) => state.categories);
  const { allCategoriesFollowId = {} } = categories;

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

    setRegion(regionLocation);
    // async function fetchMyAPI() {
    // }
    // if (auth?.loaded) {
    //   fetchMyAPI();
    // }
  }, [auth?.loaded]);

  const handleBannerTopClick = (sectionId) => {
    gtmTracking('mkt_landing_page', `${sectionId}`, `${dataBlock?.campaignId}_click_headbanner`);
  };

  const handleShortCutClick = (sectionId, shortcutId) => {
    gtmTracking(
      'mkt_landing_page',
      `${sectionId} | ${shortcutId}`,
      `${dataBlock?.campaignId}_click_shortcut`
    );
  };

  const handleImageClick = (sectionId, link) => {
    gtmTracking('mkt_landing_page', `${sectionId}`, `${dataBlock?.campaignId}_click_image`);
    setTimeout(() => {
      window.location.href = link;
    }, 300);
  };

  const handleTitleClick = (sectionId) => {
    gtmTracking(
      'mkt_landing_page',
      `${sectionId}`,
      `${dataBlock?.campaignId}_click_displayad_title`
    );
  };

  const handleClickAdView = (sectionId, position, adId) => {
    gtmTrackingWithRegion(
      'mkt_landing_page',
      `${sectionId} | ${position} | ${adId}`,
      `${dataBlock?.campaignId}_click_displayad`
    );
  };

  const handleClickLoadMore = (sectionId) => {
    gtmTracking(
      'mkt_landing_page',
      `${sectionId}`,
      `${dataBlock?.campaignId}_click_displayad_see_more`
    );
  };

  const handlePopularKeywordClick = (item) => {
    gtmTracking('popular_keywords', item.title.replace(/\s+/g, '_').toLowerCase());
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.meta &&
          seoData.meta.map((item, index) => <meta key={index.toString()} {...item} />)}
        <link rel="canonical" href={`${config.baseURL}/${seoData.uri || dataBlock.uri || ''}`} />
        <meta
          name="og:image"
          content={
            dataBlock.blocks && dataBlock.blocks[0]
              ? dataBlock.blocks[0].bannerImageMobile || dataBlock.blocks[0].linkImageMobile
              : 'https://static.chotot.com/storage/marketplace/transparent_logo.png'
          }
        />
      </Head>

      <WrapperHome>
        {dataBlock.blocks &&
          dataBlock.blocks.map((block) => {
            let sec = null;
            switch (block.type) {
              case 'banner':
                sec = (
                  <ContainerBanner
                    key={`sec-${block.sectionId}`}
                    onClick={() => handleBannerTopClick(block.sectionId)}
                  >
                    <img
                      width="100%"
                      alt={block.bannerImageAlt ? block.bannerImageAlt : 'Chương trình ưu đãi'}
                      src={
                        isMobile && block.bannerImageMobile
                          ? block.bannerImageMobile
                          : block.bannerImage ||
                            'https://static.chotot.com/storage/default_images/landing/banner-landing.jpg'
                      }
                    />
                  </ContainerBanner>
                );
                break;
              case 'shortcut':
                sec = (
                  <Cats
                    key={`sec-${block.id}`}
                    sectionId={block.sectionId}
                    data={block.shortcut}
                    border={false}
                    isMobile={isMobile}
                    imgTitle={
                      block.headerBg || block.headerBgMobile
                        ? [
                            block.headerBg,
                            block.headerBgMobile
                              ? block.headerBgMobile
                              : 'https://static.chotot.com/storage/default_images/landing/type-1-m.jpg',
                          ]
                        : null
                    }
                    handleShortCutClick={handleShortCutClick}
                  />
                );
                break;
              case 'linked-image':
                sec = (
                  <Section
                    key={`sec-${block.id}`}
                    onClick={() => handleImageClick(block.sectionId, block.link)}
                  >
                    <a>
                      <img
                        width="100%"
                        alt={block.bannerImageAlt ? block.bannerImageAlt : 'Chương trình ưu đãi'}
                        src={
                          isMobile && block.linkImageMobile
                            ? block.linkImageMobile
                            : block.linkImage
                        }
                      />
                    </a>
                  </Section>
                );
                break;
              case 'ad-hoc':
              case 'filtered-ads':
                sec = block.filteredAd && (
                  <GridAds
                    key={`sec-${block.id}`}
                    type="adCat1"
                    isAdHoc={block.type === 'ad-hoc'}
                    sectionId={block.sectionId}
                    isMobile={isMobile}
                    imgTitle={
                      block.headerBg || block.headerBgMobile
                        ? [
                            block.headerBg,
                            block.headerBgMobile
                              ? block.headerBgMobile
                              : 'https://static.chotot.com/storage/default_images/landing/type-1-m.jpg',
                          ]
                        : null
                    }
                    title=""
                    urlApi={block.filteredAd}
                    link={`${block.link}`}
                    region={region}
                    total={0}
                    mappingFeaturesAdData={mappingFeaturesAdData}
                    allCategoriesFollowId={allCategoriesFollowId}
                    handleTitleClick={handleTitleClick}
                    handleClickAdView={handleClickAdView}
                    handleClickLoadMore={handleClickLoadMore}
                    siteName={dataBlock.siteName}
                  />
                );
                break;

              case 'iframe':
                sec = <Iframe embedIframeUrl={block.embedIframeUrl} />;
                break;
              default:
                break;
            }
            return sec;
          })}

        {seoData.catDescription && (
          <Container className="desc-bottom">
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
          <SnackBar
            hideCallBack={() => dispatch(resetMessage())}
            autoHideDuration={3000}
            message={saveAdMessage}
          />
        )}
      </WrapperHome>
    </>
  );
};

export default Home;
