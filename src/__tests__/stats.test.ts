import { describe, it, expect } from "vitest";
import { stats } from "../engine";
import { generateId } from "../core";

describe("stats()", () => {
  it("should return correct stats structure", () => {
    const result = stats([generateId(), generateId()]);

    expect(result.total).toBe(2);
  });
});
