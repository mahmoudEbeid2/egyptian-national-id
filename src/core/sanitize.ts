const ARABIC_NUMERALS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function sanitize(nationalId: string | number): string {
  if (nationalId === null || nationalId === undefined) return "";
  
  let str = String(nationalId);
  
  
  str = str.replace(/[٠-٩]/g, (match) => {
    return String(ARABIC_NUMERALS.indexOf(match));
  });

  
  str = str.replace(/\D/g, "");

  return str;
}
