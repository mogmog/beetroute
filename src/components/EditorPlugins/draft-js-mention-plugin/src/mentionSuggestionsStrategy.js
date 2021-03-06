/* @flow */

import findWithRegex from 'find-with-regex';
import escapeRegExp from 'lodash.escaperegexp';

export default (trigger, regExp) => (contentBlock, callback) => {
  const reg = new RegExp(String.raw({
    raw: `(\\s|^)${escapeRegExp(trigger)}${regExp}` // eslint-disable-line no-useless-escape
  }), 'g');
  findWithRegex(reg, contentBlock, callback);
};
