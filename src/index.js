/* @flow */

import type { EmojiMap } from './types';

const enpoint = 'https://api.github.com/emojis';
const delimiterRegex = /(\:[\w\-\+]+\:)/g;
let emojis = null;

const fetch = window.fetch || (endpoint: string) : Promise <Object> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          return reject(xhr.responseText);
        }

        return resolve({ json: () => JSON.parse(xhr.responseText) });
      }
    };

    xhr.open('GET', endpoint, true);
    xhr.send();
  });
};

type ParseOptions = {
  classNames?: string,
};

/**
 * Return array with matched emojis in text.
 *
 * @example
 * import { load as loadEmojis, find as findEmojis } from 'gh-emoji';
 *
 * const text = 'Do you believe in :alien:...? :scream:';
 *
 * loadEmojis().then((emojis) => {
 *   console.log(findEmojis(text)); // [':alien:', ':scream:']
 * });
 *
 * @param {String} text Text to search for emojis.
 *
 * @returns {Array<String>} Array with matched emojis.
 */
export function find(text: string): Array<string> {
  return text.match(delimiterRegex) || [];
}

/**
 * Fetch the emoji data from Github's api.
 *
 * @example
 * import { load as loadEmojis } from 'gh-emoji';
 *
 * loadEmojis().then((emojis) => {
 *   console.log(emojis['+1']); // 👍
 * });
 *
 * @returns {Promise<Object>} Promise which passes Object with emoji names
 * as keys and generated image tags as values to callback.
 */
export function load(): Promise<EmojiMap> {
  return new Promise((resolve) => {
    if (emojis) return resolve(emojis);

    return fetch(enpoint).then(r => r.json()).then((response) => {
      emojis = response;
      resolve(emojis);
    });
  });
}

/**
 * Return all fetched emojis.
 *
 * @example
 * import { load as loadEmojis, all as allEmojis } from 'gh-emoji';
 *
 * loadEmojis().then(() => {
 *   console.log(allEmojis()); // {emojiName: emojiImageTag}
 * });
 *
 * @returns {Object} Object with emoji names as keys and generated image tags
 * as values.
 */
export function all(): ?EmojiMap {
  return emojis;
}

/**
 * Check if requested emoji exists.
 *
 * @example
 * import { load as loadEmojis, exist as emojiExists } from 'gh-emoji';
 *
 * loadEmojis().then(() => {
 *   console.log(emojiExists('foo')); // false
 *   console.log(emojiExists('smile')); // true
 * });
 *
 * @param {String} emojiId Name of emoji.
 *
 * @returns {Boolean}
 */
export function exist(emojiId: string): boolean {
  const emojiMap = all();

  if (emojiMap == null) {
    return false;
  }

  return !!emojiMap[emojiId];
}

/**
 * Return github's image url of emoji.
 *
 * @example
 * import { load as loadEmojis, getUrl } from 'gh-emoji';
 *
 * loadEmojis().then(() => {
 *   console.log(getUrl('apple')); // 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f34e.png?v6'
 * });
 *
 * @param {String} emojiId Name of emoji.
 *
 * @returns {String} Image url of given emoji.
 */
export function getUrl(emojiId: string): ?string {
  const emojiMap = all();

  if (emojiMap == null) {
    return null;
  }

  return emojiMap[emojiId];
}

/**
 * Parse text and replace emoji tags with actual emoji symbols.
 *
 * @example
 * import { load as loadEmojis, parse } from 'gh-emoji';
 *
 * const text = 'Do you believe in :alien:...? :scream:';
 *
 * loadEmojis().then(() => {
 *   console.log(parse(text)) // 'Do you believe in 👽...? 😱';
 * });
 *
 * @param {String} text Text to parse.
 * @param {Object} options Options with additional data for parser.
 * @param {String} options.classNames String with custom class names
 * added to each emoji, separated with whitespace.
 *
 * @returns {String} Parsed text with emoji image tags in it.
 */
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
