export function isValidCardExpirationDate(date) {
  if (typeof date !== 'string') return false;

  const [month, year] = date.split('/');

  if (month.length !== 2 || year.length !== 2) return false;

  const monthNumber = parseInt(month, 10);
  const yearNumber = parseInt(year, 10);

  if (monthNumber < 1 || monthNumber > 12) return false;

  const currentYear = new Date().getFullYear() % 100;

  if (yearNumber < currentYear) return false;

  if (yearNumber === currentYear && monthNumber < new Date().getMonth() + 1)
    return false;

  return true;
}
