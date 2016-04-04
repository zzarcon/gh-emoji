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

  function all() {
    return emojis;
  }

  function exist(emojiId) {
    return !!all()[emojiId];
  }

  function getUrl(emojiId) {
    return all()[emojiId];
  }

  function parse(text) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var output = '';
    output += text.replace(delimiterRegex, function (match) {
      var name = match.replace(/:/g, '');
      var classNames = ['gh-emoji', 'gh-emoji-' + name].concat();

      if (!exist(name)) {
        return match;
      }

      if (options.classNames) {
        classNames.concat(options.classNames.trim().split(/\s+/));
      }

      return '<img src="' + getUrl(name) + '" class="' + classNames + '" alt="' + name + '" />';
    });

    return output;
  }
});
