import React from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

const AdvanceModalHeader = ({ onBack, title, onClose, cancel, cancelTitle, selectedValue }) => (
  <div className={Styles.headerCustom}>
    <div className="pull-left" onClick={onBack} role="button" tabIndex={0}>
      <span onClick={onClose} className={Styles.closeButton} role="button" tabIndex={0}>
        ×
      </span>
    </div>
    <button type="button" className="cancel">
      <span
        className={selectedValue ? Styles.cancelFilterEnable : Styles.cancelFilterDisable}
        onClick={cancel}
        role="button"
        tabIndex={0}
      >
        {cancelTitle || 'Bỏ lọc'}
      </span>
    </button>
    <h4 className={`text-center ${Styles.titleCustom} `}> {title}</h4>
  </div>
);

AdvanceModalHeader.propTypes = {
  cancel: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedValue: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  cancelTitle: PropTypes.string.isRequired,
};

export default AdvanceModalHeader;
