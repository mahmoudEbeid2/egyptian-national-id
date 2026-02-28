import { describe, it, expect } from "vitest";
import { parse, validate, filter, mapWithAnalysis, generateId } from "../index";

describe("Final Pre-Publish Verification", () => {

  it("should support number input correctly", () => {
    const validIdStr = generateId({ gender: "Male" });
    const numId = Number(validIdStr);
    expect(validate(numId)).toBe(true);
    const parsed = parse(numId);
    expect(parsed.gender).toBe("Male");
  });

  it("should return original object references during filtering", () => {
    const myData = [
        { name: "Ahmed", id: generateId({ gender: "Male" }) },
        { name: "Mona", id: generateId({ gender: "Female" }) }
    ];
    const filtered = filter(myData, { key: "id", gender: "Male" });
    expect(filtered[0]).toBe(myData[0]);
    expect(filtered[0].name).toBe("Ahmed");
  });

  it("should optimize by reusing existing analysis property", () => {
    const myData = [
        { name: "Ahmed", id: generateId({ gender: "Male" }) },
        { name: "Mona", id: generateId({ gender: "Female" }) }
    ];
    const enriched = mapWithAnalysis(myData, "id");
    const filteredEnriched = filter(enriched, { gender: "Female" });
    expect(filteredEnriched[0].name).toBe("Mona");
    expect(filteredEnriched[0]).toBe(enriched[1]);
    expect((filteredEnriched[0] as any).analysis).toBeDefined();
  });
});
