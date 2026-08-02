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

/**
 * NEW PAGE — did not exist on the old site.
 *
 * "Fuel" is one of the four brand pillars (Train / Recover / Fuel / Track)
 * and the homepage describes an on-site café, but there was no page to send
 * anyone to. This scaffolds one in the club voice.
 *
 * TODO: café copy. Everything below is assembled strictly from claims the
 * old site already made (an on-site café serving healthy, performance-focused
 * meals, same roof as training and recovery). No menu, hours, prices, vendor
 * or staff names are invented — those need to come from the client.
 */
export const metadata: Metadata = {
  title: "The Café | Healthy Food at J17 Fitness Richmond Hill",
  description:
    "An on-site café at the J17 Fitness Richmond Hill flagship, serving healthy, performance-focused food — so training, recovery and nutrition all happen under one roof.",
  keywords: [
    "healthy cafe richmond hill",
    "protein smoothies richmond hill",
    "gym cafe richmond hill",
    "performance nutrition",
    "healthy food richmond hill",
    "J17 Fitness",
  ],
  alternates: { canonical: "/cafe" },
  openGraph: {
    title: "The Café | J17 Fitness Richmond Hill",
    description:
      "Real food, same roof. Healthy, performance-focused meals at the Richmond Hill flagship.",
    url: `${siteConfig.url}/cafe`,
    images: [{ url: asset("img/15.jpg"), alt: "Inside J17 Fitness" }],
  },
};

export default function CafePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-20 sm:min-h-[70vh]">
        {/* TODO: replace with real café photography once the space is built. */}
        <Image
          src={asset("img/15.jpg")}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">Fuel</p>
            <h1 className="type-h1 max-w-4xl">The Café</h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Headline + intro ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="type-h2">Real food, same roof.</h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="type-body text-lg">
                Training and recovery only work if the rest of the day backs
                them up. Our Richmond Hill flagship has an on-site café serving
                healthy, performance-focused meals — so nutrition doesn&apos;t
                require a second stop.
              </p>
              <div className="mt-10">
                <WaitlistCTA variant="primary" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Why it's here ---------------- */}
      <Section surface>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="One of four pillars"
                title="Why a café is part of a gym"
              />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <p className="type-body text-lg">
                Train, recover, fuel, track. The café is the third pillar, and
                it sits beside the strength floor and the recovery zone on
                purpose: the whole point of the club is that the things that
                actually move the needle are all in one place.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- What to expect ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="What to expect" title="Opening with the club" />
            </div>
            <div className="lg:col-span-7">
              <CheckList
                items={[
                  "On-site at the Richmond Hill flagship",
                  "Healthy, performance-focused meals",
                  "Steps from the strength floor and the recovery zone",
                  "Opening with the club",
                ]}
              />
              <Reveal delay={400}>
                {/* TODO: café copy — menu, hours, ordering, and whether it is
                    open to non-members all need client input. */}
                <p className="type-body mt-10">
                  The full menu is still being built. Join the founding waitlist
                  and we&apos;ll share it as soon as it&apos;s set.
                </p>
                <p className="type-eyebrow mt-8 border-l-4 border-[var(--accent-lime)] pl-5">
                  At our Richmond Hill flagship
                </p>
              </Reveal>
            </div>
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
              Founding memberships include the whole loop — classes, the
              strength floor, the recovery club and the café.
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
