type IIndigentRecord = {
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
}[];

export default IIndigentRecord;
