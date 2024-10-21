import { executeQuery } from "../startup/db";
import { ApiReq_InsertIndigent } from "../types/api_requests/ApiReq_InsertIndigent";
import IQR_GetAllIndigents from "../types/query_results/IQR_GetAllIndigents";
import { IQR_GetIndigentAids } from "../types/query_results/IQR_GetIndigentAids";
import { IQR_GetIndigentInfo } from "../types/query_results/IQR_GetIndigentInfo";
import { IQR_SearchIndigent } from "../types/query_results/IQR_SearchIndigent";

export async function db_insertNewIndigent(
  newIndigent: ApiReq_InsertIndigent
): Promise<string | null> {
  const {
    national_id,
    name,
    phone,
    kids,
    indigency_type_id,
    governorate_id,
    city_id,
    district_id,
    address,
  } = newIndigent;
  const query = `SELECT insert_indigent('${national_id}', '${name}', '${phone}', ${kids}, ${indigency_type_id}, ${governorate_id}, ${city_id}, ${district_id}, '${address}');`;
  const result: string[] = await executeQuery(query);
  return result[0];
}

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

export async function getIndigentInfo(indigent_id: string): Promise<IQR_GetIndigentInfo | null> {
  const query = `SELECT * FROM get_indigent_info(${indigent_id});`;
  const result: IQR_GetIndigentInfo[] = await executeQuery(query);
  return result ? result[0] : null;
}

export async function searchIndignet(name: string): Promise<IQR_SearchIndigent[] | null> {
  const query = `select id, name from indigent where name like '%${name}%'`;
  const result: IQR_SearchIndigent[] = await executeQuery(query);
  return result;
}
