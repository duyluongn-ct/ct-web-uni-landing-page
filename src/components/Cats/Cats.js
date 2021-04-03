import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Wrapper = styled.div`
  background: #ffffff;
  margin-bottom: 12px;

  ${mediaBreakPointDown(
    'md',
    `
    padding: 12px 0 0 0;
  `
  )};
`;

const CatSelectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-top: ${({ border }) => (border ? '1px solid #f4f4f4' : 'none')};
`;

const Cat = styled.a`
  margin: 12px 12px 2px 12px;
  flex: 1 1 30%;
  height: 120px;
  cursor: pointer;
  background: url(${({ src }) => (src ? src : '')}) no-repeat;
  background-size: cover;

  ${mediaBreakPointDown(
    'ltmd',
    `
    flex: 1 1 35%;
    &:nth-child(odd) {
      margin-right: 6px;
    }
    &:nth-child(even) {
      margin-left: 6px;
    }
    background-position: center;
          `
  )};

  img {
  }
`;

// const CatInfo = styled.div`
//   display: flex;
//   width: 62%;
//   margin: 0 auto;
//   margin-top: 12%;
//   text-align: center;
//   vertical-align: middle;
//   ${mediaBreakPointDown(
//     'ltmd',
//     `
//   width: 85%;
//   margin-top: 20%;
//           `
//   )};

//   .link {
//     display: flex;
//     width: 100%;
//     text-decoration: none;
//   }

//   .text-flex {
//     display: flex;
//     flex-direction: column;
//     width: 100%;
//     padding-left: 8px;
//   }

//   .text {
//     color: #ffffff;
//     text-align: left;
//     padding: 2px 0;

//     &.small-text {
//       font-size: 12px;
//     }

//     &.large-text {
//       font-size: 18px;
//       font-weight: bold;
//       vertical-align: middle;
//       ${mediaBreakPointDown(
//         'ltmd',
//         `
//         font-size: 16px;
//                 `
//       )};
//     }
//   }
// `;

const ImgTitle = styled.div`
  height: 64px;
  background: url(${({ src }) => (src ? src : '')}) no-repeat;
  background-size: cover;
  // margin-bottom: 12px;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: bold;
  margin: 0;
  padding: 12px 12px 9px 12px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #222222;

  ${mediaBreakPointDown(
    'md',
    `
    padding: 0 0 0 12px;
    font-size: 16px;
  `
  )};
`;

export const Cats = ({
  isMobile,
  data = {},
  sectionId,
  imgTitle,
  title,
  handleShortCutClick,
  border = true,
}) => {
  const onClick = (link, shortcutId) => {
    handleShortCutClick(sectionId, shortcutId);
    setTimeout(() => {
      window.location.href = link;
    }, 300);
  };
  return (
    <Wrapper>
      {imgTitle && <ImgTitle src={isMobile ? imgTitle[1] : imgTitle[0]} />}
      {title && title !== '' && <Title>{title}</Title>}
      <CatSelectList border={border}>
        {data.map((item) => {
          return (
            <Cat
              key={`item-${item.id}`}
              src={item.dataImage}
              title={item.imageAlt}
              onClick={() => onClick(item.link, item.shortcutId)}
              href={item.link}
            >
              {/* <CatInfo>
                <a className="link" href={item.link}>
                  <img alt={item.largeText} src={item.icon} />
                  <div className="text-flex">
                    <div className="text small-text">{item.smallText}</div>
                    <div className="text large-text">{item.largeText}</div>
                  </div>
                </a>
              </CatInfo> */}
            </Cat>
          );
        })}
      </CatSelectList>
    </Wrapper>
  );
};
