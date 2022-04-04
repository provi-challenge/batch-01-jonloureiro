module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS loans (
        id SERIAL PRIMARY KEY,
        course_id INTEGER NOT NULL REFERENCES courses (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        customer_id INTEGER NOT NULL REFERENCES customers (id) ON DELETE RESTRICT ON UPDATE CASCADE,
        course_price_on_loan_date BIGINT NOT NULL,
        entry_in_percentage SMALLINT NOT NULL,
        installment SMALLINT NOT NULL,
        installment_value BIGINT NOT NULL,
        created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
  },

  async down(queryInterface) {
    return queryInterface.dropTable('loans');
  },
};
