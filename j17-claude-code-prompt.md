# J17 Fitness — Website Rebuild Prompt (for Claude Code)

> Paste this whole file into Claude Code as your opening message. Keep `j17-website-archive.md` and your design file (e.g. `DESIGN.md`) in the repo root so Claude Code can read them. Fill in the two blanks marked ⬅️ before you send.

---

## Context

I'm rebuilding the website for **J17 Fitness**, a training, recovery and wellness club in Richmond Hill, Ontario (with existing locations in Markham, Oakville, and Mississauga). I'm replacing the current live site (`j17performance.com`), which is on an old CMS and is mid-rebrand with a lot of inconsistencies.

You have two source files in the repo — **read both fully before writing any code:**

1. **`j17-website-archive.md`** — a complete content + structure snapshot of the current site: every page, all the copy verbatim, meta tags, the sitemap, nav structure, the CTA/button map, image asset paths, SEO keywords, and a list of known inconsistencies. This is the **content source of truth**. Reuse the copy and SEO metadata; do NOT invent new marketing claims.

2. **`DESIGN.md`** ⬅️ *(rename to match your actual file)* — the visual design system: colors, typography, spacing, component styling, layout direction. This is the **look-and-feel source of truth**. Where the archive and the design file disagree on styling, the design file wins. Where they disagree on *content*, the archive wins.

## Tech stack

Build with:

- **⬅️ [Next.js (App Router) + TypeScript + Tailwind CSS]** — *change this line if you want a different stack. If you don't care, use exactly this.*
- Static-first / SSG where possible (this is a marketing site — fast, SEO-clean, cheap to host).
- One shared layout with a global header + footer, so nav and footer are defined once, not per page.
- Deploy target: Vercel (assume this unless I say otherwise).

## What to build

Recreate every page listed in the archive's sitemap, using the archived copy and the design system. Pages:

- `/` (Home)
- `/classes/pilates`, `/classes/yoga`, `/classes/strength`, `/classes/hiit`, `/classes/ride`
- `/personal-training`, `/athletic-performance`, `/youth`
- `/performance-index`
- `/recovery`
- `/memberships`
- `/first-timers`
- `/locations`
- `/contact-us`
- `/mailing-list/founding` (waitlist signup)

## Fix these known problems from the old site (do NOT reproduce them)

The archive documents these; the rebuild must resolve them:

1. **One brand name only: "J17 Fitness."** The old site mixed "J17 Fitness" and "J17 Performance." Use "J17 Fitness" everywhere — logos, titles, copyright, footer.
2. **One footer, one nav, defined globally.** The old site had three different nav structures and two different footer blurbs across pages. Ship a single header and footer component. Use the *new* footer blurb ("J17 Fitness is a training, recovery and wellness club…").
3. **Contact page** must use the current nav/footer and drop the retired program links (Youth/Adult S&C Group Training, Private Athletic Performance Training). Set up 301 redirects from those 3 old URLs to their new equivalents (`/youth`, `/athletic-performance`, `/personal-training`).
4. **Add the missing café / FUEL page** (`/cafe`) — café is one of the four brand pillars (Train / Recover / Fuel / Track) but had no page. Scaffold it with placeholder copy in the club voice and a clear `TODO: café copy` marker.
5. **Locations page must include the Richmond Hill flagship** (Leslie St & 16th Ave, "Opening soon"), not just the three existing gyms. Add real "Take the Tour" and "Our Story" content sections, since the homepage links to them here — or, if we don't have that content yet, give them their own anchor sections with `TODO` placeholders rather than dead links.
6. **Performance Index page** — rewrite lightly into the new club voice (the old copy is in the youth-athletics voice) and list all four locations including Richmond Hill. Keep the same structure and the "What We Measure" list.
7. **Every page needs a real, unique `<title>` and meta description.** The old waitlist page had a blank title. Pull titles/descriptions/keywords from the archive per page.
8. **No fake action buttons.** On the old site, "Book a Class," "View Schedule," and "Book Assessment" all silently linked to the contact form. For now, route them to `/contact-us` **but** implement them as a single reusable `<BookingCTA>` component with a `bookingUrl` prop that currently falls back to `/contact-us`. When we wire in a real booking provider later, we change one config value, not 30 buttons. (See the booking section below.)

## CTA / funnel behavior (from the archive's button map)

Three real destinations. Wire them through **config**, not hardcoded per page:

- **Waitlist** → `/mailing-list/founding` — every "Join the Founding Waitlist" button.
- **Booking / action** → currently `/contact-us` — every "Book / Start / View Schedule / Assessment" button, via the `<BookingCTA>` component described above.
- **Tour/Story** → `/locations`.
- The persistent top-right **"Join Now"** button → keep it, but point it at the waitlist (the primary conversion goal), not the contact form. *(Flag this to me — the old site pointed it at contact; I think waitlist is better pre-launch. Do it but note it.)*

Put these in a `siteConfig` object (e.g. `config/site.ts`): `waitlistUrl`, `bookingUrl`, `phone` numbers, `email`, `addresses`, social links. Every component reads from there.

## Content/data structure

Don't hardcode page content into JSX. Model the repeating pages (the 5 classes + 3 training pages all share one template with: hero image, headline, intro, a benefits list, a "founding checklist," a "serving:" line, and two CTAs) as **data objects** rendered by a shared `<ServicePage>` template. This mirrors how the archive shows them — they're already identical in shape. It'll make the rebuild and future edits trivial.

## Assets

The archive lists all image paths (currently on the client's S3 bucket). Reference them by the filenames given (e.g. `pilates-hero.jpg`, `recovery-hero.jpg`). Put them in `/public/img/` and use the archive's mapping. Leave a `TODO: replace with final assets` note — I may swap in new photography during the redesign. Brand accent color from the old site is `#D7FB00` (lime) — but defer to `DESIGN.md` for the real palette.

## Integrations to preserve/scaffold

- **Google Tag Manager** — container `GTM-KN9BDMFD` (put the ID in config so it's swappable).
- **Google Maps embeds** on `/locations` for each site (coords are in the archive).
- **YouTube hero video** on the homepage (embed ID `KtlS5aSNiFs`).
- **Instagram** + **Xiaohongshu (RED)** social links in the footer (URLs in the archive).
- **Forms** (contact + waitlist): build the UI, and abstract the submit handler behind a single `submitForm()` function with a clearly marked `TODO: connect form backend`. Don't assume a provider — leave it swappable (Formspree, a serverless route, or a booking provider's lead API later).

## Best practices I want followed

- Semantic, accessible HTML (proper heading hierarchy, alt text on every image using the archive's alt strings, keyboard-navigable dropdown menus — the old ones were `javascript:void(0)` toggles, do it properly).
- Mobile-first responsive. This audience is heavily mobile (GTA, strong Xiaohongshu presence).
- Fast: optimized images (Next `<Image>`), lazy-load the video, minimal JS.
- SEO: per-page metadata, Open Graph tags, a generated `sitemap.xml` and `robots.txt`, JSON-LD `LocalBusiness` / `HealthClub` structured data for each location (great for local search — the old site targeted "richmond hill / markham / vaughan / oakville / mississauga" hard; preserve that).
- Keep components small and typed. One source of truth for nav items and footer links.
- Add a short `README.md` explaining the structure, where to edit content (the data files), and how to flip on a real booking provider later.

## How I want you to work

1. First, read both source files and reply with a short build plan: proposed folder structure, the shared components you'll create, and any place where `DESIGN.md` and the archive conflict so I can resolve it. **Wait for my OK before scaffolding.**
2. Then scaffold the project and the global layout (header/footer/config).
3. Then build the shared `<ServicePage>` template and generate the class/training pages from data.
4. Then the unique pages (home, performance-index, recovery, memberships, first-timers, locations, contact, waitlist, café).
5. Then SEO (metadata, sitemap, structured data), redirects, and the README.
6. Flag every `TODO` in one list at the end so I know what still needs real content or credentials.

Don't invent testimonials, prices, hours beyond "Mon–Sun," staff names, or class schedules. If content is missing, use a `TODO` placeholder and tell me.
