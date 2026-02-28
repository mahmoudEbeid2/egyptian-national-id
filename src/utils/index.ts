import { parse } from "../core/parse";
import { EconomicRegion } from "../domain/Region";

export function isMale(nationalId: string | number): boolean {
  try {
    const analysis = parse(nationalId);
    return analysis.gender === "Male";
  } catch {
    return false;
  }
}

export function isFemale(nationalId: string | number): boolean {
  try {
    const analysis = parse(nationalId);
    return analysis.gender === "Female";
  } catch {
    return false;
  }
}

export function isAdult(nationalId: string | number): boolean {
  try {
    const analysis = parse(nationalId);
    return analysis.isAdult;
  } catch {
    return false;
  }
}

export function isInsideEgypt(nationalId: string | number): boolean {
  try {
    const analysis = parse(nationalId);
    return analysis.insideEgypt;
  } catch {
    return false;
  }
}

export function isFromGovernorate(nationalId: string | number, govCode: number): boolean {
  try {
    const analysis = parse(nationalId);
    return analysis.governorate?.code === govCode;
  } catch {
    return false;
  }
}

export function isFromRegion(nationalId: string | number, region: EconomicRegion): boolean {
  try {
    const analysis = parse(nationalId);
    return analysis.region === region;
  } catch {
    return false;
  }
}
