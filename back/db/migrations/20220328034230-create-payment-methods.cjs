module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS payment_methods (
        id SERIAL PRIMARY KEY,
        method character varying(255) NOT NULL UNIQUE,
        created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      INSERT INTO payment_methods(method) VALUES
      ('credit_card'), ('debit_card');
    `);
  },

  async down(queryInterface) {
    return queryInterface.dropTable('payment_methods');
  },
};
