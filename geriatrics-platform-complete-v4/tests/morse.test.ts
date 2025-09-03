import { describe, it, expect } from "vitest";
import { morseFallRisk } from "../src/morse";

describe("Morse Fall Risk", () => {
  it("low risk", () => {
    expect(morseFallRisk(10)).toBe("Low risk");
  });
  it("moderate risk", () => {
    expect(morseFallRisk(30)).toBe("Moderate risk");
  });
  it("high risk", () => {
    expect(morseFallRisk(60)).toBe("High risk");
  });
});