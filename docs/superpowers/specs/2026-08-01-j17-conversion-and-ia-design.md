# J17 Fitness — Conversion & IA Redesign

**Date:** 2026-08-01
**Status:** Approved, ready for implementation planning
**Applies to:** the rebuilt J17 Fitness site in this repo

---

## Problem

The rebuild faithfully reproduces the old site's content and fixes its structural defects (one brand name, one nav, one footer, real metadata, no dead links). It does not fix the site's *design* problems, which are separate and were identified in a review after the build:

1. Every service page offers two conversion buttons of equal weight, and on the five class pages one of them is fake (booking silently routes to the contact form). Two competing conversion actions dilute the one that matters.
2. The homepage is ordered brand-first. A cold visitor cannot find where the club is or when it opens without scrolling past six sections.
3. The J17 Performance Index™ is the only real differentiator and it is presented as a nav item rather than as a recurring proof.
4. `Take the Tour`, `Our Story` and `/cafe` are linked but empty.
5. The nav's widest item crowds the bar, and the mobile experience is a long vertical scroll with heavy padding.

## Constraints

- **No new content.** No pricing, opening date, coach bios, tour photography or café menu is available. Nothing in this design may invent a marketing claim, a price, a schedule, a testimonial or a statistic. Where a page needs content that does not exist, it must say so honestly rather than fill space.
- **Preserve the SEO structure.** The archive's per-activity, per-city keyword targeting is deliberate and valuable. All eight service URLs stay. The class/training "serving" city split stays.
- **The three existing gyms are operating businesses.** Markham, Oakville and Mississauga can take personal-training revenue today. Design must not bury that behind a pre-launch waitlist.

## Decisions

| Question | Decision |
|---|---|
| Content availability | Design-only. No new client content. |
| Class page consolidation | **Rejected.** Keep all 8 URLs for SEO; add a hub for humans. |
| CTA hierarchy | Split by page type, not uniform. |
| Empty pages | Redesign as honest coming-soon capture moments. |
| Scope | Full package, staged A → B → C, each stage independently shippable. |

---

## Stage A — Conversion pass

### A1. One primary conversion action per page

Add to the `Service` type in `src/content/services.ts`:

```ts
/**
 * Which action this page leads with. Class pages sell a club that has not
 * opened, so the only honest conversion is the waitlist. Training pages sell
 * a service the existing gyms deliver today, so the enquiry leads.
 */
primaryAction: "waitlist" | "enquiry";
```

- The five class pages set `"waitlist"`. Their booking button becomes a low-emphasis text link reading *"Questions about classes? Get in touch"* — honest about the fact that it opens a contact form.
- The three training pages set `"enquiry"`. `bookingLabel` stays the primary button; the waitlist becomes secondary.

`<ServicePage>` reads the field and orders the CTA pair accordingly. No per-page JSX branching.

**Scope note:** the problem being fixed is two *conversion* actions competing, not two buttons. A primary conversion paired with a soft explore link is correct and stays. The homepage hero keeps "Join the Founding Waitlist" (primary) alongside "Take the Tour" (secondary).

### A2. Homepage reorder

Current: `hero → video → about → why → pillars → classes → training → index → recovery/space/community → locations → memberships`

New:

```
hero → status band → why J17 → four pillars → index spotlight
     → classes → training → recovery → video → about/community → memberships
```

New component `<StatusBand>`: a slim full-width strip directly beneath the hero, reading *"Richmond Hill flagship opening soon · Now training in Markham, Oakville & Mississauga"*, linking to `/locations`. It answers *where* and *when* within the first scroll without hoisting the full locations grid. The grid stays in its current position.

The Index spotlight moves above the classes grid (differentiator before catalogue). The video moves below recovery (brand asset, not a decision input).

### A3. `<ComingSoon>` component

One component consumed by `/locations#tour`, `/locations#story` and `/cafe`.

Structure: eyebrow → honest headline → a short "what will be here" list assembled **only** from facts already stated elsewhere on the site → inline waitlist form → timing line.

Replaces three dead ends with three capture points. When real content lands, the client replaces the component instance rather than rebuilding the page.

---

## Stage B — The Index becomes the spine

### B1. `<IndexProof>` on every service page

Add to `Service`:

```ts
/**
 * What the Performance Index measures for this specific activity.
 * Sourced from copy already in the archive. Undefined where the archive
 * makes no Index claim — do not invent one.
 */
indexMetric?: string;
```

| Page | `indexMetric` |
|---|---|
| Pilates | Mobility and movement quality |
| Yoga | Mobility |
| Strength | Strength numbers |
| HIIT | Conditioning |
| Personal Training | Strength, mobility and movement |
| Athletic Performance | Strength, power, speed, mobility and movement quality |
| Youth | Strength, speed and movement quality |
| Ride | *(none — omit the block)* |

Ride has no Index claim anywhere in the archive. The block is omitted rather than fabricated. **Flag this gap to the client**: it is either an oversight or a deliberate scope boundary, and only they can say which.

Rendering: a lime-accented band stating what is measured for this activity, that it is benchmarked at the first session and retested on a schedule, linking to `/performance-index`.

### B2. One honest visual on `/performance-index`

The six measured categories already exist in the archive: Strength Output, Acceleration & Speed, Explosive Power, Agility & Coordination, Core Stability, Movement Quality.

A filled radar chart is **rejected** — plotting values would fabricate results.

Build instead a **hexagon frame with six labeled axes and no plotted data**, captioned *"your baseline gets plotted here at your first assessment."* Shows what measurement looks like and what the member receives, without inventing anyone's numbers.

Load the `dataviz` skill before writing this chart.

### B3. Hexagon motif

The hexagon recurs at small scale inside `<IndexProof>` so the Index reads as one system across pages.

---

## Stage C — IA and mobile

### C1. `/classes` hub

Generated from `classes` in `services.ts`, so it cannot drift from the individual pages. Its distinct job is **comparison** — all five presented side by side.

Comparison columns, all sourced from fields that already exist (no new content):

| Column | Source field |
|---|---|
| Class | `name` |
| What it is | `cardBlurb` |
| What it builds | `checklist[1]` |
| What's measured | `indexMetric` (from Stage B; blank for Ride) |
| Serving | `serving` |

Gives the "Classes" nav parent a real destination instead of a dead toggle. Depends on Stage B, since the "What's measured" column reads `indexMetric` — so C1 must land after B1.

Add to `src/content/nav.ts` as the parent `href`, replacing `"#"`.

### C2. Nav

Six items, down from seven. The dominant problem is width, not count: `J17 PERFORMANCE INDEX™` at `0.12em` tracking is the widest item and crowds the bar.

```
Classes ▾   Training ▾   Recovery   The Index   Memberships   About ▾
```

- Drop "Home" — the logo already links there (standard convention).
- Shorten the Index label to "The Index". The full trademarked name stays in page content, headings and metadata.
- Move Café into About.
- **Recovery stays top-level.** It is one of the four brand pillars and a genuine differentiator; demoting it would be a downgrade.

### C3. Mobile

All four require browser verification at a real 375px viewport, not assertion:

| Change | From | To | Why |
|---|---|---|---|
| Section padding | `py-20` | `py-14` on mobile | 80px a side is a lot of empty scrolling |
| Hero height | `min-h-[92vh]` | `min-h-[85vh]` below `sm` | Next section peeks above the fold, signalling more |
| `h1` width axis | `wdth 125` | `wdth 110` below `sm` | Ultra-wide caps are the most likely overflow at 375px |
| Classes grid | 5 stacked cards | horizontal scroll-snap row on mobile | Converts a long vertical scroll into one swipeable band |

### C4. Cross-links

A "more classes" strip at the foot of each service page, generated from data with the current page filtered out. Removes the dead end each service page currently ends in.

---

## Out of scope

Explicitly **not** in this design, and why:

- **Pricing, opening date, coach bios, real tour photography, café menu.** No content available. The design leaves marked slots.
- **Chinese-language version.** Genuinely worth doing given the Xiaohongshu presence driving a Chinese-speaking GTA audience to an English-only site, but it is a content and translation project, not a design change. **Raise with the client separately.**
- **Booking provider integration.** Already architected via `siteConfig.bookingUrl`; blocked on vendor selection. See `j17-booking-integration-brief.md`.
- **Unrelated refactoring.** The existing component boundaries are sound and stay as they are.

## Success criteria

1. Every page has exactly one visually dominant conversion action, and it is one the business can actually fulfil.
2. Location and opening status are visible within the first scroll of the homepage.
3. The Performance Index appears as proof on all seven service pages that legitimately claim it.
4. No route leads to a page that fails to deliver what its link promised.
5. `npm run build`, `tsc --noEmit` and `eslint` stay clean; all routes stay static.
6. No new marketing claim, price, date, statistic or testimonial has been introduced anywhere.

## Risks

- **Stage C mobile changes are judgment calls, not measured wins.** No analytics or user testing informs them. They are improvements on principle and should be verified visually, then validated with real data post-launch.
- **The hotlinked S3 assets are a single point of failure.** A transient `ECONNRESET` from the bucket was observed during testing, surfacing as a broken image. Next's 4-hour image cache masks this in practice, but migrating to local assets remains the durable fix.
- **The Ride Index gap** may indicate the archive is incomplete rather than that Ride is genuinely unmeasured. Confirm with the client.
