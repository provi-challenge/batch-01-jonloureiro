const PUBLIC_KEY_BASE64 = process.env.PUBLIC_KEY;
const PRIVATE_KEY_BASE64 = process.env.PRIVATE_KEY;

export const PUBLIC_KEY = Buffer.from(PUBLIC_KEY_BASE64, 'base64').toString();
export const PRIVATE_KEY = Buffer.from(PRIVATE_KEY_BASE64, 'base64').toString();
