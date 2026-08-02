import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA, WaitlistCTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/Section";
import { asset, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "New Here? Your First Visit | J17 Fitness Richmond Hill",
  description:
    "New to J17 Fitness in Richmond Hill? Here's what to expect on your first visit — classes, coaching, recovery and your first Performance Index assessment.",
  keywords: [
    "first visit",
    "new to j17",
    "j17 fitness richmond hill",
    "what to expect",
    "first class",
    "Performance Index assessment",
    "J17 Fitness",
  ],
  alternates: { canonical: "/first-timers" },
  openGraph: {
    title: "New Here? Your First Visit | J17 Fitness",
    description: "Your first visit, sorted. Here's exactly how it goes.",
    url: `${siteConfig.url}/first-timers`,
    images: [
      { url: asset("img/first-timers-hero.jpg"), alt: "First visit to J17 Fitness" },
    ],
  },
};

const steps = [
  {
    title: "Arrive early",
    body: "Come 15 minutes ahead — we'll show you around.",
  },
  {
    title: "Get assessed",
    body: "Your first Performance Index™ benchmark.",
  },
  {
    title: "Train coached",
    body: "A coach has your back on form and pace.",
  },
  {
    title: "Recover",
    body: "Cool down in the recovery club, then grab something at the café.",
  },
];

export default function FirstTimersPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-20 sm:min-h-[80vh]">
        <Image
          src={asset("img/first-timers-hero.jpg")}
          alt="A first-time member being welcomed at J17 Fitness"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">New here</p>
            <h1 className="type-h1 max-w-4xl">First Timers</h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Headline + intro ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="type-h2">Your first visit, sorted.</h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="type-body text-lg">
                Never trained somewhere that measures your progress? Here&apos;s
                exactly how your first time at J17 goes.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <WaitlistCTA variant="primary" />
                <BookingCTA variant="secondary">Book Your First Visit</BookingCTA>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- What to expect ---------------- */}
      <Section surface>
        <Container>
          <SectionHeading eyebrow="What to expect" title="Four steps" />

          <div className="mt-14 grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="flex h-full flex-col bg-[var(--bg-surface)] p-8">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl text-[var(--accent-lime)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h3 mt-5">{step.title}</h3>
                  <p className="type-body mt-4">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- What to bring ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Come prepared" title="What to bring" />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <p className="type-body text-lg">
                Comfortable training gear, indoor shoes, a water bottle.
                We&apos;ll handle the rest.
              </p>
              <p className="type-eyebrow mt-10 border-l-4 border-[var(--accent-lime)] pl-5">
                At our Richmond Hill flagship
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Closing CTA ---------------- */}
      <Section surface className="border-t border-[var(--bg-elevated)]">
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="type-h2">
              Be first through{" "}
              <span className="text-[var(--accent-lime)]">the doors</span>
            </h2>
            <p className="type-body mt-6 text-lg">
              Founding memberships are opening now. Join the waitlist and
              we&apos;ll be in touch before we open.
            </p>
            <div className="mt-10">
              <WaitlistCTA variant="primary" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
