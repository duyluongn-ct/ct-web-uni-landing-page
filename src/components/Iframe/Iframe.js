import React from 'react';
import styled from 'styled-components';

export const IframePreview = styled.div`
  width: 100%;
  min-height: 500px;
  iframe {
    width: 100%;
    min-height: 500px;
  }
`;

const Iframe = ({ embedIframeUrl }) => {
  const createIframeHTML = () => ({ __html: embedIframeUrl });

  return embedIframeUrl && <IframePreview dangerouslySetInnerHTML={createIframeHTML()} />;
};

export default Iframe;
