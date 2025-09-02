import { describe, it, expect } from "vitest";
import { frailScore } from "../src/frail";

describe("FRAIL Score", () => {
  it("sums correctly", () => {
    expect(frailScore([1,1,1,1,1])).toBe(5);
  });
});