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
import { asset, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sauna, Cold Plunge & Red Light Therapy in Richmond Hill | J17 Fitness",
  description:
    "A recovery club in Richmond Hill: sauna, cold plunge, red light therapy and guided mobility — built into your training, not sold as a spa day.",
  keywords: [
    "sauna richmond hill",
    "cold plunge richmond hill",
    "red light therapy richmond hill",
    "contrast therapy",
    "guided mobility",
    "recovery club",
    "J17 Fitness",
  ],
  alternates: { canonical: "/recovery" },
  openGraph: {
    title: "Recovery Club | J17 Fitness Richmond Hill",
    description:
      "Sauna, cold plunge, red light therapy and guided mobility — on-site and included.",
    url: `${siteConfig.url}/recovery`,
    images: [
      { url: asset("img/recovery-hero.jpg"), alt: "The recovery club at J17 Fitness" },
    ],
  },
};

const whatsHere = [
  {
    title: "Sauna & cold plunge",
    body: "Contrast therapy — flush, reset and adapt faster.",
  },
  {
    title: "Red light therapy",
    body: "Support recovery and tissue health.",
  },
  {
    title: "Guided mobility",
    body: "Coached sessions that keep you moving well.",
  },
];

export default function RecoveryPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-20 sm:min-h-[80vh]">
        <Image
          src={asset("img/recovery-hero.jpg")}
          alt="The recovery club at J17 Fitness"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">Recover</p>
            <h1 className="type-h1 max-w-4xl">Recovery Club</h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Headline + intro ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="type-h2">Recover on purpose.</h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="type-body text-lg">
                The people who get the best results aren&apos;t only the ones who
                train hardest — they&apos;re the ones who recover deliberately.
                Sauna, cold plunge, red light therapy and guided mobility,
                on-site and included.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <BookingCTA>See the Recovery Space</BookingCTA>
                <WaitlistCTA />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- What's here ---------------- */}
      <Section surface>
        <Container>
          <SectionHeading eyebrow="What's here" title="Three ways to reset" />

          <div className="mt-14 grid gap-px bg-[var(--bg-elevated)] lg:grid-cols-3">
            {whatsHere.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex h-full flex-col bg-[var(--bg-surface)] p-8 sm:p-10">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl text-[var(--accent-lime)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h3 mt-5">{item.title}</h3>
                  <p className="type-body mt-4">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------- Why it's included ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Membership"
                title="Why it's part of membership, not an upsell"
              />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <p className="type-body text-lg">
                Because recovery is what makes training stick. It&apos;s built
                into how we program you — and mobility gains show up in your
                Performance Index™ retests.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Checklist ---------------- */}
      <Section surface>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Founding memberships"
                title="What you get"
              />
            </div>
            <div className="lg:col-span-7">
              <CheckList
                items={[
                  "Sauna & cold plunge",
                  "Red light therapy",
                  "Guided mobility",
                  "Included, not an upsell",
                ]}
              />
              <Reveal delay={400}>
                <p className="type-eyebrow mt-12 border-l-4 border-[var(--accent-lime)] pl-5">
                  Serving: Richmond Hill, Markham, and Vaughan
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Closing CTA ---------------- */}
      <Section className="border-t border-[var(--bg-elevated)]">
        <Container>
          <Reveal className="max-w-3xl">
            <h2 className="type-h2">
              Be first through{" "}
              <span className="text-[var(--accent-lime)]">the doors</span>
            </h2>
            <p className="type-body mt-6 text-lg">
              Founding memberships are opening now. Join the waitlist and
              we&apos;ll reach out with founding-member rates and details before
              anyone else.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <WaitlistCTA variant="primary" />
              <BookingCTA variant="secondary">See the Recovery Space</BookingCTA>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
