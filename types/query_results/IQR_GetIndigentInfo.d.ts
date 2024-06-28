export interface IQR_GetIndigentInfo {
  indigent_id: number;
  national_id: string;
  name: string;
  phone: string | null;
  kids: number | null;
  indigency_type_name: string;
  governorate_name: string;
  city_name: string;
  district_name: string;
  address: string | null;
}
