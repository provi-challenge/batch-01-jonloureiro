import { getDb } from '../../db.js';

const db = getDb();

export const Customers = {
  async post() {
    const [data] = await db.query('SELECT * FROM customers');
    return data;
  },
};
