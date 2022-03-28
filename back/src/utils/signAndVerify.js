import { createSign, createVerify } from 'crypto';

import { PUBLIC_KEY, PRIVATE_KEY } from '../config.js';

export function toSign(data) {
  const sign = createSign('rsa-sha256');
  sign.update(data);
  return sign.sign(PRIVATE_KEY, 'hex');
}

export function toVerify(data, signature) {
  const verify = createVerify('rsa-sha256');
  verify.update(data);
  return verify.verify(PUBLIC_KEY, signature, 'hex');
}
