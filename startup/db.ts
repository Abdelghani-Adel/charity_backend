import winston from "winston";
import { Pool } from "pg";
import config from "config";
import Logger from "./logging";
import { setInterval } from "timers";

const pool = new Pool({
  host: "ep-old-bread-a2lm4bqw-pooler.eu-central-1.aws.neon.tech",
  database: "charities",
  user: "default",
  password: "rg8GaYK7wsbf",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 10, // Adjust based on your database connection limit
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// const client = new Client({
//   host: config.get("dbhost"),
//   database: config.get("dbname"),
//   user: config.get("dbuser"),
//   password: config.get("dbpass"),
//   port: config.get("dbport"),
// });

// const client = new Client({
//   host: "ep-old-bread-a2lm4bqw-pooler.eu-central-1.aws.neon.tech",
//   database: "charities",
//   user: "default",
//   password: "rg8GaYK7wsbf",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false, // This will ignore self-signed certificates. For production, ensure you use a proper certificate.
//   },
// });

async function connect() {
  try {
    const client = await pool.connect();
    Logger.info("Connected to PostgreSQL database");
    return client;
  } catch (error) {
    Logger.error("Error connecting to PostgreSQL database:", error);
    throw error;
  }
}

async function executeQuery(query: string) {
  const client = await connect();
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    Logger.error("Error executing query:", error);
    throw error;
  } finally {
    client.release();
  }
}

function keepAlive() {
  setInterval(async () => {
    try {
      const client = await connect();
      await client.query("SELECT * FROM aid_type;");
    } catch (error) {
      Logger.error("Error executing keep-alive query:", error);
    }
  }, 240000);
}

export { connect, executeQuery };
