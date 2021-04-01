import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Style from './WrapperScroll.scss';

export default class WrapperScroll extends PureComponent {
  state = {
    isShowIconNext: false,
    isShowIconPrev: false,
  };

  static propTypes = {
    cols: PropTypes.number,
    total: PropTypes.number,
    mobile: PropTypes.objectOf(PropTypes.any),
    widthScroll: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
      .isRequired,
    className: PropTypes.string,
    customEventListener: PropTypes.func,
    hideIconPrev: PropTypes.bool,
  };

  static defaultProps = {
    cols: 7,
    total: 20,
    mobile: {},
    widthScroll: null,
    className: '',
    hideIconPrev: false,
    customEventListener: () => {},
  };

  componentDidMount() {
    this.refWrapper.addEventListener('scroll', this.handleScroll);
    const { clientWidth } = this.refWrapper;
    let { cols } = this.props;
    const {
      mobile: { cols: mobileCols },
    } = this.props;
    let { scrollWidth } = this.refWrapper;
    if (mobileCols && clientWidth < 768) {
      cols = mobileCols;
    }
    const itemWitdth = clientWidth / cols;
    const items = this.refWrapper.getElementsByClassName('slider-item');

    for (let i = 0, len = items.length; i < len; i++) {
      items[i].style.width = `${itemWitdth + 'px'}`;
    }

    scrollWidth = this.refWrapper.scrollWidth;

    if (scrollWidth > clientWidth) {
      this.setState({ isShowIconNext: true });
    }
  }

  componentWillUnmount() {
    this.refWrapper.removeEventListener('scroll', this.handleScroll);
  }

  onClick = (e, isScrollLeft) => {
    const { widthScroll } = this.props;
    const { childNodes, scrollWidth, scrollLeft } = this.refWrapper;
    const numberScroll = widthScroll || Math.round(scrollWidth / childNodes.length) + 100;

    if (isScrollLeft) {
      this.refWrapper.scrollTo({
        left: scrollLeft - numberScroll,
        behavior: 'smooth',
      });
    } else {
      this.refWrapper.scrollTo({
        left: scrollLeft + numberScroll,
        behavior: 'smooth',
      });
    }
  };

  handleScroll = (e) => {
    const {
      //          dynamic     maxWidth    showWidth
      target: { scrollLeft, scrollWidth, clientWidth },
    } = e;

    const { isShowIconPrev, isShowIconNext } = this.state;
    const maxWidthScroll = scrollWidth - clientWidth;

    if (maxWidthScroll === scrollLeft) {
      if (isShowIconNext) {
        this.setState({ isShowIconNext: false });
      }
    } else {
      if (!isShowIconNext) {
        this.setState({ isShowIconNext: true });
      }
    }

    if (scrollLeft > 0) {
      if (!isShowIconPrev) {
        this.setState({ isShowIconPrev: true });
      }
    } else {
      if (isShowIconPrev) {
        this.setState({ isShowIconPrev: false });
      }
    }
    this.props.customEventListener(e);
  };

  render() {
    const { children, cols, className, hideIconPrev, total } = this.props;
    let { isShowIconPrev, isShowIconNext } = this.state;
    if (total < cols) {
      isShowIconNext = false;
      isShowIconPrev = false;
    }
    if (children) {
      return (
        <div className={Style.wrapperOverflow}>
          <div
            ref={(ref) => {
              this.refWrapper = ref;
            }}
            className={className}
          >
            {children}
          </div>
          <i
            className={`i-prev ${Style.iconPrev} ${
              !hideIconPrev && isShowIconPrev && Style.active
            }`}
            onClick={(e) => this.onClick(e, true)}
            tabIndex={0}
            role="button"
            aria-label="Prev"
          />
          <i
            className={`i-next ${Style.iconNext} ${isShowIconNext && Style.active}`}
            onClick={(e) => this.onClick(e)}
            tabIndex={0}
            role="button"
            aria-label="Next"
          />
        </div>
      );
    }
    return <div />;
  }
}
