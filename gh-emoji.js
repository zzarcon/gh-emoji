const enpoint = 'https://api.github.com/emojis';
const delimiterRegex = /(\:[\w\.]*\:)/g;
let emojis = null;

/**
 * Fetch the emoji data from Github's api.
 *
 * @example
 * import {load as loadEmojis} from 'gh-emoji';
 *
 * loadEmojis().then((emojis) => {
 *   console.log(emojis['+1']); // 👍
 * });
 *
 * @returns {Promise<Object>} Promise which passes Object with emoji names
 * as keys and generated image tags as values to callback.
 */
export function load() {
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
 * import {load as loadEmojis, all as allEmojis} from 'gh-emoji';
 *
 * loadEmojis().then(() => {
 *   console.log(allEmojis()); // {emojiName: emojiImageTag}
 * });
 *
 * @returns {Object} Object with emoji names as keys and generated image tags
 * as values.
 */
export function all() {
  return emojis;
}

/**
 * Check if requested emoji exists.
 *
 * @example
 * import {load as loadEmojis, exist as emojiExists} from 'gh-emoji';
 *
 * loadEmojis().then(() => {
 *   console.log(emojiExists('foo')); // false
 *   console.log(emojiExists('smile')); // true
 * });
 *
 * @returns {Boolean}
 */
export function exist(emojiId) {
  return !!all()[emojiId];
}

/**
 * Return github's image url of emoji.
 *
 * @example
 * import {load as loadEmojis, getUrl} from 'gh-emoji';
 *
 * loadEmojis().then(() => {
 *   console.log(getUrl('apple')); // 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f34e.png?v6'
 * });
 *
 * @returns {String} Image url of given emoji.
 */
export function getUrl(emojiId) {
  return all()[emojiId];
}

/**
 * Parse text and replace emoji tags with actual emoji symbols.
 *
 * @example
 * import {load as loadEmojis, parse} from 'gh-emoji';
 *
 * const text = 'Do you believe in :alien:...? :scream:';
 *
 * loadEmojis().then(() => {
 *   console.log(parse(text)) // 'Do you believe in 👽...? 😱';
 * });
 *
 * @returns {String} Parsed text with emoji image tags in it.
 */
export function parse(text) {
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
