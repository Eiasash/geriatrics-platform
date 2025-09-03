import { describe, it, expect } from "vitest";
import { acbScore } from "../src/acb";

describe("Anticholinergic Burden", () => {
  it("totals 0 for none", () => {
    expect(acbScore([])).toBe(0);
  });
  it("sums drugs", () => {
    expect(acbScore([3,1,0])).toBe(4);
  });
});