import express from "express";
import { getAllIndigent, getIndigentDetails } from "../controllers/indigentController";
const router = express.Router();

// Add new aid.
router.post("/", getAllIndigent);

// Getting the organization's aids list.
router.get("/");

// Getting the aids for specific indigent.

// Edit one of the organization's aid.

export default router;
