import { describe, it, expect } from "vitest";
import { parse, generateId } from "../core";

describe("parse()", () => {
  it("should parse full analysis correctly", () => {
    const validId = generateId({ birthYear: 2002 });
    const result = parse(validId);

    expect(result.birthYear).toBe(2002);
    expect(result.isAdult).toBeDefined();
    expect(result.gender).toBeDefined();
    expect(result.region).toBeDefined();
  });
});
