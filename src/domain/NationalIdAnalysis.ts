import { Gender } from "./Gender";
import { Governorate } from "./Governorate";
import { EconomicRegion } from "./Region";

export interface NationalIdAnalysis {
  nationalId: string;
  birthDate: Date;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  age: number;
  gender: Gender;
  governorate: Governorate | null;
  region: EconomicRegion;
  insideEgypt: boolean;
  isAdult: boolean;
}
