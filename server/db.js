const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config()

const { Pool } = require("pg");

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const ssl =
  process.env.SSL_FILES == 0
    ? {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CA,
        key: process.env.DB_SSL_KEY,
        cert: process.env.DB_SSL_CERT,
      }
    : {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.DB_SSL_CA).toString(),
        key: fs.readFileSync(process.env.DB_SSL_KEY).toString(),
        cert: fs.readFileSync(process.env.DB_SSL_CERT).toString(),
      };

const pool = new Pool({
  connectionString: connectionString,
  ssl: ssl,
});

module.exports = { pool };

require("make-runnable");
