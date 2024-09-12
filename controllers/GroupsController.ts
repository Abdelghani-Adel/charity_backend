import { Request, Response } from "express";
import {
  dbCreateGroup,
  dbAddToGroup,
  dbEditGroup,
  dbGetGroupDetails,
  dbGetGroupList,
  dbRemoveFromGroup,
} from "../database/GroupQueries";
import { IGroupDetailsRecord } from "../interfaces/database/IGroupDetailsRecord";
import { IGroupListRecord } from "../interfaces/database/IGroupListRecord";
import { IEditGroupRequest } from "../interfaces/requests/IEditGroupRequest";
import { IInsertGroupRequest } from "../interfaces/requests/IInsertGroupRequest";
import { IRemoveFromGroupRequest } from "../interfaces/requests/IRemoveFromGroupRequest";
import IGlobalResponse from "../interfaces/responses/IGlobalResponse";
import { IAddToGroupRequest } from "../interfaces/requests/IAddToGroupRequest";

export async function insertGroup(req: Request, res: Response) {
  const reqBody: IInsertGroupRequest = req.body;

  await dbCreateGroup("2", reqBody);
  let response: IGlobalResponse<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function editGroup(req: Request, res: Response) {
  const reqBody: IEditGroupRequest = req.body;
  await dbEditGroup("2", reqBody);
  let response: IGlobalResponse<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function addToGroup(req: Request, res: Response) {
  const reqBody: IAddToGroupRequest = req.body;
  await dbAddToGroup("2", reqBody);
  let response: IGlobalResponse<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function removeFromGroup(req: Request, res: Response) {
  const reqBody: IRemoveFromGroupRequest = req.body;
  await dbRemoveFromGroup("2", reqBody);
  let response: IGlobalResponse<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function getGroupInfo(req: Request, res: Response) {
  const reqBody: { groupId: string } = req.body;
  const result: null | IGroupDetailsRecord[] = await dbGetGroupDetails("2", reqBody.groupId);

  let response: IGlobalResponse<null | IGroupDetailsRecord> = {
    success: true,
    data: result ? result[0] : null,
  };
  return res.status(200).send(response);
}

export async function getOrgGroups(req: Request, res: Response) {
  const result: null | IGroupListRecord[] = await dbGetGroupList("2");

  let response: IGlobalResponse<null | IGroupListRecord[]> = {
    success: true,
    data: result,
  };

  return res.status(200).send(response);
}
