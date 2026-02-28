import { parse } from "../core";
import { NationalIdFilter } from "../domain";
import { NationalIdAnalysis } from "../domain";

type FilterOptions<T> = NationalIdFilter & {
  key?: keyof T;
};

function matchCriteria(
  analysis: NationalIdAnalysis,
  criteria: NationalIdFilter,
): boolean {
  if (criteria.isAdult !== undefined && analysis.isAdult !== criteria.isAdult)
    return false;

  if (
    criteria.gender &&
    analysis.gender.toLowerCase() !== criteria.gender.toLowerCase()
  )
    return false;

  if (
    criteria.region &&
    analysis.region.toLowerCase() !== criteria.region.toLowerCase()
  )
    return false;

  if (criteria.regions && criteria.regions.length > 0) {
    if (
      !criteria.regions
        .map((r) => r.toLowerCase())
        .includes(analysis.region.toLowerCase())
    )
      return false;
  }

  if (
    criteria.governorateCode !== undefined &&
    analysis.governorate?.code !== Number(criteria.governorateCode)
  )
    return false;

  if (criteria.governorates && criteria.governorates.length > 0) {
    const govCodes = criteria.governorates.map(Number);
    if (!analysis.governorate || !govCodes.includes(analysis.governorate.code)) {
      return false;
    }
  }

  if (
    criteria.birthYear !== undefined &&
    analysis.birthYear !== Number(criteria.birthYear)
  )
    return false;

  if (criteria.birthYearFrom !== undefined && analysis.birthYear < Number(criteria.birthYearFrom))
    return false;

  if (criteria.birthYearTo !== undefined && analysis.birthYear > Number(criteria.birthYearTo))
    return false;

  if (criteria.ageFrom !== undefined && analysis.age < Number(criteria.ageFrom))
    return false;

  if (criteria.ageTo !== undefined && analysis.age > Number(criteria.ageTo))
    return false;

  if (criteria.birthDateFrom && analysis.birthDate < criteria.birthDateFrom)
    return false;

  if (criteria.birthDateTo && analysis.birthDate > criteria.birthDateTo)
    return false;

  if (
    criteria.insideEgypt !== undefined &&
    analysis.insideEgypt !== criteria.insideEgypt
  )
    return false;

  return true;
}

export function filter<T>(data: T[], options: FilterOptions<T>): T[] {
  const { key, ...criteria } = options;

  return data.filter((item: any) => {
    if (!item) return false;

    try {
      let analysis: NationalIdAnalysis;

      // 1. If item itself is a NationalIdAnalysis object (duck typing check)
      if (item.nationalId && item.gender && item.birthDate) {
        analysis = item as NationalIdAnalysis;
      } 
      // 2. If item has an 'analysis' property (common after mapWithAnalysis)
      else if (item.analysis && item.analysis.nationalId) {
        analysis = item.analysis as NationalIdAnalysis;
      } 
      // 3. Fallback: Extract ID and parse
      else {
        const idValue = key ? item[key] : item;
        if (!idValue) return false;
        analysis = parse(idValue);
      }

      return matchCriteria(analysis, criteria);
    } catch {
      return false;
    }
  });
}
