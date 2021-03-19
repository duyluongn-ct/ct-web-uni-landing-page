import styled from 'styled-components';
import { config } from '~app/config';
import { mediaBreakPointDown } from '~app/utils/breakpoint';

const Ol = styled.ol`
  margin: 0 auto;
  max-width: 960px;
  display: flex;
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px 0;

  .breadcrumbItem {
    font-size: 12px;
    display: inline;
    color: #33659c;

    ${mediaBreakPointDown(
      'ltmd',
      `
      display: none;
    `
    )};

    &.link::after {
      color: #33659c;
      content: '»';
      padding: 0 5px;
    }

    a {
      text-decoration: none;
      color: #33659c;

      &.active {
        color: #222;
      }

      span {
        font-size: 12px;
      }
    }
  }
`;

export const BreadCrumb = ({ params = {} }) => {
  return (
    <Ol itemType="http://schema.org/BreadcrumbList" className="hidden-xs breadcrumb___3YLMN">
      <li
        className="breadcrumbItem link"
        itemProp="itemListElement"
        itemType="http://schema.org/ListItem"
      >
        <meta itemProp="position" content="1" />
        <a itemProp="item" href={config.propertyURL}>
          <span itemProp="name">Chợ Tốt Nhà</span>
        </a>
      </li>
      <li
        className={params.regionObjV2?.subRegionValue ? 'breadcrumbItem link' : 'breadcrumbItem'}
        itemProp="itemListElement"
        itemType="http://schema.org/ListItem"
      >
        <a
          itemProp="item"
          href={`${config.propertyURL}/tham-khao-gia`}
          className={params.regionObjV2?.subRegionValue ? '' : 'active'}
        >
          <span itemProp="name">Tham khảo giá BĐS</span>
        </a>
        <meta itemProp="position" content="Tham khảo giá BĐS" />
      </li>
      {params.regionObjV2?.subRegionValue && (
        <li
          className="breadcrumbItem"
          itemProp="itemListElement"
          itemType="http://schema.org/ListItem"
        >
          <a
            itemProp="item"
            // href={`${config.propertyURL}/tham-khao-gia`}
            className={params.regionObjV2?.subRegionValue && 'active'}
          >
            <span itemProp="name">{params.regionObjV2?.subRegionName}</span>
          </a>
          <meta itemProp="position" content="Tham khảo giá BĐS" />
        </li>
      )}
    </Ol>
  );
};
