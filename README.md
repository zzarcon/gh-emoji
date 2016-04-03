# gh-emoji [![Build Status](https://travis-ci.org/zzarcon/gh-emoji.svg?branch=master)](https://travis-ci.org/zzarcon/gh-emoji) [![npm version](https://badge.fury.io/js/gh-emoji.svg)](https://badge.fury.io/js/gh-emoji) [![Bower version](https://badge.fury.io/bo/asynz.svg)](http://badge.fury.io/bo/asynz) [![Dependency Status](https://david-dm.org/zzarcon/gh-emoji.svg)](https://david-dm.org/zzarcon/gh-emoji) [![npm license](https://img.shields.io/npm/l/awesome-badges.svg)](https://www.npmjs.org/package/awesome-badges) [DEMO](http://zzarcon.github.io/gh-emoji/)
> Github emoji parsing done right 👍🙌👋👏💩🙋😈😄👶🙇👱🍔🍕👻💅👹🚲🚂

Gh-emoji aims to be the simplest Github emoji parser. It's built on the top of the [Github Emoji Api](https://api.github.com/emojis) with **no dependencies** and having a couple of **functions as public api**.

## Installation
`$ npm i gh-emoji` 

`$ bower i gh-emoji` 

## Usage

```javascript
import {load, parse} from 'gh-emoji'

load().then(() => {
  let editor = document.getElementById('editor');
  let preview = document.getElementById('preview');

  preview.innerHTML = parse(editor.value);
});

```

## Demo
Take a look at the online [demo](http://zzarcon.github.io/gh-emoji/)

TODO: Put gif using the demo page

## Methods

### load
Fetch the emoji data from Github

```javascript
import {load as loadEmojis} from 'gh-emoji';

loadEmojis().then((emojis) => {
  console.log(emojis['+1'] === 👍 === 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v6') 
});
```

Returns **Promise**
### parse
Converts text into parsed html containing the github emojis

**parameters**

* `text` **String**
* `options` **Object**

```javascript
import {load, parse} from 'gh-emoji';

const text = 'Do you believe in :alien:...? :scream:';
load().then(() => {
  console.log(parse(text) === 'Do you believe in 👽...? 😱'); 
});

```

Returns **String**

### all

Return all existing emojis

```javascript
import {load, all} from 'gh-emoji';

load().then(() => {
  console.log(all()); 
});

```

Returns **Object**

### getUrl

Return github image url of the emojiId

**parameters**
* `emojiId` **String**

```javascript
import {load, getUrl} from 'gh-emoji';

load().then(() => {
  console.log(getUrl('apple') === 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f34e.png?v6'); 
});

```

Returns **String**

### exist

Return if the requested emoji exist

**parameters**
* `emojiId` **String**

```javascript
import {load, exist} from 'gh-emoji';

load().then(() => {
  console.log(exist('foo') === false); 
  console.log(exist('smile') === true); 
});

```

Returns **Boolean**

### References 

* Github Emoji Api docs: https://developer.github.com/v3/emojis/
* Github Emoji Api: https://api.github.com/emojis
* All Github Emoji icons: https://github.com/scotch-io/All-Github-Emoji-Icons