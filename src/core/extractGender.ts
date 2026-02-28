import { Gender } from "../domain";

export function extractGender(nationalId: string): Gender {
  const genderDigit = Number(nationalId[12]);

  return genderDigit % 2 === 0 ? "Female" : "Male";
}
