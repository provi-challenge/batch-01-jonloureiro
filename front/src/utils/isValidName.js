import { string } from 'yup';

export function isValidName(name) {
  return string().required().trim().isValidSync(name);
}
