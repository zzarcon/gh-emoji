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
# all

[src/index.js:89-91](https://github.com/zzarcon/gh-emoji/blob/fcb9447252285d4fa0217f72fe4a11dd8f9f67a5/src/index.js#L89-L91 "Source code on GitHub")

Return all fetched emojis.

**Examples**

```javascript
import { load as loadEmojis, all as allEmojis } from 'gh-emoji';

loadEmojis().then(() => {
  console.log(allEmojis()); // {emojiName: emojiImageTag}
});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object with emoji names as keys and generated image tags
as values.

# exist

[src/index.js:108-116](https://github.com/zzarcon/gh-emoji/blob/fcb9447252285d4fa0217f72fe4a11dd8f9f67a5/src/index.js#L108-L116 "Source code on GitHub")

Check if requested emoji exists.

**Parameters**

-   `emojiId` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of emoji.

**Examples**

```javascript
import { load as loadEmojis, exist as emojiExists } from 'gh-emoji';

loadEmojis().then(() => {
  console.log(emojiExists('foo')); // false
  console.log(emojiExists('smile')); // true
});
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

# find

[src/index.js:48-50](https://github.com/zzarcon/gh-emoji/blob/fcb9447252285d4fa0217f72fe4a11dd8f9f67a5/src/index.js#L48-L50 "Source code on GitHub")

Return array with matched emojis in text.

**Parameters**

-   `text` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text to search for emojis.

**Examples**

```javascript
import { load as loadEmojis, find as findEmojis } from 'gh-emoji';

const text = 'Do you believe in :alien:...? :scream:';

loadEmojis().then((emojis) => {
  console.log(findEmojis(text)); // [':alien:', ':scream:']
});
```

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** Array with matched emojis.

# getUrl

[src/index.js:132-140](https://github.com/zzarcon/gh-emoji/blob/fcb9447252285d4fa0217f72fe4a11dd8f9f67a5/src/index.js#L132-L140 "Source code on GitHub")

Return github's image url of emoji.

**Parameters**

-   `emojiId` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of emoji.

**Examples**

```javascript
import { load as loadEmojis, getUrl } from 'gh-emoji';

loadEmojis().then(() => {
  console.log(getUrl('apple')); // 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f34e.png?v6'
});
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Image url of given emoji.

# load

[src/index.js:65-74](https://github.com/zzarcon/gh-emoji/blob/fcb9447252285d4fa0217f72fe4a11dd8f9f67a5/src/index.js#L65-L74 "Source code on GitHub")

Fetch the emoji data from Github's api.

**Examples**

```javascript
import { load as loadEmojis } from 'gh-emoji';

loadEmojis().then((emojis) => {
  console.log(emojis['+1']); // 👍
});
```

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).&lt;[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** Promise which passes Object with emoji names
as keys and generated image tags as values to callback.

# parse

[src/index.js:161-185](https://github.com/zzarcon/gh-emoji/blob/fcb9447252285d4fa0217f72fe4a11dd8f9f67a5/src/index.js#L161-L185 "Source code on GitHub")

Parse text and replace emoji tags with actual emoji symbols.

**Parameters**

-   `text` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Text to parse.
-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options with additional data for parser.
    -   `options.classNames` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** String with custom class names
        added to each emoji, separated with whitespace.

**Examples**

```javascript
import { load as loadEmojis, parse } from 'gh-emoji';

const text = 'Do you believe in :alien:...? :scream:';

loadEmojis().then(() => {
  console.log(parse(text)) // 'Do you believe in 👽...? 😱';
});
```

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Parsed text with emoji image tags in it.
# References

* Github Emoji Api docs: https://developer.github.com/v3/emojis/
* Github Emoji Api: https://api.github.com/emojis
* All Github Emoji icons: https://github.com/scotch-io/All-Github-Emoji-Icons

# Browser Support

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| Latest ✔ | Latest ✔ | IE 9+ ✔ | Latest ✔ | Latest ✔ |

# License

[MIT License](https://tldrlegal.com/license/mit-license) © zzarcon
