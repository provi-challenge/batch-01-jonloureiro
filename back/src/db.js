import { Sequelize } from '@sequelize/core';

const { username, password, hostname: host, port, pathname } = process.env
  .DATABASE_URL
  ? new URL(process.env.DATABASE_URL)
  : {};

const database = pathname.slice(1);

const prodConfig =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

const sequelize = new Sequelize({
  username,
  password,
  database,
  host,
  port,
  dialect: 'postgres',
  ...prodConfig,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const getDb = () => sequelize;
