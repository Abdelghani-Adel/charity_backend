import express from "express";
import {
  getAidTypeOptions,
  getIndigentOptions,
  getIndigencyTypeOptions,
  getComplaintTypeOptions,
  getGovernorateOptions,
  getCityOptions,
  getDistrictOptions,
} from "../controllers/ListsController";
const router = express.Router();

router.get("/indigent", getIndigentOptions);
router.get("/aid-type", getAidTypeOptions);
router.get("/complaint-type", getComplaintTypeOptions);
router.get("/indigency-type", getIndigencyTypeOptions);
router.get("/governorate", getGovernorateOptions);
router.get("/city", getCityOptions);
router.get("/district", getDistrictOptions);

export default router;
