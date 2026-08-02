import type { Metadata } from "next";
import { WaitlistCTA } from "@/components/CTA";
import { ComingSoon } from "@/components/ComingSoon";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/Section";
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
      <section className="border-b border-[var(--bg-elevated)] bg-[var(--bg-surface)] py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="type-eyebrow mb-5">Fuel</p>
            <h1 className="type-h1 max-w-4xl">The Café</h1>
            <p className="type-body mt-8 max-w-3xl text-lg">
              The café opens with the club. We’re building it to feel like part
              of the experience from day one — healthy, performance-focused food
              in the same space as training and recovery.
            </p>
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

      {/* TODO: cafe copy. Menu, hours, ordering, and whether it is open to
          non-members all need client input. */}
      <ComingSoon
        eyebrow="What to expect"
        headline="The menu is still being built"
        body="The caf\u00e9 opens with the club. We are not going to guess at a menu before it exists."
        points={[
          "On-site at the Richmond Hill flagship",
          "Healthy, performance-focused meals",
          "Steps from the strength floor and the recovery zone",
        ]}
        timing="At our Richmond Hill flagship"
      />

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
