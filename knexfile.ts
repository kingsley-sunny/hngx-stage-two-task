// Update with your config settings.

import { config } from "dotenv";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

config();

const { HOST, DATABASE_PORT, DATABASE_USER, PASSWORD, DATABASE_NAME } = process.env as any;

const knexConfig = {
  development: {
    client: "pg",
    connection: {
      host: HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      database: DATABASE_NAME,
      password: PASSWORD,
    },
    migrations: {
      extension: "ts",
      directory: "src/migrations",
    },
  },
};

module.exports = knexConfig;
