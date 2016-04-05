/* @flow */

import type { EmojiMap } from './types';

const enpoint = 'https://api.github.com/emojis';
const delimiterRegex = /(\:[\w\.]*\:)/g;
let emojis: ?EmojiMap = null;

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
  const emojis = all(); // eslint-disable-line no-shadow

  if (emojis == null) {
    return false;
  }

  return !!emojis[emojiId];
}

export function getUrl(emojiId: string): ?string {
  const emojis = all(); // eslint-disable-line no-shadow

  if (emojis == null) {
    return null;
  }

  return emojis[emojiId];
}

export function parse(text: string): string {
  let output = '';
  output += text.replace(delimiterRegex, (match) => {
    const id = match.replace(/:/g, '');
    if (exist(id)) {
      const classNames = `gh-emoji gh-emoji-${id}`;
      return `<img src="${getUrl(id)}" class="${classNames}" alt="${id}" />`;
    }
    return match;
  });

  return output;
}
