(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['gh-emoji'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('gh-emoji'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.ghEmoji);
    global.app = mod.exports;
  }
})(this, function (_ghEmoji) {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    document.getElementById('editor').addEventListener('keyup', onKeyup);
    (0, _ghEmoji.load)().then(renderEditor);
  }

  function renderEditor() {
    var editor = document.getElementById('editor');
    var preview = document.getElementById('preview');

    preview.innerHTML = (0, _ghEmoji.parse)(editor.value);
  }

  function onKeyup() {
    renderEditor();
  }
});

},{"gh-emoji":2}],2:[function(require,module,exports){
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

},{}]},{},[1]);
