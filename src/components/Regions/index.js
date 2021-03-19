import React from 'react';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app//utils/breakpoint';
import { buildPathDefaultUrl } from '~app/utils';

const Wrapper = styled.div`
  background: #ffffff;
  padding: 12px 0 0 0;
  margin-bottom: 12px;

  ${mediaBreakPointDown(
    'ltmd',
    `
    padding: 12px 0 12px 0;
    width: 100%;
  `
  )};
`;

const WrapperCat = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 4px;
  padding-bottom: 12px;
  border-top: 1px solid #f4f4f4;

  ${mediaBreakPointDown(
    'ltmd',
    `
    border: none;
    padding-bottom: 0;
  `
  )}
`;

const Title = styled.h1`
  font-size: 17px;
  margin: 0 0 12px 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #222222;

  ${mediaBreakPointDown(
    'ltmd',
    `
    font-size: 16px;
    margin-bottom: 0;
    `
  )};
`;

const Item = styled.li`
  height: 35px;
  outline: none;
  position: relative;
  list-style: none;
  cursor: pointer;
  flex: 1 1 15%;

  ${mediaBreakPointDown(
    'ltmd',
    `
    height: 40px;
    flex: 1 1 45%;
  `
  )}
`;

const CategoryText = styled.span`
  color: #222;
  line-height: 1.33;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #38699f;

  ${mediaBreakPointDown(
    'ltmd',
    `
    text-align: left;
    `
  )};
  ${mediaBreakPointDown(
    'ip5',
    `
    font-size: 13px;
    `
  )};

  i {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const A = styled.a`
  display: flex;
  background-size: cover;
  align-items: center;
  text-decoration: none;
  height: 100%;
  padding: 15px 0px 15px 8px;
  margin-right: -1px;

  .flex-text {
    margin-left: 4px;
    ${mediaBreakPointDown(
      'ltmd',
      `
      margin-left: 12px;
      width: 100%;
    `
    )}
  }

  ${mediaBreakPointDown(
    'ltmd',
    `
    align-items: center;
    flex-direction: column;
  `
  )}
`;

const Regions = ({ region = {}, regionsFollowId, onClick }) => {
  const parent = region[Object.keys(region)[0]];

  return (
    <Wrapper>
      <Title>Tham khảo giá Bất Động Sản {parent.name}</Title>
      <WrapperCat>
        {Object.keys(parent).length > 0 &&
          parent.area.map((item, index) => {
            item.link = `/tham-khao-gia${buildPathDefaultUrl({
              regionId: Object.keys(region)[0],
              areaId: Object.keys(item)[0],
              regionsFollowId,
            })}`;
            return (
              <Item key={'cat-' + index.toString()}>
                <A
                  aria-label={item[Object.keys(item)[0]]}
                  onClick={() => onClick(item)}
                  // href={item.link}
                >
                  <div className="flex flex-col flex-auto flex-text">
                    <CategoryText>
                      <i className="fa fa-angle-right" aria-hidden="true" />{' '}
                      {item[Object.keys(item)[0]]}
                    </CategoryText>
                  </div>
                  {/* </Overlay> */}
                </A>
              </Item>
            );
          })}
      </WrapperCat>
    </Wrapper>
  );
};

export default Regions;
