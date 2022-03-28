import test from 'ava'; // eslint-disable-line

import { toSign, toVerify } from './signAndVerify.js';

test('Assinar e verificar', t => {
  const data = JSON.stringify({ name: 'teste' });
  const signature = toSign(data);
  const actual = toVerify(data, signature);
  t.is(actual, true);
});
