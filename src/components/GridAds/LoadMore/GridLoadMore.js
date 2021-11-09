import React, { memo } from 'react';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Wrapper = styled.button`
  overflow: hidden;
  padding: 0;
  background: white;
  width: 192px;
  cursor: pointer;
  outline: none;
  border: none;
  display: block;
  color: #38699f;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  line-height: 20px;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 1px 7px 0 rgb(0 0 0 / 30%);
    z-index: 2;
  }

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
`;

const LoadMore = ({ handleClickLoadmore }) => {
  const onClick = () => {
    handleClickLoadmore();
  };

  return (
    <Wrapper onClick={() => onClick()}>
      Xem thêm
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
    </Wrapper>
  );
};

LoadMore.defaultProps = {};

LoadMore.propTypes = {};

export default memo(LoadMore);
