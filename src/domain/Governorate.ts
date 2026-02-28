import { EconomicRegion } from "./Region";

export interface Governorate {
  code: number;
  nameEn: string;
  nameAr: string;
  region: EconomicRegion;
}
