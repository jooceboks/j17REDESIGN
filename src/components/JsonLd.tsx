import type { Location } from "@/config/site";
import { asset, siteConfig } from "@/config/site";

/**
 * Renders a JSON-LD block. Structured data helps local search, which matters
 * a lot here: the old site targeted Richmond Hill / Markham / Vaughan /
 * Oakville / Mississauga hard, and we want to keep that.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // The payload is built from local config, never user input. Angle brackets
  // are still escaped so a stray "</script>" in copy can never break out of
  // the tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

/** HealthClub schema for a single J17 location. */
export function locationSchema(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    "@id": `${siteConfig.url}/locations#${location.slug}`,
    name: `${siteConfig.name} ${location.city}`,
    description: location.blurb ?? siteConfig.footerBlurb,
    url: `${siteConfig.url}/locations#${location.slug}`,
    image: asset(location.image),
    ...(location.phone ? { telephone: location.phone } : {}),
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      addressLocality: location.city,
      addressRegion: "ON",
      addressCountry: "CA",
      ...(location.postalCode ? { postalCode: location.postalCode } : {}),
    },
    ...(location.coords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.coords.lat,
            longitude: location.coords.lng,
          },
        }
      : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      // TODO: exact opening and closing times — the site only ever said "Mon–Sun".
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.xiaohongshu],
  };
}

/** Organization schema for the brand as a whole. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logoUrl,
    description: siteConfig.footerBlurb,
    email: siteConfig.email,
    sameAs: [siteConfig.social.instagram, siteConfig.social.xiaohongshu],
  };
}
