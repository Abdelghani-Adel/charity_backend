import express from "express";
import { getAllIndigent } from "../controllers/indigentController";
const router = express.Router();

// getting the indigent list
router.get("/", getAllIndigent);

// getting the details of single indgent [info, aids]
router.get("/:id");

export default router;
