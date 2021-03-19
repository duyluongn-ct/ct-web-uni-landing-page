import React, { useEffect, useState } from 'react';
import Cookies from 'cookies-js';
import styled from 'styled-components';
import { mediaBreakPointDown, mediaBreakPointUp } from '~app//utils/breakpoint';
import { config } from '~app/config';
import { numberWithCommas } from '~app/utils';
import { DEFAULT_LOCATION, HASH_TAG_SELECT_REGION } from './constants';

const Wrapper = styled.div`
  background: #ffffff;
  padding: 12px 0 0 0;

  ${mediaBreakPointDown(
    'md',
    `
    padding: 12px 0 4px 0;
    margin-left: -12px;
  `
  )};

  .i-next {
    top: 40% !important;
  }

  .i-prev {
    top: 40% !important;
  }

  &:hover {
    .next,
    .prev {
      transform: scale(1.5) !important;
      transition: all 0.2s ease-in-out;
    }
  }
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
    margin: 0 0 0 24px;
    `
  )};
`;

const Item = styled.li`
  height: 92px;
  outline: none;
  position: relative;
  list-style: none;
  cursor: pointer;
  flex: 1 1 25%;
  border-right: 1px solid #f4f4f4;

  &:nth-child(4n) {
    border-right: 1px solid transparent;
    &:hover {
      border-right: 1px solid #f4f4f4;
    }
  }

  &:hover {
    ${mediaBreakPointUp(
      'md',
      `
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
      .dropdown-content {
        display: block;
      }
    `
    )}
  }

  ${mediaBreakPointDown(
    'ltmd',
    `
    height: 125px;
    border: none !important;
  `
  )}

  ${mediaBreakPointDown(
    'ip5',
    `
    width: 50px;
  `
  )}
`;

const CategoryText = styled.span`
  color: #222;
  line-height: 1.33;
  font-size: 18px;
  margin-bottom: 4px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;

  ${mediaBreakPointDown(
    'ltmd',
    `
    font-size: 14px;
    margin-top: 8px;
    margin-bottom: 2px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    `
  )};
  ${mediaBreakPointDown(
    'ip5',
    `
    width: 85px;
    font-size: 13px;
    `
  )};
`;

const CategorySubText = styled.span`
  color: #9b9b9b;
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;

  b {
    font-size: 12px;
  }
  ${mediaBreakPointDown('ltmd', `display: none`)}
`;

const WrapperCat = styled.div`
  display: flex;
  border-top: 1px solid #f4f4f4;

  ${mediaBreakPointDown(
    'ltmd',
    `
    border: none;
    padding: 0 0 0 12px;
  `
  )}
`;

const CategoryImg = styled.img`
  display: flex;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  flex-basis: 30%;

  ${mediaBreakPointDown('ltmd', `width: 100%`)}
  outline: none;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;

  ${mediaBreakPointDown(
    'ltmd',
    `
    width: 68px;
    height: 68px;
  `
  )}
`;

const CategoryImgNew = styled.img`
  width: 30px;
  height: 20px;
  position: absolute;
  top: 15px;
  left: 5px;
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
  }

  &:hover {
    background-color: #f4f4f4;

    ${mediaBreakPointDown(
      'ltmd',
      `
      background-color: initial;
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

const DropdownContent = styled.div.attrs({ className: 'dropdown-content' })`
  display: none;
  position: absolute;
  top: 92px;
  background-color: #fff;
  width: calc(100% + 1px);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const DropdownItem = styled.a.attrs({ className: 'dropdown-item text-text' })`
  padding: 12px 16px;
  border-top: 1px solid #f4f4f4;
  font-size: 14px;
  height: 45px;
  -webkit-text-decoration: none;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const Categories = ({
  // region,
  total = { totalSK: 0, totalUH: 0, totalProject: 0 },
  categories = {},
  onClick,
}) => {
  const [categoriesState, setCategoriesState] = useState([
    {
      index: 'mua-ban-bat-dong-san',
      text: 'Mua bán',
      isNew: false,
      image: 'https://static.chotot.com/storage/default/pty/cat-1.svg',
      link: `${config.propertyURL}/toan-quoc/mua-ban-bat-dong-san`,
      total: 0,
      subCat: [],
    },
    {
      index: 'thue-bat-dong-san',
      text: 'Cho thuê',
      isNew: false,
      image: 'https://static.chotot.com/storage/default/pty/cat-2.svg',
      link: `${config.propertyURL}/toan-quoc/thue-bat-dong-san`,
      total: 0,
      subCat: [],
    },
    {
      index: 'du-an',
      text: 'Dự án',
      isNew: false,
      image: 'https://static.chotot.com/storage/default/pty/cat-3.svg',
      link: `${config.propertyURL}/toan-quoc/du-an`,
      total: 0,
      subCat: [],
    },
    {
      index: 'tham-hao-gia',
      text: 'Tham khảo giá',
      isNew: true,
      image: 'https://static.chotot.com/storage/default/pty/cat-4.svg',
      link: `${config.propertyURL}/toan-quoc/tham-hao-gia`,
      total: 0,
      subText: 'Cập nhật giá thị trường BĐS',
      subCat: [],
    },
  ]);

  useEffect(() => {
    const { entities = {} } = categories;

    let regionLocation = Cookies.get('regionParams');
    if (!regionLocation) {
      regionLocation = {
        regionValue: 0,
        regionUrl: 'toan-quoc',
        regionName: 'Toàn quốc',
        subRegionValue: 0,
        subRegionUrl: '',
        subRegionName: '',
        wardValue: 0,
        wardName: '',
        wardUrl: '',
      };
    } else {
      regionLocation = JSON.parse(regionLocation);
    }

    if (Object.keys(entities).length > 0) {
      const catState = categoriesState.map((item) => {
        const regionString = `${regionLocation.regionUrl}${
          regionLocation.subRegionUrl ? '/' + regionLocation.subRegionUrl : ''
        }${regionLocation.wardUrl ? '/' + regionLocation.wardUrl : ''}`;
        if (item.index !== 'du-an') {
          item.link = item.link.replace(DEFAULT_LOCATION, regionString);
        }
        item.link = item.link.replace(HASH_TAG_SELECT_REGION, '');

        const { totalSK, totalUH, totalProject } = total;
        if (item.index === 'mua-ban-bat-dong-san') {
          item.total = totalSK;
        } else if (item.index === 'thue-bat-dong-san') {
          item.total = totalUH;
        } else if (item.index === 'du-an') {
          item.total = totalProject;
        }

        if (item.index === 'mua-ban-bat-dong-san' || item.index === 'thue-bat-dong-san') {
          const subCat = [];
          // eslint-disable-next-line array-callback-return
          Object.keys(entities[item.index]['subCategories'].entities).map((key) => {
            const subItem = entities[item.index]['subCategories'].entities[key];
            const subItemDetail = {
              name: subItem.name.replace('Thuê ', ''),
              link: `${config.propertyURL}/${regionString}/${subItem.name_url}`,
            };
            subCat.push(subItemDetail);
          });

          item.subCat = subCat;
        }

        return {
          ...item,
        };
      });
      setCategoriesState(catState);
    }
  }, [categories, total]);

  return (
    <Wrapper>
      <Title>Khám phá danh mục Bất động sản</Title>
      <WrapperCat>
        {categoriesState.map((item, index) => {
          let title = 'tin đăng mua bán';
          if (item.index === 'du-an') {
            title = 'dự án';
          } else if (item.index === 'tham-khao-gia') {
            title = '';
          } else if (item.index === 'thue-bat-dong-san') {
            title = 'tin đăng cho thuê';
          }
          return (
            <Item key={'cat-' + index.toString()}>
              <A aria-label={item.text} onClick={() => onClick(item)} href={item.link}>
                {/* <Overlay> */}
                {item.isNew ? (
                  <CategoryImgNew src="https://static.chotot.com/storage/default/pty/new-cat.svg" />
                ) : null}
                <CategoryImg src={item.image} />
                <div className="flex flex-col flex-auto flex-text">
                  <CategoryText>{item.text}</CategoryText>
                  <CategorySubText>
                    {item.subText ? item.subText : null}
                    {item.total > 0 ? (
                      <span>
                        <b>{numberWithCommas(item.total)}</b> {title}
                      </span>
                    ) : null}
                  </CategorySubText>
                </div>
                {/* </Overlay> */}
              </A>
              <DropdownContent>
                {item.subCat.map((itemSub, indexSub) => {
                  return (
                    <DropdownItem
                      key={'child-' + item.index + '-' + indexSub.toString()}
                      href={itemSub.link}
                    >
                      {itemSub.name}
                    </DropdownItem>
                  );
                })}
              </DropdownContent>
            </Item>
          );
        })}
      </WrapperCat>
    </Wrapper>
  );
};

export default Categories;
