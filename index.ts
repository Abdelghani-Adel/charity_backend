import express from "express";
const app = express();

app.get("/ee", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

// import express from "express";
// import Logger from "./startup/logging";
// const app = express();

// process.on("uncaughtException", (err) => {
//   Logger.error(`Uncaught Exception: ${err.message}`);
// });

// require("./startup/config")();
// require("./startup/db").connect();
// require("./startup/routes")(app);

// const port = 3000;
// const server = app.listen(port, () => Logger.info(`Listening on port ${port}...`));

// module.exports = server;
