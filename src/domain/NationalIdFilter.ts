import { Gender } from "./Gender";
import { EconomicRegion } from "./Region";

export interface NationalIdFilter {
  isAdult?: boolean;
  gender?: Gender;
  region?: EconomicRegion;
  regions?: EconomicRegion[];
  governorateCode?: number | string;
  governorates?: (number | string)[];
  birthYear?: number | string;
  birthYearFrom?: number | string;
  birthYearTo?: number | string;
  birthDateFrom?: Date;
  birthDateTo?: Date;
  ageFrom?: number | string;
  ageTo?: number | string;
  insideEgypt?: boolean;
}
