import express, { Express } from "express";
import auth from "../routes/auth";
import cors from "cors";
import uptimerobot from "../routes/uptimerobot";
import indigent from "../routes/indigent";
import { validateToken } from "../middleware/auth";

module.exports = function (app: Express) {
  app.use(express.json());
  app.use(cors());
  app.use("/uptimerobot", uptimerobot);
  app.use("/api/auth", auth);
  app.use(validateToken);
  app.use("/api/indigent", indigent);
};
