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
  var delimiter_regex = /(\:[\w\.]*\:)/g;
  var emojis = null;

  function load() {
    return new Promise(function (resolve, reject) {
      if (emojis) return resolve(emojis);

      fetch(enpoint).then(function (r) {
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

  /**
   * TODO: Suport options
   * TODO: Suport custom classnames
   * @param  {String} text    
   * @param  {Object} options 
   * @return {Promise}         
   */
  function parse(text, options) {
    var output = '';
    output += text.replace(delimiter_regex, function (match, text, offset, string) {
      var id = match.replace(/:/g, '');
      if (exist(id)) {
        var classNames = 'gh-emoji gh-emoji-' + id;
        return '<img src="' + getUrl(id) + '" class="' + classNames + '" alt="' + id + '" />';
      } else {
        return match;
      }
    });

    return output;
  };
});
