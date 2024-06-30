import express from "express";
import {
  getAidTypes,
  getIndigencyListOption,
  getIndigencyTypes,
} from "../controllers/ListsController";
const router = express.Router();

router.get("/indigency-type", getIndigencyTypes);
router.get("/indigent", getIndigencyListOption);
router.get("/aid-type", getAidTypes);

export default router;
