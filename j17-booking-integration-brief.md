# J17 Fitness — Booking Integration Brief

A short reference for you (and something you can adapt to send the client) on how bookings/memberships get wired into the new site, which platforms make sense, and how to build the site now so it's painless to connect later.

---

## The key architectural point (do this regardless of vendor)

**A gym website almost never handles bookings itself.** It hands off to a dedicated fitness-management platform that owns the schedule, class caps, waitlists, memberships, billing, and the member app. The website's job is to *surface* that platform's booking flow — usually via an embedded widget, a branded subdomain, or (for the polished version) the platform's API.

So the site should be built **booking-provider-agnostic**: every "Book" button routes through one config value (`bookingUrl` / a `<BookingCTA>` component). Today it points at the contact form. The day J17 signs with a platform, you change **one value** and every button across the site goes live. That's already baked into the Claude Code prompt.

Three integration depths, cheapest to richest:

1. **Link out** — button opens the provider's hosted booking page (their subdomain or a `book.j17…` domain). Zero engineering. Works day one.
2. **Embed widget** — drop the provider's `<iframe>`/JS snippet onto a `/schedule` or `/book` page so booking happens on-site. Low effort, keeps users on the domain.
3. **Full API** — pull the live class schedule into your own UI and post bookings through the provider's API. Most work, best UX and branding. Only worth it once volume justifies it.

Recommendation for launch: start at **#1**, upgrade to **#2** quickly, consider **#3** later. Don't block the redesign on this.

---

## Platform options (current as of 2026)

These are the fitness-specific platforms that keep coming up as the strongest for class-based studios + personal training + memberships. J17's model (group classes *and* 1-on-1 training *and* memberships *and* multi-location) means you want one built for mixed class/appointment businesses, not a generic scheduler.

**Best fits for J17's model:**

- **ABC Glofox** — purpose-built for boutique studios / growing multi-location brands. Class booking, memberships, integrated payments, a custom-branded member app, and website-embeddable booking. Marketing + access-control integrations. Custom pricing. Strong fit for the "founding member / branded club" positioning J17 is going for.
- **Mariana Tek** — premium boutique-fitness platform, very strong branded app and member experience, good for multi-location. Higher end.
- **PushPress** — best-in-class for class-based gym operations; solid automated billing and scheduling. Pro plan around $159/mo. Good value.
- **WellnessLiving** — full studio management, connects with ClassPass, supports website-embedded booking. Broad feature set.
- **Mindbody** — the incumbent; broadest integration ecosystem and marketplace reach (discovery via the Mindbody app + ClassPass). Heavier and pricier, but maximum reach.
- **Vagaro** — simpler, no-contract, booking + payments + front desk in one; good if they want lightweight and cheap to start.
- **Wodify / Zen Planner** — strong on billing and the class-reservation/waitlist basics; Zen Planner is a safe, reliable "gets the fundamentals right" pick for a newer operation.

**What they nearly all give you that matters here:**
- Class scheduling with capacity caps + **waitlists** (important for a launch with founding members)
- Recurring **membership billing** via Stripe/Square
- Automated reminders (cuts no-shows)
- A **branded member app**
- Self-serve booking/cancel from the member's phone
- An **embeddable web booking widget** and, on most, an **API**

**Note the J17-specific wrinkle:** they need *both* group-class booking (Pilates/Yoga/HIIT/Ride/Strength) *and* appointment-style booking (Personal Training, Athletic/Youth assessments). Confirm any shortlisted platform does **native appointment/PT scheduling**, not just class booking — Glofox, Mariana Tek, PushPress, WellnessLiving, and Vagaro all handle the mix.

---

## Questions to ask each vendor (put in an RFP / demo checklist)

1. Do you support **both** group-class *and* 1-on-1 appointment booking natively?
2. **Multi-location** under one account (Richmond Hill + Markham + Oakville + Mississauga)?
3. Website **embed widget** and a documented **REST API**? Any rate limits?
4. **Waitlist** logic and per-class **capacity/room** limits?
5. Payments: Stripe/Square? Recurring membership billing? Class packs + drop-ins?
6. **Branded member app** (iOS/Android) — how branded, what does it cost?
7. Discovery/marketplace exposure (Mindbody app, ClassPass) — in or out?
8. Lead-capture / **waitlist API** we can post our founding-member signups into?
9. Contract length, setup/onboarding fees, per-location pricing.
10. Data export / portability if we ever leave.

---

## How this connects to the site build

In the new codebase there's a `siteConfig.bookingUrl` (and a `<BookingCTA>` component). Migration path:

- **Now:** `bookingUrl = "/contact-us"` (and waitlist form collects founding-member emails).
- **Sign a platform → link-out:** set `bookingUrl` to the provider's hosted booking URL. Done.
- **Embed:** build a `/book` (or `/schedule`) page, paste the provider's widget snippet, set `bookingUrl = "/book"`.
- **API (later):** replace the `/book` page internals with a call to the provider's schedule API + your own booking UI. Nothing else in the site changes.

Same pattern for the **waitlist form** and **contact form**: both submit through one `submitForm()` handler with a `TODO: connect backend`. When J17 picks a CRM/email tool (or the booking platform's lead API), you wire it in one place.

---

## Bottom line to tell the client

- The website will be built **booking-ready**: every "Book" button and both forms run through a single swappable config point, so connecting a real system later is a config change, not a rebuild.
- They should **choose a fitness-management platform** (Glofox / Mariana Tek / PushPress / WellnessLiving / Mindbody / Vagaro, depending on budget and how branded they want the member app) — that platform, not the website, owns scheduling, memberships, billing, and the app.
- For launch, start by **linking out** to the platform's booking page or **embedding** its widget; a full API integration is a phase-two nice-to-have once class volume justifies it.
- Nothing about the booking decision blocks the redesign — we can ship the new marketing site now and bolt bookings on the moment they've signed with a provider.
