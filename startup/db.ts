import winston from "winston";
import { Client } from "pg";
import config from "config";
import Logger from "./logging";
import { setInterval } from "timers";

const client = new Client({
  host: config.get("dbhost"),
  database: config.get("dbname"),
  user: config.get("dbuser"),
  password: config.get("dbpass"),
  port: config.get("dbport"),
  ssl: {
    rejectUnauthorized: false, // This will ignore self-signed certificates. For production, ensure you use a proper certificate.
  },
});

async function connect() {
  try {
    await client.connect();
    Logger.info("Connected to PostgreSQL database");
    keepAlive();
  } catch (error) {
    Logger.error("Error connecting to PostgreSQL database:", error);
  }
}

async function executeQuery(query: string) {
  try {
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    Logger.error("Error executing query:", error);
    throw error;
  }
}

function keepAlive() {
  setInterval(async () => {
    try {
      await client.query("SELECT * FROM aid_type;");
    } catch (error) {
      Logger.error("Error executing keep-alive query:", error);
    }
  }, 240000);
}

export { connect, executeQuery };
