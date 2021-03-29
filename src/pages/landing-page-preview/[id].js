import React from 'react';
import { connect } from 'react-redux';
import withLayout from '~app/hocs/withLayout';
import Preview from '~app/containers/Preview';
import { getRegions, getSeo, getPreview } from '~app/containers/Home/actions';

const PreviewPage = (props) => {
    console.log(props.blocks)
  return <Preview {...props} />;
};

PreviewPage.getInitialProps = async (ctx) => {
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

  const [seoData, campaign] = await Promise.all([
    getSeo(regionLocation),
    getPreview(query.id),
    store.dispatch(getRegions()),
  ]);

  return {
    pageName: 'marketPrice',
    seo: seoData,
    blocks: campaign.blocks,
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

export default connect(mapStateToProps, null)(withLayout(PreviewPage));
