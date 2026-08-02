import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA, WaitlistCTA } from "@/components/CTA";
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

      {/* ---------------- Take the Tour ---------------- */}
      <Section surface id="tour">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="The Space" title="Take the tour" />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <p className="type-body text-lg">
                10,000 square feet under one roof in Richmond Hill: a full
                strength floor, dedicated class studios for Pilates, yoga, HIIT
                and Ride, a complete recovery zone with sauna, cold plunge and
                red light therapy, and a healthy café.
              </p>
              {/*
                TODO: real tour content. The homepage has linked "Take the Tour"
                here since launch but no tour ever existed. This needs either a
                photo gallery, a floor plan, or a walkthrough video from the
                client. Copy above is assembled from facts already stated
                elsewhere on the site — no new claims.
              */}
              <p className="type-body mt-6">
                We&apos;ll be sharing the full walkthrough as the build finishes.
                Join the founding waitlist and we&apos;ll send it to you first.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <WaitlistCTA variant="primary" />
                <BookingCTA variant="secondary">Book a Visit</BookingCTA>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------- Our Story ---------------- */}
      <Section id="story">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Our Story" title="Where this came from" />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <p className="type-body text-lg">
                For years we&apos;ve coached this community out of Markham,
                Oakville and Mississauga. Richmond Hill is where it all comes
                together: coached classes, a full recovery zone and a healthy
                café under one roof, with the J17 Performance Index™ running
                underneath all of it.
              </p>
              {/*
                TODO: real story content. The homepage links "Our Story" here.
                Needs founding year, the founders' background, and why J17
                started — none of which appears anywhere in the site archive,
                so it has to come from the client.
              */}
              <p className="type-body mt-6">
                What hasn&apos;t changed is how we work. Every session is
                coached, every plan is built around you, and progress is
                measured, not guessed at.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

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
