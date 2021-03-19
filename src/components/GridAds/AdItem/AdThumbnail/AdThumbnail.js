/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Style from './AdThumbnail.scss';

const handleErrorImage = (e) => {
  const image = e.target;
  image.style.display = 'none';
};

const AdThumbnail = ({ image, title, numberOfImages, ribbonAd, saveAdButton }) => (
  <div className={Style.thumbnailWrapper}>
    <div className={Style.thumbnailImg}>
      {image && (
        <img
          alt={title}
          onError={handleErrorImage}
          src={image.replace('http://', '//')}
          loading="lazy"
        />
      )}
      {image !== '' && numberOfImages > 1 && (
        <div className={Style.imageNum}>
          <span className={Style.text}>{numberOfImages}</span>
        </div>
      )}
      {ribbonAd && ribbonAd}
    </div>
    {saveAdButton && saveAdButton}
  </div>
);

AdThumbnail.defaultProps = {
  numberOfImages: 0,
  image: '',
  title: '',
  ribbonAd: null,
  saveAdButton: null,
};

AdThumbnail.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  numberOfImages: PropTypes.number,
  ribbonAd: PropTypes.oneOfType([() => null, PropTypes.object]),
  saveAdButton: PropTypes.element,
};

export default memo(AdThumbnail);
