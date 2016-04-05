const enpoint = 'https://api.github.com/emojis';
const delimiterRegex = /(\:[\w\-\+]+\:)/g;
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

export function parse(text) {
  let output = '';
  output += text.replace(delimiterRegex, (match) => {
    const id = match.replace(/:/g, '');
    if (exist(id)) {
      const classNames = `gh-emoji gh-emoji-${id}`;
      return `<img src="${getUrl(id)}" class="${classNames}" alt="${id}" />`;
    }
    return match;
  });

  return output;
}
