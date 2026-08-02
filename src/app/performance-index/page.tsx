import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA, WaitlistCTA } from "@/components/CTA";
import { ReportFigure } from "@/components/ReportFigure";
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
      {
        url: "/img/index/competency-radar.png",
        alt: "A J17 Performance Index™ competency radar comparing an individual against their peer group",
      },
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
        {/* The old S3 hero was the same report on a white background with pink
            accents. Using a coaching photo here instead, and letting the
            report panels themselves carry the data further down the page. */}
        <Image
          src={asset("img/personal-training-hero.jpg")}
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
          <div className="mx-auto max-w-3xl">
            <Reveal>
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

          <div className="mt-16">
            <ReportFigure
              src={asset("img/index/physique-overview.png")}
              width={1600}
                height={1269}
              alt="A Performance Index report panel titled General Situation of Physique. Two donut charts compare test-category proportions between a September 2025 assessment and a January 2026 reassessment. Excellent rises from 28.57 percent to 57.14 percent. Below, a table lists height, weight, BMI, sit and reach, single leg balance, broad jump, 30 second hurdle, 4 by 10 metre shuttle, push-ups and sit-ups for both dates, with the gain on each."
              caption="Sample report: how the category mix shifts between a benchmark and a retest"
            />
          </div>
        </Container>
      </Section>

      {/* ---------------- What we measure ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:items-start">
            <div>
              <SectionHeading
                eyebrow="The benchmark"
                title="What we measure"
                lead="Each assessment establishes a benchmark and identifies development priorities."
              />
              <div className="mt-10 grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2">
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

            <div>
              <ReportFigure
                src="/img/index/competency-radar.png"
                width={1470}
                height={1600}
                maxWidth={760}
                alt="A Performance Index competency radar chart plotting eight axes: BMI, flexibility, lower strength, balance, core strength, upper strength, agility and coordination. A lime outline shows the individual's competency distribution and a cyan outline shows the peer average, so strengths and gaps against peers are visible at a glance."
                caption="Sample report: your competency profile plotted against your peer group"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Reassessment ---------------- */}
      <Section surface>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <ReportFigure
              src="/img/index/growth-metrics.png"
              width={1600}
              height={1269}
              alt="A Performance Index growth-metrics panel. A results table lists every measure across two assessment dates with the change on each. Below it, paired bar charts track height, weight, BMI and sit and reach across both dates, each overlaid with a cyan line showing the peer average for that age."
              caption="Sample report: every measure tracked across assessments against the peer average"
            />
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

      {/* ---------------- The scorecard ---------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What you actually receive"
            title="A score per test, against the standard"
            lead="Every test is scored, banded from Needs Effort to Excellent, and placed against the published standard for your age and the average for your peer group."
          />
        </Container>
      </Section>

      {/* ---------------- Programming + long term ---------------- */}
      <Section surface>
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
      <Section>
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
