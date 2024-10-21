import { Request, Response } from "express";
import {
  db_insertNewIndigent,
  getIndigentAids,
  getIndigentInfo,
  getIndigentList,
  searchIndignet,
} from "../database/IndigentQueries";
import IApiRes_GetAllIndigents from "../types/api_responses/IApiRes_GetAllIndigents";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";
import IQR_GetAllIndigents from "../types/query_results/IQR_GetAllIndigents";
import { IQR_GetIndigentAids } from "../types/query_results/IQR_GetIndigentAids";
import { IApiRes_GetIndigentDetails } from "../types/api_responses/IApiRes_GetIndigentDetails";
import { IQR_GetIndigentInfo } from "../types/query_results/IQR_GetIndigentInfo";
import { IApiRes_InsertIndigent } from "../types/api_responses/IApiRes_InsertIndigent";
import { IQR_SearchIndigent } from "../types/query_results/IQR_SearchIndigent";

export async function insertIndigent(req: Request, res: Response) {
  const newId: string | null = await db_insertNewIndigent(req.body);

  let response: IApiRes_Global<IApiRes_InsertIndigent> = {
    success: false,
  };

  response.success = true;
  response.data = { newId: newId ?? "0" };

  return res.status(200).send(response);
}

export async function getAllIndigent(req: Request, res: Response) {
  // Getting the indigentList from the database.
  const indigentList: IQR_GetAllIndigents | null = await getIndigentList();

  let response: IApiRes_Global<IApiRes_GetAllIndigents> = {
    success: false,
  };

  response.success = true;
  response.data = indigentList ?? [];

  return res.status(200).send(response);
}

export async function getIndigentDetails(req: Request, res: Response) {
  let response: IApiRes_Global<IApiRes_GetIndigentDetails> = {
    success: false,
  };

  const { id } = req.params;

  // Getting the indigent details from the database.
  const aids: IQR_GetIndigentAids[] | null = await getIndigentAids(id, "2");

  // Getting the indigent info [name, address ....]
  const info: IQR_GetIndigentInfo | null = await getIndigentInfo(id);

  response.success = true;
  response.data = {
    info: info,
    aids: aids ?? [],
  };

  return res.status(200).send(response);
}

export async function searchIndigent(req: Request, res: Response) {
  let response: IApiRes_Global<IQR_SearchIndigent[] | []> = {
    success: false,
  };

  console.log(req.body);

  // Getting the indigent details from the database.
  const result: IQR_SearchIndigent[] | null = await searchIndignet(req.body.name);

  response.success = true;
  response.data = result ?? [];
  return res.status(200).send(response);
}
