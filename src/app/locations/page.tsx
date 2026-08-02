import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA, WaitlistCTA } from "@/components/CTA";
import { ComingSoon } from "@/components/ComingSoon";
import { JsonLd, locationSchema } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/Section";
import { asset, locations, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Locations | J17 Fitness",
  description:
    "J17 Fitness locations across the GTA — the Richmond Hill flagship (opening soon) plus training locations in Markham, Oakville and Mississauga.",
  keywords: [
    "gym richmond hill",
    "gym markham",
    "gym oakville",
    "gym mississauga",
    "j17 fitness locations",
    "J17 Fitness",
  ],
  alternates: { canonical: "/locations" },
  openGraph: {
    title: "Our Locations | J17 Fitness",
    description:
      "Four locations across the GTA. The Richmond Hill flagship opens soon.",
    url: `${siteConfig.url}/locations`,
    images: [{ url: asset("img/location4.jpg"), alt: "J17 Fitness Richmond Hill" }],
  },
};

export default function LocationsPage() {
  const flagship = locations.find((l) => l.status === "flagship")!;
  const open = locations.filter((l) => l.status === "open");

  return (
    <>
      {locations.map((location) => (
        <JsonLd key={location.slug} data={locationSchema(location)} />
      ))}

      {/* ---------------- Hero ---------------- */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-20 sm:min-h-[70vh]">
        <Image
          src={asset("img/location4.jpg")}
          alt="The J17 Fitness Richmond Hill flagship"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="img-scrim absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 pb-16 sm:pb-24">
          <Reveal>
            <p className="type-eyebrow mb-5">Across the GTA</p>
            <h1 className="type-h1 max-w-4xl">Our Locations</h1>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Flagship ---------------- */}
      <Section id={flagship.slug}>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={asset(flagship.image)}
                  alt="The J17 Fitness Richmond Hill flagship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-0 top-6 bg-[var(--accent-lime)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--bg-base)]">
                  {flagship.statusLabel}
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="type-eyebrow mb-5">Flagship</p>
              <h2 className="type-h2">{flagship.city}</h2>
              <address className="type-body mt-6 text-lg not-italic">
                {flagship.street}
                <br />
                {flagship.region}
              </address>
              <p className="type-body mt-6">{flagship.blurb}</p>
              {/* TODO: exact street address + Google Maps embed for Richmond
                  Hill once the client confirms the final unit number. */}
              <div className="mt-10 flex flex-wrap gap-4">
                <WaitlistCTA variant="primary" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* TODO: replace with the real tour (photo gallery, floor plan or
          walkthrough video) once the client supplies it. */}
      <ComingSoon
        surface
        id="tour"
        eyebrow="The Space"
        headline="The tour is coming"
        body="10,000 square feet under one roof in Richmond Hill. The walkthrough goes live as the build finishes."
        points={[
          "A full strength floor",
          "Dedicated studios for Pilates, yoga, HIIT and Ride",
          "A recovery zone with sauna, cold plunge and red light therapy",
          "An on-site healthy caf\u00e9",
        ]}
        timing="Opening with the Richmond Hill flagship"
      />

      {/* TODO: replace with the real story once the client supplies founding
          year, the founders' background and why J17 started. None of that
          appears anywhere in the site archive. */}
      <ComingSoon
        id="story"
        eyebrow="Our Story"
        headline="The full story is coming"
        body="For years we have coached this community out of Markham, Oakville and Mississauga. Richmond Hill is where it all comes together."
        points={[
          "Coached classes, a recovery zone and a caf\u00e9 under one roof",
          "The J17 Performance Index\u2122 running underneath all of it",
          "Every session coached, every plan built around you",
        ]}
        timing="Opening with the Richmond Hill flagship"
      />

      {/* ---------------- Existing locations ---------------- */}
      <Section surface>
        <Container>
          <SectionHeading
            eyebrow="Now open"
            title="Training locations"
            lead="Personal training, athletic performance and youth development run out of all three."
          />

          <div className="mt-14 space-y-16">
            {open.map((location, i) => (
              <Reveal key={location.slug} delay={i * 100}>
                <div
                  id={location.slug}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)]">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(
                        location.mapQuery ?? location.street,
                      )}&output=embed`}
                      title={`Map of J17 Fitness ${location.city}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 h-full w-full border-0 grayscale-[0.4] contrast-125"
                    />
                  </div>

                  <div>
                    <h3 className="type-h2">{location.city}</h3>
                    <address className="type-body mt-5 text-lg not-italic leading-relaxed">
                      {location.street}
                      <br />
                      {location.region}
                      {location.postalCode ? `, ${location.postalCode}` : ""}
                    </address>
                    {location.phone && (
                      <p className="mt-5">
                        <a
                          href={`tel:${location.phone.replace(/[^+\d]/g, "")}`}
                          className="type-eyebrow !text-[var(--accent-lime)] transition-opacity duration-150 hover:opacity-70"
                        >
                          {location.phone}
                        </a>
                      </p>
                    )}
                    <p className="type-body mt-5 text-sm">
                      {siteConfig.hours}
                    </p>
                    <div className="mt-8">
                      <BookingCTA>Book Your Assessment</BookingCTA>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
