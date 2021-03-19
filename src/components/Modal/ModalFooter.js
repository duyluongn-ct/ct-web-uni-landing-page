import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const ModalFooter = ({ onClose, footerLabel, CountParam }) => {
  const checkCountFilterType = CountParam !== 0 && `(${CountParam})`;
  return (
    <div className={Styles.footerCustom}>
      <button type="button" className={Styles.close} onClick={onClose}>
        <span aria-hidden="true">
          {`${footerLabel} `}
          {checkCountFilterType}
        </span>
      </button>
    </div>
  );
};

ModalFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  footerLabel: PropTypes.string.isRequired,
  CountParam: PropTypes.number.isRequired,
};

export default ModalFooter;
