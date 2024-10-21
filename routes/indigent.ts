import express from "express";
import {
  getAllIndigent,
  getIndigentDetails,
  insertIndigent,
  searchIndigent,
} from "../controllers/indigentController";
const router = express.Router();

// getting the indigent list
router.get("/", getAllIndigent);

// getting the indigent list
router.post("/", insertIndigent);

// getting the details of single indgent [info, aids]
router.get("/:id", getIndigentDetails);

router.post("/search", searchIndigent);

export default router;
