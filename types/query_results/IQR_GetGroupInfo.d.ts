// Interface for each indigent in the group
export interface IQR_Indigent {
  indigent_id: number;
  national_id: string;
  indigent_name: string;
  phone: string | null;
  kids: number | null;
  indigency_type_name: string;
  governorate_name: string;
  city_name: string;
  district_name: string;
  address: string | null;
  is_active: boolean;
}

// Interface for the response of the `get_group_details` function
export interface IQR_GetGroupInfo {
  group_name: string;
  group_description: string;
  indigents: IQR_Indigent[];
}
