import { IGroupDetailsRecord } from "../interfaces/database/IGroupDetailsRecord";
import { IGroupListRecord } from "../interfaces/database/IGroupListRecord";
import { IAddToGroupRequest } from "../interfaces/requests/IAddToGroupRequest";
import { IEditGroupRequest } from "../interfaces/requests/IEditGroupRequest";
import { IInsertGroupRequest } from "../interfaces/requests/IInsertGroupRequest";
import { IRemoveFromGroupRequest } from "../interfaces/requests/IRemoveFromGroupRequest";
import { executeQuery } from "../startup/db";

export async function dbCreateGroup(org_id: string, newGroup: IInsertGroupRequest): Promise<void> {
  const { group_name, description } = newGroup;
  const query = `SELECT group_create(${org_id}, '${group_name}', '${description}');`;
  await executeQuery(query);
}

export async function dbEditGroup(org_id: string, group: IEditGroupRequest): Promise<void> {
  const { group_id, group_name, description } = group;
  const query = `SELECT group_edit(${group_id}, ${org_id}, '${group_name}', '${description}');`;
  await executeQuery(query);
}

export async function dbAddToGroup(org_id: string, req: IAddToGroupRequest): Promise<void> {
  const { indigents, group_id } = req;
  const ind_array = indigents.join(", ");
  const query = `SELECT group_add_indigents(ARRAY[${ind_array}], ${org_id}, ${group_id});`;
  console.log(query);
  await executeQuery(query);
}

export async function dbRemoveFromGroup(
  org_id: string,
  req: IRemoveFromGroupRequest
): Promise<void> {
  const { indigents, group_id } = req;
  const ind_array = indigents.join(", ");
  const query = `SELECT group_remove_indigents(ARRAY[${ind_array}], ${org_id}, ${group_id});`;
  await executeQuery(query);
}

export async function dbGetGroupDetails(
  org_id: string,
  groupId: string
): Promise<null | IGroupDetailsRecord[]> {
  const query = `SELECT * FROM group_details(${org_id}, ${groupId});`;
  const result: IGroupDetailsRecord[] = await executeQuery(query);
  return result;
}

export async function dbGetGroupList(org_id: string): Promise<null | IGroupListRecord[]> {
  const query = `SELECT * FROM group_list(${org_id});`;
  const result: IGroupListRecord[] = await executeQuery(query);
  return result;
}
