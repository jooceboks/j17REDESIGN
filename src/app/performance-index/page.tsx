import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA, WaitlistCTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import {
  CheckList,
  Container,
  Section,
  SectionHeading,
} from "@/components/Section";
import { asset, locations, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "J17 Performance Index™ | Athletic Assessment & Tracking System",
  description:
    "The J17 Performance Index™ is a proprietary athletic assessment and tracking system designed to measure strength, speed, power, and movement development for long-term athletic growth.",
  keywords: [
    "Athletic Assessment",
    "Long-Term Athlete Development",
    "Speed and Power Testing",
    "Movement Quality Tracking",
    "Performance Data Analytics",
    "Youth Athletic Benchmarking",
    "Proprietary Scoring System",
    "Athlete Growth Monitoring",
  ],
  alternates: { canonical: "/performance-index" },
  openGraph: {
    title: "J17 Performance Index™ | Athletic Assessment & Tracking System",
    description:
      "Benchmark, retest, and see the difference. The proprietary assessment system at the center of everything J17 does.",
    url: `${siteConfig.url}/performance-index`,
    images: [
      { url: asset("img/measure-large.jpg"), alt: "Performance Index™ assessment" },
    ],
  },
};

const whatWeMeasure = [
  "Strength Output",
  "Acceleration & Speed",
  "Explosive Power",
  "Agility & Coordination",
  "Core Stability",
  "Movement Quality",
];

const reassessment = [
  "Track measurable improvement",
  "Identify performance trends",
  "Adjust training focus",
  "Prevent plateaus",
  "Support long-term progression",
];

const programming = [
  "Development stage",
  "Sport-specific demands",
  "Strength and power metrics",
  "Movement efficiency indicators",
];

const longTerm = [
  "Youth athletic development",
  "Seasonal performance preparation",
  "Injury prevention strategies",
  "Long-term physical capacity building",
];

export default function PerformanceIndexPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-20 sm:min-h-[80vh]">
        <Image
          src={asset("img/measure-large.jpg")}
          alt="A coach running a Performance Index™ assessment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">Track</p>
            <h1 className="type-h1 max-w-4xl">
              Performance <span className="text-[var(--accent-lime)]">Index™</span>
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Measurable development ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="type-h2">Progress you can see, not guess at.</h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="type-body text-lg">
                The J17 Performance Index™ is our proprietary performance
                assessment and tracking system, built to measure, monitor and
                guide long-term development. At J17 Fitness, progress
                isn&apos;t based on guesswork. It&apos;s measured, recorded and
                evaluated over time.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BookingCTA>Book a Private Performance Assessment</BookingCTA>
                <WaitlistCTA />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Why measurement matters ---------------- */}
      <Section surface>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset("img/structured-assessment.jpg")}
                  alt="A structured assessment in progress at J17 Fitness"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="type-eyebrow mb-5">Why measurement matters</p>
              <h2 className="type-h2">Effort isn&apos;t a plan.</h2>
              <p className="type-body mt-8 text-lg">
                Development requires more than effort — it requires structure,
                data and consistent evaluation. Without objective measurement,
                improvement can&apos;t be clearly defined or strategically
                guided.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- What we measure ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="The benchmark"
                title="What we measure"
                lead="Each assessment establishes a benchmark and identifies development priorities."
              />
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2">
                {whatWeMeasure.map((item, i) => (
                  <Reveal key={item} delay={i * 100}>
                    <div className="flex h-full items-center gap-4 bg-[var(--bg-surface)] p-6">
                      <span
                        aria-hidden="true"
                        className="font-display text-lg text-[var(--accent-lime)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="type-body text-[var(--text-primary)]">
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Reassessment ---------------- */}
      <Section surface>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset("img/progress.jpg")}
                  alt="Reviewing retest results with a coach"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Structured reassessment"
                title="Retested on a schedule"
                lead="We reassess at structured intervals to:"
              />
              <CheckList items={reassessment} className="mt-10" />
              <Reveal delay={500}>
                <p className="type-body mt-8 text-sm">
                  For young athletes, progress data is shared with parents or
                  guardians to ensure transparency.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Programming + long term ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Data-guided programming"
                title="The data changes the plan"
                lead="Training adjustments are based on:"
              />
              <CheckList items={programming} className="mt-10" />
            </div>
            <div>
              <SectionHeading
                eyebrow="Built for the long term"
                title="Capacity that lasts"
                lead="The Index supports:"
              />
              <CheckList items={longTerm} className="mt-10" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Locations ---------------- */}
      <Section surface>
        <Container>
          <SectionHeading
            eyebrow="Available at"
            title="All four J17 locations"
          />
          <div className="mt-12 grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 100}>
                <div className="h-full bg-[var(--bg-surface)] p-7">
                  <h3 className="type-h3">{location.city}</h3>
                  <p className="type-body mt-2 text-sm">{location.street}</p>
                  {location.status === "flagship" && (
                    <p className="type-eyebrow mt-4 !text-[var(--accent-lime)]">
                      Opening soon
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- Closing CTA ---------------- */}
      <Section className="border-t border-[var(--bg-elevated)]">
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="type-h2">
              Find out where{" "}
              <span className="text-[var(--accent-lime)]">you actually are</span>
            </h2>
            <p className="type-body mt-6 text-lg">
              Book a private assessment and we&apos;ll benchmark your strength,
              speed, power, mobility and movement quality — then show you the
              number.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <BookingCTA>Book a Private Performance Assessment</BookingCTA>
              <WaitlistCTA />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
