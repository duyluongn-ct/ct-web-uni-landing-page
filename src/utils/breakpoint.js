export const BREAK_POINTS = {
  ip5: '320px',
  sm: '540px',
  ltmd: '767px',
  md: '768px',
  gtmd: '769px',
  lg: '940px',
  xl: '941px',
};
export function mediaBreakPointUp(bp, cssStr) {
  const breakPoint = BREAK_POINTS[bp] || BREAK_POINTS['sm'];
  return `
    @media (min-width: ${breakPoint}) {
      ${cssStr}
    }
  `;
}
export function mediaBreakPointDown(bp, cssStr) {
  const breakPoint = BREAK_POINTS[bp] || BREAK_POINTS['sm'];
  return `
    @media (max-width: ${breakPoint}) {
      ${cssStr}
    }
  `;
}
