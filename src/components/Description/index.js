import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Wrapper = styled.div`
  line-height: 1.5;
  position: relative;

  * {
    font-size: 12px;
  }

  p {
    margin: 0 0 5px;
    color: #777777;
  }

  a {
    color: #38699f;
    text-decoration: none;
    &:hover {
      color: #4e88bd;
    }
  }
  .row {
    &.block5,
    &.block4,
    &.block3 {
      display: flex;
    }

    .col-md-4 {
      margin: 0 8px;
      flex: 1;

      ${mediaBreakPointDown(
        'ltmd',
        `
          img {
            height: 70px
          }
          `
      )}

      &:first-child {
        margin-left: 0px;
      }

      &:last-child {
        margin-right: 0px;
      }
    }
  }
`;

const Content = styled.div`
  text-overflow: ellipsis;
  text-align: justify;
  height: ${({ up }) => (up ? '200px' : 'auto')};

  ${({ up }) => `${mediaBreakPointDown('sm', `height: ${up ? '197px' : 'auto'}`)}`};

  overflow: hidden;
`;

const ReadMoreGradient = styled.p`
  height: 25px;
  width: 100%;
  position: absolute;
  bottom: 18px;
  margin: 0 !important;
  background: ${(props) =>
    !props.up ? 'none' : `linear-gradient(to top, #f3f3f3, rgba(255, 255, 255, 0.15))`};

  ${mediaBreakPointDown(
    'sm',
    `
  bottom: 16px;`
  )}
`;

const ReadMore = styled.p`
  margin-bottom: 10px !important;
  text-align: center;
`;

const A = styled.a`
  cursor: pointer;
  display: block;
`;

const EXPAND_TEXT = 'Mở rộng';
const COLLAPSE_TEXT = 'Thu gọn';

function Description(props) {
  const [up, setUp] = useState(true);
  const { content } = props;
  return content ? (
    <Wrapper>
      <Content up={up} id="content" dangerouslySetInnerHTML={{ __html: content }} />
      <ReadMoreGradient up={up} />
      <ReadMore id="seeMore">
        {up ? (
          <A id="btnReadMore" onClick={() => setUp(false)}>
            {EXPAND_TEXT} <i id="arrowIcon" className="fa fa-angle-down" aria-hidden="true" />
          </A>
        ) : (
          <A id="btnReadMoreLess" onClick={() => setUp(true)}>
            {COLLAPSE_TEXT} <i id="arrowIcon" className="fa fa-angle-up" aria-hidden="true" />
          </A>
        )}
      </ReadMore>
    </Wrapper>
  ) : null;
}

Description.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Description;
