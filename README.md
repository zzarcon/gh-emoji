# gh-emoji [![Build Status](https://travis-ci.org/zzarcon/gh-emoji.svg?branch=master)](https://travis-ci.org/zzarcon/gh-emoji) [![npm version](https://badge.fury.io/js/gh-emoji.svg)](https://badge.fury.io/js/gh-emoji) [![Dependency Status](https://david-dm.org/zzarcon/gh-emoji.svg)](https://david-dm.org/zzarcon/gh-emoji) [![npm license](https://img.shields.io/npm/l/awesome-badges.svg)](https://www.npmjs.org/package/awesome-badges) - [DEMO](demourl)
> Github emoji parsing done right 👍🙌👋👏💩🙋😈😄👶🙇👱🍔🍕👻💅👹🚲🚂

Gh-emoji aims to be the simplest Github emoji parser. It's built on the top of the [Github Emoji Api](https://api.github.com/emojis) with **no dependencies** and function based Github emoji parser

## Installation
`$ npm i gh-emoji` 

## Usage

```javascript
import {load, parse} from 'gh-emoji'

load().then(() => {
  
});

```

## Demo
Take a look at the online [demo](demourl)

TODO: Put gif using the demo page

## Methods

### load
Fetches the Github api 

```javascript
import {load} from 'gh-emoji';

load().then((emojis) => {
  console.log(emojis['+1'] === 👍 === 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v6') 
});
```

Returns **Promise**
### parse

**parameters**

* `text` **String**
* `options` **Object**

Returns **String**

**all**

**getUrl**

**exist**

### References 

* All Github Emoji icons: https://github.com/scotch-io/All-Github-Emoji-Icons