import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  background-color: #fff;

  img {
    ${mediaBreakPointDown(
      'ltmd',
      `
      width: 100%
    `
    )};
  }
`;

export const Banner = () => {
  return (
    <Wrapper>
      <img
        alt="Tham khảo giá BĐS"
        src="https://static.chotot.com/storage/default_images/group-40.png"
      />
    </Wrapper>
  );
};
