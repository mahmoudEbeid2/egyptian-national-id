import { parse } from "../core";
import { NationalIdAnalysis } from "../domain";

export function stats<T = any>(data: T[], options?: { key?: keyof T }) {
  const analyses: NationalIdAnalysis[] = [];
  
  for (const item of data) {
    if (!item) continue;

    try {
      let analysis: NationalIdAnalysis;

      if ((item as any).nationalId && (item as any).gender && (item as any).birthDate) {
        analysis = item as unknown as NationalIdAnalysis;
      } else if ((item as any).analysis && (item as any).analysis.nationalId) {
        analysis = (item as any).analysis as NationalIdAnalysis;
      } else {
        const idValue = options?.key ? item[options.key] : item;
        if (!idValue) continue;
        analysis = parse(String(idValue));
      }

      analyses.push(analysis);
    } catch {
      
    }
  }

  if (analyses.length === 0) {
    return {
      total: 0,
      adults: 0,
      males: 0,
      females: 0,
      insideEgypt: 0,
      outsideEgypt: 0,
      averageAge: 0,
      governoratesDistribution: {},
      minAge: 0,
      maxAge: 0,
      minYear: 0,
      maxYear: 0,
    };
  }

  const governoratesDistribution = analyses.reduce((acc, a) => {
    if (a.governorate) {
      acc[a.governorate.nameEn] = (acc[a.governorate.nameEn] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalAge = analyses.reduce((sum, a) => sum + a.age, 0);

  return {
    total: analyses.length,
    adults: analyses.filter((a) => a.isAdult).length,
    males: analyses.filter((a) => a.gender === "Male").length,
    females: analyses.filter((a) => a.gender === "Female").length,
    insideEgypt: analyses.filter((a) => a.insideEgypt).length,
    outsideEgypt: analyses.filter((a) => !a.insideEgypt).length,
    averageAge: Number((totalAge / analyses.length).toFixed(1)),
    governoratesDistribution,
    minAge: analyses.reduce((min, a) => Math.min(min, a.age), analyses[0].age),
    maxAge: analyses.reduce((max, a) => Math.max(max, a.age), analyses[0].age),
    minYear: analyses.reduce((min, a) => Math.min(min, a.birthYear), analyses[0].birthYear),
    maxYear: analyses.reduce((max, a) => Math.max(max, a.birthYear), analyses[0].birthYear),
  };
}
