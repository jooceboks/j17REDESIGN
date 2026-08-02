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

  it("leads class pages with the waitlist and training pages with the enquiry", () => {
    // Richmond Hill has not opened, so a class cannot be booked. The three
    // training locations are operating businesses and can be sold today.
    for (const s of classes) {
      expect(s.primaryAction).toBe("waitlist");
    }
    for (const s of training) {
      expect(s.primaryAction).toBe("enquiry");
    }
  });

  it("gives every service an indexMetric except Ride", () => {
    // The archive makes no Performance Index claim for Ride. Do not invent
    // one — flag the gap to the client instead.
    for (const s of services) {
      if (s.slug === "ride") {
        expect(s.indexMetric).toBeUndefined();
      } else {
        expect(s.indexMetric).toBeTruthy();
      }
    }
  });

  it("gives every class an explicit `builds` value", () => {
    // The /classes comparison table has a "What it builds" column. It must
    // read this field, never a positional index into `checklist` — those are
    // not parallel across services (position 1 is a benefit for Pilates but a
    // facility fact for Yoga), so indexing them puts the wrong text under the
    // heading. Training pages have no hub table and do not need this.
    for (const s of classes) {
      expect(s.builds, `${s.slug} is missing builds`).toBeTruthy();
    }
  });

  it("looks services up by slug", () => {
    expect(getService("pilates")?.name).toBe("Reformer Pilates");
    expect(getService("nope")).toBeUndefined();
  });
});
