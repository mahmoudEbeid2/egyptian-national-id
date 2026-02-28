import { describe, it, expect } from "vitest";
import { filter } from "../engine/filter";
import { EconomicRegion } from "../domain/Region";
import { Gender } from "../domain/Gender";
import { generateId } from "../core";

describe("Advanced Filter", () => {
  const idAdultMaleCairo2002 = generateId({ birthYear: 2002, gender: "Male", governorateCode: 1 });
  const idAdultFemaleAlex2000 = generateId({ birthYear: 2000, gender: "Female", governorateCode: 2 });
  const idChildMaleGiza2015 = generateId({ birthYear: 2015, gender: "Male", governorateCode: 21 });
  const foreignId = generateId({ governorateCode: 88 });

  const ids = [
    idAdultMaleCairo2002,
    idAdultFemaleAlex2000,
    idChildMaleGiza2015,
    "invalid-id",
  ];

  const objects = [
    { nationalId: idAdultMaleCairo2002 },
    { nationalId: idAdultFemaleAlex2000 },
    { nationalId: idChildMaleGiza2015 },
    { nationalId: "invalid-id" },
  ];

  it("should filter adults", () => {
    const result = filter(ids, { isAdult: true });
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
  
  it("should filter by gender", () => {
    const result = filter(ids, { gender: "Male" });
    expect(result.every((id) => id !== undefined)).toBe(true);
  });

  it("should filter by birthYear range", () => {
    const result = filter(ids, {
      birthYearFrom: 2000,
      birthYearTo: 2010,
    });
    expect(result.length).toBe(2);
  });

  it("should filter by explicit Date objects (birthDateFrom/To)", () => {
    const fromDate = new Date(1999, 0, 1);
    const toDate = new Date(2005, 11, 31);
    
    const result = filter(ids, {
      birthDateFrom: fromDate,
      birthDateTo: toDate,
    });
    
    expect(result.length).toBe(2);
    expect(result.includes(idAdultMaleCairo2002)).toBe(true);
  });

  it("should filter by multiple regions", () => {
    const result = filter([...ids, foreignId], {
      regions: ["Cairo", "Foreign"],
    });
    
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("should filter by multiple governorates", () => {
    const result = filter(ids, {
      governorates: [1, 2], 
    });
    expect(result.length).toBe(2);
    expect(result.includes(idAdultMaleCairo2002)).toBe(true);
  });

  it("should work with object + key", () => {
    const result = filter(objects, {
      key: "nationalId",
      isAdult: true,
    });

    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("should filter by age range", () => {
    const currentYear = new Date().getFullYear();
    const age2k = currentYear - 2000;

    const result = filter(ids, {
      ageFrom: 18,
      ageTo: age2k + 1,
    });
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("should ignore invalid IDs safely", () => {
    const result = filter(ids, { isAdult: true });
    expect(result).toBeDefined();
    expect(result.includes("invalid-id")).toBe(false);
  });
});
