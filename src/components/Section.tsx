import { Reveal } from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  surface = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Renders on the raised surface color instead of the base canvas. */
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-14 sm:py-28 ${
        surface ? "bg-[var(--bg-surface)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Eyebrow + H2 + optional lead paragraph. Used at the top of most sections
 * so the vertical rhythm stays identical across pages.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
}) {
  const Tag = as;
  const alignment = align === "center" ? "text-center mx-auto" : "";

  return (
    <Reveal className={`max-w-3xl ${alignment}`}>
      {eyebrow && <p className="type-eyebrow mb-4">{eyebrow}</p>}
      <Tag className={as === "h2" ? "type-h2" : "type-h3"}>{title}</Tag>
      {lead && <p className="type-body mt-6 text-lg">{lead}</p>}
    </Reveal>
  );
}

/** The lime check-mark list used for founding checklists and feature lists. */
export function CheckList({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 100}>
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="mt-[0.4em] h-[6px] w-[18px] shrink-0 bg-[var(--accent-lime)]"
            />
            <span className="type-body text-[var(--text-primary)]">{item}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
