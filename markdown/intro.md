# gh-emoji [![Build Status](https://travis-ci.org/zzarcon/gh-emoji.svg?branch=master)](https://travis-ci.org/zzarcon/gh-emoji) [![npm version](https://badge.fury.io/js/gh-emoji.svg)](https://www.npmjs.com/package/gh-emoji) [![Bower version](https://badge.fury.io/bo/gh-emoji.svg)](https://libraries.io/bower/gh-emoji) [![Dependency Status](https://david-dm.org/zzarcon/gh-emoji.svg)](https://david-dm.org/zzarcon/gh-emoji) [![npm license](https://img.shields.io/npm/l/awesome-badges.svg)](https://www.npmjs.org/package/awesome-badges) [DEMO](http://zzarcon.github.io/gh-emoji/)
> Github emoji parsing done right 👍🙌👋👏💩🙋😈😄👶🙇👱🍔🍕👻💅👹🚲🚂

Gh-emoji aims to be the simplest Github emoji parser. It's built on the top of the [Github Emoji Api](https://api.github.com/emojis) with **no dependencies** and having a couple of **functions as public api**.

# Installation
`$ npm i gh-emoji`

`$ bower i gh-emoji`

# Usage

```javascript
import { load, parse } from 'gh-emoji'

load().then(() => {
  const editor = document.getElementById('editor');
  const preview = document.getElementById('preview');

  preview.innerHTML = parse(editor.value);
});

```

# Demo
Take a look at the online [demo](http://zzarcon.github.io/gh-emoji/)

![](https://raw.githubusercontent.com/zzarcon/gh-emoji/master/assets/gh-emoji-demo.gif)

# API
