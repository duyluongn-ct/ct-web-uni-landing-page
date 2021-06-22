import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { loadContainers } from 'ct-web-gtm';
import { Provider } from 'react-redux';
import App from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '~app/store';
import normalize from '~assets/styles/normalize';
import { config } from '~app/config';
import getInitProps from '~app/utils/initProps';
import '~assets/vis.css';
import { pushPageMetadata } from '~app/utils/gtmTracking';
import { getChapyConfig } from '~app/modules/config';
import { loadAdFeature } from '~app/components/GridAds/AdFeature/action';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    font-family: Helvetica, Arial, sans-serif;
    /* font-size: 62.5%; */
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background-color: #F4F4F4;
    -webkit-overflow-scrolling: touch;
    -webkit-font-smoothing: antialiased;
  }
  header, footer {
    display: ${({ app }) => (app ? 'none' : ' block')}
  }
  .desc-bottom {
    display: ${({ app }) => (app ? 'none' : ' block')}
  }
`;

export class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {
      req,
      store: { dispatch },
    } = ctx;
    const isServer = !!ctx.req;
    const appProps = getInitProps(ctx);
    ctx.isMobile = appProps.isMobile;
    // ctx.isClient = !isServer;
    // ctx.query = appProps.query;
    // ctx.location = appProps.location;
    // ctx.config = config;

    if (isServer && req) {
      await dispatch(loadAdFeature());
      await dispatch(getChapyConfig());
    }

    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      loadContainers(config.gtmContainerId);
      pushPageMetadata('mkt_landing_page');
    }
  }

  render() {
    const { Component, pageProps, store, router } = this.props;
    const props = {
      ...pageProps,
      store,
      router,
    };
    const { query = {} } = router;
    return (
      <Provider store={store}>
        <GlobalStyle app={query.app} />
        <Component {...props} />
      </Provider>
    );
  }
}

export default withRedux(initStore)(MyApp);
