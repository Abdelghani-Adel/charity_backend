import { executeQuery } from "../startup/db";
import { IApiRes_InsertAid } from "../types/api_responses/IApiRes_InsertAid";

export async function db_insertNewAid(
  org_id: string,
  ind_id: string,
  aid_type_id: string,
  desc: string,
  isPublic: boolean
): Promise<IApiRes_InsertAid | null> {
  const query = `SELECT insert_aid(${org_id}, ${ind_id}, ${aid_type_id}, '${desc}', ${isPublic});`;
  const result: IApiRes_InsertAid[] | null = await executeQuery(query);
  return result ? result[0] : null;
}
