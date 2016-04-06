/* @flow */

import { load } from './dist/gh-emoji.js';


// Flowtype should report this as an error
const test: Promise<string> = load();

test.then((result) => console.log(test)); //eslint-disable-line
