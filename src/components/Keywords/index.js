import React from 'react';
import styled from 'styled-components';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Title = styled.h4`
  color: #9b9b9b;
  margin: 0;
  font-size: 14px;
`;

const Ul = styled.ul`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${mediaBreakPointDown(
    'ltmd',
    `
    grid-template-columns: repeat(2, 1fr);
  `
  )};
  padding-left: 0;
`;

const Li = styled.li`
  color: #777777;
  list-style-position: inside;
`;

const A = styled.a`
  color: #777777;
  text-decoration: none;
  line-height: 25px;
  span {
    font-size: 12px;
  }
`;

function Keywords(props) {
  const { dataSource = [], onClick } = props;
  return (
    <>
      <Title>Các từ khóa phổ biến</Title>
      <Ul>
        {dataSource.map((item, index) => (
          <Li
            className="col-sm-4"
            itemScope
            itemType="http://schema.org/ListItem"
            itemProp="itemListElement"
            key={index.toString()}
          >
            <meta itemProp="position" content={index + 1} />
            <A onClick={() => onClick(item)} itemProp="url" href={item.uri}>
              <span>{item.title}</span>
            </A>
          </Li>
        ))}
      </Ul>
    </>
  );
}

export default Keywords;
