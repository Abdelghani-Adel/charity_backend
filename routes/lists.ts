import express from "express";
import { getIndigencyListOption, getIndigencyTypes } from "../controllers/ListsController";
const router = express.Router();

router.get("/indigency-type", getIndigencyTypes);
router.get("/indigent", getIndigencyListOption);

export default router;
