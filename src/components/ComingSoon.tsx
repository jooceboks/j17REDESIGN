import { Reveal } from "./Reveal";
import { Container, Section } from "./Section";
import { WaitlistForm } from "./Forms";

type ComingSoonProps = {
  id?: string;
  eyebrow: string;
  headline: string;
  /** One honest paragraph. Assemble only from facts already on the site. */
  body: string;
  /** Short "what will be here" list. Again, existing facts only. */
  points: string[];
  /** e.g. "Opening with the Richmond Hill flagship". No invented dates. */
  timing: string;
  surface?: boolean;
};

/**
 * For sections the site links to but cannot yet fill.
 *
 * The rule this encodes: never promise something and deliver an empty room.
 * State plainly that it is not ready, say what it will be using only facts
 * already published elsewhere on the site, and offer the waitlist so the
 * visit still converts.
 */
export function ComingSoon({
  id,
  eyebrow,
  headline,
  body,
  points,
  timing,
  surface = false,
}: ComingSoonProps) {
  return (
    <Section id={id} surface={surface}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="type-eyebrow mb-5">{eyebrow}</p>
            <h2 className="type-h2">{headline}</h2>
            <p className="type-body mt-6 text-lg">{body}</p>

            <ul className="mt-8 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45em] h-[6px] w-[18px] shrink-0 bg-[var(--accent-lime)]"
                  />
                  <span className="type-body">{point}</span>
                </li>
              ))}
            </ul>

            <p className="type-eyebrow mt-10 border-l-4 border-[var(--accent-lime)] pl-5">
              {timing}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={100}>
            <div
              className={`border-l-4 border-[var(--accent-lime)] p-8 sm:p-10 ${
                surface ? "bg-[var(--bg-base)]" : "bg-[var(--bg-surface)]"
              }`}
            >
              <h3 className="type-h3 mb-3">See it first</h3>
              <p className="type-body mb-8 text-sm">
                Join the founding waitlist and we will send this to you before
                it goes public.
              </p>
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
