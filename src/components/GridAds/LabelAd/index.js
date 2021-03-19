import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FeaturesAd = ({ labelInfo, commonClass }) => {
  const styles = {
    backgroundColor: labelInfo['background-color'],
    borderColor: labelInfo['border-color'],
    color: labelInfo.color,
  };
  return (
    <div style={styles} className={commonClass}>
      {labelInfo.text}
    </div>
  );
};

FeaturesAd.propTypes = {
  labelInfo: PropTypes.shape({
    'background-color': PropTypes.string,
    'border-color': PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  commonClass: PropTypes.string.isRequired,
};

export default memo(FeaturesAd);
