import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Cookies from 'cookies-js';

import { RemoteComponent, createRequires } from 'remote-component';
import { resolve } from 'remote-component.config.js';
import Auth from 'ct-auth';
import { config } from '~app/config';
import { pushPageMetadataIsLogin } from '~app/utils/gtmTracking';
import { loadSavedAd } from '~app/components/GridAds/SaveAd/action';

const CustomErrorPage = dynamic(() => import('~app/pages/_error'));

const requires = createRequires(resolve);
const { appWrapper } = config;

const originalFetch = require('isomorphic-fetch');
const fetch = require('fetch-retry')(originalFetch);
const LRU = require('lru-cache');

const LRUOption = {
  max: 500,
  maxAge: 1000 * 60 * 60,
};
const cache = new LRU(LRUOption);

function withLayout(Child) {
  class WrappedComponent extends React.Component {
    static async getInitialProps(context) {
      try {
        const { isMobile, appWrapperVersion } = context;
        const pageProp = await Child.getInitialProps(context);

        const fetcher = (url) =>
          fetch(url, {
            retries: 3,
            retryDelay: 2000,
          }).then((response) => {
            if (response.ok) {
              console.log('\n=====>>>>> GET PlaceHolder');
              return response.text();
            } else {
              const error = new Error(response.statusText);
              error.response = response;
              console.log('\n=====>>>>> ERROR PlaceHolder');
              throw error;
            }
          });

        let myModule = null;
        const remoteVersion = appWrapperVersion[appWrapper.target];
        const cacheKey = `placeholder-${remoteVersion}`;
        if (cache.has(cacheKey)) {
          myModule = cache.get(cacheKey);
        } else {
          const appWrapperBasedUrl = appWrapper.getBasedUrl(remoteVersion);
          myModule = await fetcher(`${appWrapperBasedUrl}/${appWrapper.placeholder}`);
          cache.set(cacheKey, myModule);
        }

        return {
          ...pageProp,
          remotePlaceHolderData: {
            props: { isMobile, showNavigation: true },
            data: myModule,
          },
        };
      } catch (err) {
        // Assuming that `err` has a `status` property with the HTTP status code.
        // if (context.res) {
        //   context.res.writeHead(err.response.status);
        // }
        return { err: { statusCode: err.response.status } };
      }
    }

    successCallBack = async (data) => {
      const { dispatch } = this.props;
      pushPageMetadataIsLogin({ user: { ...data }, authenticated: true });
      await dispatch(loadSavedAd());
    };

    errorCallBack = async () => {
      pushPageMetadataIsLogin({ auth: { authenticated: false } });
    };

    getBaseUrl = (siteName) => {
      switch (siteName) {
        case 'vehicle':
          return config.vehicleURL;
        case 'property':
          return config.propertyURL;
        case 'job':
          return config.jobBaseUrl;
        default:
          return config.baseURL;
      }
    };

    render() {
      const { router, store, remotePlaceHolderData, err } = this.props;

      if (err) {
        return <CustomErrorPage statusCode={err.statusCode} />;
      }

      const {
        campaign,
        config: { appWrapperVersion },
      } = store.getState();
      const appWrapperBasedUrl = appWrapper.getBasedUrl(appWrapperVersion[appWrapper.target]);

      const site = {
        siteName: campaign.blocks.siteName || 'c2c',
        dropDownSearch: false,
        href: `${this.getBaseUrl()}`,
        actions: {
          search: (text) => {
            if (typeof window !== 'undefined') {
              let listingParams = Cookies.get('listingParams');
              if (!listingParams) {
                listingParams = '{"region":"toan-quoc"}';
              }
              listingParams = JSON.parse(listingParams);
              let url = listingParams.region;
              if (listingParams.subRegion) {
                url = `${url}/${listingParams.subRegion}`;
              }
              url = `${config.baseURL}/${url}/mua-ban?q=${text}`;
              Cookies.set('searchNavigation', '1');
              window.location.href = url;
            }
          },
        },
      };

      return (
        <>
          <Auth env={config.env} beforeAuthenticate={this.beforeAuthenticate}>
            {() => <div />}
          </Auth>
          <Head>
            <link
              rel="stylesheet"
              href={`${appWrapperBasedUrl}/${appWrapper.headercss}`}
              key="headercss"
            />
          </Head>
          <RemoteComponent
            url={`${appWrapperBasedUrl}/${appWrapper.header}`}
            placeholder={remotePlaceHolderData}
            requires={requires}
            store={store}
            location={router}
            site={site}
            env={config.env}
          />
          <Child {...this.props} />
          <RemoteComponent
            url={`${appWrapperBasedUrl}/${appWrapper.footer}`}
            requires={requires}
            location={router}
            site={site}
            env={config.env}
          />
        </>
      );
    }
  }

  return WrappedComponent;
}

export default withLayout;
