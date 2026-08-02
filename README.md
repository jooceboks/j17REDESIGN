# J17 Fitness

Rebuild of `j17performance.com` for **J17 Fitness**, a training, recovery and wellness club in the GTA. Static-first marketing site: Next.js 16 (App Router) + TypeScript + Tailwind v4, deployed to Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all 22 routes prerender static)
npm run start    # serve the production build
```

---

## Where to edit things

**You should almost never edit JSX to change content.** Nearly everything lives in three files.

| I want to change… | Edit |
| --- | --- |
| Phone numbers, email, addresses, social links, GTM ID | `src/config/site.ts` |
| Where "Book"/"Join Now"/waitlist buttons point | `src/config/site.ts` |
| Locations (add, reorder, change address or map) | `src/config/site.ts` → `locations` |
| Copy on any of the 8 class/training pages | `src/content/services.ts` |
| Nav menu or footer links | `src/content/nav.ts` |
| Colors, type scale, buttons, cards, motion | `src/app/globals.css` |
| Copy on a one-off page (home, recovery, café…) | that page's `src/app/**/page.tsx` |

### Structure

```
src/
  app/                      one route per directory
    layout.tsx              header + footer + GTM + fonts (defined ONCE)
    page.tsx                home
    classes/[slug]/         5 class pages, generated from data
    personal-training/      \
    athletic-performance/    | 3 training pages, same template
    youth/                  /
    performance-index/  recovery/  memberships/  first-timers/
    locations/  contact-us/  cafe/  mailing-list/founding/
    sitemap.ts  robots.ts  not-found.tsx
  components/
    ServicePage.tsx         template behind all 8 service pages
    Header.tsx  Footer.tsx  CTA.tsx  Forms.tsx
    Section.tsx             Container / Section / SectionHeading / CheckList
    Reveal.tsx  HeroVideo.tsx  JsonLd.tsx
  config/site.ts            single source of truth for site-wide values
  content/
    services.ts             the 8 service pages as data
    nav.ts                  one nav tree, one footer link set
  lib/submitForm.ts         single submit path for both forms
```

The eight service pages (5 classes + 3 training programs) were already identical in shape on the old site, so they're modelled as data objects in `content/services.ts` and rendered by one `<ServicePage>` template. Change the layout once and all eight change.

---

## Turning on a real booking provider

There is no booking engine today. Every "Book a Class / View Schedule / Start Training / Book Assessment" button on the site is a `<BookingCTA>` that reads **one value**: `siteConfig.bookingUrl`. It currently points at `/contact-us`.

When J17 signs with a fitness-management platform (Glofox, Mariana Tek, PushPress, WellnessLiving, Mindbody, Vagaro — see `j17-booking-integration-brief.md`):

1. **Link out** — set `bookingUrl` to the provider's hosted booking page. Done, every button goes live.
2. **Embed** — create `src/app/book/page.tsx`, paste the provider's widget snippet, set `bookingUrl = "/book"`.
3. **Full API** — replace the internals of `/book` with the provider's schedule API and your own booking UI. Nothing else in the site changes.

Same idea for forms: the contact form and the waitlist form both submit through `lib/submitForm.ts`. Wire the backend there once and both work.

---

## Assets

Photography is still hotlinked from the client's S3 bucket via `siteConfig.assetBase`, and optimized through `next/image` (the host is allowlisted in `next.config.ts`). Paths are referenced by the filenames from the site archive, e.g. `asset("img/pilates-hero.jpg")`.

To move to local assets: drop the files into `public/img/`, set `assetBase` to `""`, and remove the S3 entry from `next.config.ts`.

---

## What this rebuild fixed

The old site had accumulated a decade of inconsistencies. These are resolved and should not come back:

1. **One brand name.** "J17 Fitness" everywhere. "J17 Performance" now appears only inside the trademarked product name *J17 Performance Index™*.
2. **One nav, one footer**, defined globally in `content/nav.ts` and rendered from `layout.tsx`. The old site had three competing nav structures and two footer blurbs.
3. **Contact page rebuilt** on the current nav/footer, with the retired program links gone and 301 redirects in `next.config.ts` pointing the three dead URLs at their live equivalents.
4. **Café page added** (`/cafe`). "Fuel" is one of the four brand pillars but never had a page.
5. **Locations page includes the Richmond Hill flagship**, plus real `#tour` and `#story` sections — the homepage had been linking to both for months with nothing there.
6. **Performance Index rewritten** into the club voice (it was in the old youth-athletics voice) and now lists all four locations.
7. **Every page has a unique title and meta description.** The waitlist page's title was previously blank.
8. **No fake action buttons.** They still route to the contact form for now, but through one swappable component instead of 30 hardcoded links.
9. **Accessible dropdowns.** The old ones were `javascript:void(0)` anchors; these are real buttons with `aria-expanded`, Escape-to-close, and keyboard support.

---

## SEO

- Per-page `title`, `description`, `keywords`, canonical and Open Graph tags, pulled from the site archive.
- `sitemap.xml` and `robots.txt` generated from the same data the pages are, so a new service page can't go missing.
- `HealthClub` JSON-LD per location and `Organization` JSON-LD on the contact page.
- The archive's deliberate geo split is preserved: **class** pages serve "Richmond Hill, Markham, Vaughan" (the flagship catchment), **training** pages serve "Markham, Oakville, Mississauga, Richmond Hill" (the existing business). Vaughan appears only on classes, Oakville only on training. That split is doing real local-search work — don't flatten it.

---

## Outstanding TODOs

Grep the repo for `TODO:` — every one is listed in the handoff notes. Summary: connect a form backend, connect a booking provider, supply real tour/story/café copy, confirm the Richmond Hill street address and map, add founding-member pricing, and swap in final photography.
