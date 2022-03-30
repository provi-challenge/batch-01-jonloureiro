import { number } from 'yup';

export function isValidId(id) {
  return number()
    .required()
    .integer()
    .positive()
    .isValidSync(+id);
}
