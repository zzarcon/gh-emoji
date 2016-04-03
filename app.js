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