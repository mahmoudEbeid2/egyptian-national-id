import { describe, it, expect } from "vitest";
import { generateId } from "../core/generate";
import { validate } from "../core/validate";

import { parse } from "../core/parse";

describe("generateId()", () => {
  it("should generate a valid 14-digit National ID", () => {
    const id = generateId();
    expect(id).toHaveLength(14);
    expect(validate(id)).toBe(true);
  });

  it("should generate an ID for a specific birth year and month", () => {
    const id = generateId({ birthYear: 1995, birthMonth: 10 });
    expect(validate(id)).toBe(true);
    
    
    expect(id.slice(0, 5)).toBe("29510");
  });

  it("should generate a valid ID for a specific Gender", () => {
    const maleId = generateId({ gender: "Male" });
    const femaleId = generateId({ gender: "Female" });
    
    expect(validate(maleId)).toBe(true);
    expect(validate(femaleId)).toBe(true);
    
    expect(parse(maleId).gender).toBe("Male");
    expect(parse(femaleId).gender).toBe("Female");
  });

  it("should generate a valid ID for a specific governorate", () => {
    
    const id = generateId({ governorateCode: 88 });
    expect(validate(id)).toBe(true);
    expect(id.slice(7, 9)).toBe("88");
  });
});
