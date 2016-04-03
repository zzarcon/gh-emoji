# gh-emoji Demo! [![Build Status](https://travis-ci.org/zzarcon/gh-emoji.svg?branch=master)](https://travis-ci.org/zzarcon/gh-emoji) [![npm version](https://badge.fury.io/js/gh-emoji.svg)](https://badge.fury.io/js/gh-emoji) [![Dependency Status](https://david-dm.org/zzarcon/gh-emoji.svg)](https://david-dm.org/zzarcon/gh-emoji) [![npm license](https://img.shields.io/npm/l/awesome-badges.svg)](https://www.npmjs.org/package/awesome-badges) - [DEMO](demourl)
> Github emoji parsing done right 👍🙌👋👏💩🙋😈😄👶🙇👱🍔🍕👻💅👹🚲🚂

## That's actually all the code needed for the Demo ^^

```javascript
import {load as loadEmojis, parse as parseEmojis} from 'gh-emoji';

document.addEventListener('DOMContentLoaded', init);

function init() {
  document.getElementById('editor').addEventListener('keyup', onKeyup);
  loadEmojis().then(renderEditor);
}

function renderEditor() {
  let editor = document.getElementById('editor');
  let preview = document.getElementById('preview');

  preview.innerHTML = parseEmojis(editor.value);
}

function onKeyup() {
  renderEditor();
}
```