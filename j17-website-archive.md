# J17 Fitness — Complete Website Archive
**Domain:** https://j17performance.com/
**Captured:** August 1, 2026
**Purpose:** Full content + structure snapshot before redesign. Everything below was pulled directly from the live site.

---

## 0. TL;DR / State of the site

- Pre-opening marketing site for a fitness brand relaunching around a new **10,000 sq ft Richmond Hill flagship** ("training, recovery and wellness club"), still "opening soon."
- Three **existing** training locations already operating: Markham, Oakville, Mississauga.
- No booking engine, no pricing, no e-commerce, no login. Every interactive element funnels to one of **three destinations**: the contact form, the founding waitlist, or the locations page.
- Site is **mid-rebrand**: toggles between "J17 Fitness" (new) and "J17 Performance" (old). Inconsistent nav labels, footers, logos page to page.
- CMS/platform: "D.P.Solutions" (digip-solutions.com). Footer shows build versions like `version-2.7.1.1-x`.
- Google Tag Manager container: **GTM-KN9BDMFD**

---

## 1. Brand / identity facts

- **Current name:** J17 Fitness (older name still appears: J17 Performance)
- **Tagline / hero line:** "Feel better / And see the / difference"
- **Positioning line:** "A training, recovery and wellness club — built on proof."
- **Core differentiator:** J17 Performance Index™ (proprietary benchmark + retest system)
- **Four pillars:** TRAIN · RECOVER · FUEL · TRACK
- **Brand accent color (from SVG):** `#D7FB00` (acid/lime yellow-green)
- **Logo text used:** "J17 FITNESS" and "J17 PERFORMANCE" (both appear)

### Contact / business info (identical in every footer)
- **Email:** info@j17performance.com
- **Main Office (Markham):** 170 Esna Park Dr Unit 12, Markham, Ontario, Canada, L3R 1E3 — +1-647-642-0077
- **Oakville Office:** 1290 Speers Rd Unit 12, Oakville, Ontario, Canada, L6L 2X4 — +1-416-826-6084
- **Mississauga Office:** 3413 Wolfedale Rd Unit 8, Mississauga, Ontario, Canada, L5C 1V8 — +1-416-826-6084
- **Working hours:** Mon–Sun

### Social
- **Instagram:** https://www.instagram.com/j17performance (igsh handle: MWtyNWJ1dzZhdTQ1Mg==)
- **Xiaohongshu (RED):** https://xhslink.com/m/6ZlxZcNF3ll  (signals marketing to Chinese-Canadian GTA audience)

---

## 2. Full sitemap

### Real content pages (in main nav)
```
/                          Home
/classes/pilates           Reformer Pilates
/classes/yoga              Yoga
/classes/strength          Strength Training
/classes/hiit              HIIT
/classes/ride              Ride
/personal-training         Personal Training
/athletic-performance      Athletic Performance
/youth                     Youth Athletic Development
/performance-index         J17 Performance Index™
/recovery                  Recovery Club
/memberships               Founding Memberships
/first-timers              First Timers
/locations                 Our Locations
/contact-us                Contact Us
/mailing-list/founding     Founding waitlist signup
```

### Legacy URLs (still resolve, now redirect — leftover from old site)
```
/youth-strength-conditioning-group-training    -> redirects to /youth
/adult-strength-conditioning-group-training     -> redirects to /athletic-performance
/private-athletic-performance-training          -> (same pattern; expected -> /personal-training)
```
These survive only because the **Contact page was never updated** — its nav + footer still show the OLD three-program menu.

### Nav dropdown parents (no page of their own — just toggles)
```
Classes      -> javascript:void(0)
Training     -> javascript:void(0)
About Us     -> javascript:void(0)
Our Programs -> javascript:void(0)   (old label, appears on some pages)
```

---

## 3. Navigation structure

**Current/new nav (most pages):**
- Home → `/`
- Classes ▾ → Reformer Pilates, Yoga, Strength Training, HIIT, Ride
- Training ▾ → Personal Training, Athletic Performance, Youth Athletic Development
- J17 Performance Index™ → `/performance-index`
- Recovery → `/recovery`
- Memberships → `/memberships`
- About Us ▾ → First Timers, Locations, Contact Us
- **"join now"** button (top-right, every page) → `/contact-us`

**Old nav (still on Pilates, Athletic Performance, Memberships, Contact — "Our Programs" label):**
- Home
- Our Programs ▾ → all 5 classes + 3 training + Recovery Club + Founding Memberships + First Timers (flattened into one dropdown)
- J17 Performance Index™
- About Us ▾ → Locations, Contact Us

**Contact page nav (oldest — still shows retired programs):**
- Home
- Our Programs ▾ → Youth S&C Group Training, Adult S&C Group Training, Private Athletic Performance Training
- J17 Performance Index™
- About Us ▾ → Locations, Contact Us

---

## 4. The three funnel destinations (every button leads to one of these)

1. **`/contact-us`** — catch-all. All "Book/Start/View Schedule" buttons + the top-right "join now" button. No real booking exists, so action buttons dump here.
2. **`/mailing-list/founding`** — the waitlist. All "Join the Founding Waitlist" buttons. Primary business goal.
3. **`/locations`** — "Take the Tour" and "Our Story" both point here (no actual tour/story content — just 3 map embeds).

### Button map (every CTA on the site)
| Page | Left/primary CTA | Right/secondary CTA | Destinations |
|---|---|---|---|
| Home | Join the Founding Waitlist / Join Waitlist | Take the Tour | waitlist / locations |
| Pilates | Book a Reformer Class | Join the Founding Waitlist | contact / waitlist |
| Yoga | View the Yoga Schedule | Join the Founding Waitlist | contact / waitlist |
| Strength | Start Training | Join the Founding Waitlist | contact / waitlist |
| HIIT | View the HIIT Schedule | Join the Founding Waitlist | contact / waitlist |
| Ride | Book a Ride | Join the Founding Waitlist | contact / waitlist |
| Personal Training | Book Your Assessment | Join the Founding Waitlist | contact / waitlist |
| Athletic Performance | Book a Performance Assessment | Join the Founding Waitlist | contact / waitlist |
| Youth | Book a Youth Assessment | Join the Founding Waitlist | contact / waitlist |
| Performance Index | Book a Private Performance Assessment | — | contact |
| Recovery | See the Recovery Space | Join the Founding Waitlist | contact / waitlist |
| Memberships | Join the Founding Waitlist (×3) | — | waitlist |
| First Timers | Join the Founding Waitlist | — | waitlist |
| Locations | (map embeds only, no CTA) | — | — |
| Contact | Send Message (form) | — | form submit |

---

## 5. FULL PAGE CONTENT (verbatim copy from each page)

### 5.1 HOME — `/`
**Title:** J17 Fitness — A Training, Recovery & Wellness Club
**Meta description:** J17 Fitness is a 10,000 sq ft training, recovery and wellness club in Richmond Hill — coached classes, sauna, cold plunge and red light recovery, and a healthy café. Feel better, and see the difference.

**Hero:**
- Eyebrow: J17 FITNESS
- Headline: "Feel better / And see the / difference"
- Subhead: "J17 Fitness is opening a 10,000 sq ft training and recovery club in Richmond Hill — coached classes, serious strength, sauna, cold plunge and red light recovery, and the J17 Performance Index™ that turns your progress into a number you can see."
- CTAs: Join the Founding Waitlist / Join Waitlist / Take the Tour
- Video embed: YouTube KtlS5aSNiFs (autoplay off, loop, muted). Caption: "Train. Recover. Feel the difference."

**About Us block:** "A training, recovery and wellness club — built on proof."
> J17 Fitness is a training, recovery and wellness club serving the GTA. For years we've coached this community out of Markham, Oakville and Mississauga. Now we're bringing the whole experience under one roof: our 10,000 sq ft Richmond Hill flagship, where coached classes, a full recovery zone and a healthy café sit side by side.
> What hasn't changed is how we work. Every session is coached, every plan is built around you, and progress is measured — not guessed at — through the J17 Performance Index™.

**Positioning — Why J17:**
> Most gyms hand you a room full of equipment and wish you luck. Most studios give you a good sweat and call it a day. We do something they don't: we coach every session, build recovery into your membership, and quietly measure whether it's working. Train, recover, and feel the difference — all under one roof, minutes off the 404 and 407.

**The J17 System — "Four pillars, one roof":**
- **TRAIN — Coached, not just open.** Programmed classes and strength led by coaches who know your name.
- **RECOVER — Built in, not bolted on.** Sauna, cold plunge, red light therapy and guided mobility are part of your membership — because recovery is how everything else sticks.
- **FUEL — Real food, same roof.** An on-site café serving healthy, performance-focused meals, so nutrition and recovery don't require a second stop.
- **TRACK — The J17 Performance Index™.** We benchmark and retest your strength, mobility and movement, then hand you the data — so you can see the difference, not just hope for it.

**Classes section:** "Five group classes at the Richmond Hill flagship — all coached, all part of the same measured plan."
- Strength → Programmed lifting on a full strength floor. Get strong on a plan, not by accident.
- Reformer Pilates → Core, control and mobility on the reformer, in small coached groups.
- Yoga → Slow flow, power, and hot yoga.
- HIIT → Short, hard, effective conditioning.
- Ride → High-energy indoor cycling.

**Training & Coaching section:** "More hands-on and more specific — coaching built around you, available at all four J17 locations."
- Personal Training → One-on-one coaching on a plan built for your goal, assessed and retested.
- Athletic Performance → For competitive athletes: strength, speed and power, tracked with the Performance Index™.
- Youth Athletic Development → Long-term development for young athletes, with progress parents can actually see.

**Performance Index spotlight:** "You can actually see it"
> The quiet thing no one else gives you: we benchmark where you start, then retest on a regular schedule and show you exactly what's changed. No hype — just a clear picture of your progress, and a coach who can explain it.

**Founding Memberships:** "Be first through the doors" — Founding memberships are opening now. Be first through the doors — and first on the Performance Index™.

**Recovery:** "Recovery Included" — Sauna, cold plunge, red light and guided mobility — built into your membership, not sold as an add-on.

**The Space:** "10,000 sq ft, One Roof" — A strength floor, class studios, a full recovery zone and a healthy café — our Richmond Hill flagship, all in one place.

**Community:** "Built by people who train here" — We've coached Markham, Oakville and Mississauga for years. Richmond Hill is where it all comes together — and we'd rather know your name.

**Locations block (homepage):**
- **Richmond Hill** — Flagship · Opening soon — Leslie St & 16th Ave, Richmond Hill — "The full club: strength floor, class studios, recovery zone (sauna, cold plunge, red light) and café."
- Markham — 1-170 Esna Park Dr, Markham, ON
- Oakville — 1290 Speers Rd, Oakville, ON
- Mississauga — 3413 Wolfedale Rd Unit 8, Mississauga, ON

---

### 5.2 REFORMER PILATES — `/classes/pilates`
**Title:** Reformer Pilates Studio in Richmond Hill | J17 Fitness
**Meta description:** Reformer and mat Pilates in Richmond Hill, coached in small groups. Build core strength, control and mobility. Founding memberships open now at J17 Fitness.
**Meta keywords:** pilates richmond hill, pilates markham, Reformer Pilates vaughan, Reformer Pilates, mat pilates, small group pilates, core strength, mobility training, J17 Fitness
**Hero image:** /img/pilates-hero.jpg

- H1: Reformer Pilates
- Headline: "Reformer Pilates, properly coached."
- Intro: "Long, strong and mobile — Pilates on the reformer builds the kind of control your body actually uses. In small, coached groups, not a packed room where nobody watches your form."
- **Why Pilates here:** Small groups, real eyes on you. Coaches adjust and correct — that's where the results live. / Core, control, mobility. The foundation that makes every other kind of training safer and stronger. / Measured. Mobility and movement quality are part of your Performance Index™ retests.
- **What to expect:** Reformer and mat options, from first-timer to advanced. New to the reformer? Start with our intro session and a coach walks you through every spring and strap.
- Founding checklist: Small coached groups / Core strength, control and mobility / First-timer to advanced / Progress tracked with the Performance Index™
- **Serving:** Richmond Hill, Markham, and Vaughan

---

### 5.3 YOGA — `/classes/yoga`
**Title:** Yoga & Hot Yoga Studio in Richmond Hill | J17 Fitness
**Meta description:** Yoga in Richmond Hill — from slow flow to power and hot yoga, coached in a purpose-built studio. All levels welcome. Founding memberships open now.
**Meta keywords:** yoga richmond hill, hot yoga richmond hill, yoga markham, hot yoga vaughan, power yoga, flow yoga, hot yoga studio, mobility training, J17 Fitness
**Hero image:** /img/yoga-hero.jpg

- H1: Yoga
- Headline: "Yoga that meets you where you are."
- Intro: "From slow, grounding flow to sweat-through-your-shirt power and hot yoga — a full range in one studio, led by teachers who actually teach."
- **The styles:** Flow (move and breathe; build mobility and calm) / Power (stronger, faster, hotter — a real workout) / Hot Yoga (heated sessions to loosen, sweat and reset)
- **Why it fits the bigger picture:** "Yoga isn't a side dish here — it's part of how you recover and stay mobile so your harder training holds up. Mobility gains show up in your Performance Index™ retests, too."
- Founding checklist: Slow flow to power and hot yoga / Purpose-built studio / All levels welcome / Mobility tracked with the Performance Index™
- **Serving:** Richmond Hill, Markham, and Vaughan

---

### 5.4 STRENGTH TRAINING — `/classes/strength`
**Title:** Strength Training in Richmond Hill | J17 Fitness
**Meta description:** A coached strength gym in Richmond Hill. Programmed lifting, real coaching, and the Performance Index to prove you're getting stronger.
**Meta keywords:** gym richmond hill, strength training richmond hill, strength gym markham, strength training vaughan, programmed lifting, strength coaching, weightlifting, J17 Fitness
**Hero image:** /img/strength-hero.jpg

- H1: Strength Training
- Headline: "Get strong on a plan, not by accident."
- Intro: "A full strength floor plus programmed strength classes — so you're lifting with structure and a coach, not wandering between machines hoping it adds up."
- **What makes it different:** Programmed (every block builds on the last toward a real goal) / Coached (form, load and progression handled by someone who knows what they're doing) / Measured (your strength numbers are tracked in the Performance Index™)
- **Who it's for:** Beginners who want to be shown how, and experienced lifters who want structure and accountability instead of guesswork.
- Founding checklist: Full strength floor / Programmed strength classes / Beginners to experienced lifters / Strength tracked with the Performance Index™
- **Serving:** Richmond Hill, Markham, and Vaughan

---

### 5.5 HIIT — `/classes/hiit`
**Title:** HIIT Classes in Richmond Hill | J17 Fitness
**Meta description:** High-intensity interval training in Richmond Hill — short, hard, coached conditioning that fits a real schedule. Founding memberships open now.
**Meta keywords:** hiit classes richmond hill, hiit markham, hiit vaughan, interval training, high intensity interval training, conditioning classes, J17 Fitness
**Hero image:** /img/hiit-hero.jpg

- H1: HIIT
- Headline: "Short. Hard. Effective."
- Intro: "Interval conditioning that gets in, does the work, and gets out — the most result per minute you'll find, coached so the intensity is real but the movement is safe."
- **Why HIIT here:** Time-efficient (big conditioning gains without living at the gym) / Coached intensity (push hard without pushing into injury) / Measured (conditioning progress is part of your Performance Index™)
- Founding checklist: Time-efficient sessions / Coached, safe intensity / Fits a real schedule / Conditioning tracked with the Performance Index™
- **Serving:** Richmond Hill, Markham, and Vaughan

---

### 5.6 RIDE — `/classes/ride`
**Title:** Indoor Cycling in Richmond Hill | J17 Fitness
**Meta description:** High-energy indoor cycling in Richmond Hill. Coached rides with real playlists and real conditioning. Founding memberships open now at J17 Fitness.
**Meta keywords:** spin class richmond hill, indoor cycling richmond hill, spin class markham, indoor cycling vaughan, indoor cycling, spin class, ride, conditioning, J17 Fitness
**Hero image:** /img/ride-hero.jpg

- H1: Ride
- Headline: "Ride hard. Leave better."
- Intro: "High-energy indoor cycling with the lights, the sound and a coach setting the pace — conditioning that feels like the best part of your day."
- Founding checklist: Lights, sound and real playlists / A coach setting the pace / Real conditioning, best part of your day / All levels welcome
- **Serving:** Richmond Hill, Markham, and Vaughan

---

### 5.7 PERSONAL TRAINING — `/personal-training`
**Title:** Personal Training Across the GTA | J17 Fitness
**Meta description:** One-on-one personal training in Markham, Oakville, Mississauga and Richmond Hill — built on assessment and measured with the Performance Index. Real coaching toward a real goal.
**Meta keywords:** personal trainer richmond hill, personal training markham, personal training oakville, personal training mississauga, one-on-one training, Performance Index, J17 Fitness
**Hero image:** /img/personal-training-hero.jpg

- H1: Personal Training
- Headline: "A trainer, a plan, and the proof it's working."
- Intro: "Personal training that starts with a real assessment, runs on a plan built for your goal, and gets retested so you can see it working — not just hope it is. Available at all four J17 locations."
- **How it works:** 1. Assess (benchmark strength, mobility, movement with the Performance Index™) / 2. Plan (coach builds a program around your goal and body) / 3. Train (one-on-one sessions, real coaching, form, progression) / 4. Prove (retest on a schedule, show you the numbers)
- **Who it's for:** Anyone tired of guessing — strength, recovery from injury, a sport, or just finally getting somewhere.
- Founding checklist: Starts with a real assessment / A plan built for your goal / Retested with the Performance Index™ / Available at all four J17 locations
- **Serving:** Markham, Oakville, Mississauga, and Richmond Hill

---

### 5.8 ATHLETIC PERFORMANCE — `/athletic-performance`
**Title:** Athletic Performance Training | J17 Fitness
**Meta description:** Performance training for competitive athletes across the GTA — Markham, Oakville, Mississauga and Richmond Hill. Strength, speed and power, benchmarked and retested with the J17 Performance Index.
**Meta keywords:** sports performance training, athletic performance training markham, sports performance training gta, athletic performance oakville, athletic performance mississauga, athletic performance richmond hill, J17 Performance Index, J17 Fitness
**Hero image:** /img/athletic-performance-hero.jpg

- H1: Athletic Performance
- Headline: "Train for the result. See the result."
- Intro: "Performance training built for athletes who compete — strength, speed, power and resilience, programmed by coaches and tracked with the J17 Performance Index™ so every gain is on the record."
- **The J17 Performance Index™:** "The system at the center of everything we do. We benchmark your athletic markers — strength, power, speed, mobility, movement quality — then retest on a schedule and give you and your coaches the data."
- **What you get:** Individual assessment and a program built on it / Coaching that develops the qualities your sport demands / Scheduled retests and a clear progress report / Recovery (sauna, cold plunge, red light, mobility) built into the plan
- Founding checklist: Strength, speed and power / Benchmarked and retested / Measured with the J17 Performance Index™ / Available at all four J17 locations
- **Serving:** Markham, Oakville, Mississauga, and Richmond Hill
- NOTE: uses OLD "Our Programs" nav + old footer blurb.

---

### 5.9 YOUTH ATHLETIC DEVELOPMENT — `/youth`
**Title:** Youth Athletic Development | J17 Fitness
**Meta description:** Long-term athletic development for young athletes across the GTA — Markham, Oakville, Mississauga and Richmond Hill. Coached strength, speed and movement, measured with the Performance Index.
**Meta keywords:** youth athletic development, youth sports training markham, youth athletic training gta, youth athletic development oakville, youth athletic development mississauga, youth athletic development richmond hill, long-term athletic development, J17 Fitness
**Hero image:** /img/youth-hero.jpg

- H1: Youth Athletic Development
- Headline: "Build the athlete, the right way."
- Intro: "Youth athletic development that puts long-term growth ahead of quick wins — coached strength, speed and movement, with progress you (and your kid) can actually see."
- **For parents:** "You get more than a workout — you get the data. Through the J17 Performance Index™, we benchmark and retest your young athlete's strength, speed and movement quality... No hype, just progress you can track."
- **Our approach:** Age-appropriate, long-term development — not shrunk-down adult training / Coaching on movement quality first, load second / Regular Performance Index™ retests and honest reporting / A foundation that carries into any sport
- Founding checklist: Coached strength, speed and movement / Age-appropriate, long-term approach / Measured with the Performance Index™ / Available at all four J17 locations
- **Serving:** Markham, Oakville, Mississauga, and Richmond Hill

---

### 5.10 J17 PERFORMANCE INDEX™ — `/performance-index`
**Title:** J17 Performance Index™ | Athletic Assessment & Tracking System
**Meta description:** The J17 Performance Index™ is a proprietary athletic assessment and tracking system designed to measure strength, speed, power, and movement development for long-term athletic growth.
**Meta keywords:** Athletic Assessment, Long-Term Athlete Development, Speed and Power Testing, Movement Quality Tracking, Performance Data Analytics, Youth Athletic Benchmarking, Proprietary Scoring System, Athlete Growth Monitoring
**Images:** /img/measure-large.jpg, /img/what-we-measure.jpg, /img/progress.jpg, /img/structured-assessment.jpg

- H1: Performance Index™
- **Measurable Athletic Development:** "The J17 Performance Index™ is our proprietary performance assessment and tracking system designed to measure, monitor, and guide long-term athletic development. At J17 Performance, progress is not based on guesswork. It is measured, recorded, and evaluated over time."
- **Why Measurement Matters:** "Athletic development requires more than effort — it requires structure, data, and consistent evaluation. Without objective measurement, improvement cannot be clearly defined or strategically guided."
- **What We Measure:** Strength Output / Acceleration & Speed / Explosive Power / Agility & Coordination / Core Stability / Movement Quality. "Each assessment establishes a benchmark and identifies development priorities."
- **Structured Reassessment** (reassessed at structured intervals to): Track measurable improvement / Identify performance trends / Adjust training focus / Prevent plateaus / Support long-term progression. "Progress data is shared with parents or guardians to ensure transparency."
- **Data-Guided Programming** (adjustments based on): Development stage / Sport-specific demands / Strength and power metrics / Movement efficiency indicators.
- **Built for Long-Term Athletic Growth** supports: Youth athletic development / Seasonal performance preparation / Injury prevention strategies / Long-term physical capacity building.
- **Available Locations listed here:** Markham, Mississauga, and Oakville (NOTE: omits Richmond Hill — old copy)
- CTA: Book a Private Performance Assessment
- NOTE: This page is written in the OLD "J17 Performance" youth-athletics voice, not the new club voice.

---

### 5.11 RECOVERY CLUB — `/recovery`
**Title:** Sauna, Cold Plunge & Red Light Therapy in Richmond Hill | J17 Fitness
**Meta description:** A recovery club in Richmond Hill: sauna, cold plunge, red light therapy and guided mobility — built into your training, not sold as a spa day.
**Meta keywords:** sauna richmond hill, cold plunge richmond hill, red light therapy richmond hill, contrast therapy, guided mobility, recovery club, J17 Fitness
**Hero image:** /img/recovery-hero.jpg

- H1: Recovery Club
- Headline: "Recover on purpose."
- Intro: "The people who get the best results aren't only the ones who train hardest — they're the ones who recover deliberately. Sauna, cold plunge, red light therapy and guided mobility, on-site and included."
- **What's here:** Sauna & cold plunge (contrast therapy) — flush, reset and adapt faster / Red light therapy — support recovery and tissue health / Guided mobility — coached sessions that keep you moving well
- **Why it's part of membership, not an upsell:** "Because recovery is what makes training stick. It's built into how we program you — and mobility gains show up in your Performance Index™ retests."
- Founding checklist: Sauna & cold plunge / Red light therapy / Guided mobility / Included, not an upsell
- **Serving:** Richmond Hill, Markham, and Vaughan

---

### 5.12 FOUNDING MEMBERSHIPS — `/memberships`
**Title:** Founding Memberships | J17 Fitness Richmond Hill
**Meta description:** Join the founding waitlist for J17 Fitness — Richmond Hill's coached training and recovery club. Be first in, first on the Performance Index, first to founding rates.
**Meta keywords:** founding memberships, j17 fitness richmond hill, fitness membership richmond hill, coached training, recovery club, Performance Index, J17 Fitness
**Hero image:** /img/memberships-hero.jpg

- H1: Founding Memberships
- Headline: "Get in on the ground floor."
- Intro: "We're opening our Richmond Hill flagship, and founding memberships come first. Join the waitlist and we'll reach out with founding-member rates and details before anyone else."
- **What founding members get:** First access before we open to the public / Founding-member rates, locked in / A baseline Performance Index™ assessment from day one
- **What's included:** Coached classes, the strength floor, the recovery club (sauna, cold plunge, red light) and the café — one membership, the whole loop.
- **Opening in:** Richmond Hill
- NOTE: uses OLD "Our Programs" nav + old footer blurb. NO actual pricing shown.

---

### 5.13 FIRST TIMERS — `/first-timers`
**Title:** New Here? Your First Visit | J17 Fitness Richmond Hill
**Meta description:** New to J17 Fitness in Richmond Hill? Here's what to expect on your first visit — classes, coaching, recovery and your first Performance Index assessment.
**Meta keywords:** first visit, new to j17, j17 fitness richmond hill, what to expect, first class, Performance Index assessment, J17 Fitness
**Hero image:** /img/first-timers-hero.jpg

- H1: First Timers
- Headline: "Your first visit, sorted."
- Intro: "Never trained somewhere that measures your progress? Here's exactly how your first time at J17 goes."
- **What to expect:** 1. Arrive early (come 15 min ahead — we'll show you around) / 2. Get assessed (first Performance Index™ benchmark) / 3. Train coached (a coach has your back on form and pace) / 4. Recover (cool down in the recovery club; grab something at the café)
- **What to bring:** Comfortable training gear, indoor shoes, a water bottle. We'll handle the rest.
- Location: At our Richmond Hill flagship

---

### 5.14 OUR LOCATIONS — `/locations`
**Title:** Our Locations | J17 Fitness
(No meta description set)

- **Markham, ON** — 170 Esna Park Dr Unit 12 — 647-642-0077 — Google Maps embed (J17 Performance; coords ~43.8254935, -79.3364046)
- **Oakville, ON** — 1290 Speers Rd Unit 12 — 416-826-6084 — Google Maps embed (J17 Performance Oakville; coords ~43.4244819, -79.7145646)
- **Mississauga, ON** — 3413 Wolfedale Rd Unit 8 — 416-826-6084 — Google Maps embed (J17 Performance Mississauga; coords ~43.5711364, -79.6495983)
- NOTE: Richmond Hill flagship is NOT on this page yet (only on homepage). No "tour" or "story" content despite homepage linking here for both.

---

### 5.15 CONTACT US — `/contact-us`
**Title:** Contact Us | J17performance
(No meta description set)

- H1: Contact Us
- "Get In Touch With Us — Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days."
- Lists all three office addresses + phones + email + Mon–Sun hours (same as footer).
- "Have Any Questions — Please feel free to get in touch with us using the contact form below." → **Send Message** form.
- NOTE: This is the MOST out-of-date page. Nav + footer still list the retired programs: Youth S&C Group Training / Adult S&C Group Training / Private Athletic Performance Training. Title/footer say "J17performance" (old brand).

---

### 5.16 FOUNDING WAITLIST — `/mailing-list/founding`
**Title:** | J17Fitness  (blank title before the pipe — bug)

- "Stay informed — Subscribe to our newsletter to receive early discount offers, updates and new products info."
- Just a Subscribe form. This is the endpoint for every "Join the Founding Waitlist" button across the site.

---

## 6. Image inventory (asset paths on S3)

All hosted at: `https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/j17performance.com/j17main/`

**Hero images:**
- img/pilates-hero.jpg
- img/yoga-hero.jpg
- img/strength-hero.jpg
- img/hiit-hero.jpg
- img/ride-hero.jpg
- img/personal-training-hero.jpg
- img/athletic-performance-hero.jpg
- img/youth-hero.jpg
- img/recovery-hero.jpg
- img/memberships-hero.jpg
- img/first-timers-hero.jpg

**Homepage / index images:**
- img/14.jpg, img/15.jpg (about section)
- img/measure.jpg (index spotlight)
- img/location4.jpg (Richmond Hill)
- img/750x750/1.jpg (Markham), img/750x750/2.jpg (Oakville), img/750x750/4.jpg (Mississauga)

**Performance Index images:**
- img/measure-large.jpg
- img/what-we-measure.jpg
- img/progress.jpg
- img/structured-assessment.jpg

**Vectors / icons:**
- media/vector/circular-text.png
- media/icons/menu-icon.png
- media/icons/check-mark.png
- xiaohongshu-2.svg

**Video:** YouTube embed KtlS5aSNiFs

---

## 7. SEO keyword targeting (by page) — worth preserving for the rebuild

- **Geographic targets throughout:** Richmond Hill, Markham, Vaughan, Oakville, Mississauga, GTA
- Classes target "[activity] richmond hill / markham / vaughan"
- Training pages target "[service] markham / oakville / mississauga / richmond hill" + "gta"
- Recovery targets "sauna / cold plunge / red light therapy richmond hill", "contrast therapy"
- Index targets "athletic assessment", "long-term athlete development", "movement quality tracking", "proprietary scoring system"

**Split logic to preserve:** Class pages say "Serving: Richmond Hill, Markham, Vaughan" (flagship-new). Training pages say "Markham, Oakville, Mississauga, Richmond Hill" (existing business). Vaughan appears only for classes; Oakville only for training.

---

## 8. Known issues / inconsistencies to fix in the redesign

1. **Brand name split:** "J17 Fitness" (new) vs "J17 Performance" (old) appears inconsistently in logos, titles, copyright, footer blurbs. Pick one.
2. **Two footer blurbs in rotation:** New — "J17 Fitness is a training, recovery and wellness club..." Old — "J17 Performance provides youth athletic performance and Strength & Conditioning training in Markham, Mississauga, and Oakville..." (old one appears on Pilates, Athletic Performance, Memberships, Contact).
3. **Two nav structures:** New ("Classes"/"Training"/"Recovery"/"Memberships") vs old ("Our Programs" mega-dropdown). Contact page has a THIRD, oldest nav with retired programs.
4. **Contact page fully stale** — retired program links, old brand name.
5. **Missing FUEL/café page** — café is a stated pillar but has no page.
6. **Locations page missing the Richmond Hill flagship** — only shows the 3 old gyms; no tour/story content though homepage links "Take the Tour" AND "Our Story" here.
7. **Performance Index page in old voice** — youth-athletics tone, lists only Markham/Mississauga/Oakville (no Richmond Hill).
8. **Waitlist page has blank title** (`| J17Fitness`).
9. **Fake action buttons** — "Book a Class / View Schedule / Book Assessment" all go to /contact-us; no real booking/scheduling exists yet.
10. **No pricing anywhere** — Memberships page never states rates (intentional pre-launch, but note it).
11. **Legacy redirect URLs still indexable** — 3 old program URLs redirect but are still linked from Contact.
12. **Phone inconsistency** — Markham uses 647-642-0077; Oakville + Mississauga share 416-826-6084.

---

## 9. Tech / platform notes

- **CMS:** D.P.Solutions (digip-solutions.com), build strings `version-2.7.1.1-x` / `2.6.7.x`
- **Analytics:** Google Tag Manager GTM-KN9BDMFD
- **Asset hosting:** AWS S3 (dp-prod bucket, us-east-2)
- **Maps:** Google Maps embeds on /locations
- **Video:** YouTube (KtlS5aSNiFs)
- **Menu pattern:** dropdown parents are `javascript:void(0)` toggles (no standalone landing pages for Classes / Training / About)
