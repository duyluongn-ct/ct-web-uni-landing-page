import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { APPLE_METAS_LINKS } from '~app/utils/constants';

export default class ServerDocument extends Document {
  renderAppleMetas() {
    const { metas } = APPLE_METAS_LINKS;
    if (metas && metas.length > 0) {
      return metas.map((item, index) => <meta key={index.toString()} {...item} />);
    }
    return null;
  }

  renderAppleLinks() {
    const { links } = APPLE_METAS_LINKS;
    if (links && links.length > 0) {
      return links.map((item, index) => <link key={index.toString()} {...item} />);
    }
    return null;
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    const env = process.env.ENV || 'production';
    const baseDomain = process.env.BASE_DOMAIN || 'com';
    const gtm = process.env.GTM_CONTAINERID || 'GTM-NZKHXF7';

    return (
      <html lang="vi">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <link rel="shortcut icon" href="https://www.chotot.com/chotot-img/favicon.ico" />
          <script async src="https://static.chotot.com/storage/js/prebid-ads.js" />
          {this.renderAppleMetas()}
          {this.renderAppleLinks()}
          {styleTags}
        </Head>
        <body className="custom_class">
          {main}
          <script dangerouslySetInnerHTML={{ __html: `window.ENV = "${env}"` }} />
          <script dangerouslySetInnerHTML={{ __html: `window.BASE_DOMAIN = "${baseDomain}"` }} />
          <script dangerouslySetInnerHTML={{ __html: `window.GTM_CONTAINER = "${gtm}"` }} />
          <NextScript />
        </body>
      </html>
    );
  }
}
