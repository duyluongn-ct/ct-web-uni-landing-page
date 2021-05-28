import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import Cookies from 'cookies-js';

import { RemoteComponent, createRequires } from 'remote-component';
import { resolve } from 'remote-component.config.js';
import Auth from 'ct-auth';
import { config, env } from '~app/config';
import { pushPageMetadataIsLogin } from '~app/utils/gtmTracking';
import { loadSavedAd } from '~app/components/GridAds/SaveAd/action';

const CustomErrorPage = dynamic(() => import('~app/pages/_error'));

const requires = createRequires(resolve);
const urlRemote = config.appWrapper.header;
const urlRemoteFooter = config.appWrapper.footer;
const urlRemotePlaceHolder = config.appWrapper.placeholder;

const Main = styled.main`
  min-height: calc(100vh - 270px);
  background-color: ${({ theme }) => (theme ? theme : '')};
`;

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
        const { isMobile } = context;
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
        if (cache.has('placeholder')) {
          console.log('\n=====>>>>> CACHE PlaceHolder');
          myModule = cache.get('placeholder');
        } else {
          myModule = await fetcher(urlRemotePlaceHolder);
          cache.set('placeholder', myModule);
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

    render() {
      const { router, store, remotePlaceHolderData, err, blocks } = this.props;
      const { campaign } = store.getState();

      if (err) {
        return <CustomErrorPage statusCode={err.statusCode} />;
      }

      const site = {
        siteName: campaign.blocks.siteName || 'c2c',
        dropDownSearch: true,
        href: `${config.propertyURL}`,
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
        <Auth env={env} successCallBack={this.successCallBack} errorCallBack={this.errorCallBack}>
          {({ auth: { user, shop } }) => (
            <>
              <RemoteComponent
                url={urlRemote}
                placeholder={remotePlaceHolderData}
                requires={requires}
                store={store}
                location={router}
                site={site}
                user={user}
                shop={shop}
                env={env}
              />
              <Main theme={blocks?.theme}>
                <Child {...this.props} />
              </Main>
              <RemoteComponent
                url={urlRemoteFooter}
                requires={requires}
                location={router}
                site={site}
                user={user}
                shop={shop}
                env={env}
              />
            </>
          )}
        </Auth>
      );
    }
  }

  return WrappedComponent;
}

export default withLayout;
