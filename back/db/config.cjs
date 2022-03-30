require('dotenv').config();

const { username, password, hostname: host, port, pathname } = process.env
  .DATABASE_URL
  ? new URL(process.env.DATABASE_URL)
  : {};

const database = pathname.slice(1);

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'postgres',
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
