# J17 Conversion & IA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the J17 Fitness site's conversion, differentiation and information-architecture problems without introducing any new marketing content.

**Architecture:** The eight service pages are already generated from data objects in `src/content/services.ts` rendered by one `<ServicePage>` template. Every behavioural change in this plan is therefore expressed as a **new field on the `Service` type** plus template logic that reads it, never as per-page JSX. Three new presentational components (`<StatusBand>`, `<ComingSoon>`, `<IndexProof>`) and one new route (`/classes`) are added. Work ships in three independent stages: A (conversion), B (Index spine), C (IA and mobile).

**Tech Stack:** Next.js 16.2.12 (App Router, Turbopack), React 19.2.4, TypeScript 5, Tailwind CSS v4 (CSS-first `@theme`), Vitest 3 (added in Task 1, data layer only).

## Global Constraints

- **No new marketing content.** Never invent a price, opening date, statistic, testimonial, coach name, class schedule or menu item. If a page needs content that does not exist, say so honestly in the UI and leave a `TODO:` comment.
- **All eight service URLs stay.** `/classes/{pilates,yoga,strength,hiit,ride}`, `/personal-training`, `/athletic-performance`, `/youth`. Do not merge, rename or redirect them.
- **Preserve the serving-city split.** Class pages serve "Richmond Hill, Markham, and Vaughan". Training pages serve "Markham, Oakville, Mississauga, and Richmond Hill". Vaughan appears only on classes, Oakville only on training.
- **One brand name: "J17 Fitness."** The string "J17 Performance" may appear **only** inside the trademarked product name `J17 Performance Index™`.
- **Ride has no `indexMetric`.** The archive makes no Performance Index claim for Ride. Do not add one.
- **No em dashes in newly written UI copy.** Existing archive copy keeps its punctuation verbatim; new copy you author must not use em dashes.
- **Every task ends green:** `npx tsc --noEmit`, `npx eslint src --max-warnings=0`, and `npm run build` must all pass, and all routes must remain static.
- **Accent colour is `#D7FB00`**, defined once as `--accent-lime` in `src/app/globals.css`. Never hardcode a hex value in a component.

---

### Task 1: Vitest harness for the data layer

Eight pages are generated from `services.ts`. Rules like "Ride has no `indexMetric`" and "class pages lead with the waitlist" are data invariants that break silently. This task gives every later task a real red-green cycle. Scope is deliberately limited to pure data and config functions — no component rendering tests, which would be over-engineering for a static marketing site.

**Files:**
- Modify: `package.json` (add `vitest` devDependency and `test` script)
- Create: `vitest.config.ts`
- Create: `src/content/services.test.ts`
- Create: `src/config/site.test.ts`

**Interfaces:**
- Consumes: existing `services`, `classes`, `training`, `getService` from `src/content/services.ts`; existing `asset`, `locations`, `offices` from `src/config/site.ts`
- Produces: `npm test` command that later tasks extend

- [ ] **Step 1: Install Vitest**

```bash
npm install -D vitest@^3
```

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    // Data-layer tests only. These modules are pure TypeScript with no DOM,
    // so no jsdom environment is needed.
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

- [ ] **Step 3: Add the test script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 4: Write the failing tests**

Create `src/content/services.test.ts`:

```ts
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

  it("never uses the retired brand name outside the trademark", () => {
    const stripped = JSON.stringify(services).replaceAll(
      "J17 Performance Index™",
      "",
    );
    expect(stripped).not.toContain("J17 Performance");
  });

  it("looks services up by slug", () => {
    expect(getService("pilates")?.name).toBe("Reformer Pilates");
    expect(getService("nope")).toBeUndefined();
  });
});
```

Create `src/config/site.test.ts`:

```ts
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
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, 9 tests. These characterise existing behaviour, so they should be green immediately. If any fails, the data has a real defect — fix the data, not the test.

- [ ] **Step 6: Verify the whole toolchain is still green**

```bash
npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```
Expected: all pass, 22 static routes.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/content/services.test.ts src/config/site.test.ts
git commit -m "test: add Vitest harness for the services and site data layer"
```

---

## STAGE A — Conversion pass

### Task 2: Split the primary CTA by page type

Class pages sell a club that has not opened, so the only honest conversion is the waitlist. Training pages sell a service the existing Markham, Oakville and Mississauga gyms deliver today, so the enquiry must lead or the client loses real revenue.

**Files:**
- Modify: `src/content/services.ts` (add `primaryAction` to the type and to all 8 objects)
- Modify: `src/components/ServicePage.tsx` (read the field in both CTA pairs)
- Modify: `src/content/services.test.ts` (add the invariant)

**Interfaces:**
- Consumes: `Service` type from Task 1's tested module
- Produces: `Service.primaryAction: "waitlist" | "enquiry"`, consumed only by `<ServicePage>`; and `variant="quiet"` on `<BookingCTA>`/`<WaitlistCTA>`, backed by the `.btn-quiet` class

- [ ] **Step 1: Write the failing test**

Append to `src/content/services.test.ts`, inside the existing `describe` block:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `expected undefined to be "waitlist"`.

- [ ] **Step 3: Add the field to the type**

In `src/content/services.ts`, add to the `Service` type after `bookingLabel`:

```ts
  /**
   * Which action this page leads with.
   *
   * Class pages sell the Richmond Hill flagship, which has not opened, so the
   * only conversion we can honestly offer is the waitlist. Training pages sell
   * a service the Markham, Oakville and Mississauga gyms deliver today, so the
   * enquiry leads there instead.
   */
  primaryAction: "waitlist" | "enquiry";
```

- [ ] **Step 4: Set the field on all eight services**

In `src/content/services.ts`, add `primaryAction: "waitlist",` immediately after the `bookingLabel` line on each of the five class objects (`pilates`, `yoga`, `strength`, `hiit`, `ride`), and `primaryAction: "enquiry",` on each of the three training objects (`personal-training`, `athletic-performance`, `youth`).

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 10 tests.

- [ ] **Step 6: Read the field in the template**

In `src/components/ServicePage.tsx`, replace the intro CTA block:

```tsx
              <div className="mt-10 flex flex-wrap gap-4">
                <BookingCTA>{service.bookingLabel}</BookingCTA>
                <WaitlistCTA />
              </div>
```

with:

```tsx
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {service.primaryAction === "enquiry" ? (
                  <>
                    <BookingCTA>{service.bookingLabel}</BookingCTA>
                    <WaitlistCTA />
                  </>
                ) : (
                  <>
                    <WaitlistCTA variant="primary" />
                    {/*
                      There is no booking engine and the flagship is not open,
                      so a "Book a Class" button would be a lie. This is a quiet
                      link that says what it actually does: opens a form.
                    */}
                    <BookingCTA variant="quiet">
                      Questions about classes? Get in touch
                    </BookingCTA>
                  </>
                )}
              </div>
```

- [ ] **Step 7: Add the `quiet` variant**

In `src/components/CTA.tsx`, widen the variant type and add the class. Change:

```tsx
  variant?: "primary" | "secondary";
```

to:

```tsx
  variant?: "primary" | "secondary" | "quiet";
```

In `src/app/globals.css`, add after the `.btn-secondary:active` rule:

```css
/* Low-emphasis inline action. Used where a button would overstate what the
   link actually does (e.g. "booking" that only opens a contact form). */
.btn-quiet {
  display: inline-flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  transition: color var(--speed-fast) var(--ease-snap);
}

.btn-quiet:hover {
  color: var(--accent-lime);
}
```

- [ ] **Step 8: Update the closing CTA block the same way**

In `src/components/ServicePage.tsx`, in the closing CTA section, replace:

```tsx
            <div className="mt-10 flex flex-wrap gap-4">
              <WaitlistCTA variant="primary" />
              <BookingCTA variant="secondary">{service.bookingLabel}</BookingCTA>
            </div>
```

with:

```tsx
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <WaitlistCTA variant="primary" />
              {service.primaryAction === "enquiry" && (
                <BookingCTA variant="secondary">
                  {service.bookingLabel}
                </BookingCTA>
              )}
            </div>
```

- [ ] **Step 9: Verify green and inspect visually**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

Then start the server and confirm the difference between the two page types:

```bash
npm run start -- -p 3200
```

Open `http://localhost:3200/classes/pilates` — expect one lime primary button ("Join the Founding Waitlist") plus an underlined text link.
Open `http://localhost:3200/personal-training` — expect "Book Your Assessment" as the primary button with the waitlist as the outlined secondary.

- [ ] **Step 10: Commit**

```bash
git add src/content/services.ts src/content/services.test.ts src/components/ServicePage.tsx src/components/CTA.tsx src/app/globals.css
git commit -m "feat: lead class pages with the waitlist and training pages with the enquiry"
```

---

### Task 3: Status band and homepage reorder

A cold visitor currently scrolls past six sections before learning where the club is or that it has not opened.

**Files:**
- Create: `src/components/StatusBand.tsx`
- Modify: `src/app/page.tsx` (insert the band, reorder sections)

**Interfaces:**
- Consumes: `locations`, `siteConfig` from `src/config/site.ts`
- Produces: `<StatusBand />` — no props, reads config directly

- [ ] **Step 1: Create the component**

Create `src/components/StatusBand.tsx`:

```tsx
import Link from "next/link";
import { locations } from "@/config/site";

/**
 * A slim strip directly under the hero answering the two questions a cold
 * visitor has first: where is this, and is it open? The full locations grid
 * stays further down the page — this exists only to stop those two facts
 * being six sections deep.
 */
export function StatusBand() {
  const flagship = locations.find((l) => l.status === "flagship")!;
  const openCities = locations
    .filter((l) => l.status === "open")
    .map((l) => l.city);

  // "Markham, Oakville & Mississauga"
  const cityList =
    openCities.slice(0, -1).join(", ") + " & " + openCities.at(-1);

  return (
    <div className="border-y border-[var(--bg-elevated)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="flex flex-col gap-x-3 gap-y-1 text-sm sm:flex-row sm:items-center">
          <span className="font-bold uppercase tracking-[0.12em] text-[var(--accent-lime)]">
            {flagship.city} flagship opening soon
          </span>
          <span aria-hidden="true" className="hidden text-[var(--text-muted)] sm:inline">
            ·
          </span>
          <span className="text-[var(--text-secondary)]">
            Now training in {cityList}
          </span>
        </p>

        <Link
          href="/locations"
          className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--text-primary)] underline underline-offset-4 transition-colors duration-150 hover:text-[var(--accent-lime)]"
        >
          See all locations
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Import and insert it**

In `src/app/page.tsx`, add to the imports:

```tsx
import { StatusBand } from "@/components/StatusBand";
```

Immediately after the closing `</section>` of the HERO block (before the VIDEO comment), insert:

```tsx
      <StatusBand />
```

- [ ] **Step 3: Reorder the homepage sections**

`src/app/page.tsx` currently renders in this order: HERO, VIDEO, ABOUT, WHY J17, FOUR PILLARS, CLASSES, TRAINING, PERFORMANCE INDEX, RECOVERY/SPACE/COMMUNITY, LOCATIONS, FOUNDING MEMBERSHIPS.

Move whole JSX blocks (each runs from its `{/* ===== NAME ===== */}` comment to the matching closing `</Section>`) so the order becomes:

```
HERO
StatusBand
WHY J17
FOUR PILLARS
PERFORMANCE INDEX      <- moved up, above the catalogue
CLASSES
TRAINING
RECOVERY/SPACE/COMMUNITY
VIDEO                  <- moved down, brand asset not a decision input
ABOUT                  <- moved down
LOCATIONS
FOUNDING MEMBERSHIPS
```

- [ ] **Step 4: Fix the alternating band colours**

Sections alternate between the base canvas and `surface`. After reordering, walk the page top to bottom and set each `<Section>`'s `surface` prop so no two adjacent sections share a background. Starting after `<StatusBand />` (which is itself `surface`), the sequence must be:

| Section | `surface` |
|---|---|
| WHY J17 | `false` |
| FOUR PILLARS | `true` |
| PERFORMANCE INDEX | `false` |
| CLASSES | `true` |
| TRAINING | `false` |
| RECOVERY/SPACE/COMMUNITY | `true` |
| VIDEO | `false` |
| ABOUT | `true` |
| LOCATIONS | `false` |
| FOUNDING MEMBERSHIPS | `true` |

- [ ] **Step 5: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 6: Verify visually**

```bash
npm run start -- -p 3200
```

Open `http://localhost:3200/`. Confirm: the status band sits directly under the hero and names Richmond Hill plus the three operating cities; the Index spotlight appears before the classes grid; no two adjacent sections share a background colour.

- [ ] **Step 7: Commit**

```bash
git add src/components/StatusBand.tsx src/app/page.tsx
git commit -m "feat: surface location and opening status under the hero, reorder homepage"
```

---

### Task 4: `<ComingSoon>` replaces the three dead ends

`Take the Tour`, `Our Story` and `/cafe` are linked from the homepage and nav but deliver nothing. Each becomes an honest capture point instead.

**Files:**
- Create: `src/components/ComingSoon.tsx`
- Modify: `src/app/locations/page.tsx` (tour and story sections)
- Modify: `src/app/cafe/page.tsx`

**Interfaces:**
- Consumes: `WaitlistForm` from `src/components/Forms.tsx`; `Reveal`, `Container`, `Section` from existing modules
- Produces: `<ComingSoon eyebrow headline body points timing />`

- [ ] **Step 1: Create the component**

Create `src/components/ComingSoon.tsx`:

```tsx
import { Reveal } from "./Reveal";
import { Container, Section } from "./Section";
import { WaitlistForm } from "./Forms";

type ComingSoonProps = {
  id?: string;
  eyebrow: string;
  headline: string;
  /** One honest paragraph. Assemble only from facts already on the site. */
  body: string;
  /** Short "what will be here" list. Again, existing facts only. */
  points: string[];
  /** e.g. "Opening with the Richmond Hill flagship". No invented dates. */
  timing: string;
  surface?: boolean;
};

/**
 * For sections the site links to but cannot yet fill.
 *
 * The rule this encodes: never promise something and deliver an empty room.
 * State plainly that it is not ready, say what it will be using only facts
 * already published elsewhere on the site, and offer the waitlist so the
 * visit still converts.
 */
export function ComingSoon({
  id,
  eyebrow,
  headline,
  body,
  points,
  timing,
  surface = false,
}: ComingSoonProps) {
  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="type-eyebrow mb-5">{eyebrow}</p>
            <h2 className="type-h2">{headline}</h2>
            <p className="type-body mt-6 text-lg">{body}</p>

            <ul className="mt-8 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45em] h-[6px] w-[18px] shrink-0 bg-[var(--accent-lime)]"
                  />
                  <span className="type-body">{point}</span>
                </li>
              ))}
            </ul>

            <p className="type-eyebrow mt-10 border-l-4 border-[var(--accent-lime)] pl-5">
              {timing}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <div className="border-l-4 border-[var(--accent-lime)] bg-[var(--bg-elevated)] p-8 sm:p-10">
              <h3 className="type-h3 mb-3">See it first</h3>
              <p className="type-body mb-8 text-sm">
                Join the founding waitlist and we will send this to you before
                it goes public.
              </p>
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Replace the tour and story sections**

In `src/app/locations/page.tsx`, add the import:

```tsx
import { ComingSoon } from "@/components/ComingSoon";
```

Replace the entire `{/* ---------------- Take the Tour ---------------- */}` `<Section>` block with:

```tsx
      {/* TODO: replace with the real tour (photo gallery, floor plan or
          walkthrough video) once the client supplies it. */}
      <ComingSoon
        surface
        id="tour"
        eyebrow="The Space"
        headline="The tour is coming"
        body="10,000 square feet under one roof in Richmond Hill. The walkthrough goes live as the build finishes."
        points={[
          "A full strength floor",
          "Dedicated studios for Pilates, yoga, HIIT and Ride",
          "A recovery zone with sauna, cold plunge and red light therapy",
          "An on-site healthy café",
        ]}
        timing="Opening with the Richmond Hill flagship"
      />
```

Replace the entire `{/* ---------------- Our Story ---------------- */}` `<Section>` block with:

```tsx
      {/* TODO: replace with the real story once the client supplies founding
          year, founders' background and why J17 started. None of that appears
          anywhere in the site archive. */}
      <ComingSoon
        id="story"
        eyebrow="Our Story"
        headline="The full story is coming"
        body="For years we have coached this community out of Markham, Oakville and Mississauga. Richmond Hill is where it all comes together."
        points={[
          "Coached classes, a recovery zone and a café under one roof",
          "The J17 Performance Index™ running underneath all of it",
          "Every session coached, every plan built around you",
        ]}
        timing="Opening with the Richmond Hill flagship"
      />
```

- [ ] **Step 3: Replace the café page body**

In `src/app/cafe/page.tsx`, add the import:

```tsx
import { ComingSoon } from "@/components/ComingSoon";
```

Replace the `{/* ---------------- What to expect ---------------- */}` `<Section>` block with:

```tsx
      {/* TODO: café copy — menu, hours, ordering, and whether it is open to
          non-members all need client input. */}
      <ComingSoon
        eyebrow="What to expect"
        headline="The menu is still being built"
        body="The café opens with the club. We are not going to guess at a menu before it exists."
        points={[
          "On-site at the Richmond Hill flagship",
          "Healthy, performance-focused meals",
          "Steps from the strength floor and the recovery zone",
        ]}
        timing="At our Richmond Hill flagship"
      />
```

- [ ] **Step 4: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 5: Verify visually and check for duplicate form IDs**

```bash
npm run start -- -p 3200
```

Open `http://localhost:3200/locations`. **Critical check:** this page now renders `<WaitlistForm />` twice (tour and story), and `Forms.tsx` uses hardcoded `id` attributes like `waitlist-name`. Duplicate IDs break label association for screen readers.

In the browser console run:

```js
const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
console.log("duplicates:", ids.filter((id, i) => ids.indexOf(id) !== i));
```

Expected: `duplicates: []`. If it reports duplicates, fix `src/components/Forms.tsx` by replacing each hardcoded `id` with React's `useId` hook:

```tsx
import { useId } from "react";
// inside WaitlistForm:
const uid = useId();
// then: id={`${uid}-name`} and htmlFor={`${uid}-name`}, and the same for
// every other field in the form.
```

Re-run the console check until it reports an empty array.

- [ ] **Step 6: Commit**

```bash
git add src/components/ComingSoon.tsx src/components/Forms.tsx src/app/locations/page.tsx src/app/cafe/page.tsx
git commit -m "feat: turn the tour, story and cafe dead ends into honest capture points"
```

**Stage A is complete and shippable here.**

---

## STAGE B — The Index becomes the spine

### Task 5: `indexMetric` field and `<IndexProof>` band

The Performance Index is the only real differentiator and is currently a nav item. This makes it a recurring proof beat on every page that legitimately claims it.

**Files:**
- Modify: `src/content/services.ts` (add `indexMetric`)
- Create: `src/components/IndexProof.tsx`
- Modify: `src/components/ServicePage.tsx` (render it)
- Modify: `src/content/services.test.ts`

**Interfaces:**
- Consumes: `Service` from Task 2
- Produces: `Service.indexMetric?: string` — read by Task 7's hub comparison table

- [ ] **Step 1: Write the failing test**

Append inside the existing `describe` block in `src/content/services.test.ts`:

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `expected undefined to be truthy` for pilates.

- [ ] **Step 3: Add the field to the type**

In `src/content/services.ts`, add to the `Service` type after `serving`:

```ts
  /**
   * What the Performance Index™ measures for this specific activity.
   *
   * Sourced from copy already in the archive. Left undefined where the archive
   * makes no Index claim — Ride is the only such case. Do not invent one.
   */
  indexMetric?: string;
```

- [ ] **Step 4: Populate it on seven services**

Add the matching line to each service object, immediately after its `serving` line. Do **not** add one to `ride`.

| Service object | Line to add |
|---|---|
| `pilates` | `indexMetric: "Mobility and movement quality",` |
| `yoga` | `indexMetric: "Mobility",` |
| `strength` | `indexMetric: "Strength numbers",` |
| `hiit` | `indexMetric: "Conditioning",` |
| `ride` | *(none)* |
| `personal-training` | `indexMetric: "Strength, mobility and movement",` |
| `athletic-performance` | `indexMetric: "Strength, power, speed, mobility and movement quality",` |
| `youth` | `indexMetric: "Strength, speed and movement quality",` |

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 11 tests.

- [ ] **Step 6: Create the component**

Create `src/components/IndexProof.tsx`:

```tsx
import Link from "next/link";
import { Container, Section } from "./Section";
import { Reveal } from "./Reveal";

/**
 * The recurring Performance Index proof beat.
 *
 * The Index is J17's only real differentiator — every gym claims coaching and
 * recovery, nobody else hands you a number. Repeating it as a consistent band
 * on every service page turns it from a nav item into the spine of the site.
 *
 * Rendered only when the service has an indexMetric. Ride has none.
 */
export function IndexProof({ metric }: { metric: string }) {
  return (
    <Section surface className="!py-14">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 border-l-4 border-[var(--accent-lime)] bg-[var(--bg-base)] p-8 sm:p-10 lg:flex-row lg:items-center lg:gap-12">
            <Hexagon />

            <div className="flex-1">
              <p className="type-eyebrow mb-3">Measured, not guessed at</p>
              <h2 className="type-h3">
                What we track here:{" "}
                <span className="text-[var(--accent-lime)]">{metric}</span>
              </h2>
              <p className="type-body mt-4">
                Benchmarked at your first session and retested on a schedule, so
                you can see what changed instead of hoping something did.
              </p>
              <Link
                href="/performance-index"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-lime)] transition-opacity duration-150 hover:opacity-70"
              >
                How the Performance Index™ works
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Small hexagon echoing the six-axis motif on /performance-index. */
function Hexagon() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
    >
      <polygon
        points="50,4 90,27 90,73 50,96 10,73 10,27"
        fill="none"
        stroke="var(--accent-lime)"
        strokeWidth="3"
      />
      <polygon
        points="50,28 71,40 71,64 50,76 29,64 29,40"
        fill="none"
        stroke="var(--accent-lime)"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}
```

- [ ] **Step 7: Replace the hand-computed band colours with a counter**

Sections alternate between the base canvas and the raised `surface` so that no
two adjacent bands share a background. Today each one is computed by hand
(`si % 2 === 0`, `service.sections.length % 2 === 0`). That arithmetic breaks
the moment a section is inserted into the middle of the page, which is exactly
what this task does. Two collisions it would cause if left alone:

- **HIIT** has 1 content section, ending on `surface`. A `surface` `<IndexProof>`
  directly after it produces two identical adjacent bands.
- **Ride** has 0 content sections, so its checklist lands on `surface`, and the
  `<MoreServices>` strip added in Task 10 collides with it the same way.

Replace the arithmetic with a counter that yields the next colour in render
order, so inserting or removing any section stays correct automatically.

In `src/components/ServicePage.tsx`, add the import:

```tsx
import { IndexProof } from "./IndexProof";
```

Immediately inside the `ServicePage` function, before the `return`, add:

```tsx
  /**
   * Section backgrounds alternate so no two adjacent bands match.
   *
   * Call this once per <Section> in render order instead of hand-computing
   * indices — that arithmetic silently breaks whenever a section is inserted
   * mid-page. The intro section below is the base canvas, so the first call
   * (the first content section) returns surface.
   */
  let bandIndex = 0;
  const nextBand = () => bandIndex++ % 2 === 0;
```

- [ ] **Step 8: Route every band through the counter**

Still in `src/components/ServicePage.tsx`, make these four changes in order.

The content-sections map — change:

```tsx
        <Section key={section.heading} surface={si % 2 === 0}>
```

to:

```tsx
        <Section key={section.heading} surface={nextBand()}>
```

Then remove the now-unused `si` parameter from that `.map()` callback, so it
reads `{service.sections.map((section) => (`. ESLint fails the build on unused
parameters.

Insert `<IndexProof>` immediately after the closing `))}` of that map and
before the founding-checklist `<Section>`:

```tsx
      {service.indexMetric && (
        <IndexProof metric={service.indexMetric} surface={nextBand()} />
      )}
```

Change the founding-checklist section from:

```tsx
      <Section surface={service.sections.length % 2 === 0}>
```

to:

```tsx
      <Section surface={nextBand()}>
```

Also delete the three-line comment above it that begins "Continues the
alternating band" — it describes the arithmetic you just removed.

- [ ] **Step 9: Accept the `surface` prop in `<IndexProof>`**

In `src/components/IndexProof.tsx`, change the signature from:

```tsx
export function IndexProof({ metric }: { metric: string }) {
```

to:

```tsx
export function IndexProof({
  metric,
  surface = true,
}: {
  metric: string;
  /** Supplied by ServicePage's band counter so the stripe never collides. */
  surface?: boolean;
}) {
```

and change its `<Section surface className="!py-14">` to
`<Section surface={surface} className="!py-14">`.

The inner card uses `bg-[var(--bg-base)]`, which would disappear against a base
band. Make it contrast with whichever band it sits on:

```tsx
          <div
            className={`flex flex-col gap-8 border-l-4 border-[var(--accent-lime)] p-8 sm:p-10 lg:flex-row lg:items-center lg:gap-12 ${
              surface ? "bg-[var(--bg-base)]" : "bg-[var(--bg-surface)]"
            }`}
          >

- [ ] **Step 10: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 11: Verify visually, including the two collision cases**

```bash
npm run start -- -p 3200
```

- `http://localhost:3200/classes/pilates` (2 content sections) — expect the lime-bordered band reading "What we track here: Mobility and movement quality".
- `http://localhost:3200/classes/hiit` (**1** content section) — expect the band present and, critically, that it does **not** share a background with the section directly above it.
- `http://localhost:3200/classes/ride` (**0** content sections) — expect **no** band at all.

On all three, confirm no two adjacent sections share a background colour.

- [ ] **Step 12: Commit**

```bash
git add src/content/services.ts src/content/services.test.ts src/components/IndexProof.tsx src/components/ServicePage.tsx
git commit -m "feat: add the Performance Index proof band to every service that claims it"
```

---

### Task 6: The unplotted hexagon on `/performance-index`

"We measure things" stays abstract until someone sees what the output looks like. A **filled** radar chart is forbidden here: plotting values would fabricate a member's results.

**Files:**
- Create: `src/components/IndexHexagon.tsx`
- Modify: `src/app/performance-index/page.tsx`

**Interfaces:**
- Consumes: nothing (the six axes are a local constant)
- Produces: `<IndexHexagon />` — no props

- [ ] **Step 1: Load the dataviz skill**

Invoke the `dataviz` skill before writing any chart code. It sets the colour, axis and label conventions this must follow.

- [ ] **Step 2: Create the component**

Create `src/components/IndexHexagon.tsx`. The six axis labels must match the "What We Measure" list already on the page exactly.

```tsx
/**
 * The six Performance Index axes as an EMPTY frame.
 *
 * Deliberately unplotted. Filling this in would mean inventing a member's
 * results, which breaks the no-fabricated-claims rule. Showing the empty
 * frame communicates what gets measured and what you receive, honestly.
 */
const AXES = [
  "Strength Output",
  "Acceleration & Speed",
  "Explosive Power",
  "Agility & Coordination",
  "Core Stability",
  "Movement Quality",
] as const;

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 108;

/** Vertex i of a hexagon, starting at 12 o'clock and going clockwise. */
function vertex(i: number, r: number) {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) };
}

function ring(r: number) {
  return Array.from({ length: 6 }, (_, i) => vertex(i, r))
    .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
}

export function IndexHexagon() {
  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="The six Performance Index axes: strength output, acceleration and speed, explosive power, agility and coordination, core stability, and movement quality. The chart is intentionally empty; your baseline is plotted at your first assessment."
        className="mx-auto h-auto w-full max-w-md"
      >
        {/* Concentric guide rings */}
        {[0.35, 0.7, 1].map((scale) => (
          <polygon
            key={scale}
            points={ring(RADIUS * scale)}
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth={scale === 1 ? 1.5 : 1}
            opacity={scale === 1 ? 0.7 : 0.3}
          />
        ))}

        {/* Spokes */}
        {AXES.map((axis, i) => {
          const p = vertex(i, RADIUS);
          return (
            <line
              key={axis}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="var(--text-muted)"
              strokeWidth={1}
              opacity={0.3}
            />
          );
        })}

        {/* Axis end caps in the accent colour */}
        {AXES.map((axis, i) => {
          const p = vertex(i, RADIUS);
          return (
            <circle
              key={axis}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--accent-lime)"
            />
          );
        })}
      </svg>

      {/* Labels are rendered as HTML, not SVG text, so they wrap and scale
          with the rest of the type system. */}
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
        {AXES.map((axis) => (
          <li key={axis} className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-lime)]"
            />
            <span className="text-sm text-[var(--text-secondary)]">{axis}</span>
          </li>
        ))}
      </ul>

      <figcaption className="type-eyebrow mt-8 border-l-4 border-[var(--accent-lime)] pl-5">
        Your baseline gets plotted here at your first assessment
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 3: Replace the "What we measure" grid**

In `src/app/performance-index/page.tsx`, add the import:

```tsx
import { IndexHexagon } from "@/components/IndexHexagon";
```

In the "What we measure" `<Section>`, replace the `<div className="grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2">` block and its `.map()` over `whatWeMeasure` with:

```tsx
              <IndexHexagon />
```

Then delete the now-unused `whatWeMeasure` constant near the top of the file. ESLint will fail the build if you leave it.

- [ ] **Step 4: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 5: Verify visually at two widths**

```bash
npm run start -- -p 3200
```

Open `http://localhost:3200/performance-index` at 1440px wide, then at 375px. Confirm the hexagon is regular (not squashed), all six labels are readable, nothing overflows horizontally, and the caption is present.

- [ ] **Step 6: Commit**

```bash
git add src/components/IndexHexagon.tsx src/app/performance-index/page.tsx
git commit -m "feat: show the six Index axes as an honest unplotted hexagon"
```

**Stage B is complete and shippable here.**

---

## STAGE C — IA and mobile

### Task 7: The `/classes` hub

The "Classes" nav parent is a dead toggle, and no page lets a visitor compare the five classes. **Depends on Task 5** — the comparison table reads `indexMetric`.

**Files:**
- Create: `src/app/classes/page.tsx`
- Modify: `src/content/nav.ts`

**Interfaces:**
- Consumes: `classes` from `src/content/services.ts`, including `cardBlurb`, `checklist`, `indexMetric` and `serving`
- Produces: the `/classes` route, referenced by Task 8's nav

- [ ] **Step 1: Create the hub page**

Create `src/app/classes/page.tsx`. Every column is sourced from a field that already exists — no new content:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WaitlistCTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/Section";
import { asset, siteConfig } from "@/config/site";
import { classes } from "@/content/services";

export const metadata: Metadata = {
  title: "Group Fitness Classes in Richmond Hill | J17 Fitness",
  description:
    "Five coached group classes at the J17 Fitness Richmond Hill flagship: reformer Pilates, yoga, strength training, HIIT and indoor cycling. Compare them all in one place.",
  keywords: [
    "fitness classes richmond hill",
    "group classes richmond hill",
    "gym classes markham",
    "fitness classes vaughan",
    "coached classes",
    "J17 Fitness",
  ],
  alternates: { canonical: "/classes" },
  openGraph: {
    title: "Group Fitness Classes in Richmond Hill | J17 Fitness",
    description:
      "Five coached group classes at the Richmond Hill flagship. All coached, all part of the same measured plan.",
    url: `${siteConfig.url}/classes`,
    images: [{ url: asset("img/strength-hero.jpg"), alt: "Classes at J17 Fitness" }],
  },
};

export default function ClassesHubPage() {
  return (
    <>
      <Section className="pt-36 sm:pt-44">
        <Container>
          <Reveal>
            <p className="type-eyebrow mb-5">Classes</p>
            <h1 className="type-h1 max-w-4xl">
              Five classes,{" "}
              <span className="text-[var(--accent-lime)]">all coached</span>
            </h1>
            <p className="type-body mt-8 max-w-2xl text-lg">
              Five group classes at the Richmond Hill flagship. All coached, all
              part of the same measured plan.
            </p>
            <div className="mt-10">
              <WaitlistCTA variant="primary" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Cards */}
      <Section surface>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((service, i) => (
              <Reveal key={service.slug} delay={i * 100}>
                <Link href={service.href} className="card group block h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={asset(service.heroImage)}
                      alt={service.heroAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="card-image object-cover"
                    />
                    <div className="img-scrim absolute inset-0" aria-hidden="true" />
                  </div>
                  <div className="p-7">
                    <h2 className="type-h3">{service.name}</h2>
                    <p className="type-body mt-3 text-sm">{service.cardBlurb}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Side by side"
            title="Which one is for you?"
          />

          <Reveal>
            {/* Wide table scrolls inside its own container so the page body
                never scrolls horizontally on mobile. */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--bg-elevated)]">
                    {["Class", "What it is", "What it builds", "What's measured"].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-lime)]"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {classes.map((service) => (
                    <tr
                      key={service.slug}
                      className="border-b border-[var(--bg-elevated)]"
                    >
                      <th scope="row" className="px-4 py-5 align-top">
                        <Link
                          href={service.href}
                          className="type-h3 !text-base transition-colors duration-150 hover:text-[var(--accent-lime)]"
                        >
                          {service.name}
                        </Link>
                      </th>
                      <td className="type-body px-4 py-5 align-top text-sm">
                        {service.cardBlurb}
                      </td>
                      <td className="type-body px-4 py-5 align-top text-sm">
                        {service.checklist[1]}
                      </td>
                      <td className="px-4 py-5 align-top text-sm text-[var(--accent-lime)]">
                        {service.indexMetric ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="type-eyebrow mt-10 border-l-4 border-[var(--accent-lime)] pl-5">
              Serving: {classes[0].serving}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Point the nav parent at the hub**

In `src/content/nav.ts`, in the `Classes` entry of `mainNav`, change `href: "#"` to `href: "/classes"`, and add a first child:

```ts
      { label: "All Classes", href: "/classes" },
```

- [ ] **Step 3: Add the hub to the sitemap**

In `src/app/sitemap.ts`, add to the `staticRoutes` array:

```ts
    { path: "/classes", priority: 0.8 },
```

- [ ] **Step 4: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```
Expected: 23 static routes now (was 22).

- [ ] **Step 5: Verify visually**

```bash
npm run start -- -p 3200
```

Open `http://localhost:3200/classes`. Confirm five cards, a four-column comparison table, Ride's "What's measured" cell shows an em dash placeholder rather than being blank, and at 375px the table scrolls inside its own container while the page body does not scroll sideways.

- [ ] **Step 6: Commit**

```bash
git add src/app/classes/page.tsx src/content/nav.ts src/app/sitemap.ts
git commit -m "feat: add a /classes hub with a side-by-side comparison"
```

---

### Task 8: Nav restructure

Seven items, and the widest (`J17 PERFORMANCE INDEX™` at `0.12em` tracking) crowds the bar.

**Files:**
- Modify: `src/content/nav.ts`

**Interfaces:**
- Consumes: the `/classes` route from Task 7
- Produces: a six-item `mainNav`

- [ ] **Step 1: Restructure `mainNav`**

In `src/content/nav.ts`, replace the whole `mainNav` array with:

```ts
export const mainNav: NavItem[] = [
  // "Home" is deliberately absent: the logo links there, which is the
  // established convention and buys back horizontal room.
  {
    label: "Classes",
    href: "/classes",
    children: [
      { label: "All Classes", href: "/classes" },
      { label: "Reformer Pilates", href: "/classes/pilates" },
      { label: "Yoga", href: "/classes/yoga" },
      { label: "Strength Training", href: "/classes/strength" },
      { label: "HIIT", href: "/classes/hiit" },
      { label: "Ride", href: "/classes/ride" },
    ],
  },
  {
    label: "Training",
    href: "#",
    children: [
      { label: "Personal Training", href: "/personal-training" },
      { label: "Athletic Performance", href: "/athletic-performance" },
      { label: "Youth Athletic Development", href: "/youth" },
    ],
  },
  // Recovery stays top level. It is one of the four brand pillars and a
  // genuine differentiator — burying it in a dropdown would be a downgrade.
  { label: "Recovery", href: "/recovery" },
  // Shortened from "J17 Performance Index™", which was by far the widest item
  // in the bar. The full trademarked name still appears in page content,
  // headings and metadata.
  { label: "The Index", href: "/performance-index" },
  { label: "Memberships", href: "/memberships" },
  {
    label: "About",
    href: "#",
    children: [
      { label: "First Timers", href: "/first-timers" },
      { label: "Café", href: "/cafe" },
      { label: "Locations", href: "/locations" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];
```

- [ ] **Step 2: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 3: Verify visually and by keyboard**

```bash
npm run start -- -p 3200
```

At 1440px confirm six items with no crowding and no wrapping. Then verify accessibility did not regress: press `Tab` to a dropdown parent, `Enter` to open it, `Escape` to close it, and confirm focus outlines stay visible throughout.

- [ ] **Step 4: Commit**

```bash
git add src/content/nav.ts
git commit -m "refactor: tighten the nav to six items and shorten the Index label"
```

---

### Task 9: Mobile refinements

Four changes, each verified at a real 375px viewport rather than asserted.

**Files:**
- Modify: `src/app/globals.css` (h1 width axis)
- Modify: `src/components/Section.tsx` (section padding)
- Modify: `src/app/page.tsx` (hero height, classes carousel)

**Interfaces:**
- Consumes: nothing new
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Ease the h1 width axis on small screens**

In `src/app/globals.css`, add immediately after the `.type-h1` rule:

```css
/* Ultra-wide caps are the first thing to overflow on a 375px screen. Easing
   the width axis keeps the headline on three lines instead of four or five. */
@media (max-width: 639px) {
  .type-h1 {
    font-variation-settings: "wdth" 110, "wght" 900;
    letter-spacing: 0.02em;
  }
}
```

- [ ] **Step 2: Reduce mobile section padding**

In `src/components/Section.tsx`, change the `<section>` className from:

```tsx
      className={`relative py-20 sm:py-28 ${
```

to:

```tsx
      className={`relative py-14 sm:py-28 ${
```

- [ ] **Step 3: Reduce the mobile hero height**

In `src/app/page.tsx`, in the HERO `<section>`, change `min-h-[92vh]` to `min-h-[85vh] sm:min-h-[92vh]`.

- [ ] **Step 4: Make the homepage classes grid a scroll-snap row on mobile**

In `src/app/page.tsx`, in the CLASSES section, change the grid wrapper from:

```tsx
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

to:

```tsx
          {/* Five stacked cards is a long scroll on a phone. Below sm this
              becomes one swipeable row; from sm up it is the normal grid. */}
          <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
```

Then, on the `<Reveal>` inside that map, add a width and snap class so the cards size correctly in the row:

```tsx
              <Reveal
                key={service.slug}
                delay={i * 100}
                className="w-[78vw] shrink-0 snap-start sm:w-auto sm:shrink"
              >
```

- [ ] **Step 5: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 6: Verify at 375px — this is the point of the task**

```bash
npm run start -- -p 3200
```

At a 375x812 viewport, check `/`, `/classes`, `/classes/pilates` and `/performance-index`. For each confirm:

1. The `h1` does not overflow and stays on three lines or fewer.
2. No horizontal page scroll. Verify in the console:

```js
console.log("overflow:", document.documentElement.scrollWidth > window.innerWidth);
```

Expected: `overflow: false` on every page.

3. On `/`, the classes row swipes horizontally and snaps.
4. Vertical whitespace between sections is noticeably tighter than before.

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css src/components/Section.tsx src/app/page.tsx
git commit -m "fix: tighten mobile spacing, headline width and the classes row"
```

---

### Task 10: Cross-link strips

Every service page currently ends in a dead end.

**Files:**
- Create: `src/components/MoreServices.tsx`
- Modify: `src/components/ServicePage.tsx`

**Interfaces:**
- Consumes: `classes`, `training`, `Service` from `src/content/services.ts`
- Produces: `<MoreServices current={Service} />`

- [ ] **Step 1: Create the component**

Create `src/components/MoreServices.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/config/site";
import { classes, training, type Service } from "@/content/services";
import { Reveal } from "./Reveal";
import { Container, Section, SectionHeading } from "./Section";

/**
 * Sends visitors sideways instead of leaving them at a dead end.
 *
 * Shows siblings from the same group — a Pilates reader sees other classes,
 * a personal-training reader sees other training programs — because those are
 * the genuinely comparable alternatives.
 */
export function MoreServices({
  current,
  surface = true,
}: {
  current: Service;
  /** Supplied by ServicePage's band counter so the strip never collides. */
  surface?: boolean;
}) {
  const siblings = (current.group === "classes" ? classes : training).filter(
    (s) => s.slug !== current.slug,
  );

  if (siblings.length === 0) return null;

  return (
    <Section surface={surface}>
      <Container>
        <SectionHeading
          eyebrow="Keep looking"
          title={current.group === "classes" ? "More classes" : "More training"}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siblings.map((service, i) => (
            <Reveal key={service.slug} delay={i * 100}>
              <Link href={service.href} className="card group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={asset(service.heroImage)}
                    alt={service.heroAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="card-image object-cover"
                  />
                  <div className="img-scrim absolute inset-0" aria-hidden="true" />
                </div>
                <div className="p-6">
                  <h3 className="type-h3 !text-base">{service.name}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Render it in the template**

In `src/components/ServicePage.tsx`, add the import:

```tsx
import { MoreServices } from "./MoreServices";
```

Insert immediately **before** the closing CTA `<Section>`, feeding it the same
band counter introduced in Task 5:

```tsx
      <MoreServices current={service} surface={nextBand()} />
```

- [ ] **Step 3: Route the closing CTA through the counter too**

The closing CTA is the last band on the page, so it must also take its colour
from the counter rather than being fixed. In `src/components/ServicePage.tsx`,
change:

```tsx
      <Section className="border-t border-[var(--bg-elevated)]">
```

to:

```tsx
      <Section
        surface={nextBand()}
        className="border-t border-[var(--bg-elevated)]"
      >

- [ ] **Step 4: Verify green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```

- [ ] **Step 5: Verify visually**

```bash
npm run start -- -p 3200
```

- `http://localhost:3200/classes/pilates` — expect four sibling class cards, not including Pilates itself.
- `http://localhost:3200/personal-training` — expect two sibling training cards.
- `http://localhost:3200/classes/ride` — the case the old arithmetic broke. Ride has no content sections and no `<IndexProof>`, so verify the strip and the closing CTA still alternate correctly against the checklist above them.

Walk each of the eight service pages top to bottom and confirm no two adjacent sections share a background colour.

- [ ] **Step 6: Commit**

```bash
git add src/components/MoreServices.tsx src/components/ServicePage.tsx
git commit -m "feat: cross-link sibling services at the foot of each page"
```

**Stage C is complete. All three stages shipped.**

---

## Final verification

- [ ] **Full toolchain green**

```bash
npm test && npx tsc --noEmit && npx eslint src --max-warnings=0 && npm run build
```
Expected: 11 tests pass; no type or lint errors; 23 routes, all static.

- [ ] **Success criteria from the spec**

1. Every page has exactly one visually dominant conversion action, and the business can fulfil it.
2. Location and opening status are visible in the first scroll of the homepage.
3. The Performance Index appears as proof on all seven service pages that legitimately claim it.
4. No route leads to a page that fails to deliver what its link promised.
5. Build, types and lint are clean; all routes static.
6. No new marketing claim, price, date, statistic or testimonial anywhere.

- [ ] **Confirm no fabricated content crept in**

```bash
grep -rnE '\$[0-9]|20(2[6-9]|3[0-9]) opening|[0-9]+% (stronger|faster|better)' src/ || echo "clean: no prices, dates or invented statistics"
```

## Notes for the client

Raise these separately — they are not code problems:

1. **Ride has no Performance Index claim** anywhere in the archive, while the other seven services do. Oversight or deliberate?
2. **A Chinese-language version.** The Xiaohongshu presence drives a Chinese-speaking GTA audience to an English-only site. Likely the single highest-value addition, but it is a translation project, not a design change.
3. **Content still outstanding:** founding-member pricing, the Richmond Hill street address and opening date, tour photography, the café menu, and the founding story.
4. **Assets are hotlinked from the client's S3 bucket.** A transient `ECONNRESET` was observed in testing. Migrating to local files in `public/img/` is the durable fix.
