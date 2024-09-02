import express from "express";
import {
  addToGroup,
  getGroupInfo,
  getOrgGroups,
  removeFromGroup,
  editGroup,
  insertGroup,
} from "../controllers/GroupsController";

const router = express.Router();

router.post("/getOrgGroups", getOrgGroups);

router.post("/getGroupInfo", getGroupInfo);

router.post("/removeFromGroup", removeFromGroup);

router.post("/addToGroup", addToGroup);

router.post("/editGroup", editGroup);

router.post("/insertGroup", insertGroup);

export default router;
