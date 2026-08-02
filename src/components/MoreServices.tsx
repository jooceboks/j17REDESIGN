import Image from "next/image";
import Link from "next/link";
import { asset } from "@/config/site";
import { classes, training, type Service } from "@/content/services";
import { Reveal } from "./Reveal";
import { Container, Section, SectionHeading } from "./Section";

/**
 * Sends visitors sideways instead of leaving them at a dead end.
 *
 * Shows siblings from the same group — a Pilates reader sees other classes,
 * a personal-training reader sees other training programs — because those are
 * the genuinely comparable alternatives.
 */
export function MoreServices({
  current,
  surface = true,
}: {
  current: Service;
  /** Supplied by ServicePage's band counter so the strip never collides. */
  surface?: boolean;
}) {
  const siblings = (current.group === "classes" ? classes : training).filter(
    (s) => s.slug !== current.slug,
  );

  if (siblings.length === 0) return null;

  return (
    <Section surface={surface}>
      <Container>
        <SectionHeading
          eyebrow="Keep looking"
          title={current.group === "classes" ? "More classes" : "More training"}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siblings.map((service, i) => (
            <Reveal key={service.slug} delay={i * 100}>
              <Link href={service.href} className="card group block h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={asset(service.heroImage)}
                    alt={service.heroAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="card-image object-cover"
                  />
                  <div
                    className="img-scrim absolute inset-0"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-base tracking-[0.04em] text-[var(--text-primary)]">
                    {service.name}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
