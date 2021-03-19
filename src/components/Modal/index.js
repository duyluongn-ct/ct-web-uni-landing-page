import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import ModalHeader from './ModalHeader';
import AdvanceModalHeader from './AdvanceModalHeader';
import ModalFooter from './ModalFooter';

import Styles from './styles.scss';

/**
 * @type { React.FC<{
    isShow,
    Body,
    showBackButton,
    title,
    onClose,
    onBack?,
    isFooter?,
    submitModal?,
    isSubModal?,
    CountParam?,
    cancel?,
    isAdvance?,
    footerLabel?,
    isReport?,
    bsSize?,
    selectedValue?,
    cancelTitle?,
    dialogClassName?,
    rest?}>}
 */
const Modal = memo(
  ({
    isShow = false,
    selectedValue = true,
    Body,
    showBackButton,
    title,
    onClose,
    onBack,
    cancelTitle,
    isFooter,
    submitModal,
    isSubModal,
    CountParam,
    cancel,
    isAdvance = false,
    footerLabel = 'Tiếp tục',
    isReport,
    bsSize,
    dialogClassName,
  }) => {
    const style = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1001,
      },
      content: {
        top: dialogClassName ? '30%' : '0%',
      },
    };
    const customStyle = isReport && 'report';
    return (
      <ReactModal
        isOpen={isShow}
        closeTimeoutMS={0}
        shouldCloseOnOverlayClick
        contentLabel="ChoTot Modal"
        ariaHideApp={false}
        className={`${Styles['modal-dialog']} ${Styles[`modal-${bsSize}`]}`}
        style={style}
        overlayClassName={`${Styles.modal} ${Styles['modal--after-open']} `}
        bodyOpenClassName={Styles['modal-open']}
        onRequestClose={onClose}
      >
        <div
          className={`${dialogClassName} ${
            !isSubModal ? Styles['modal-content'] : Styles['sub-modal']
          } `}
        >
          {isAdvance ? (
            <AdvanceModalHeader
              onBack={onBack}
              title={title}
              onClose={onClose}
              cancel={cancel}
              cancelTitle={cancelTitle}
              selectedValue={selectedValue}
            />
          ) : (
            <ModalHeader
              onBack={onBack}
              title={title}
              onClose={onClose}
              showBackButton={showBackButton}
            />
          )}
          <div className={`${Styles['modal-body']} ${Styles[customStyle]}`}>{Body}</div>
          {isFooter && (
            <ModalFooter onClose={submitModal} footerLabel={footerLabel} CountParam={CountParam} />
          )}
        </div>
      </ReactModal>
    );
  }
);

Modal.propTypes = {
  isFooter: PropTypes.bool,
  isSubModal: PropTypes.bool,
  isAdvance: PropTypes.bool,
  isReport: PropTypes.bool,
  selectedValue: PropTypes.bool,
  bsSize: PropTypes.number,
  CountParam: PropTypes.number,
  footerLabel: PropTypes.string,
  cancelTitle: PropTypes.string,
  dialogClassName: PropTypes.string,
  isShow: PropTypes.bool.isRequired,
  showBackButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  Body: PropTypes.instanceOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  submitModal: PropTypes.func,
  cancel: PropTypes.func,
};

Modal.defaultProps = {
  isFooter: false,
  isSubModal: false,
  isReport: false,
  isAdvance: false,
  selectedValue: true,
  bsSize: null,
  CountParam: null,
  dialogClassName: '',
  footerLabel: 'Tiếp tục',
  cancelTitle: 'Bỏ lọc',
  submitModal: () => {},
  onBack: () => {},
  cancel: () => {},
};

export default Modal;
