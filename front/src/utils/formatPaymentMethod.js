export function formatPaymentMethod(method) {
  switch (method) {
    case 'credit_card':
      return 'Crédito';
    case 'debit_card':
      return 'Débito';
    default:
      return '???';
  }
}
