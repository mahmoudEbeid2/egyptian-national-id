import { describe, it, expect } from "vitest";
import { filter } from "../engine";
import { generateId } from "../core";

describe("filter()", () => {
  const maleId = generateId({ gender: "Male", birthYear: 1990 });
  const femaleId = generateId({ gender: "Female", birthYear: 1995 });

  it("should filter raw string IDs and return strings", () => {
    const ids = [maleId, femaleId];
    const result = filter(ids, { gender: "Male" });
    expect(result).toEqual([maleId]);
  });

  it("should filter objects by key and return original objects", () => {
    const database = [
      { id: 1, nid: maleId },
      { id: 2, nid: femaleId }
    ];
    const result = filter(database, { key: "nid", gender: "Female" });
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(database[1]); // Exact reference check
    expect(result[0].id).toBe(2);
  });

  it("should reuse existing 'analysis' property on objects", () => {
    const analysis = { nationalId: maleId, gender: "Male", isAdult: true, birthDate: new Date() };
    const database = [
      { id: 1, analysis }
    ];
    // This should work without calling parse() internally if our optimization works
    const result = filter(database, { gender: "Male" });
    expect(result[0]).toBe(database[0]);
  });

  it("should filter NationalIdAnalysis objects directly", () => {
    const analysis1 = { nationalId: maleId, gender: "Male", isAdult: true, birthDate: new Date() };
    const analysis2 = { nationalId: femaleId, gender: "Female", isAdult: true, birthDate: new Date() };
    const items = [analysis1, analysis2];
    
    const result = filter(items as any, { gender: "Female" });
    expect(result[0]).toBe(analysis2);
  });

  it("should support string values for numeric criteria", () => {
    const database = [
      { name: "Ahmed", age: 34, gov: 12 },
      { name: "Mona", age: 29, gov: 1 }
    ];
    const ids = [
      generateId({ gender: "Male", birthYear: 1990, governorateCode: 12 }),
      generateId({ gender: "Female", birthYear: 1995, governorateCode: 1 })
    ];
    const data = database.map((d, i) => ({ ...d, nid: ids[i] }));

    // Test with strings for birthYear, age, and governorateCode
    const result = filter(data, { 
      key: "nid", 
      birthYear: "1990", 
      ageFrom: "30", 
      governorateCode: "12" 
    });
    
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Ahmed");
  });
});
