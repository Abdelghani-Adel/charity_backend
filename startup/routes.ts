import express, { Express } from "express";
import auth from "../routes/auth";
import cors from "cors";
import indigent from "../routes/indigent";
import indigentGroups from "../routes/indigentGroups";
import aid from "../routes/aid";
import lists from "../routes/options-list";
import bodyParser from "body-parser";
import { validateToken } from "../middleware/auth";

module.exports = function (app: Express) {
  app.get("/", (req, res) => res.send("Express on Vercel"));
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/api/auth", auth);
  app.use(validateToken);
  app.use("/api/indigent", indigent);
  app.use("/api/indigentGroups", indigentGroups);
  app.use("/api/aid", aid);
  app.use("/api/options-list", lists);
};
