import {load as loadEmojis, parse as parseEmojis, all} from 'gh-emoji';
import TextComplete from 'textcomplete';
import TextArea from 'textcomplete/lib/textarea';

const AUTOCOMPLETE_COUNT = 5;

document.addEventListener('DOMContentLoaded', init);

function init() {
  const editorElem = document.getElementById('editor');

  loadEmojis()
    .then(renderEditor)
    .then(() => editorElem.addEventListener('keyup', onKeyup))
    .then(autocomplete);
}

function renderEditor() {
  let editor = document.getElementById('editor');
  let preview = document.getElementById('preview');

  preview.innerHTML = parseEmojis(editor.value);
}

function onKeyup() {
  renderEditor();
}

function autocomplete() {
  const unfinishedEmojiRegex = /(^|\s)[^:]*:(\w+)$/;
  const emojiNames = Object.keys(all());

  const editorElement = document.getElementById('editor');
  const editor = new TextArea(editorElement);

  const textcomplete = new TextComplete(editor, {
    dropdown: {
      maxCount: AUTOCOMPLETE_COUNT
    }
  });

  textcomplete.register([{
    match: unfinishedEmojiRegex,
    search(term, callback) {
      callback(
        emojiNames
          .filter(emoji => emoji.startsWith(term))
          .map(emoji => `:${emoji}: ${parseEmojis(`:${emoji}:`)}`)
          .sort()
      );
    }
  }]);
}
