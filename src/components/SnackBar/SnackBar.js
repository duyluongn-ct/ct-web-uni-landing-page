import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Style from './SnackBar.scss';

const SnackBar = ({ message, autoHideDuration, hideCallBack }) => {
  const timerAutoHide = setTimeout(() => {
    if (hideCallBack) {
      hideCallBack();
    }
  }, autoHideDuration);

  useEffect(
    () => () => {
      clearTimeout(timerAutoHide);
    },
    [message]
  );

  return <div className={Style.wrapper}>{message}</div>;
};

SnackBar.defaultProps = {
  message: '',
  autoHideDuration: 3000,
};

SnackBar.propTypes = {
  message: PropTypes.string,
  hideCallBack: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
};

export default memo(SnackBar);
