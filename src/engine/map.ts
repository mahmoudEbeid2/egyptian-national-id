import { parse } from "../core";
import { NationalIdAnalysis } from "../domain";

export function mapWithAnalysis<T extends Record<string, any>>(data: T[], key?: keyof T): Array<T & { analysis: NationalIdAnalysis }> {
  return data
    .map((item) => {
      const nationalId = key ? item[key] : item;
      try {
        const analysis = parse(String(nationalId));
        return {
          ...item,
          analysis,
        } as T & { analysis: NationalIdAnalysis };
      } catch (error) {
        return null;
      }
    })
    .filter((item): item is T & { analysis: NationalIdAnalysis } => item !== null);
}
