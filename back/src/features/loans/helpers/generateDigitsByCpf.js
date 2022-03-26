/*
 * Função que gera um array com N (número de parcelas) dígitos (0-9) baseado no
 * cpf da pessoa. Esses dígitos serão utilizados para gerar taxas
 * personalizadas. Com ênfase em personalizadas.
 *
 * @param {string} cpf - cpf da pessoa
 * @returns {array} - array com três dígitos
 */
export function generateDigitsByCpf(cpf = '0', numberOffers = 3) {
  if (typeof cpf !== 'string' || Number.isNaN(+cpf)) {
    throw new Error('O cpf deve ser uma string de números');
  }

  if (
    !numberOffers ||
    (typeof numberOffers !== 'number' && Number.isNaN(+numberOffers))
  ) {
    throw new Error('O número de ofertas deve ser um número');
  }

  const allPossibleDigits = cpf.split('').map(Number);
  const digits = [];

  for (
    let i = 0;
    digits.length < numberOffers && i < allPossibleDigits.length;
    i++
  ) {
    const shuffledPosition = ((i + 1) * 3) % allPossibleDigits.length;
    const currentDigit = allPossibleDigits[shuffledPosition];
    if (digits.indexOf(currentDigit) === -1) {
      digits.push(currentDigit);
    }
  }

  while (digits.length < numberOffers) {
    digits.push(9);
  }

  digits.sort((a, b) => a - b);
  return digits;
}
