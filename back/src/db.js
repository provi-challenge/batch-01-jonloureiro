import { Sequelize } from '@sequelize/core';

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5444/postgres'
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const getDb = () => {
  return sequelize;
};
