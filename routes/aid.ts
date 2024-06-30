import express from "express";
import { insertNewAid } from "../controllers/AidsController";
const router = express.Router();

// Add new aid.
router.post("/", insertNewAid);

// Getting the organization's aids list.
router.get("/");

// Getting the aids for specific indigent.

// Edit one of the organization's aid.

export default router;
