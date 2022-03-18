import React from 'react';
import styled from 'styled-components';

export const YoutubePreview = styled.div`
  width: 100%;
  iframe {
    width: 100%;
  }
`;

const Youtube = ({ embedYoutubeUrl }) => {
  const createIframeHTML = () => ({ __html: embedYoutubeUrl });

  return embedYoutubeUrl && <YoutubePreview dangerouslySetInnerHTML={createIframeHTML()} />;
};

export default Youtube;
