import { load, all, exist, getUrl, parse } from './gh-emoji';
import fixtures from './fixtures';
import fetchMock from 'fetch-mock';
import test from 'tape';

fetchMock.mock('https://api.github.com/emojis', 'GET', fixtures);

test('all() before load()', assert => {
  assert.equal(all(), null, 'must return null');
  assert.end();
});

test('load', assert => {
  load().then(emojis => {
    assert.equal(typeof emojis, 'object', 'must resolve Object with emojis');
    assert.end();
  });
});

test('all() after load()', assert => {
  assert.equal(typeof all(), 'object', 'must return Object with emojis');
  assert.end();
});

test('exist', assert => {
  assert.ok(exist('8ball'), '8ball emoji exists');
  assert.ok(exist('aries'), 'aries emoji exists');
  assert.ok(!exist('fakeEmoji'), 'fakeEmoji emoji does not exists');
  assert.end();
});

test('getUrl', assert => {
  assert.ok(getUrl('angel').startsWith(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f47c.png'),
    'angel emoji must return url'
  );
  assert.ok(getUrl('baby').startsWith(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f476.png'),
    'baby emoji must return url'
  );
  assert.ok(!getUrl('fakeEmoji'), 'fakeEmoji emoji must not return url');
  assert.end();
});

test('parse', assert => {
  const testOptions = { classNames: 'some crazy  string with      classes' };

  assert.ok(parse('No emoji present') === 'No emoji present',
    'return the same string if no emoji is present'
  );
  assert.ok(parse(':bicyclist:') === '<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f6b4.png?v6" class="gh-emoji gh-emoji-bicyclist" alt="bicyclist" />',
    'string is properly parsed'
  );
  assert.ok(parse(':bicyclist:', testOptions) === '<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f6b4.png?v6" class="gh-emoji gh-emoji-bicyclist some crazy string with classes" alt="bicyclist" />',
    'string is properly parsed and passed classes are added to it'
  );
  assert.ok(parse('foo :barber: bar :bell:').includes(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f514.png'),
    'parsed string includes url of emoji'
  );
  assert.ok(parse('foo :barber: bar :bell:').includes(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f488.png'),
    'parsed string includes url of emoji'
  );
  assert.end();
});
