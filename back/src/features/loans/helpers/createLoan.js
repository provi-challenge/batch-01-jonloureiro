import { object, string, number } from 'yup';
import { toVerify } from '../../../utils/signAndVerify.js';

function validSignature(input) {
  const [dataBase64, signature] = input.split('.');
  return toVerify(dataBase64, signature);
}

/*
 * DUPLICATE CODE
 */
const duplicateFunctions = {
  isValidCvv(cvv) {
    if (
      !string()
        .required()
        .length(3)
        .isValidSync(cvv)
    ) {
      return false;
    }
    return cvv.replace(/[^\d]+/g, '').length === 3;
  },
  ValidCardNumber(cardNumber) {
    const formattedCard = cardNumber.split(' ').join('');
    if (
      !string()
        .required()
        .length(16)
        .isValidSync(formattedCard)
    ) {
      return false;
    }

    return formattedCard.replace(/[^\d]+/g, '').length === 16;
  },
  isValidCardExpirationDate(date) {
    if (typeof date !== 'string') return false;

    const [month, year] = date.split('/');

    if (month.length !== 2 || year.length !== 2) return false;

    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);

    if (monthNumber < 1 || monthNumber > 12) return false;

    const currentYear = new Date().getFullYear() % 100;

    if (yearNumber < currentYear) return false;

    if (yearNumber === currentYear && monthNumber < new Date().getMonth() + 1) {
      return false;
    }

    return true;
  },
};
/*
 * end of DUPLICATE CODE
 */

const loanSchema = object({
  course_id: number()
    .required()
    .integer()
    .positive(),
  customer_id: number()
    .required()
    .integer()
    .positive(),
  loan_number: number()
    .required()
    .integer()
    .positive(),
  signature: string()
    .required()
    .test('invalid', validSignature),
  payment: object({
    card_holder_name: string()
      .required()
      .trim(),
    card_number: string()
      .required()
      .test('invalid', duplicateFunctions.ValidCardNumber),
    card_expiration_date: string()
      .required()
      .test('invalid', duplicateFunctions.isValidCardExpirationDate),
    card_cvv: string()
      .required()
      .test('invalid', duplicateFunctions.isValidCvv),
    payment_method_id: number()
      .required()
      .integer()
      .positive(),
  }),
});

export const createLoan = async data => {
  try {
    const loan = await loanSchema.validate(data);
    return loan;
  } catch (error) {
    return {
      error: {
        field: error.path || 'unknown',
        type: error.type || 'unknown',
      },
    };
  }
};
