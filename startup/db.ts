import winston from "winston";
import { Client } from "pg";
import config from "config";
import Logger from "./logging";

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

async function reconnect() {
  Logger.info("Attempting to reconnect to PostgreSQL database");
  try {
    await client.end(); // Close the existing client
  } catch (error) {
    Logger.warn("Error closing existing client during reconnect:", error);
  }
  await connect(); // Reconnect the client
}

export { connect, executeQuery };
