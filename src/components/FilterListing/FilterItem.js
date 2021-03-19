/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import Style from './Styles.scss';
import * as routes from '~server/routes';
import { ConditionalWrapper } from '~app/hocs/withConditionalWrapper';

const { Link } = routes;

const FilterItem = ({ item, isLastItem, isMobileDevice, onSelect, url, showIcon }) => {
  let lastItemStyle = '';
  if (isLastItem && !isMobileDevice) {
    lastItemStyle = ` ${Style.last} ${Style.noBorder}`;
  }
  const normalizeName = item?.name?.split('-')[0];
  const isNew = item?.feature?.is_new;
  return (
    <li
      itemProp="itemListElement"
      itemType="http://schema.org/ListItem"
      key={`item-${item.id}`}
      role="presentation"
      onClick={() => {
        onSelect(item);
      }}
      className={[Style.option, lastItemStyle].join(' ')}
    >
      <ConditionalWrapper
        condition={url ? true : false}
        wrapper={(children) => {
          return <Link route={url}>{children}</Link>;
        }}
      >
        <div className={[Style.tagLink, showIcon ? Style.tagLinkShrink : ''].join(' ')}>
          {showIcon && (
            <img
              className={Style.categoryIcon}
              src={`https://static.chotot.com/storage/categories/all-category-v3/${item.id}.png`}
              alt="cat-iton"
            />
          )}
          <span itemProp="name">{normalizeName}</span>
          {isNew && (
            <div className={Style.isNew}>
              <span>Mới</span>
            </div>
          )}
          <img
            src="https://static.chotot.com/storage/chotot-icons/svg/grey-next.svg"
            alt="next"
            height="14px"
            width="5px"
            style={{
              marginLeft: 'auto',
            }}
          />
        </div>
      </ConditionalWrapper>
    </li>
  );
};

FilterItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    feature: PropTypes.shape({
      is_new: PropTypes.bool,
    }),
    id: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isLastItem: PropTypes.bool,
  showIcon: PropTypes.bool,
  isMobileDevice: PropTypes.bool,
  url: PropTypes.string,
};

FilterItem.defaultProps = {
  isLastItem: false,
  showIcon: false,
  isMobileDevice: false,
  url: '/',
};

export default React.memo(FilterItem);
