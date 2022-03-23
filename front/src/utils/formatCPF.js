export function formatCPF(cpf) {
  if (typeof cpf !== 'string') return '';
  return cpf.replace(/[^\d]+/g, '');
}
