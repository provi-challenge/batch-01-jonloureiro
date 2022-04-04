import { getDb } from '../../db.js';

const db = getDb();

export const Loans = {
  async post({
    courseId,
    coursePriceOnLoanDate,
    customerId,
    entryInPercentage,
    installment,
    installmentValue,
  }) {
    const [[data]] = await db.query(
      'INSERT INTO loans(course_id, course_price_on_loan_date, customer_id, entry_in_percentage, installment, installment_value) VALUES (:course_id, :course_price_on_loan_date, :customer_id, :entry_in_percentage, :installment, :installment_value) RETURNING *;',
      {
        replacements: {
          course_id: courseId,
          course_price_on_loan_date: coursePriceOnLoanDate,
          customer_id: customerId,
          entry_in_percentage: entryInPercentage,
          installment,
          installment_value: installmentValue,
        },
      }
    );
    return data;
  },
  async get(id) {
    if (id) {
      const [[data]] = await db.query('SELECT * FROM loans WHERE id = :id', {
        replacements: { id },
      });
      return data;
    }

    const [data] = await db.query('SELECT * FROM loans');
    return data;
  },
};
