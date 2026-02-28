import { GOVERNORATES } from "../data";
import { Gender } from "../domain/Gender";

export interface GenerateOptions {
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  governorateCode?: number;
  gender?: Gender;
}

export function generateId(options?: GenerateOptions): string {
  const d = new Date();
  const year = options?.birthYear ?? d.getFullYear() - 25; 
  const month = options?.birthMonth ?? Math.floor(Math.random() * 12) + 1;
  const day = options?.birthDay ?? Math.floor(Math.random() * 28) + 1;
  
  const century = year >= 2000 ? 3 : 2;
  const yearStr = String(year).slice(-2);
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");

  const availableGovs = Object.keys(GOVERNORATES).map(Number);
  const govCode = options?.governorateCode ?? availableGovs[Math.floor(Math.random() * availableGovs.length)];
  const govStr = String(govCode).padStart(2, "0");

  const randomPart1 = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  
  const isMale = options?.gender?.toLowerCase() === "male";
  const isFemale = options?.gender?.toLowerCase() === "female";
  
  let serialGender;
  if (isMale) {
    const maleDigits = [1, 3, 5, 7, 9];
    serialGender = maleDigits[Math.floor(Math.random() * maleDigits.length)];
  } else if (isFemale) {
    const femaleDigits = [0, 2, 4, 6, 8];
    serialGender = femaleDigits[Math.floor(Math.random() * femaleDigits.length)];
  } else {
    serialGender = Math.floor(Math.random() * 10);
  }

  const baseId = `${century}${yearStr}${monthStr}${dayStr}${govStr}${randomPart1}${serialGender}`;

  
  const multipliers = [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += Number(baseId[i]) * multipliers[i];
  }
  
  const remainder = sum % 11;
  const checkDigit = Math.abs(11 - remainder) % 10;

  return `${baseId}${checkDigit}`;
}
