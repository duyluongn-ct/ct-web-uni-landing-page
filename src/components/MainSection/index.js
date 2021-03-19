import React from 'react';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app//utils/breakpoint';

const Wrapper = styled.div`
  background: #ffffff;
  margin-bottom: 12px;
  padding-bottom: 12px;

  .div-select {
    display: flex;
    justify-content: space-between;
    ${mediaBreakPointDown(
      'ltmd',
      `
        padding: 12px 12px;
        flex-direction: column;
        width: 100%;
      `
    )};
  }

  .div-button {
    width: 100%;
    align-items: center;
    ${mediaBreakPointDown(
      'ltmd',
      `
        padding: 0 12px;
      `
    )};
  }
`;

const Item = styled.li`
  margin: 12px;
  height: 36px;
  outline: none;
  position: relative;
  list-style: none;
  cursor: pointer;
  flex: 1 1 30%;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #9b9b9b;
  padding: 8px 9px 8px 10px;
  border-radius: 4px;
  border: solid 1px #cacaca;

  background-color: ${({ active }) => (active ? '#fff' : '#f4f4f4')};

  ${mediaBreakPointDown(
    'ltmd',
    `
    margin: 6px 0;
    height: 40px;
    flex: 1 1;
  `
  )}

  &.item-button {
    border: none;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
    width: 31%;
    text-align: center;
    color: #ffffff;
    background-color: #fe9900;
    margin: 0 auto;

    ${mediaBreakPointDown(
      'ltmd',
      `
      font-size: 16px;
      width: 100%;
    `
    )}
  }

  .asteroid {
    font-size: 14px;
    color: #d0021b;
  }

  .filterItemDropDown {
    float: right;
    align-items: center;
    margin-left: 5px;
    width: 12px;
    height: 16px;
    background-image: url('https://static.chotot.com/storage/chotot-icons/svg/dynamic-dropdown.svg');
    background-size: 12px 16px;
    background-repeat: no-repeat;
  }
`;

const MainSection = ({ step, region = {}, area = {}, category = {}, onClick, onSubmit }) => {
  // const parent = region[Object.keys(region)[0]];

  return (
    <Wrapper>
      <div className="div-select">
        <Item active={step >= 1} key="item-region" onClick={() => onClick(1)}>
          {region.name ? region.name : 'Chọn Tỉnh/Thành'}
          <span className="asteroid">*</span>
          <span className="filterItemDropDown" />
        </Item>
        <Item active={step >= 2} key="item-region" onClick={() => (step >= 2 ? onClick(2) : {})}>
          {area.name ? area.name : 'Chọn Quận/Huyện'}
          <span className="asteroid">*</span>
          <span className="filterItemDropDown" />
        </Item>
        <Item active={step >= 1} key="item-region" onClick={() => onClick(3)}>
          {category.name ? category.name : 'Chọn loại BĐS'}
          <span className="filterItemDropDown" />
        </Item>
      </div>
      <div className="div-button">
        <Item className="item-button" onClick={() => onSubmit()}>
          Xem giá ngay
        </Item>
      </div>
    </Wrapper>
  );
};

export default MainSection;
