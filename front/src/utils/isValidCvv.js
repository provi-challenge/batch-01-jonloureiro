import { string } from 'yup';

export function isValidCvv(cvv) {
  if (!string().required().length(3).isValidSync(cvv)) return false;

  return cvv.replace(/[^\d]+/g, '').length === 3;
}
