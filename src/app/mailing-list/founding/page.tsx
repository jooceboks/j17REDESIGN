import type { Metadata } from "next";
import { WaitlistForm } from "@/components/Forms";
import { Reveal } from "@/components/Reveal";
import {
  CheckList,
  Container,
  Section,
  SectionHeading,
} from "@/components/Section";
import { siteConfig } from "@/config/site";

/**
 * The founding waitlist. Every "Join the Founding Waitlist" button on the
 * site lands here, which makes it the highest-value page on the domain.
 *
 * On the old site this page had a BLANK <title> ("| J17Fitness") and generic
 * newsletter copy. Both are fixed here.
 */
export const metadata: Metadata = {
  title: "Join the Founding Waitlist | J17 Fitness Richmond Hill",
  description:
    "Join the J17 Fitness founding waitlist. Be first through the doors at the Richmond Hill flagship, first to founding-member rates, and first on the Performance Index.",
  keywords: [
    "founding waitlist",
    "j17 fitness richmond hill",
    "founding membership richmond hill",
    "new gym richmond hill",
    "J17 Fitness",
  ],
  alternates: { canonical: "/mailing-list/founding" },
  openGraph: {
    title: "Join the Founding Waitlist | J17 Fitness",
    description:
      "Be first through the doors, and first on the Performance Index™.",
    url: `${siteConfig.url}/mailing-list/founding`,
  },
};

export default function FoundingWaitlistPage() {
  return (
    <>
      <Section className="overflow-hidden pt-36 sm:pt-44">
        <span className="watermark top-1/2 -translate-y-1/2 text-[24vw] leading-none">
          J17
        </span>
        <Container className="relative z-10">
          <Reveal className="max-w-4xl">
            <p className="type-eyebrow mb-5">Founding memberships</p>
            <h1 className="type-h1">
              Be first through{" "}
              <span className="text-[var(--accent-lime)]">the doors</span>
            </h1>
            <p className="type-body mt-8 max-w-2xl text-lg">
              We&apos;re opening a 10,000 sq ft training and recovery club in
              Richmond Hill. Join the waitlist and we&apos;ll reach out with
              founding-member rates and details before anyone else.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section surface className="!pt-0 sm:!pt-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Founding members"
                title="What you get"
                as="h2"
              />
              <CheckList
                className="mt-10"
                items={[
                  "First access before we open to the public",
                  "Founding-member rates, locked in",
                  "A baseline Performance Index™ assessment from day one",
                  "Coached classes, the strength floor, the recovery club and the café",
                ]}
              />
            </div>

            <Reveal className="lg:col-span-7" delay={100}>
              <div className="border-l-4 border-[var(--accent-lime)] bg-[var(--bg-base)] p-8 sm:p-10">
                <h2 className="type-h3 mb-8">Join the waitlist</h2>
                <WaitlistForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
