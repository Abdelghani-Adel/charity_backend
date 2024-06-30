import { db_insertNewAid } from "../database/AidQueries";
import { ApiReq_insertAid } from "../types/api_requests/ApiReq_InsertAid";
import { Request, Response } from "express";
import { IApiRes_InsertAid } from "../types/api_responses/IApiRes_InsertAid";
import IApiRes_Global from "../types/api_responses/IApiRes_Global";

export async function insertNewAid(req: Request, res: Response) {
  const reqBody: ApiReq_insertAid = req.body;

  // Getting the indigentList from the database.
  const newId: IApiRes_InsertAid | null = await db_insertNewAid(
    "2",
    reqBody.ind_id,
    reqBody.aid_type_id,
    reqBody.desc,
    reqBody.isPublic
  );

  let response: IApiRes_Global<IApiRes_InsertAid | null> = {
    success: false,
  };

  response.success = true;
  response.data = newId;

  return res.status(200).send(response);
}
