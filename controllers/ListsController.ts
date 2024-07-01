import { Request, Response } from "express";

import { executeQuery } from "../startup/db";
import { IApiRes_GetListOptions } from "../types/api_responses/IApiRes_GetListOptions";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";
import { IQR_GetList } from "../types/query_results/IQR_GetList";

export async function getIndigentOptions(req: Request, res: Response) {
  const query = `SELECT id, name FROM indigent;`;
  return getOptionsList(query, res);
}

export async function getIndigencyTypeOptions(req: Request, res: Response) {
  const query = `SELECT id, name FROM indigency_type;`;
  return getOptionsList(query, res);
}

export async function getAidTypeOptions(req: Request, res: Response) {
  const query = `SELECT id, name FROM aid_type;`;
  return getOptionsList(query, res);
}

export async function getComplaintTypeOptions(req: Request, res: Response) {
  const query = `SELECT id, name FROM complaint_type;`;
  return getOptionsList(query, res);
}

export async function getGovernorateOptions(req: Request, res: Response) {
  const query = `SELECT id, name FROM governorate;`;
  return getOptionsList(query, res);
}

export async function getCityOptions(req: Request, res: Response) {
  const { id } = req.params;
  const query = `SELECT id, name FROM city where governorate_id = ${id};`;
  return getOptionsList(query, res);
}

export async function getDistrictOptions(req: Request, res: Response) {
  const { id } = req.params;
  const query = `SELECT id, name FROM district where city_id = ${id};`;
  return getOptionsList(query, res);
}

async function getOptionsList(query: string, res: Response) {
  const result: IQR_GetList[] | null = await executeQuery(query);

  let response: IApiRes_Global<IApiRes_GetListOptions[]> = {
    success: false,
  };

  if (result) {
    response.success = true;
    response.data = result.map((row: any) => ({
      value: row.id,
      label: row.name,
    }));
  }

  return res.status(200).send(response);
}
