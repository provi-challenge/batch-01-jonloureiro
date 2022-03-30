import { getDb } from '../../db.js';

const db = getDb();

export const PaymentMethods = {
  async get(id) {
    if (id) {
      const [[data]] = await db.query(
        'SELECT * FROM payment_methods WHERE id = :id',
        {
          replacements: { id },
        }
      );
      return data;
    }

    const [data] = await db.query('SELECT * FROM payment_methods');
    return data;
  },
};
