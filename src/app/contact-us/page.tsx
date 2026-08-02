import type { Metadata } from "next";
import { ContactForm } from "@/components/Forms";
import { JsonLd, organizationSchema } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionHeading } from "@/components/Section";
import { offices, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us | J17 Fitness",
  description:
    "Get in touch with J17 Fitness. Call or email us, or send a message — we answer all enquiries within 24 hours on business days. Locations in Markham, Oakville and Mississauga, with Richmond Hill opening soon.",
  keywords: [
    "contact j17 fitness",
    "j17 fitness markham",
    "j17 fitness oakville",
    "j17 fitness mississauga",
    "gym contact richmond hill",
    "J17 Fitness",
  ],
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Us | J17 Fitness",
    description:
      "Give us a call or drop by anytime. We answer all enquiries within 24 hours on business days.",
    url: `${siteConfig.url}/contact-us`,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={organizationSchema()} />

      {/* ---------------- Hero ---------------- */}
      <Section className="pt-36 sm:pt-44">
        <Container>
          <Reveal>
            <p className="type-eyebrow mb-5">Get in touch</p>
            <h1 className="type-h1 max-w-4xl">Contact Us</h1>
            <p className="type-body mt-8 max-w-2xl text-lg">
              Give us a call or drop by anytime. We endeavour to answer all
              enquiries within 24 hours on business days.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Offices ---------------- */}
      <Section surface className="!pt-0 sm:!pt-0">
        <Container>
          <div className="grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-3">
            {offices.map((office, i) => (
              <Reveal key={office.slug} delay={i * 100}>
                <div className="h-full bg-[var(--bg-surface)] p-8">
                  <h2 className="type-h3">
                    {office.slug === "markham"
                      ? "Main Office"
                      : `${office.city} Office`}
                  </h2>
                  <address className="type-body mt-5 not-italic leading-relaxed">
                    {office.street}
                    <br />
                    {office.region}
                    {office.postalCode ? `, ${office.postalCode}` : ""}
                  </address>
                  {office.phone && (
                    <p className="mt-5">
                      <a
                        href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                        className="text-sm font-bold uppercase tracking-[0.1em] text-[var(--accent-lime)] transition-opacity duration-150 hover:opacity-70"
                      >
                        {office.phone}
                      </a>
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-px grid gap-px bg-[var(--bg-elevated)] sm:grid-cols-2">
              <div className="bg-[var(--bg-surface)] p-8">
                <h2 className="type-h3">Email</h2>
                <p className="mt-5">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="type-body transition-colors duration-150 hover:text-[var(--accent-lime)]"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </div>
              <div className="bg-[var(--bg-surface)] p-8">
                <h2 className="type-h3">Working Hours</h2>
                <p className="type-body mt-5">{siteConfig.hours}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------- Form ---------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Have any questions?"
                title="Send us a message"
                lead="Please feel free to get in touch using the form. We'll get back to you within 24 hours on business days."
              />
            </div>
            <Reveal className="lg:col-span-7" delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
