import { string } from 'yup';

export function isValidCardNumber(cardNumber) {
  const formattedCard = cardNumber.split(' ').join('');
  if (!string().required().length(16).isValidSync(formattedCard)) return false;

  return formattedCard.replace(/[^\d]+/g, '').length === 16;
}
