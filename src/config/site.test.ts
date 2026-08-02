import { describe, expect, it } from "vitest";
import { asset, locations, offices, siteConfig } from "./site";

describe("site config", () => {
  it("builds asset URLs without double slashes", () => {
    expect(asset("img/a.jpg")).toBe(`${siteConfig.assetBase}/img/a.jpg`);
    expect(asset("/img/a.jpg")).toBe(`${siteConfig.assetBase}/img/a.jpg`);
  });

  it("has exactly one flagship and three operating offices", () => {
    expect(locations.filter((l) => l.status === "flagship")).toHaveLength(1);
    expect(offices).toHaveLength(3);
  });

  it("gives every operating office a phone number and postal code", () => {
    for (const o of offices) {
      expect(o.phone).toBeTruthy();
      expect(o.postalCode).toBeTruthy();
    }
  });
});
