import { executeQuery } from "../startup/db";
import { ApiReq_AddToGroup } from "../types/api_requests/ApiReq_AddToGroup";
import { ApiReq_EditGroup } from "../types/api_requests/ApiReq_EditGroup";
import { ApiReq_RemoveFromGroup } from "../types/api_requests/ApiReq_RemoveFromGroup";
import { ApiReq_InsertGroup } from "./../types/api_requests/ApiReq_InsertGroup.d";
import IApiRes_GetGroupInfo from "./../types/api_responses/ApiRes_GetGroupInfo.d";
import IApiRes_GetOrgGroups from "./../types/api_responses/IApiRes_GetOrgGroups.d";

export async function db_addGroup(org_id: string, newGroup: ApiReq_InsertGroup): Promise<void> {
  const { group_name, description } = newGroup;
  const query = `SELECT add_group(${org_id}, '${group_name}', '${description}');`;
  await executeQuery(query);
}

export async function db_editGroup(org_id: string, group: ApiReq_EditGroup): Promise<void> {
  const { group_id, group_name, description } = group;
  const query = `SELECT edit_group(${group_id}, ${org_id}, '${group_name}', '${description}');`;
  await executeQuery(query);
}

export async function db_addToGroup(org_id: string, req: ApiReq_AddToGroup): Promise<void> {
  const { indigents, group_id } = req;
  const ind_array = indigents.join(", ");
  const query = `SELECT add_indigents_to_group(ARRAY[${ind_array}], ${org_id}, ${group_id});`;
  console.log(query);
  await executeQuery(query);
}

export async function db_removeFromGroup(
  org_id: string,
  req: ApiReq_RemoveFromGroup
): Promise<void> {
  const { indigents, group_id } = req;
  const ind_array = indigents.join(", ");
  const query = `SELECT remove_indigents_from_group(ARRAY[${ind_array}], ${org_id}, ${group_id});`;
  await executeQuery(query);
}

export async function db_getGroupInfo(
  org_id: string,
  groupId: string
): Promise<null | IApiRes_GetGroupInfo> {
  const query = `SELECT * FROM get_group_details(${groupId}, ${org_id});`;
  const result: IApiRes_GetGroupInfo = await executeQuery(query);
  return result;
}

export async function db_getOrgGroups(org_id: string): Promise<null | IApiRes_GetOrgGroups> {
  const query = `SELECT * FROM get_groups_for_organization(${org_id});`;
  const result: IApiRes_GetOrgGroups = await executeQuery(query);
  return result;
}
