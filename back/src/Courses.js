import { getDb } from './db.js';

const db = getDb();

export const Courses = {
  async get(id) {
    if (id) {
      const [[data]] = await db.query(`SELECT * FROM courses WHERE id = ${id}`);
      return data;
    }

    const [data] = await db.query('SELECT * FROM courses');
    return data;
  },
};
