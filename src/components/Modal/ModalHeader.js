import React from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.scss';

const ModalHeader = ({ showBackButton = false, onBack, title, onClose }) => (
  <div className={Styles.headerCustom}>
    {showBackButton && (
      <div className="pull-left" onClick={onBack} role="button" tabIndex={0}>
        <span className={Styles.backIcon}>
          <img src="https://static.chotot.com/storage/chotot-icons/svg/back.svg" alt="back" />
        </span>
      </div>
    )}
    <button type="button" className="close">
      <span aria-hidden="true" onClick={onClose}>
        ×
      </span>
      <span className="sr-only">Close</span>
    </button>
    <h4 className={`text-center ${Styles.titleCustom} `}> {title}</h4>
  </div>
);

ModalHeader.propTypes = {
  showBackButton: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalHeader.defaultProps = {
  showBackButton: false,
};

export default ModalHeader;
