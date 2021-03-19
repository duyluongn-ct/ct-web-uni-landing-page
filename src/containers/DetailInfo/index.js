import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Keywords from '~app/components/Keywords';
import Description from '~app/components/Description';
import { mediaBreakPointDown, mediaBreakPointUp } from '~app/utils/breakpoint';
import gtmTracking, { gtmTrackingWithRegion } from '~app/utils/gtmTracking';
import {
  getAdsRecommend,
  getChartData,
  getTotalCount,
  getConfigs,
  setArea,
  setRegion,
} from '~app/containers/Home/actions';
import { BreadCrumb } from '~app/components/BreadCrumb/BreadCrumb';
import Style from '~app/pages/styles.scss';
import FilterListing from '~app/components/FilterListing';
import Modal from '~app/components/Modal';
import { Filters } from '~app/components/Filters/Filters';
import { CatSelect } from '~app/components/CatSelect/CatSelect';
import GridAds from '~app/components/GridAds/GridAds';
import { config } from '~app/config';
import SnackBar from '~app/components/SnackBar/SnackBar';
import { resetMessage } from '~app/components/GridAds/SaveAd/action';
import Chart from '~app/components/Chart/Chart';
import { buildPathUrl, buildPathUrlWithCat, buildPathUrlWithRegion } from '~app/utils';
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

const Wrapper = styled.div`
  text-align: center;
  position: relative;

  ${mediaBreakPointDown(
    'ltmd',
    `
      display: none;
    `
  )};
`;

const WrapperChartSection = styled.div`
  display: ${({ show }) => (show ? 'inline-flex' : 'none')};
  flex-wrap: wrap;
  justify-content: space-between;
  /* gap: 12px; */
`;

const WrapperFilter = styled.div`
  text-align: center;
  position: relative;
  margin-bottom: 6px;
  background-color: #fff;

  ${mediaBreakPointDown(
    'ltmd',
    `
      margin-bottom: 0px;
      `
  )};
`;

const ContainerFilter = styled.div`
  margin: 0 auto;
  max-width: 960px;

  ${mediaBreakPointUp(
    'md',
    `
        padding: 10px;
      `
  )};

  ${mediaBreakPointDown(
    'sm',
    `
    padding: 0 !important;
  `
  )};
`;

const ContainerBanner = styled.div`
  margin: 0 auto;
  max-width: 960px;

  ${mediaBreakPointUp(
    'md',
    `
        padding: 0 12px;
      `
  )};

  ${mediaBreakPointDown(
    'sm',
    `
    padding: 0 !important;
  `
  )};
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

const DetailInfo = ({ isMobile, auth, seo: { seoData, keywords }, dispatch }) => {
  const [step, setStep] = useState(1);
  const [listAreas, setListAreas] = useState([]);
  const [listRegions, setListRegions] = useState([]);
  const [isShowCity, showCity] = useState(false);
  const [isShowArea, showArea] = useState(false);
  const [isShowCat, showCat] = useState(false);
  const configs = useSelector((state) => state.marketPrice?.configs);
  const params = useSelector((state) => state.marketPrice?.params);
  const region = useSelector((state) => state.marketPrice?.region);

  const [isDone, setIsDone] = useState({
    isDoneRecomemend: false,
  });
  const [ads, setAds] = useState({
    adRecommend: [],
    charts: {
      data: [],
    },
  });
  const [charts, setCharts] = useState({
    data: [],
  });
  const [totalCount, setTotalCount] = useState({
    total: 0,
  });
  const [label, setLabel] = useState('Có thể bạn quan tâm');
  const categories = useSelector((state) => state.categories);
  const regions = useSelector((state) => state.regions);
  const { categoriesFollowId: allCategoriesFollowId } = categories;

  const saveAdMessage = useSelector((state) => state.savedAd.message);
  const mappingFeaturesAdData = useSelector((state) => state.adFeature.mapping);

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

  useEffect(() => {
    const itemRegionTemp = params?.regionObjV2 || {};
    setStep(2);
    const tempAreas = [];
    let itemListRegion = {};
    let itemArea = {};

    listRegions.forEach((reg) => {
      if (parseInt(reg.id, 10) === itemRegionTemp.regionValue) {
        // eslint-disable-next-line prefer-destructuring
        itemListRegion = reg;
      }
    });

    if (Object.keys(itemListRegion).length > 0 && Object.keys(itemRegionTemp).length > 0) {
      itemListRegion.area.forEach((areaE) => {
        // eslint-disable-next-line prefer-destructuring
        itemArea.id = Object.keys(areaE)[0];
        itemArea.name = areaE[itemArea.id];
        tempAreas.push(itemArea);
        itemArea = {};
      });

      setListAreas(tempAreas);
    }
  }, [params, listRegions]);

  useEffect(() => {
    async function fetchMyAPI() {
      const dataCharts = await getChartData(params?.categoryObj, params?.regionObjV2);
      const dataTotalCount = await getTotalCount(
        dataCharts.data[0] ? dataCharts.data[0].type_key : {},
        params?.categoryObj,
        params?.regionObjV2
      );

      setCharts(dataCharts);
      setTotalCount(dataTotalCount);
    }
    fetchMyAPI();
  }, [params]);

  useEffect(() => {
    async function fetchMyAPI() {
      const [
        {
          data: adRecommend = [],
          label: adLabel = 'Có thể bạn quan tâm',
          isDone: isDoneRecomemend = true,
        },
      ] = await Promise.all([getAdsRecommend(auth)]);

      setIsDone({
        isDoneRecomemend,
      });
      const adsList = {
        ...ads,
        adRecommend,
      };
      setAds({ ...adsList });
      setLabel(adLabel);
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
    showArea(!isShowArea);
  };

  const handleSelectSubRegion = (item) => {
    showArea(!isShowArea);
    setStep(3);
    dispatch(setArea(item));
    pushRouter(
      `/tham-khao-gia${buildPathUrlWithRegion({
        params,
        region,
        subRegion: item,
        regionsFollowId: regions.regionsFollowId,
      })}`
    );
  };

  const handleClickCatSelect = (cat) => {
    pushRouter(
      `/tham-khao-gia${buildPathUrlWithCat({
        params,
        cat,
        allCategoriesFollowId: categories.allCategoriesFollowId,
      })}`
    );
  };

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        {seoData.meta.map((item, index) => (
          <meta key={index.toString()} {...item} />
        ))}
      </Head>
      <WrapperFilter>
        <ContainerFilter>
          <Filters params={params} onClick={handleShow} isMobile={isMobile} />
        </ContainerFilter>
      </WrapperFilter>

      <Wrapper>
        <ContainerBanner>
          <BreadCrumb params={params} />
          <div className={Style.wrapper + ' ' + Style.title}>
            <h1 itemProp="name" className="title heading1">
              Tham khảo giá Bất Động Sản
            </h1>
          </div>
        </ContainerBanner>
      </Wrapper>

      <WrapperHome>
        <CatSelect
          step={step}
          params={params || {}}
          cats={configs?.categories[0]?.subcategories || []}
          handleClickCatSelect={handleClickCatSelect}
        />

        <WrapperChartSection show={charts?.data.length > 0 || 0}>
          {charts?.data.map((data) => {
            return (
              <Chart
                link={`${config.propertyURL}${buildPathUrl({ params })}`}
                data={data}
                totals={totalCount}
              />
            );
          })}
        </WrapperChartSection>

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
          showBackButton={isShowArea}
          onBack={() => {
            showArea(!isShowArea);
            handleShow(1);
          }}
          title="Chọn Quận/ Huyện"
          Body={
            <FilterListing
              list={listAreas}
              onSelectItem={(selectedItem) => handleSelectSubRegion(selectedItem)}
            />
          }
        />

        <GridAds
          key="adrecommend"
          type="adrecommend"
          isDone={isDone.isDoneRecomemend}
          title={label}
          link={`${config.baseURL}/tin-dang-danh-cho-ban`}
          region={region}
          ads={ads.adRecommend}
          total={0}
          mappingFeaturesAdData={mappingFeaturesAdData}
          allCategoriesFollowId={allCategoriesFollowId}
          handleClickAdView={handleClickAdView}
          handleClickLoadMore={handleClickLoadMore}
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
        {saveAdMessage && (
          <SnackBar hideCallBack={() => dispatch(resetMessage())} message={saveAdMessage} />
        )}
      </WrapperHome>
    </>
  );
};

export default DetailInfo;
