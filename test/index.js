import { find, load, all, exist, getUrl, parse } from '../src';
import fixtures from './helpers/fixtures';
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
    'returns the same string if no emoji is present'
  );
  assert.ok(parse(':bicyclist:') === '<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f6b4.png?v6" class="gh-emoji gh-emoji-bicyclist" alt="bicyclist" />',
    'string is properly parsed'
  );
  assert.ok(parse(':bicyclist:', testOptions) === '<img src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f6b4.png?v6" class="gh-emoji gh-emoji-bicyclist some crazy string with classes" alt="bicyclist" />',
    'string is properly parsed and passed classes are added to it'
  );
  assert.ok(parse('foo :barber: bar :bell:').includes(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f488.png'),
    'parsed string includes url of emoji'
  );
  assert.ok(parse('sticky:barber: bar :bell:').includes(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f488.png'),
    'parsed string includes url of emoji sticked to another word'
  );
  assert.ok(parse('sticky:barber:sticky :bell:').includes(
    'https://assets-cdn.github.com/images/icons/emoji/unicode/1f488.png'),
    'parsed string includes url of emoji surrounded by two words'
  );
  assert.end();
});

test('emoji regex', assert => {
  assert.equal(find(':-1:').join(), ':-1:',
    'works on emoji with symbol');
  assert.equal(find(':+1:').join(), ':+1:',
    'works on emoji with symbol');
  assert.equal(find(':ab:').join(), ':ab:',
    'works on emoji with letters');

  assert.equal(find(' :-1:').join(), ':-1:',
    'works on emoji with whitespace before it');
  assert.equal(find(':+1: ').join(), ':+1:',
    'works on emoji with whitespace after it');
  assert.equal(find(' :ab: ').join(), ':ab:',
    'works on emoji with whitespace surrounding it');

  assert.equal(find('sticky:-1:').join(), ':-1:',
    'works on emoji with word sticked to it on the left side');
  assert.equal(find(':+1:sticky').join(), ':+1:',
    'works on emoji with word sticked to it on the right side');
  assert.equal(find('sticky:ab:sticky').join(), ':ab:',
    'works on emoji with word sticked to it on the both sides');

  assert.end();
});
