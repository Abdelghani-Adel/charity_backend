import { Request, Response } from "express";

import { executeQuery } from "../startup/db";
import { IApiRes_GetListOptions } from "../types/api_responses/IApiRes_GetListOptions";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";
import { IQR_GetAllIndigencyTypes } from "../types/query_results/IQR_GetAllIndigencyTypes";

export async function getIndigencyTypes(req: Request, res: Response) {
  const query = `SELECT * from indigency_type;`;
  const result: IQR_GetAllIndigencyTypes[] | null = await executeQuery(query);

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
