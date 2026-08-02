import { describe, expect, it } from "vitest";
import { classes, getService, services, training } from "./services";

describe("services data", () => {
  it("has exactly 8 services, 5 classes and 3 training", () => {
    expect(services).toHaveLength(8);
    expect(classes).toHaveLength(5);
    expect(training).toHaveLength(3);
  });

  it("gives every service a unique slug and href", () => {
    const slugs = services.map((s) => s.slug);
    const hrefs = services.map((s) => s.href);
    expect(new Set(slugs).size).toBe(services.length);
    expect(new Set(hrefs).size).toBe(services.length);
  });

  it("preserves the deliberate serving-city split", () => {
    // Vaughan is a classes-only keyword, Oakville a training-only one.
    for (const s of classes) {
      expect(s.serving).toContain("Vaughan");
      expect(s.serving).not.toContain("Oakville");
    }
    for (const s of training) {
      expect(s.serving).toContain("Oakville");
      expect(s.serving).not.toContain("Vaughan");
    }
  });

  it("gives every service exactly 4 founding-checklist items", () => {
    for (const s of services) {
      expect(s.checklist).toHaveLength(4);
    }
  });

  it("never uses the retired brand name outside the product name", () => {
    // "J17 Performance" was the old company name and must not come back.
    // "J17 Performance Index" is the product, and is allowed with or without
    // the trademark symbol — the unadorned form is a real search keyword that
    // the archive targets deliberately, so strip the longer form first.
    const stripped = JSON.stringify(services)
      .replaceAll("J17 Performance Index™", "")
      .replaceAll("J17 Performance Index", "");
    expect(stripped).not.toContain("J17 Performance");
  });

  it("looks services up by slug", () => {
    expect(getService("pilates")?.name).toBe("Reformer Pilates");
    expect(getService("nope")).toBeUndefined();
  });
});
