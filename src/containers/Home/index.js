import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Cookies from 'cookies-js';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Regions from '~app/components/Regions';
import Keywords from '~app/components/Keywords';
import Description from '~app/components/Description';
import { mediaBreakPointDown, mediaBreakPointUp } from '~app/utils/breakpoint';
import gtmTracking from '~app/utils/gtmTracking';
import { isClient, getParentCategory } from '~app/utils';
import { config } from '~app/config';
import { getConfigs, setArea, setCategory, setRegion } from '~app/containers/Home/actions';
import { BreadCrumb } from '~app/components/BreadCrumb/BreadCrumb';
import Style from '~app/pages/styles.scss';
import { Banner } from '~app/components/Banner/Banner';
import MainSection from '~app/components/MainSection';
import FilterListing from '~app/components/FilterListing';
import Modal from '~app/components/Modal';
import { pushRouter } from '~app/utils/routes';

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

const WrapperBanner = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 12px;
  background-color: #fff;
  min-height: calc(100vw * 0.362);
  ${mediaBreakPointUp(
    'ltmd',
    `
      min-height: 150px;
    `
  )};
`;

const ContainerBanner = styled.div`
  margin: 0 auto;
  max-width: 960px;

  ${mediaBreakPointUp(
    'md',
    `
        padding: 12px;
      `
  )};

  ${mediaBreakPointDown(
    'sm',
    `
    padding: 0 !important;
  `
  )};
`;

const RewardWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 60px;
  z-index: 999;

  img {
    height: 120px;

    ${mediaBreakPointDown(
      'ltmd',
      `
      height: 80px;
    `
    )};
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 40px;

  .icon {
    margin: 10px auto;
    width: 20px;
    height: 20px;
    cursor: pointer;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    border-radius: 10px;
    background-color: #111;
    color: #fff;
    box-shadow: 0px 0px 10px 2px grey;
  }
`;

const Row = styled.div`
  &:after {
    clear: both;
  }
`;

const Container = styled.div`
  padding: 32px 12px 12px 12px;
  /* background-color: #fff; */
`;

const BannerDesktopWrapper = styled.div`
  display: block;
`;

const Home = ({
  // isMobile,
  seo: { seoData, keywords },
  dispatch,
  config: { rewardEnable, rewardHomepage },
}) => {
  const [rewardIconCookie, showRewardIconCookie] = useState(false);
  const [step, setStep] = useState(1);
  const [listAreas, setListAreas] = useState([]);
  const [listRegions, setListRegions] = useState([]);
  const [isShowCity, showCity] = useState(false);
  const [isShowArea, showArea] = useState(false);
  const [isShowCat, showCat] = useState(false);
  const configs = useSelector((state) => state.marketPrice?.configs);
  const region = useSelector((state) => state.marketPrice?.region);
  const area = useSelector((state) => state.marketPrice?.area);
  const category = useSelector((state) => state.marketPrice?.category);
  const regions = useSelector((state) => state.regions);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    (async () => {
      const res = await dispatch(getConfigs());

      const tempRegions = [];
      let itemRegion = {};
      res.result.regions.forEach((elm, index) => {
        // eslint-disable-next-line prefer-destructuring
        itemRegion.id = Object.keys(elm)[0];
        itemRegion.name = elm[Object.keys(elm)[0]].name;
        itemRegion.area = elm[Object.keys(elm)[0]].area;
        tempRegions[index] = itemRegion;
        itemRegion = {};
      });
      setListRegions(tempRegions);
    })();
  }, []);

  const handleRegionClick = (item) => {
    // gtmTracking('browse_by_highlight_category', item.text, 'click_pty_type');
    pushRouter(item.link);
  };

  const handlePopularKeywordClick = (item) => {
    gtmTracking('popular_keywords', item.title.replace(/\s+/g, '_').toLowerCase());
  };

  const handleRewardIconHide = () => {
    Cookies.set('hideRewardIcon', true);
    showRewardIconCookie(false);
  };

  const handleShow = (index) => {
    switch (index) {
      case 1:
        showCity(!isShowCity);
        break;
      case 2:
        showArea(!isShowArea);
        break;
      case 3:
        showCat(!isShowCat);
        break;

      default:
        break;
    }
  };

  const handleSelectRegion = (item) => {
    showCity(!isShowCity);
    setStep(2);
    const tempAreas = [];
    let itemArea = {};
    item.area.forEach((areaE) => {
      // eslint-disable-next-line prefer-destructuring
      itemArea.id = Object.keys(areaE)[0];
      itemArea.name = areaE[itemArea.id];
      tempAreas.push(itemArea);
      itemArea = {};
    });
    setListAreas(tempAreas);
    dispatch(setRegion(item));
  };

  const handleSelectSubRegion = (item) => {
    showArea(!isShowArea);
    setStep(3);
    dispatch(setArea(item));
  };

  const handleSelectCat = (item) => {
    showCat(!isShowCat);
    dispatch(setCategory(item));
  };

  const handleSubmit = () => {
    let catId = category.id;
    if (!catId) {
      catId = 1020;
    }
    if (region.id && area.id && catId) {
      const { regionsFollowId = {} } = regions;
      const { allCategoriesFollowId = {} } = categories;
      const regionName = regionsFollowId ? regionsFollowId[region.id].name_url : '';
      const subRegionName = regionsFollowId
        ? regionsFollowId[region.id].area[area.id].name_url
        : '';

      const parentId = getParentCategory(catId);
      const subCategory = allCategoriesFollowId.entities
        ? allCategoriesFollowId.entities[parentId].subCategories.entities[catId]
        : {};

      pushRouter(`/tham-khao-gia/${regionName}/${subRegionName}/${subCategory.name_url}`);
    }
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.meta.map((item, index) => (
          <meta key={index.toString()} {...item} />
        ))}
      </Head>

      <WrapperBanner>
        <ContainerBanner>
          <BannerDesktopWrapper>
            <BreadCrumb />
            <div className={Style.wrapper + ' ' + Style.title}>
              <h1 itemProp="name" className="title heading1">
                Tham khảo giá Bất Động Sản
              </h1>
            </div>
            <Banner />
          </BannerDesktopWrapper>
        </ContainerBanner>
      </WrapperBanner>

      <WrapperHome>
        <MainSection
          onClick={handleShow}
          onSubmit={handleSubmit}
          step={step}
          region={region}
          area={area}
          category={category}
        />
        {configs?.regions.map((regionE) => {
          return (
            <Regions
              region={regionE}
              regionsFollowId={regions?.regionsFollowId}
              onClick={handleRegionClick}
            />
          );
        })}

        <Modal
          isShow={isShowCity}
          onClose={() => handleShow(1)}
          // showBackButton={isSubSelectOpen}
          // onBack={() => setSubSelectOpen(false)}
          title="Chọn Tỉnh/ Thành"
          Body={
            <FilterListing
              list={listRegions}
              onSelectItem={(selectedItem) => handleSelectRegion(selectedItem)}
            />
          }
        />

        <Modal
          isShow={isShowArea}
          onClose={() => handleShow(2)}
          // showBackButton={isSubSelectOpen}
          // onBack={() => setSubSelectOpen(false)}
          title="Chọn Quận/ Huyện"
          Body={
            <FilterListing
              list={listAreas}
              onSelectItem={(selectedItem) => handleSelectSubRegion(selectedItem)}
            />
          }
        />

        <Modal
          isShow={isShowCat}
          onClose={() => handleShow(3)}
          // showBackButton={isSubSelectOpen}
          // onBack={() => setSubSelectOpen(false)}
          title="Chọn loại BĐS"
          Body={
            <FilterListing
              list={configs.categories[0] && configs.categories[0].subcategories}
              onSelectItem={(selectedItem) => handleSelectCat(selectedItem)}
            />
          }
        />

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
        {isClient && rewardIconCookie && rewardEnable && (
          <RewardWrapper>
            <a href={`${config.baseURL}/uu-dai/tat-ca?xtatc=INT-1-[Cho-Tot-Rewards-homepage]`}>
              <img src={rewardHomepage} alt="uu dai cho tot" />
            </a>
            <CloseButton onClick={() => handleRewardIconHide()}>
              <div className="icon">×</div>
            </CloseButton>
          </RewardWrapper>
        )}
      </WrapperHome>
    </>
  );
};

export default Home;
