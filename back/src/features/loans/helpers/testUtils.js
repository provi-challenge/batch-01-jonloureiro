export function generateRandomCpfEntries() {
  return Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join(
    ''
  );
}

export function generateLuckyDigitsCombination(numberOfOffers) {
  const luckyDigits = [];
  for (let i = 0; i < numberOfOffers; i++) {
    for (let j = 0; j < numberOfOffers; j++) {
      for (let k = 0; k < numberOfOffers; k++) {
        luckyDigits.push(Object.freeze([i, j, k]));
      }
    }
  }

  return Object.freeze(luckyDigits);
}
