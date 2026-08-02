import Image from "next/image";
import type { Metadata } from "next";
import { asset, siteConfig } from "@/config/site";
import type { Service } from "@/content/services";
import { BookingCTA, WaitlistCTA } from "./CTA";
import { Reveal } from "./Reveal";
import { CheckList, Container, Section, SectionHeading } from "./Section";

/**
 * The template behind all eight service pages (5 classes + 3 training
 * programs). They were already identical in shape on the old site, so they
 * are modelled as data in content/services.ts and rendered here.
 *
 * Change the layout once, and all eight pages change.
 */
export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-20 sm:min-h-[80vh]">
        <Image
          src={asset(service.heroImage)}
          alt={service.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">
              {service.group === "classes" ? "Classes" : "Training"}
            </p>
            <h1 className="type-h1 max-w-4xl">{service.h1}</h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Headline + intro ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="type-h2">
                {service.headline}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={100}>
              <p className="type-body text-lg">{service.intro}</p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                {service.primaryAction === "enquiry" ? (
                  <>
                    <BookingCTA>{service.bookingLabel}</BookingCTA>
                    <WaitlistCTA />
                  </>
                ) : (
                  <>
                    <WaitlistCTA variant="primary" />
                    {/*
                      There is no booking engine and the flagship is not open,
                      so a "Book a Class" button would be a lie. This is a quiet
                      link that says what it actually does: opens a form.
                    */}
                    <BookingCTA variant="quiet">
                      Questions about classes? Get in touch
                    </BookingCTA>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Content sections ---------------- */}
      {service.sections.map((section, si) => (
        <Section key={section.heading} surface={si % 2 === 0}>
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionHeading title={section.heading} />
              </div>

              <div className="lg:col-span-7">
                {section.intro && (
                  <Reveal>
                    <p className="type-body text-lg">{section.intro}</p>
                  </Reveal>
                )}

                {section.items && (
                  <ul
                    className={`${section.intro ? "mt-10" : ""} ${
                      section.numbered
                        ? "space-y-8"
                        : "space-y-6 sm:space-y-8"
                    }`}
                  >
                    {section.items.map((item, i) => (
                      <Reveal as="li" key={item.title ?? item.body} delay={i * 100}>
                        <div className="flex gap-5">
                          {section.numbered ? (
                            <span
                              aria-hidden="true"
                              className="font-display shrink-0 text-2xl leading-none text-[var(--accent-lime)]"
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          ) : (
                            <span
                              aria-hidden="true"
                              className="mt-[0.55em] h-[6px] w-[18px] shrink-0 bg-[var(--accent-lime)]"
                            />
                          )}
                          <div>
                            {item.title && (
                              <h3 className="type-h3 mb-2">{item.title}</h3>
                            )}
                            <p className="type-body">{item.body}</p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* ---------------- Founding checklist + serving ---------------- */}
      {/* Continues the alternating band. With an even number of content
          sections the last one landed on the base color, so this must be
          surface to avoid two adjacent dark blocks merging into one. */}
      <Section surface={service.sections.length % 2 === 0}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Founding memberships"
                title="What you get"
              />
            </div>
            <div className="lg:col-span-7">
              <CheckList items={service.checklist} />

              <Reveal delay={400}>
                <p className="type-eyebrow mt-12 border-l-4 border-[var(--accent-lime)] pl-5">
                  Serving: {service.serving}
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
              Be first through <span className="text-[var(--accent-lime)]">the doors</span>
            </h2>
            <p className="type-body mt-6 text-lg">
              Founding memberships are opening now. Join the waitlist and we&apos;ll
              reach out with founding-member rates and details before anyone else.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <WaitlistCTA variant="primary" />
              {service.primaryAction === "enquiry" && (
                <BookingCTA variant="secondary">
                  {service.bookingLabel}
                </BookingCTA>
              )}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/** Builds the per-page metadata from the same data object. */
export function serviceMetadata(service: Service): Metadata {
  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: { canonical: service.href },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${siteConfig.url}${service.href}`,
      images: [{ url: asset(service.heroImage), alt: service.heroAlt }],
    },
  };
}
