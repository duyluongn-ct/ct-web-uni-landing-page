/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import styled from 'styled-components';
import WrapperScroll from '~app/components/WrapperScroll/WrapperScroll';
import { mediaBreakPointDown } from '~app/utils/breakpoint';
import Style from '~app/pages/styles.scss';

const CatSelectList = styled.div`
  display: block;
  margin-top: 8px;
  margin-bottom: 12px;

  ${mediaBreakPointDown(
    'ltmd',
    `
      margin-top: 0px;
    `
  )};

  .row-cat {
    display: flex;
    padding: 12px 12px;

    .row-cat-item {
      white-space: nowrap;
      border: solid 1px #f4f4f4;
      border-radius: 16px;
      margin: 0 8px 0 0;
      padding: 8px 14px;
      background-color: #f4f4f4;
      text-align: center;
      height: 32px;
      cursor: pointer;

      ${mediaBreakPointDown(
        'md',
        `
          min-width: 160px;
        `
      )};

      &:hover {
        border: solid 1px #fe9900;
        background-color: #ffefd6;
        span {
          color: #fe9900;
        }
      }

      &.active {
        border: solid 1px #fe9900;
        background-color: #ffefd6;
        span {
          color: #fe9900;
        }
      }

      span {
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
      }
    }
  }
`;

export const CatSelect = ({ cats, params, handleClickCatSelect }) => {
  const { categoryObj = {} } = params;
  const [active, setActive] = useState(categoryObj.value || 1);
  const handleClick = (cat) => {
    setActive(parseInt(cat.id, 10));
    handleClickCatSelect(cat);
  };

  return (
    <CatSelectList className="CatSelect">
      <WrapperScroll
        hideIcon
        total={cats.length}
        cols={cats.length}
        mobile={{ cols: 2.6 }}
        className={Style.oneRowContent}
      >
        <div className="row-cat">
          {cats.map((cat) => {
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            return (
              <div
                onClick={() => handleClick(cat)}
                className={`row-cat-item ${active === parseInt(cat.id, 10) ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
              </div>
            );
          })}
        </div>
      </WrapperScroll>
    </CatSelectList>
  );
};
