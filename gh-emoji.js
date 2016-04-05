const enpoint = 'https://api.github.com/emojis';
const delimiterRegex = /(\:[\w\.]*\:)/g;
let emojis = null;

export function load() {
  return new Promise((resolve) => {
    if (emojis) return resolve(emojis);

    return fetch(enpoint).then(r => r.json()).then((response) => {
      emojis = response;
      resolve(emojis);
    });
  });
}

export function all() {
  return emojis;
}

export function exist(emojiId) {
  return !!all()[emojiId];
}

export function getUrl(emojiId) {
  return all()[emojiId];
}

export function parse(text, options = {}) {
  let output = '';
  const customClassNames = options.classNames ? options.classNames.trim().split(/\s+/) : '';

  output += text.replace(delimiterRegex, match => {
    const name = match.replace(/:/g, '');
    const classNames = ['gh-emoji', `gh-emoji-${name}`];

    if (!exist(name)) {
      return match;
    }

    if (customClassNames) {
      classNames.push(...customClassNames);
    }

    const imageSrc = getUrl(name);
    const imageClass = classNames.join(' ');
    const imageAlt = name;

    return `<img src="${imageSrc}" class="${imageClass}" alt="${imageAlt}" />`;
  });

  return output;
}
