import { object, string } from 'yup';

import { isValidCPF } from '../../../utils/isValidCPF.js';

const customerSchema = object({
  name: string()
    .required()
    .trim(),
  cpf: string()
    .required()
    .trim()
    .length(11)
    .test('invalid', isValidCPF),
  email: string()
    .required()
    .email(),
});

export const createCustomer = async data => {
  try {
    const customer = await customerSchema.validate(data);
    return customer;
  } catch (error) {
    return {
      error: {
        field: error.path || 'unknown',
        type: error.type || 'unknown',
      },
    };
  }
};
