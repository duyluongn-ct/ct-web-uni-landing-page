import { connect } from 'react-redux';
import withLayout from '~app/hocs/withLayout';
import DetailInfo from '~app/containers/DetailInfo';
import { getNavObj, getRegions, getSeo } from '~app/containers/Home/actions';

const Detail = (props) => {
  return <DetailInfo {...props} />;
};

Detail.getInitialProps = async ({ query, req, isMobile, isServer, store, ...rest }) => {
  const { asPath = '' } = rest || {};

  let referer = '';
  let cookieLocation = 'toan-quoc';
  let regionLocation = {
    regionValue: 0,
    regionUrl: 'toan-quoc',
    regionName: 'Toàn quốc',
    subRegionValue: 0,
    subRegionUrl: '',
    subRegionName: 'Tất cả',
  };

  if (req) {
    referer = req.headers['Referrer'];
    cookieLocation = req.cookies['location'] ? req.cookies['location'] : 'toan-quoc';
    if (query.ref) {
      referer = query.ref;
    }

    regionLocation = req.cookies['regionParams'];
    if (!regionLocation) {
      regionLocation = {
        regionValue: 0,
        regionUrl: 'toan-quoc',
        regionName: 'Toàn quốc',
        subRegionValue: 0,
        subRegionUrl: '',
        subRegionName: 'Tất cả',
      };
    } else {
      regionLocation = JSON.parse(regionLocation);
    }
  }

  // const seoData = await getSeo(regionLocation);
  const [seoData] = await Promise.all([
    getSeo(regionLocation),
    store.dispatch(getNavObj(asPath)),
    store.dispatch(getRegions()),
  ]);

  return {
    pageName: 'marketPrice',
    seo: seoData,
    referer,
    isMobile,
    isServer,
    cookieLocation,
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    config: state.config,
  };
};

export default connect(mapStateToProps, null)(withLayout(Detail));
