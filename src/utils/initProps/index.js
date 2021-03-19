import url from 'url';
import { checkIsMobile } from '~app/utils';

const serverProps = (context) => {
  const { req } = context;
  const userAgent = req.headers['user-agent'];
  const isMobile = checkIsMobile(userAgent);
  const urlObject = url.parse(req.originalUrl);
  return {
    isMobile,
    location: {
      pathname: urlObject.pathname,
    },
  };
};
const clientProps = (context) => {
  const { asPath } = context;
  const { userAgent } = navigator;
  const isMobile = checkIsMobile(userAgent);
  return {
    isMobile,
    location: {
      pathname: asPath.split('?')[0],
    },
  };
};
export default (context) => {
  const { isServer } = context;
  const initAppProps = isServer ? serverProps : clientProps;
  return initAppProps(context);
};
