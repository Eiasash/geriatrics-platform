import { describe, it, expect } from "vitest";
import { cha2ds2Score } from "../src/cha2ds2";

describe("CHA2DS2 Score", () => {
  it("handles empty list", () => {
    expect(cha2ds2Score([])).toBe(0);
  });
  it("sums factors", () => {
    expect(cha2ds2Score([1,1,2,0,1])).toBe(5);
  });
});