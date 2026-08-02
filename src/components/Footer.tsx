import Link from "next/link";
import Image from "next/image";
import { footerNav } from "@/content/nav";
import { offices, siteConfig } from "@/config/site";

/**
 * The one and only site footer.
 *
 * The old site rotated between two blurbs and three link sets depending on
 * which page you landed on. This is defined once and used everywhere.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--bg-elevated)] bg-[var(--bg-base)]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand + blurb */}
          <div className="max-w-md">
            <Image
              src={siteConfig.logoUrl}
              alt={siteConfig.name}
              width={140}
              height={46}
              className="h-9 w-auto"
            />
            <p className="type-body mt-6 text-sm">{siteConfig.footerBlurb}</p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="J17 Fitness on Instagram"
                className="flex h-11 w-11 items-center justify-center border border-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 2.16c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07Zm0 3.67a5.01 5.01 0 1 1 0 10.02 5.01 5.01 0 0 1 0-10.02Zm0 8.26a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Zm6.38-8.46a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0Z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.xiaohongshu}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="J17 Fitness on Xiaohongshu (RED)"
                className="flex h-11 items-center justify-center border border-[var(--bg-elevated)] px-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--accent-lime)] hover:text-[var(--accent-lime)]"
              >
                小红书
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="mb-5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--accent-lime)]">
                  {col.heading}
                </h2>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div className="mt-16 grid gap-8 border-t border-[var(--bg-elevated)] pt-10 sm:grid-cols-3">
          {offices.map((office) => (
            <div key={office.slug}>
              <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--text-primary)]">
                {office.slug === "markham" ? "Main Office" : `${office.city} Office`}
              </h2>
              <address className="text-sm not-italic leading-relaxed text-[var(--text-secondary)]">
                {office.street}
                <br />
                {office.region}
                {office.postalCode ? `, ${office.postalCode}` : ""}
                {office.phone && (
                  <>
                    <br />
                    <a
                      href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                      className="transition-colors duration-150 hover:text-[var(--accent-lime)]"
                    >
                      {office.phone}
                    </a>
                  </>
                )}
              </address>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--bg-elevated)] pt-8 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors duration-150 hover:text-[var(--accent-lime)]"
            >
              {siteConfig.email}
            </a>
            <span>{siteConfig.hours}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
