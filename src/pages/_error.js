import styled from 'styled-components';
import { config } from '~app/config';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Img404 = '404_error.png';
const ImgTimeout = 'request_timeout.png';
const ImgExpiredAd = 'ad_not_found.png';
const ImgMaintenance = 'maintenance.png';

const Wrapper = styled.div`
  text-align: center;
  background-color: #fff;
  width: 50%;
  height: 60vh;
  margin: 0 auto;
  margin-top: 20vh;
  padding: 20px;
  ${mediaBreakPointDown(
    'ltmd',
    `
  width: 100%;
  .img-cen {
    width: 100%;
  }
    `
  )};
`;

function CustomError({ statusCode }) {
  const error = {
    500: {
      defaultMsg: {
        type: '500_error',
        title: 'Đã có lỗi xảy ra!',
        text: 'Vui lòng thử lại sau.',
        button_text: 'Về trang chủ',
        image: `${config.errorImgUrl}${ImgTimeout}`,
      },
    },
    404: {
      key: '404_error',
      defaultMsg: {
        type: '404_error',
        title: 'Đã có lỗi xảy ra!',
        text: 'Vui lòng thử lại sau.',
        button_text: 'Về trang chủ',
        image: `${config.errorImgUrl}${Img404}`,
      },
    },
    408: {
      key: 'request_timeout',
      defaultMsg: {
        type: 'request_timeout',
        title: 'Không thể kết nối đến máy chủ',
        text: 'Rất tiếc, đã có lỗi xảy ra. Xin hãy thử tải lại trang.',
        button_text: 'Thử lại',
        image: `${config.errorImgUrl}${ImgTimeout}`,
      },
    },
    410: {
      key: 'ad_not_found',
      defaultMsg: {
        type: 'ad_not_found',
        title: 'Tin đăng không còn tồn tại',
        text: 'Tin đăng này đã hết hạn hoặc đã ẩn/ đã bán. Hãy thử những tin đăng khác, bạn nhé.',
        button_text: 'Về trang chủ',
        image: `${config.errorImgUrl}${ImgExpiredAd}`,
      },
    },
    503: {
      key: 'mainternance',
      defaultMsg: {
        type: 'mainternance',
        title: 'Rất tiếc, trang này đang được bảo trì',
        text: 'Chúng tôi đang cố gắng nâng cấp để trải nghiệm của bạn được tốt hơn.',
        button_text: 'Về trang chủ',
        image: `${config.errorImgUrl}${ImgMaintenance}`,
      },
    },
  };

  return (
    <Wrapper>
      <p style={{ backgroundColor: 'rgb(254, 153, 0)', padding: '10px' }}>
        <img
          height="50px"
          alt="Chợ Tốt"
          src="https://static.chotot.com/storage/marketplace/transparent_logo.png"
        />
      </p>
      <h1 style={{ color: '#222' }}>{error[statusCode].defaultMsg.title}</h1>
      <img
        className="img-cen"
        alt={error[statusCode].defaultMsg.title}
        src={error[statusCode].defaultMsg.image}
      />
      <p style={{ fontSize: '20px' }}>{error[statusCode].defaultMsg.text}</p>
    </Wrapper>
  );
}

function getInitialProps({ res, err }) {
  let statusCode;
  // If the res variable is defined it means nextjs
  // is in server side
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode;
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null;
  }
  return { statusCode };
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;
