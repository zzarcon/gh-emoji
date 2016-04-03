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
    (0, _ghEmoji.load)().then(function (emojis) {
      console.log(emojis);
    });
  }
});

},{"gh-emoji":2}],2:[function(require,module,exports){
module.export = function() {
  console.log(1);
};
},{}]},{},[1]);
