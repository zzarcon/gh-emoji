const enpoint = 'https://api.github.com/emojis';
const delimiter_regex = /(\:[\w\.]*\:)/g;
let emojis = null;

export function load() {
  return new Promise((resolve, reject) => {
    if (emojis) return resolve(emojis);

    fetch(enpoint).then(r => r.json()).then((response) => {
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

/**
 * TODO: Suport options
 * TODO: Suport custom classnames
 * @param  {String} text    
 * @param  {Object} options 
 * @return {Promise}         
 */
export function parse(text, options) {
  let output = '';
  output += text.replace(delimiter_regex, (match, text, offset, string) => {
    let id = match.replace(/:/g, '');
    if (exist(id)) {
      let classNames = `gh-emoji gh-emoji-${id}`;
      return `<img src="${getUrl(id)}" class="${classNames}" alt="${id}" />`;
    } else {
      return match;
    }
  });

  return output
};
