import { executeQuery } from "../startup/db";
import IQR_GetAllIndigents from "../types/query_results/IQR_GetAllIndigents";
import { IQR_GetIndigentAids } from "../types/query_results/IQR_GetIndigentAids";

export async function getIndigentList(): Promise<IQR_GetAllIndigents | null> {
  const query = `SELECT * FROM get_indigents_with_details();`;
  const result: IQR_GetAllIndigents = await executeQuery(query);
  return result;
}

export async function getIndigentAids(
  indigent_id: string,
  org_id: string
): Promise<IQR_GetIndigentAids[] | null> {
  const query = `SELECT * FROM get_indigent_aids(${indigent_id}, ${org_id});`;
  const result: IQR_GetIndigentAids[] = await executeQuery(query);
  return result;
}

// export async function getIndigentDetails(indigent_id: string): Promise<IQR_GetAllIndigents | null> {
//   const query = `SELECT * FROM get_indigents_with_details();`;
//   const result: IQR_GetAllIndigents = await executeQuery(query);
//   return result;
// }
