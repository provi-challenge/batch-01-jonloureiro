import { sendOk } from './sendOk.js';

export const sendData = (res, data, options, statusCode) =>
  sendOk(res, { ...options, data }, statusCode);
