import { describe, it, expect } from "vitest";
import { validate, generateId } from "../core";

describe("validate()", () => {
  it("should return true for valid ID", () => {
    const validId = generateId();
    expect(validate(validId)).toBe(true);
  });

  it("should return false for invalid length", () => {
    expect(validate("123")).toBe(false);
  });

  it("should return false for non-numeric", () => {
    expect(validate("abcdefghijk123")).toBe(false);
  });

  it("should return false for invalid century digit", () => {
    expect(validate("10201011234567")).toBe(false);
  });

  it("should return false for invalid month", () => {
    expect(validate("30213011234567")).toBe(false);
  });

  it("should return false for invalid day", () => {
    expect(validate("30202301234567")).toBe(false);
  });

  it("should return false for invalid governorate code", () => {
    
    expect(validate("30201019934567")).toBe(false);
  });
});
