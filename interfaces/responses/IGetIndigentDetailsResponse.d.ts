import { IQR_GetIndigentAids } from "../query_results/IQR_GetIndigentAids";
import { IQR_GetIndigentInfo } from "../query_results/IQR_GetIndigentInfo";

export interface IGetIndigentDetailsResponse {
  info: IQR_GetIndigentInfo | null;
  aids: IQR_GetIndigentAids[] | [] | null;
}
