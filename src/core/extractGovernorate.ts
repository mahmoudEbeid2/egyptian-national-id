import { GOVERNORATES } from "../data";
import { Governorate } from "../domain";

export function extractGovernorate(nationalId: string): Governorate | null {
  const code = Number(nationalId.slice(7, 9));
  return GOVERNORATES[code] ?? null;
}
