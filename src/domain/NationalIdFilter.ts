import { Gender } from "./Gender";
import { EconomicRegion } from "./Region";

export interface NationalIdFilter {
  isAdult?: boolean;
  gender?: Gender;
  region?: EconomicRegion;
  regions?: EconomicRegion[];
  governorateCode?: number;
  governorates?: number[];
  birthYear?: number;
  birthYearFrom?: number;
  birthYearTo?: number;
  birthDateFrom?: Date;
  birthDateTo?: Date;
  ageFrom?: number;
  ageTo?: number;
  insideEgypt?: boolean;
}
