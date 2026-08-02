import type { Metadata } from "next";
import Image from "next/image";
import { WaitlistCTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import {
  CheckList,
  Container,
  Section,
  SectionHeading,
} from "@/components/Section";
import { asset, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Founding Memberships | J17 Fitness Richmond Hill",
  description:
    "Join the founding waitlist for J17 Fitness — Richmond Hill's coached training and recovery club. Be first in, first on the Performance Index, first to founding rates.",
  keywords: [
    "founding memberships",
    "j17 fitness richmond hill",
    "fitness membership richmond hill",
    "coached training",
    "recovery club",
    "Performance Index",
    "J17 Fitness",
  ],
  alternates: { canonical: "/memberships" },
  openGraph: {
    title: "Founding Memberships | J17 Fitness Richmond Hill",
    description:
      "Get in on the ground floor. Founding-member rates, locked in, and a baseline Performance Index™ assessment from day one.",
    url: `${siteConfig.url}/memberships`,
    images: [
      { url: asset("img/memberships-hero.jpg"), alt: "J17 Fitness Richmond Hill" },
    ],
  },
};

export default function MembershipsPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-20 sm:min-h-[80vh]">
        <Image
          src={asset("img/memberships-hero.jpg")}
          alt="Inside the J17 Fitness Richmond Hill flagship"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">Richmond Hill · Opening soon</p>
            <h1 className="type-h1 max-w-4xl">
              Founding <span className="text-[var(--accent-lime)]">Memberships</span>
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Headline + intro ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="type-h2">Get in on the ground floor.</h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="type-body text-lg">
                We&apos;re opening our Richmond Hill flagship, and founding
                memberships come first. Join the waitlist and we&apos;ll reach
                out with founding-member rates and details before anyone else.
              </p>
              <div className="mt-10">
                <WaitlistCTA variant="primary" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- What founding members get ---------------- */}
      <Section surface>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Founding members"
                title="What you get"
              />
            </div>
            <div className="lg:col-span-7">
              <CheckList
                items={[
                  "First access before we open to the public",
                  "Founding-member rates, locked in",
                  "A baseline Performance Index™ assessment from day one",
                ]}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- What's included ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="One membership"
                title="What's included"
              />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <p className="type-body text-lg">
                Coached classes, the strength floor, the recovery club (sauna,
                cold plunge, red light) and the café — one membership, the whole
                loop.
              </p>
              {/* TODO: pricing. The client has not released founding-member
                  rates yet; the old site never showed rates either. Add a
                  pricing table here once numbers are confirmed. */}
              <p className="type-eyebrow mt-10 border-l-4 border-[var(--accent-lime)] pl-5">
                Opening in Richmond Hill
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Closing CTA ---------------- */}
      <Section
        surface
        className="overflow-hidden border-t border-[var(--bg-elevated)]"
      >
        <span className="watermark top-1/2 -translate-y-1/2 text-[22vw] leading-none">
          J17
        </span>
        <Container className="relative z-10">
          <Reveal className="max-w-3xl">
            <h2 className="type-h2">
              Be first through{" "}
              <span className="text-[var(--accent-lime)]">the doors</span>
            </h2>
            <p className="type-body mt-6 text-lg">
              And first on the Performance Index™.
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
