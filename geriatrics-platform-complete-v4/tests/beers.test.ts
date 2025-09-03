import { describe, it, expect } from "vitest";
import { checkBeersList } from "../src/beers";

describe("Beers Criteria", () => {
  it("flags risky meds", () => {
    expect(checkBeersList(["diazepam","metformin"])).toEqual(["diazepam"]);
  });
  it("empty when safe", () => {
    expect(checkBeersList(["metformin","paracetamol"])).toEqual([]);
  });
});