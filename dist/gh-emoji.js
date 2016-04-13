(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.types = mod.exports;
  }
})(this, function () {});
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
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.find = find;
  exports.load = load;
  exports.all = all;
  exports.exist = exist;
  exports.getUrl = getUrl;
  exports.parse = parse;

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var enpoint = 'https://api.github.com/emojis';
  var delimiterRegex = /(\:[\w\-\+]+\:)/g;
  var emojis = null;

  var fetch = window.fetch || function (endpoint) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
            return reject(xhr.responseText);
          }

          return resolve({ json: function json() {
              return JSON.parse(xhr.responseText);
            } });
        }
      };

      xhr.open('GET', endpoint, true);
      xhr.send();
    });
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
  function find(text) {
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
   * import { load as loadEmojis, all as allEmojis } from 'gh-emoji';
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
  function exist(emojiId) {
    var emojiMap = all();

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
  function getUrl(emojiId) {
    var emojiMap = all();

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
  function parse(text) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var output = '';
    var customClassNames = options.classNames ? options.classNames.trim().split(/\s+/) : '';

    output += text.replace(delimiterRegex, function (match) {
      var name = match.replace(/:/g, '');
      var classNames = ['gh-emoji', 'gh-emoji-' + name];

      if (!exist(name)) {
        return match;
      }

      if (customClassNames) {
        classNames.push.apply(classNames, _toConsumableArray(customClassNames));
      }

      var imageSrc = getUrl(name);
      var imageClass = classNames.join(' ');
      var imageAlt = name;

      return '<img src="' + imageSrc + '" class="' + imageClass + '" alt="' + imageAlt + '" />';
    });

    return output;
  }
});
