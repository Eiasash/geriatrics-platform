import { describe, it, expect } from "vitest";
import { interpretMMSE } from "../src/mmse";

describe("MMSE", () => {
  it("interprets correctly", () => {
    expect(interpretMMSE(26)).toBe("Normal");
    expect(interpretMMSE(20)).toBe("Mild impairment");
    expect(interpretMMSE(10)).toBe("Severe impairment");
  });
});