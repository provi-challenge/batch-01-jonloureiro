export function isValidCPF(cpf) {
  if (typeof cpf !== 'string') return false;

  const onlyNumbers = cpf.replace(/[^\d]+/g, '');

  if (onlyNumbers.length !== 11 || !!onlyNumbers.match(/(\d)\1{10}/)) {
    return false;
  }

  const formattedCPF = cpf.split('').map(el => +el);

  const rest = count =>
    ((formattedCPF
      .slice(0, count - 12)
      .reduce((sum, el, index) => sum + el * (count - index), 0) *
      10) %
      11) %
    10;

  return rest(10) === formattedCPF[9] && rest(11) === formattedCPF[10];
}
