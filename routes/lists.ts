import express from "express";
import { getIndigencyTypes } from "../controllers/ListsController";
const router = express.Router();

// getting the indigent list
router.get("/indigency-type", getIndigencyTypes);

export default router;
