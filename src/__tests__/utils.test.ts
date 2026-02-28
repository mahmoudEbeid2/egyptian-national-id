import { describe, it, expect } from "vitest";
import { generateId } from "../core";
import {
  isMale,
  isFemale,
  isAdult,
  isInsideEgypt,
  isFromGovernorate,
  isFromRegion,
} from "../utils";
import { EconomicRegion } from "../domain/Region";

describe("Core Utils", () => {
  const realMaleId = generateId({ gender: "Male", governorateCode: 12 }); 
  const realFemaleId = generateId({ gender: "Female", governorateCode: 1 });
  const foreignId = generateId({ governorateCode: 88 });

  it("should evaluate isMale correctly", () => {
    expect(isMale(realMaleId)).toBe(true);
    expect(isMale(realFemaleId)).toBe(false);
    expect(isMale("invalid")).toBe(false);
  });

  it("should evaluate isFemale correctly", () => {
    expect(isFemale(realFemaleId)).toBe(true);
    expect(isFemale(realMaleId)).toBe(false);
    expect(isFemale("invalid")).toBe(false);
  });

  it("should evaluate isAdult correctly", () => {
    expect(isAdult(realMaleId)).toBe(true); 
    expect(isAdult("32001011234557")).toBe(false); 
  });

  it("should evaluate isInsideEgypt correctly", () => {
    expect(isInsideEgypt(realMaleId)).toBe(true); 
    expect(isInsideEgypt(foreignId)).toBe(false); 
  });

  it("should evaluate isFromGovernorate correctly", () => {
    expect(isFromGovernorate(realMaleId, 12)).toBe(true); 
    expect(isFromGovernorate(realMaleId, 1)).toBe(false); 
  });

  it("should evaluate isFromRegion correctly", () => {
    
    expect(isFromRegion(realMaleId, "Delta")).toBe(true);
    expect(isFromRegion(realMaleId, "Cairo")).toBe(false);
  });

  it("should support number input", () => {
    const validIdStr = generateId({ gender: "Male" });
    const numId = Number(validIdStr);
    expect(isMale(numId)).toBe(true);
    expect(isInsideEgypt(numId)).toBe(true);
  });
});
