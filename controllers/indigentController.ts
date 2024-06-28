import { Request, Response } from "express";
import { getIndigentAids, getIndigentList } from "../database/IndigentQueries";
import IApiRes_GetAllIndigents from "../types/api_responses/IApiRes_GetAllIndigents";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";
import IQR_GetAllIndigents from "../types/query_results/IQR_GetAllIndigents";
import { IQR_GetIndigentAids } from "../types/query_results/IQR_GetIndigentAids";
import { IApiRes_GetIndigentDetails } from "../types/api_responses/IApiRes_GetIndigentDetails";

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
  const orgId = req.body.user.orgId;

  // Getting the indigent details from the database.
  const aids: IQR_GetIndigentAids[] | null = await getIndigentAids(id, orgId);

  response.success = true;
  response.data = {
    info: "",
    aids: aids ?? [],
  };

  return res.status(200).send(response);
}
