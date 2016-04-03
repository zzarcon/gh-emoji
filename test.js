import {load, all, exist, getUrl, parse} from './index';
import tapeTest from 'tape';

function before() {

};

function test(title, cb) {
  tapeTest(title, (...args) => {
    before();
    cb(...args);
  });
}

test('load', assert => {
  load().then((emojis) => {
    assert.pass(!!emojis);
    assert.end();
  });
});

test('all', assert => {
  assert.pass(!!all());
  assert.end();
});

test('exist', assert => {
  assert.pass(exist('8ball'));
  assert.pass(exist('aries'));
  assert.pass(!exist('fakeEmoji'));
  assert.end();
});

test('getUrl', assert => {
  assert.pass(getUrl('angel') === 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f47c.png?v6');
  assert.pass(getUrl('baby') === 'https://assets-cdn.github.com/images/icons/emoji/unicode/1f476.png?v6');
  assert.pass(!getUrl('fakeEmoji'));
  assert.end();
});

test('parse', assert => {
  assert.pass(parse(':bicyclist:') === '<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f6b4.png?v6" class="gh-emoji gh-emoji-bicyclist" alt="bicyclist" />');
  assert.pass(parse('foo :barber: bar :bell:').indexOf("https://assets-cdn.github.com/images/icons/emoji/unicode/1f514.png?v6") > -1);
  assert.pass(parse('foo :barber: bar :bell:').indexOf("https://assets-cdn.github.com/images/icons/emoji/unicode/1f488.png?v6") > -1);
  assert.end();
});