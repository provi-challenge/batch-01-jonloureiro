const NUMBER_OF_INSTALLMENTS = [6, 12, 24];

// Array com 10 valores utilizados para como taxas personalizadas
const CUSTOM_LOAN_RATES = Array.from({ length: 10 })
  .map((_, i) => (i + 1) * 3)
  .map(aNumber => +(aNumber * 0.01).toFixed(2));

/*
 * Função que gera um array com três dígitos (0-9) baseado no cpf da pessoa.
 * Esses dígitos serão utilizados para gerar taxas personalizadas. Com ênfase em
 * personalizadas.
 *
 * @param {string} cpf - cpf da pessoa
 * @returns {array} - array com três dígitos
 */
function generateThreeDifferentDigitsByCpf(cpf) {
  const allPossibleDigits = cpf.split('').map(Number);
  const threeDifferentDigits = [];

  for (
    let i = 0;
    threeDifferentDigits.length < NUMBER_OF_INSTALLMENTS.length &&
    i < allPossibleDigits.length;
    i++
  ) {
    const currentDigit =
      allPossibleDigits[((i + 1) * 3) % allPossibleDigits.length];
    if (threeDifferentDigits.indexOf(currentDigit) === -1) {
      threeDifferentDigits.push(currentDigit);
    }
  }

  threeDifferentDigits.sort((a, b) => a - b);
  return threeDifferentDigits;
}

/*
 * Um algoritmo determinístico para gerar ofertas de empréstimo baseado em um
 * CPF e um valor do curso.
 * Devolve um array com três possíveis parcelas de um empréstimo com os campos
 * `coursePrice`, `entry`, `installment`, `installmentValue`, `totalValue`,
 * `discount`, `installmentDiscount`, `totalDiscount` e `finalValue`.
 *
 * @param {string} customerCpf - cpf da pessoa
 * @param {string} coursePrice - preço do curso
 * @param {number} entry - entrada do empréstimo em percentagem (0-1)
 * @returns {Array} - array com três ofertas de empréstimo.
 */
export function generateOffers(customerCpf, coursePrice, entry = 0) {
  const luckyDigits = generateThreeDifferentDigitsByCpf(customerCpf);
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
      coursePrice,
      entry,
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
}
