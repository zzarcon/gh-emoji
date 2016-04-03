import {load, parse} from 'gh-emoji';

document.addEventListener('DOMContentLoaded', init);

function init() {
  load().then((emojis) => {
    console.log(emojis);
  })
}