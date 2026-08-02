import Link from "next/link";
import { Container, Section } from "./Section";
import { Reveal } from "./Reveal";

/**
 * The recurring Performance Index proof beat.
 *
 * The Index is J17's only real differentiator — every gym claims coaching and
 * recovery, nobody else hands you a number. Repeating it as a consistent band
 * on every service page turns it from a nav item into the spine of the site.
 *
 * Rendered only when the service has an indexMetric. Ride has none.
 */
export function IndexProof({
  metric,
  surface = true,
}: {
  metric: string;
  /** Supplied by ServicePage's band counter so the stripe never collides. */
  surface?: boolean;
}) {
  return (
    <Section surface={surface} className="!py-14">
      <Container>
        <Reveal>
          <div
            className={`flex flex-col gap-8 border-l-4 border-[var(--accent-lime)] p-8 sm:p-10 lg:flex-row lg:items-center lg:gap-12 ${
              surface ? "bg-[var(--bg-base)]" : "bg-[var(--bg-surface)]"
            }`}
          >
            <Hexagon />

            <div className="flex-1">
              <p className="type-eyebrow mb-3">Measured, not guessed at</p>
              <h2 className="type-h3">
                What we track here:{" "}
                <span className="text-[var(--accent-lime)]">{metric}</span>
              </h2>
              <p className="type-body mt-4">
                Benchmarked at your first session and retested on a schedule, so
                you can see what changed instead of hoping something did.
              </p>
              <Link
                href="/performance-index"
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-lime)] transition-opacity duration-150 hover:opacity-70"
              >
                How the Performance Index™ works
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Small hexagon echoing the six-axis motif on the Index report panels. */
function Hexagon() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
    >
      <polygon
        points="50,4 90,27 90,73 50,96 10,73 10,27"
        fill="none"
        stroke="var(--accent-lime)"
        strokeWidth="3"
      />
      <polygon
        points="50,28 71,40 71,64 50,76 29,64 29,40"
        fill="none"
        stroke="var(--accent-lime)"
        strokeWidth="1.5"
        opacity="0.4"
      />
    </svg>
  );
}
