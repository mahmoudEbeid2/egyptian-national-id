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
    criteria.governorateCode &&
    analysis.governorate?.code !== criteria.governorateCode
  )
    return false;

  if (criteria.governorates && criteria.governorates.length > 0) {
    if (!analysis.governorate || !criteria.governorates.includes(analysis.governorate.code)) {
      return false;
    }
  }

  if (
    criteria.birthYear !== undefined &&
    analysis.birthYear !== criteria.birthYear
  )
    return false;

  if (criteria.birthYearFrom && analysis.birthYear < criteria.birthYearFrom)
    return false;

  if (criteria.birthYearTo && analysis.birthYear > criteria.birthYearTo)
    return false;

  if (criteria.ageFrom !== undefined && analysis.age < criteria.ageFrom)
    return false;

  if (criteria.ageTo !== undefined && analysis.age > criteria.ageTo)
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
    
    const nationalId = key ? item[key] : item;

    if (!nationalId) return false;

    try {
      
      const analysis = parse(String(nationalId));

      return matchCriteria(analysis, criteria);
    } catch (error) {
      

      return false;
    }
  });
}
