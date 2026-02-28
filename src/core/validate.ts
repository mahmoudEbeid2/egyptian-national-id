import { GOVERNORATES } from "../data";

export function validate(nationalId: string): boolean {
  if (!/^\d{14}$/.test(nationalId)) {
    return false;
  }

  const centuryDigit = Number(nationalId[0]);
  if (![2, 3].includes(centuryDigit)) {
    return false;
  }

  
  const year = Number(nationalId.slice(1, 3));
  const month = Number(nationalId.slice(3, 5));
  const day = Number(nationalId.slice(5, 7));

  const century = centuryDigit === 2 ? 1900 : 2000;
  const fullYear = century + year;

  
  if (month < 1 || month > 12) return false;
  
  
  const date = new Date(fullYear, month - 1, day);
  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  
  if (date > new Date()) {
     return false;
  }

  
  const govCode = Number(nationalId.slice(7, 9));
  if (!GOVERNORATES[govCode]) {
    return false;
  }

  
  const checkDigit = Number(nationalId[13]);
  const multipliers = [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += Number(nationalId[i]) * multipliers[i];
  }
  
  const remainder = sum % 11;
  const expectedCheckDigit = Math.abs(11 - remainder) % 10;
  
  if (checkDigit !== expectedCheckDigit) {
    return false;
  }

  return true;
}
