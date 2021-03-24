import React from 'react';
import { connect } from 'react-redux';
import withLayout from '~app/hocs/withLayout';
import Home from '~app/containers/Home';
import { getRegions, getSeo, getBlocks } from '~app/containers/Home/actions';

const Index = (props) => {
  return <Home {...props} />;
};

Index.getInitialProps = async (ctx) => {
  const { query, req, isMobile, isServer, store } = ctx;
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

  const [seoData, blocks] = await Promise.all([
    getSeo(regionLocation),
    getBlocks(),
    store.dispatch(getRegions()),
  ]);

  return {
    pageName: 'marketPrice',
    seo: seoData,
    blocks,
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

export default connect(mapStateToProps, null)(withLayout(Index));
