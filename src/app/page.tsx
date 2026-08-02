import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookingCTA, WaitlistCTA } from "@/components/CTA";
import { HeroVideo } from "@/components/HeroVideo";
import { Reveal } from "@/components/Reveal";
import { StatusBand } from "@/components/StatusBand";
import { Container, Section, SectionHeading } from "@/components/Section";
import { asset, locations, siteConfig } from "@/config/site";
import { classes, training } from "@/content/services";

export const metadata: Metadata = {
  title: "J17 Fitness — A Training, Recovery & Wellness Club",
  description:
    "J17 Fitness is a 10,000 sq ft training, recovery and wellness club in Richmond Hill — coached classes, sauna, cold plunge and red light recovery, and a healthy café. Feel better, and see the difference.",
  keywords: [
    "gym richmond hill",
    "fitness club richmond hill",
    "training and recovery club",
    "coached classes richmond hill",
    "J17 Performance Index",
    "J17 Fitness",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "J17 Fitness — A Training, Recovery & Wellness Club",
    description:
      "A 10,000 sq ft training, recovery and wellness club in Richmond Hill. Feel better, and see the difference.",
    url: siteConfig.url,
    images: [{ url: asset("img/strength-hero.jpg"), alt: "Inside J17 Fitness" }],
  },
};

/** The four brand pillars: TRAIN · RECOVER · FUEL · TRACK */
const pillars = [
  {
    name: "Train",
    headline: "Coached, not just open.",
    body: "Programmed classes and strength led by coaches who know your name.",
    href: "/classes/strength",
  },
  {
    name: "Recover",
    headline: "Built in, not bolted on.",
    body: "Sauna, cold plunge, red light therapy and guided mobility are part of your membership — because recovery is how everything else sticks.",
    href: "/recovery",
  },
  {
    name: "Fuel",
    headline: "Real food, same roof.",
    body: "An on-site café serving healthy, performance-focused meals, so nutrition and recovery don't require a second stop.",
    href: "/cafe",
  },
  {
    name: "Track",
    headline: "The J17 Performance Index™.",
    body: "We benchmark and retest your strength, mobility and movement, then hand you the data — so you can see the difference, not just hope for it.",
    href: "/performance-index",
  },
];

const clubBlocks = [
  {
    eyebrow: "Recovery Included",
    title: "Recover on purpose",
    body: "Sauna, cold plunge, red light and guided mobility — built into your membership, not sold as an add-on.",
    href: "/recovery",
    cta: "See the Recovery Club",
  },
  {
    eyebrow: "The Space",
    title: "10,000 sq ft, one roof",
    body: "A strength floor, class studios, a full recovery zone and a healthy café — our Richmond Hill flagship, all in one place.",
    href: "/locations#tour",
    cta: "Take the Tour",
  },
  {
    eyebrow: "Community",
    title: "Built by people who train here",
    body: "We've coached Markham, Oakville and Mississauga for years. Richmond Hill is where it all comes together — and we'd rather know your name.",
    href: "/first-timers",
    cta: "New here?",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-20 sm:min-h-[92vh]">
        {/* TODO: replace with final hero photography. The old site's own
            about-section images (img/14.jpg, img/15.jpg) are only 414x586,
            far too small to run full-bleed, so this uses the largest
            available asset instead. */}
        <Image
          src={asset("img/strength-hero.jpg")}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim-side absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[var(--bg-base)]/40 sm:bg-transparent"
          aria-hidden="true"
        />

        <Container className="relative z-10 py-20">
          <Reveal>
            <p className="type-eyebrow mb-6">{siteConfig.name}</p>
            <h1 className="type-h1 max-w-5xl">
              Feel better
              <br />
              <span className="text-[var(--accent-lime)]">And see the</span>
              <br />
              difference
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <p className="type-body mt-8 max-w-2xl text-base sm:text-lg">
              J17 Fitness is opening a 10,000 sq ft training and recovery club in
              Richmond Hill — coached classes, serious strength, sauna, cold
              plunge and red light recovery, and the J17 Performance Index™ that
              turns your progress into a number you can see.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-wrap gap-4">
              <WaitlistCTA variant="primary" />
              <Link href={siteConfig.tourUrl} className="btn-secondary">
                Take the Tour
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>


      <StatusBand />

      {/* ==================== WHY J17 ==================== */}
      {/* Base canvas: <StatusBand /> directly above is on surface. */}
      <Section>
        <Container>
          <Reveal className="max-w-4xl">
            <p className="type-eyebrow mb-5">Why J17</p>
            <p className="font-display text-xl leading-snug tracking-[0.02em] text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
              Most gyms hand you a room full of equipment and wish you luck. Most
              studios give you a good sweat and call it a day.{" "}
              <span className="text-[var(--accent-lime)]">
                We do something they don&apos;t.
              </span>
            </p>
            <p className="type-body mt-8 max-w-2xl text-lg">
              We coach every session, build recovery into your membership, and
              quietly measure whether it&apos;s working. Train, recover, and feel
              the difference — all under one roof, minutes off the 404 and 407.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ==================== FOUR PILLARS ==================== */}
      <Section surface>
        <Container>
          <SectionHeading
            eyebrow="The J17 System"
            title="Four pillars, one roof"
          />

          <div className="mt-14 grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.name} delay={i * 100}>
                <Link
                  href={pillar.href}
                  className="card group flex h-full flex-col p-8 sm:p-10"
                >
                  <span className="font-display text-3xl text-[var(--accent-lime)] sm:text-4xl">
                    {pillar.name}
                  </span>
                  <h3 className="type-h3 mt-5">{pillar.headline}</h3>
                  <p className="type-body mt-4">{pillar.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== PERFORMANCE INDEX ==================== */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset("img/measure.jpg")}
                  alt="A coach reviewing Performance Index™ assessment results"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="type-eyebrow mb-5">J17 Performance Index™</p>
              <h2 className="type-h2">
                You can{" "}
                <span className="text-[var(--accent-lime)]">actually see it</span>
              </h2>
              <p className="type-body mt-8 text-lg">
                The quiet thing no one else gives you: we benchmark where you
                start, then retest on a regular schedule and show you exactly
                what&apos;s changed. No hype — just a clear picture of your
                progress, and a coach who can explain it.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/performance-index" className="btn-primary">
                  How it works
                </Link>
                <BookingCTA variant="secondary">
                  Book a Private Assessment
                </BookingCTA>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ==================== CLASSES ==================== */}
      <Section surface>
        <Container>
          <SectionHeading
            eyebrow="Classes"
            title="Five classes, all coached"
            lead="Five group classes at the Richmond Hill flagship — all coached, all part of the same measured plan."
          />

          {/* Five stacked cards is a long scroll on a phone. Below sm this
              becomes one swipeable row; from sm up it is the normal grid. */}
          <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {classes.map((service, i) => (
              <Reveal
                key={service.slug}
                delay={i * 100}
                className="w-[78vw] shrink-0 snap-start sm:w-auto sm:shrink"
              >
                <Link href={service.href} className="card group block h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={asset(service.heroImage)}
                      alt={service.heroAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="card-image object-cover"
                    />
                    <div
                      className="img-scrim absolute inset-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="type-h3">{service.name}</h3>
                    <p className="type-body mt-3 text-sm">{service.cardBlurb}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== TRAINING ==================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Training & Coaching"
            title="Built around you"
            lead="More hands-on and more specific — coaching built around you, available at all four J17 locations."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {training.map((service, i) => (
              <Reveal key={service.slug} delay={i * 100}>
                <Link href={service.href} className="card group block h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={asset(service.heroImage)}
                      alt={service.heroAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="card-image object-cover"
                    />
                    <div
                      className="img-scrim absolute inset-0"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="type-h3">{service.name}</h3>
                    <p className="type-body mt-3 text-sm">{service.cardBlurb}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ RECOVERY / SPACE / COMMUNITY ============ */}
      <Section surface>
        <Container>
          <div className="grid gap-px bg-[var(--bg-elevated)] lg:grid-cols-3">
            {clubBlocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 100}>
                <div className="flex h-full flex-col bg-[var(--bg-surface)] p-8 sm:p-10">
                  <p className="type-eyebrow mb-4">{block.eyebrow}</p>
                  <h3 className="type-h3">{block.title}</h3>
                  <p className="type-body mt-4 flex-1">{block.body}</p>
                  <Link
                    href={block.href}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-lime)] transition-opacity duration-150 hover:opacity-70"
                  >
                    {block.cta}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==================== VIDEO ==================== */}
      <Section>
        <Container>
          <Reveal>
            {/* TODO: replace with a dedicated poster frame from the final
                video edit. The YouTube thumbnail for this video only exists
                at 480x360, which is too soft to run full width. */}
            <HeroVideo
              videoId={siteConfig.youtubeHeroId}
              poster={asset("img/location4.jpg")}
              caption="Train. Recover. Feel the difference."
            />
          </Reveal>
        </Container>
      </Section>

      {/* ==================== ABOUT ==================== */}
      <Section surface>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="order-2 lg:order-1">
              <p className="type-eyebrow mb-5">About Us</p>
              <h2 className="type-h2">
                A training, recovery and wellness club —{" "}
                <span className="text-[var(--accent-lime)]">built on proof.</span>
              </h2>
              <div className="mt-8 space-y-5">
                <p className="type-body">
                  J17 Fitness is a training, recovery and wellness club serving
                  the GTA. For years we&apos;ve coached this community out of
                  Markham, Oakville and Mississauga. Now we&apos;re bringing the
                  whole experience under one roof: our 10,000 sq ft Richmond Hill
                  flagship, where coached classes, a full recovery zone and a
                  healthy café sit side by side.
                </p>
                <p className="type-body">
                  What hasn&apos;t changed is how we work. Every session is
                  coached, every plan is built around you, and progress is
                  measured — not guessed at — through the J17 Performance Index™.
                </p>
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2" delay={100}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={asset("img/15.jpg")}
                  alt="Training at J17 Fitness"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ==================== LOCATIONS ==================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our Locations"
            title="Four locations, one club"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 100}>
                <Link
                  href={`/locations#${location.slug}`}
                  className="card group block h-full"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={asset(location.image)}
                      alt={`J17 Fitness ${location.city}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="card-image object-cover"
                    />
                    <div
                      className="img-scrim absolute inset-0"
                      aria-hidden="true"
                    />
                    {location.status === "flagship" && (
                      <span className="absolute left-0 top-5 bg-[var(--accent-lime)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--bg-base)]">
                        Opening soon
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="type-h3">{location.city}</h3>
                    <p className="type-body mt-2 text-sm">{location.street}</p>
                    {location.blurb && (
                      <p className="type-body mt-3 text-sm">{location.blurb}</p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============== FOUNDING MEMBERSHIPS ============== */}
      <Section surface className="overflow-hidden border-t border-[var(--bg-elevated)]">
        <span className="watermark top-1/2 -translate-y-1/2 text-[22vw] leading-none">
          J17
        </span>
        <Container className="relative z-10">
          <Reveal className="max-w-3xl">
            <p className="type-eyebrow mb-5">Founding Memberships</p>
            <h2 className="type-h2">
              Be first through{" "}
              <span className="text-[var(--accent-lime)]">the doors</span>
            </h2>
            <p className="type-body mt-6 text-lg">
              Founding memberships are opening now. Be first through the doors —
              and first on the Performance Index™.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <WaitlistCTA variant="primary" />
              <Link href="/memberships" className="btn-secondary">
                What&apos;s included
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
