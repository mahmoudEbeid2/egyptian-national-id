export function extractBirthDate(nationalId: string): Date {
  const centuryDigit = Number(nationalId[0]);
  const year = Number(nationalId.slice(1, 3));
  const month = Number(nationalId.slice(3, 5));
  const day = Number(nationalId.slice(5, 7));

  const century = centuryDigit === 2 ? 1900 : 2000;
  const fullYear = century + year;

  const date = new Date(fullYear, month - 1, day);

  if (
    date.getFullYear() !== fullYear ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new Error("Invalid birth date");
  }

  return date;
}
