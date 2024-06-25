import express from "express";
import Logger from "./startup/logging";
const app = express();

process.on("uncaughtException", (err) => {
  Logger.error(`Uncaught Exception: ${err.message}`);
});

require("./startup/config")();
require("./startup/db").connect();
require("./startup/routes")(app);

const port = process.env.PORT || 3030;
let server: any;

// Ensure server is not already listening
if (!module.parent) {
  server = app.listen(port, () => Logger.info(`Listening on port ${port}...`));
}

// Handle graceful shutdown
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      Logger.info("Server closed gracefully");
    });
  }
});

export default server;
