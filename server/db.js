const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@
${process.env.DB_HOST}/${process.env.DB_DATABASE}`;

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

const sql_initial_commands = fs
  .readFileSync("./source/db.pgsql")
  .toString()
  .split(";");

pool.connect(async (err, client, release) => {
  if (err) {
    return console.error("[DB] Error acquiring client", err.stack);
  } else {
    console.info("[DB] Connected successfully!");
  }

  console.log("[DB] Initial setup...");
  for (command in sql_initial_commands) {
    const sql = sql_initial_commands[command].trim();
    client.query(sql, (err, result) => {
      if (err) {
        console.warn("[DB] WARN: ", err.message);
      } else {
        console.log(
          `[DB] Query '${sql.substring(0, 35)}'... processed successfully`
        );
      }
    });
  }
  release();
  console.log("[DB] Done. Connection released.");
});

module.exports = { pool };

require("make-runnable");
