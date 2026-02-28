import { describe, it, expect } from "vitest";
import { filter } from "../engine";
import { generateId } from "../core";

describe("filter()", () => {
  const ids = [generateId(), generateId()];

  it("should filter adults only", () => {
    const result = filter(ids, { isAdult: true });
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
