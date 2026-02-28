import { validate } from "./validate";
import { extractBirthDate } from "./extractBirthDate";
import { extractGender } from "./extractGender";
import { extractGovernorate } from "./extractGovernorate";
import { calculateAge } from "./calculateAge";
import { NationalIdAnalysis } from "../domain";

export function parse(nationalId: string | number): NationalIdAnalysis {
  const idStr = String(nationalId);
  if (!validate(idStr)) {
    throw new Error("Invalid National ID format");
  }


  const birthDate = extractBirthDate(idStr);
  const gender = extractGender(idStr);
  const governorate = extractGovernorate(idStr);
  const age = calculateAge(birthDate);

  const region = governorate?.region ?? "Foreign";

  const insideEgypt = governorate?.code !== 88;
  const isAdult = age >= 18;

  return {
    nationalId: idStr,
    birthDate,
    birthYear: birthDate.getFullYear(),
    birthMonth: birthDate.getMonth() + 1,
    birthDay: birthDate.getDate(),
    age,
    gender,
    governorate,
    region,
    insideEgypt,
    isAdult,
  };
}
