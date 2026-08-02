import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WaitlistCTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/Section";
import { asset, siteConfig } from "@/config/site";
import { classes } from "@/content/services";

export const metadata: Metadata = {
  title: "Group Fitness Classes in Richmond Hill | J17 Fitness",
  description:
    "Five coached group classes at the J17 Fitness Richmond Hill flagship: reformer Pilates, yoga, strength training, HIIT and indoor cycling. Compare them all in one place.",
  keywords: [
    "fitness classes richmond hill",
    "group classes richmond hill",
    "gym classes markham",
    "fitness classes vaughan",
    "coached classes",
    "J17 Fitness",
  ],
  alternates: { canonical: "/classes" },
  openGraph: {
    title: "Group Fitness Classes in Richmond Hill | J17 Fitness",
    description:
      "Five coached group classes at the Richmond Hill flagship. All coached, all part of the same measured plan.",
    url: `${siteConfig.url}/classes`,
    images: [
      { url: asset("img/strength-hero.jpg"), alt: "Classes at J17 Fitness" },
    ],
  },
};

/**
 * The hub the "Classes" nav parent finally points at.
 *
 * Its distinct job is comparison — the five individual pages each sell one
 * class well, but nothing on the site let you weigh them against each other.
 * Every column below reads a field that already exists, so this page can
 * never drift out of sync with the pages it summarises.
 */
export default function ClassesHubPage() {
  return (
    <>
      <Section className="pt-36 sm:pt-44">
        <Container>
          <Reveal>
            <p className="type-eyebrow mb-5">Classes</p>
            <h1 className="type-h1 max-w-4xl">
              Five classes,{" "}
              <span className="text-[var(--accent-lime)]">all coached</span>
            </h1>
            <p className="type-body mt-8 max-w-2xl text-lg">
              Five group classes at the Richmond Hill flagship. All coached, all
              part of the same measured plan.
            </p>
            <div className="mt-10">
              <WaitlistCTA variant="primary" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Cards */}
      <Section surface>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((service, i) => (
              <Reveal key={service.slug} delay={i * 100}>
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
                    <h2 className="type-h3">{service.name}</h2>
                    <p className="type-body mt-3 text-sm">{service.cardBlurb}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Side by side" title="Which one is for you?" />

          <Reveal>
            {/* Wide table scrolls inside its own container so the page body
                never scrolls horizontally on mobile. */}
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--bg-elevated)]">
                    {[
                      "Class",
                      "What it is",
                      "What it builds",
                      "What's measured",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-lime)]"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {classes.map((service) => (
                    <tr
                      key={service.slug}
                      className="border-b border-[var(--bg-elevated)]"
                    >
                      <th scope="row" className="px-4 py-5 align-top">
                        <Link
                          href={service.href}
                          className="font-display text-base tracking-[0.04em] text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--accent-lime)]"
                        >
                          {service.name}
                        </Link>
                      </th>
                      <td className="type-body px-4 py-5 align-top text-sm">
                        {service.cardBlurb}
                      </td>
                      <td className="type-body px-4 py-5 align-top text-sm">
                        {service.builds}
                      </td>
                      <td className="px-4 py-5 align-top text-sm text-[var(--accent-lime)]">
                        {/* Ride carries no Index claim in the archive. Show the
                            gap honestly rather than inventing a metric. */}
                        {service.indexMetric ?? (
                          <span className="text-[var(--text-muted)]">
                            Not tracked
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="type-eyebrow mt-10 border-l-4 border-[var(--accent-lime)] pl-5">
              Serving: {classes[0].serving}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
