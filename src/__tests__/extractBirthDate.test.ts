import { describe, it, expect } from "vitest";
import { extractBirthDate } from "../core/extractBirthDate";

describe("extractBirthDate()", () => {
  it("should extract correct birth date", () => {
    const date = extractBirthDate("30201011234567");
    expect(date.getFullYear()).toBe(2002);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
  });

  it("should throw for invalid date", () => {
    expect(() => extractBirthDate("30202323234567")).toThrow();
  });
});
