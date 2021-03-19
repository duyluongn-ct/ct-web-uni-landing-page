import React from 'react';
import PropTypes from 'prop-types';

import FilterItem from './FilterItem';
import Style from './Styles.scss';

const FilterListing = ({
  list = [],
  subList = [],
  onSelectItem,
  onSelectSubItem,
  isSubSelectOpen = false,
  showIcon = false,
  route = false,
  buildUrl,
}) => {
  list = isSubSelectOpen ? subList : list;
  const onSelect = isSubSelectOpen ? onSelectSubItem : onSelectItem;
  return (
    <div className={Style.bodyCustom}>
      <div className={Style.body}>
        <ul itemScope itemType="http://schema.org/ItemList">
          {list.map((item, index, arr) => (
            <FilterItem
              url={route ? buildUrl(item, isSubSelectOpen) : null}
              key={`filter-${item.id}-${item.param_type}`}
              item={item}
              onSelect={onSelect}
              isLastItem={index === arr.length - 1}
              isMobileDevice={false}
              showIcon={showIcon}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

FilterListing.propTypes = {
  list: PropTypes.instanceOf(Array),
  subList: PropTypes.instanceOf(Array),
  onSelectItem: PropTypes.func,
  onSelectSubItem: PropTypes.func,
  buildUrl: PropTypes.func,
  isSubSelectOpen: PropTypes.bool,
  showIcon: PropTypes.bool,
  route: PropTypes.bool,
};

FilterListing.defaultProps = {
  list: [],
  subList: [],
  route: false,
  isSubSelectOpen: false,
  showIcon: false,
  onSelectItem: () => {},
  onSelectSubItem: () => {},
  buildUrl: () => {},
};

export default React.memo(FilterListing);
