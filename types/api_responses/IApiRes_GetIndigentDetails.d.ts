import { IQR_GetIndigentAids } from "../query_results/IQR_GetIndigentAids";

export interface IApiRes_GetIndigentDetails {
  info: "";
  aids: IQR_GetIndigentAids[] | [] | null;
}
