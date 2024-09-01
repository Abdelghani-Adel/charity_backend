import { Request, Response } from "express";
import {
  db_addGroup,
  db_addToGroup,
  db_editGroup,
  db_getGroupInfo,
  db_getOrgGroups,
  db_removeFromGroup,
} from "../database/GroupQueries";
import { ApiReq_InsertGroup } from "../types/api_requests/ApiReq_InsertGroup";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";
import { ApiReq_EditGroup } from "../types/api_requests/ApiReq_EditGroup";
import { ApiReq_AddToGroup } from "../types/api_requests/ApiReq_AddToGroup";
import { ApiReq_RemoveFromGroup } from "../types/api_requests/ApiReq_RemoveFromGroup";
import IApiRes_GetOrgGroups from "./../types/api_responses/IApiRes_GetOrgGroups.d";
import IApiRes_GetGroupInfo from "./../types/api_responses/ApiRes_GetGroupInfo.d";

export async function insertGroup(req: Request, res: Response) {
  const reqBody: ApiReq_InsertGroup = req.body;
  await db_addGroup("2", reqBody);
  let response: IApiRes_Global<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function editGroup(req: Request, res: Response) {
  const reqBody: ApiReq_EditGroup = req.body;
  await db_editGroup("2", reqBody);
  let response: IApiRes_Global<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function addToGroup(req: Request, res: Response) {
  const reqBody: ApiReq_AddToGroup = req.body;
  await db_addToGroup("2", reqBody);
  let response: IApiRes_Global<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function removeFromGroup(req: Request, res: Response) {
  const reqBody: ApiReq_RemoveFromGroup = req.body;
  await db_removeFromGroup("2", reqBody);
  let response: IApiRes_Global<null> = {
    success: true,
  };
  return res.status(200).send(response);
}

export async function getGroupInfo(req: Request, res: Response) {
  const reqBody: { groupId: string } = req.body;
  const result: null | IApiRes_GetGroupInfo[] = await db_getGroupInfo("2", reqBody.groupId);

  let response: IApiRes_Global<null | IApiRes_GetGroupInfo[]> = {
    success: true,
    data: result,
  };
  return res.status(200).send(response);
}

export async function getOrgGroups(req: Request, res: Response) {
  const result: null | IApiRes_GetOrgGroups[] = await db_getOrgGroups("2");

  let response: IApiRes_Global<null | IApiRes_GetOrgGroups[]> = {
    success: true,
    data: result,
  };

  return res.status(200).send(response);
}
