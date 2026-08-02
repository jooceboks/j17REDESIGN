import Link from "next/link";
import { siteConfig } from "@/config/site";

type CTAProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  className?: string;
};

/**
 * Every "Book / Start / View Schedule / Assessment" button on the site.
 *
 * There is no booking engine yet, so this currently routes to the contact
 * form. It reads siteConfig.bookingUrl rather than hardcoding a destination,
 * so wiring in a real booking provider later is a one-line config change
 * instead of touching every button on every page.
 */
export function BookingCTA({
  children,
  variant = "primary",
  className = "",
}: CTAProps) {
  const href = siteConfig.bookingUrl;
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn-${variant} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`btn-${variant} ${className}`}>
      {children}
    </Link>
  );
}

/** Every "Join the Founding Waitlist" button. The primary conversion goal. */
export function WaitlistCTA({
  children = "Join the Founding Waitlist",
  variant = "secondary",
  className = "",
}: Partial<CTAProps>) {
  return (
    <Link
      href={siteConfig.waitlistUrl}
      className={`btn-${variant} ${className}`}
    >
      {children}
    </Link>
  );
}
