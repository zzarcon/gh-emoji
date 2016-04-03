import {load, parse} from './index';
import tapeTest from 'tape';

function before() {

};

function test(title, cb) {
  tapeTest(title, (...args) => {
    before();
    cb(...args);
  });
}

test('Load emojis', assert => {
  load().then((emojis) => {
    assert.pass(!!emojis);
    assert.end();
  });
});