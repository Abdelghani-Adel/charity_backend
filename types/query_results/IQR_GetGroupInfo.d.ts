// Interface for each indigent in the group
export interface IQR_Indigent {
  id: number;
  name: string;
}

// Interface for the response of the `get_group_details` function
export interface IQR_GetGroupInfo {
  group_name: string;
  group_description: string;
  indigents: IQR_Indigent[];
}
