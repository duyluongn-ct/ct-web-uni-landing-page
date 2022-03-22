import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const YoutubePreview = styled.div`
  width: 100%;
  iframe {
    width: 100%;
  }
`;
export const YoutubeEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

// eslint-disable-next-line no-useless-escape
const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;

// eslint-disable-next-line react/prop-types
const Youtube = ({ embedYoutubeUrl }) => {
  const createIframeHTML = () => ({ __html: embedYoutubeUrl });
  const [isYoutube, setIsYoutube] = useState(false);

  useEffect(() => {
    if (YOUTUBE_REGEX.test(embedYoutubeUrl)) {
      setIsYoutube(true);
    } else {
      setIsYoutube(false);
    }
  }, [embedYoutubeUrl]);
  return embedYoutubeUrl && isYoutube ? (
    <YoutubePreview dangerouslySetInnerHTML={createIframeHTML()} />
  ) : (
    <YoutubeEmpty>Url is not a valid embed Youtube link</YoutubeEmpty>
  );
};

export default Youtube;
