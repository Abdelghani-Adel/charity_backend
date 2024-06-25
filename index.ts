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
if (require.main === module) {
  // Ensure this is the main module
  app.listen(port, () => Logger.info(`Listening on port ${port}...`));
}

export default app;
