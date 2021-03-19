import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Flex = styled.div`
  display: flex;
`;

const Item = styled.li`
  height: 32px;
  color: #222222;
  outline: none;
  position: relative;
  list-style: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 14px;
  letter-spacing: normal;
  padding: 8px 9px 8px 10px;
  border-radius: 4px;
  border: solid 1px #cacaca;

  &.item-m {
    height: 40px;
    border: none;
    border-radius: 0;
    align-items: center;
    padding: 16px 12px 0 12px;
    text-align: left;
    display: flex;
  }

  ${mediaBreakPointDown(
    'ltmd',
    `
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
      display: flex;
      width: 100%;
    `
    )}

    p {
      flex-basis: 100%;
    }
  }

  .asteroid {
    font-size: 14px;
    color: #d0021b;
  }

  .filterItemText {
    color: #9b9b9b;
    width: 65px;
  }

  .filterItemIcon {
    float: left;
    margin-right: 5px;
    width: 12px;
    height: 16px;
    align-items: center;
    color: #222222;
    background-image: url('https://static.chotot.com/storage/chotot-icons/svg/new-location.svg');
    background-size: 12px 16px;
    background-repeat: no-repeat;

    ${mediaBreakPointDown(
      'ltmd',
      `
    background-size: 16px 20px;
    width: 16px;
    height: 20px;
    `
    )}
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

export const Filters = ({ params, onClick, isMobile }) => {
  const { regionObjV2: region = {} } = params;
  return (
    <Flex>
      {!isMobile ? (
        <Item key="item-region" onClick={() => onClick(region.subRegionValue ? 2 : 1)}>
          <span className="filterItemIcon" />
          {region.subRegionValue ? region.subRegionName : region.regionName || 'Chọn Tỉnh/Thành'}
          <span className="filterItemDropDown" />
        </Item>
      ) : (
        <Item
          className="item-m"
          key="item-region"
          onClick={() => onClick(region.subRegionValue ? 2 : 1)}
        >
          <span className="filterItemIcon" />
          <span className="filterItemText">Khu vực:</span>
          <p>
            {region.subRegionValue ? region.subRegionName + ',' : null} {region.regionName}
            <span className="filterItemDropDown" />
          </p>
        </Item>
      )}
    </Flex>
  );
};
