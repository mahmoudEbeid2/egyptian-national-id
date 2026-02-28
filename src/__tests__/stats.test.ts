import { describe, it, expect } from "vitest";
import { stats } from "../engine";
import { generateId, parse } from "../core";

describe("stats()", () => {
  it("should return correct stats structure for strings", () => {
    const result = stats([generateId(), generateId()]);
    expect(result.total).toBe(2);
  });

  it("should handle array of objects with a key", () => {
    const data = [
      { id: 1, nid: generateId() },
      { id: 2, nid: generateId() }
    ];
    const result = stats(data, { key: "nid" });
    expect(result.total).toBe(2);
  });

  it("should handle array of objects with pre-calculated analysis property", () => {
    const analysis = parse(generateId());
    const data = [{ id: 1, analysis }];
    const result = stats(data);
    expect(result.total).toBe(1);
    expect(result.averageAge).toBe(analysis.age);
  });

  it("should handle array of parsed NationalIdAnalysis objects directly", () => {
    const analysis1 = parse(generateId());
    const analysis2 = parse(generateId());
    const data = [analysis1, analysis2];
    const result = stats(data);
    expect(result.total).toBe(2);
  });

  it("should return 0 totals when empty array is passed", () => {
    const result = stats([]);
    expect(result.total).toBe(0);
    expect(result.minAge).toBe(0);
    expect(result.maxAge).toBe(0);
    expect(result.averageAge).toBe(0);
  });
});
