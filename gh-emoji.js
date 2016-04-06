/* @flow */

import type { EmojiMap } from './types';

const enpoint = 'https://api.github.com/emojis';
const delimiterRegex = /(\:[\w\-\+]+\:)/g;
let emojis = null;

export function find(text: string): Array<string> {
  return text.match(delimiterRegex) || [];
}

export function load(): Promise<EmojiMap> {
  return new Promise((resolve) => {
    if (emojis) return resolve(emojis);

    return fetch(enpoint).then(r => r.json()).then((response) => {
      emojis = response;
      resolve(emojis);
    });
  });
}

export function all(): ?EmojiMap {
  return emojis;
}

export function exist(emojiId: string): boolean {
  const emojiMap = all();

  if (emojiMap == null) {
    return false;
  }

  return !!emojiMap[emojiId];
}

export function getUrl(emojiId: string): ?string {
  const emojiMap = all();

  if (emojiMap == null) {
    return null;
  }

  return emojiMap[emojiId];
}

type ParseOptions = {
  classNames?: string,
};

export function parse(text: string, options: ParseOptions = {}): string {
  let output = '';
  const customClassNames = options.classNames ? options.classNames.trim().split(/\s+/) : '';

  output += text.replace(delimiterRegex, match => {
    const name = match.replace(/:/g, '');
    const classNames = ['gh-emoji', `gh-emoji-${name}`];

    if (!exist(name)) {
      return match;
    }

    if (customClassNames) {
      classNames.push(...customClassNames);
    }

    const imageSrc = getUrl(name);
    const imageClass = classNames.join(' ');
    const imageAlt = name;

    return `<img src="${imageSrc}" class="${imageClass}" alt="${imageAlt}" />`;
  });

  return output;
}
