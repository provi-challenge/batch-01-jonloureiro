import { getDb } from '../../db.js';

const db = getDb();

export const Customers = {
  async post({ name, email, cpf }) {
    const [[data]] = await db.query(
      'INSERT INTO customers(name, email, cpf) VALUES (:name, :email, :cpf) ON CONFLICT (cpf) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, updated_at = NOW() RETURNING *;',
      {
        replacements: { name, email, cpf },
      }
    );
    return data;
  },
  async get(id) {
    if (id) {
      const [[data]] = await db.query(
        'SELECT * FROM customers WHERE id = :id',
        {
          replacements: { id },
        }
      );
      return data;
    }

    const [data] = await db.query('SELECT * FROM customers');
    return data;
  },
};
