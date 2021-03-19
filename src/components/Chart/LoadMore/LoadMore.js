import React, { memo } from 'react';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import { numberWithCommas } from '~app/utils';

const Wrapper = styled.div`
  height: 44px;
  width: 100%;
  border-top: 1px solid #f4f4f4;
  text-align: center;
  padding: 10px 12px 12px 12px;
  margin: 0 auto;

  .noMore {
    color: #9b9b9b;
    text-align: center;
  }

  button {
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
    display: block;
    width: 100%;
    color: #38699f;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 20px;
    margin: 0 auto;

    ${mediaBreakPointDown(
      'md',
      `
      font-size: 15px;
      line-height: 20px;
    `
    )};

    svg {
      vertical-align: middle;
      margin-left: 5px;
    }
  }
`;

const LoadMore = ({ link, total }) => {
  const title = total > 0 ? `Xem ${numberWithCommas(total)} tin đăng` : 'Xem thêm';
  const onClick = () => {
    // const eventName = 'newest_for_sale_ads';
    // handleClickLoadmore(title, eventName);
    window.location.href = link;
  };

  return (
    <Wrapper>
      <button type="button" onClick={() => onClick()}>
        {title}
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">
          <g fill="none" fillRule="evenodd">
            <path
              stroke="#38699F"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1.125 3L6.75 8 1.125 13"
              transform="translate(1 1)"
            />
            <path
              stroke="#FFF"
              strokeWidth=".1"
              d="M0 0H9V16H0z"
              opacity=".01"
              transform="translate(1 1)"
            />
          </g>
        </svg>
      </button>
    </Wrapper>
  );
};

LoadMore.defaultProps = {};

LoadMore.propTypes = {};

export default memo(LoadMore);
