import { isNone } from 'ct-helpers';
import { HASH_TAG_SELECT_REGION } from './constants';

export const getCategoryUrl = ({ link, queryStringChar, referer }) => {
  const prefixChar = queryStringChar ? queryStringChar : '?';
  const ref = !isNone(referer) ? `${prefixChar}ref=${referer}` : '';
  return `${link}${ref}${HASH_TAG_SELECT_REGION}`;
};
