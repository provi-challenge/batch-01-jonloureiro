import { generateDigitsByCpf } from './generateDigitsByCpf.js';

const NUMBER_OF_INSTALLMENTS = Object.freeze([6, 12, 24]);

// Array com 10 valores utilizados como taxas personalizadas
const CUSTOM_LOAN_RATES = Object.freeze(
  Array.from({ length: 10 })
    .map((_, i) => (i + 1) * 3)
    .map(aNumber => +(aNumber * 0.01).toFixed(2))
);

export const generateOffers = function(customerCpf, coursePrice, entry = 0.1) {
  if (
    typeof customerCpf !== 'string' ||
    customerCpf === '' ||
    Number.isNaN(+customerCpf)
  ) {
    throw new Error('O cpf deve ser uma string de números');
  }

  if (
    !coursePrice ||
    (typeof numberOffers !== 'number' && Number.isNaN(+coursePrice)) ||
    (typeof numberOffers !== 'number' && !Number.isInteger(+coursePrice))
  ) {
    throw new Error('Precisa do valor do curso para gerar ofertas');
  }

  if (
    !entry ||
    typeof entry !== 'number' ||
    !(entry === 0.1 || entry === 0.2 || entry === 0.3)
  ) {
    throw new Error('O valor de entrada deve ser 0.1, 0.2 ou 0.3');
  }

  const self = generateOffers;

  const luckyDigits = self._getLuckyDigits(customerCpf);
  const offers = [];

  luckyDigits.forEach((luckyDigit, i) => {
    const installment = NUMBER_OF_INSTALLMENTS[i];
    const installmentValue = Math.round(
      ((coursePrice * (1 - entry)) / installment) *
        (1 + CUSTOM_LOAN_RATES[luckyDigit])
    );
    const discount = +(CUSTOM_LOAN_RATES[luckyDigit] / 3).toFixed(2);
    const totalValue = installment * installmentValue;
    const installmentDiscount = Math.round(discount * installmentValue);
    const totalDiscount = Math.round(totalValue * discount);
    const finalValue = totalValue - totalDiscount;

    const offer = {
      coursePrice: +coursePrice,
      entry: +entry,
      installment,
      installmentValue,
      totalValue,
      discount,
      installmentDiscount,
      totalDiscount,
      finalValue,
    };

    offers.push(offer);
  });

  offers.sort((a, b) => a.installment - b.installment);
  return offers;
};

generateOffers._getLuckyDigits = function(customerCpf) {
  return generateDigitsByCpf(customerCpf, NUMBER_OF_INSTALLMENTS.length);
};
