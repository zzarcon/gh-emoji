(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.ghEmoji = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.load = load;
  exports.all = all;
  exports.exist = exist;
  exports.getUrl = getUrl;
  exports.parse = parse;
  var enpoint = 'https://api.github.com/emojis';
  var delimiterRegex = /(\:[\w\.]*\:)/g;
  var emojis = null;

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
  function load() {
    return new Promise(function (resolve) {
      if (emojis) return resolve(emojis);

      return fetch(enpoint).then(function (r) {
        return r.json();
      }).then(function (response) {
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
  function all() {
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
  function exist(emojiId) {
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
  function getUrl(emojiId) {
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
  function parse(text) {
    var output = '';
    output += text.replace(delimiterRegex, function (match) {
      var id = match.replace(/:/g, '');
      if (exist(id)) {
        var classNames = 'gh-emoji gh-emoji-' + id;
        return '<img src="' + getUrl(id) + '" class="' + classNames + '" alt="' + id + '" />';
      }
      return match;
    });

    return output;
  }
});
