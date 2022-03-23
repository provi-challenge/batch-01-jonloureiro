import { string } from 'yup';

export function isValidEmail(email) {
  return string().required().email().isValidSync(email);
}
