/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const FallbackImage = ({ fallbackImg, alt, ...props }) => {
  const imageRef = useRef(null);
  const reloadCount = useRef(0);

  const setDefaultImage = () => {
    if (imageRef?.current && reloadCount.current < 2) {
      imageRef.current.src = fallbackImg;
      reloadCount.current = reloadCount.current + 1;
    }
  };

  return <img {...props} alt={alt} ref={imageRef} onError={setDefaultImage} />;
};

FallbackImage.propTypes = {
  fallbackImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default FallbackImage;
