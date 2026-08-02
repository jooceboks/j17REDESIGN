/**
 * Single source of truth for site-wide values.
 *
 * Every component reads from here. Nothing below should be duplicated
 * into a page or component — if you find yourself typing a phone number
 * or a URL into JSX, add it here instead.
 */

export const siteConfig = {
  name: "J17 Fitness",
  legalName: "J17 Fitness",
  tagline: "A training, recovery and wellness club — built on proof.",
  url: "https://j17performance.com",

  /**
   * Footer blurb. Taken from the live site (the "new" brand voice one).
   * The old "J17 Performance provides youth athletic performance..." blurb
   * is retired and must not come back.
   */
  footerBlurb:
    "J17 Fitness is a training, recovery and wellness club — coached classes, recovery and a healthy café at our Richmond Hill flagship, plus training locations in Markham, Oakville and Mississauga. Progress you can see, through the J17 Performance Index™.",

  /* ----------------------------------------------------------
     FUNNEL DESTINATIONS
     Three real destinations. Change these, not the components.
     ---------------------------------------------------------- */

  /** Every "Join the Founding Waitlist" button. Primary business goal. */
  waitlistUrl: "/mailing-list/founding",

  /**
   * Every "Book / Start / View Schedule / Assessment" button, via <BookingCTA>.
   *
   * TODO: connect booking provider. When J17 signs with a fitness-management
   * platform (Glofox / Mariana Tek / PushPress / WellnessLiving / Mindbody /
   * Vagaro), change this one value:
   *   - Link out:  "https://book.j17fitness.com" (provider's hosted page)
   *   - Embed:     "/book" (build that page, paste the provider's widget)
   *   - Full API:  "/book" (replace the page internals with the provider API)
   * Every booking button across the site follows automatically.
   */
  bookingUrl: "/contact-us",

  /**
   * The persistent top-right "join now" button.
   * Kept pointing at the contact form, matching the live site.
   */
  joinNowUrl: "/contact-us",

  /** "Take the Tour" and "Our Story" both land here. */
  tourUrl: "/locations#tour",
  storyUrl: "/locations#story",

  /* ----------------------------------------------------------
     CONTACT
     ---------------------------------------------------------- */

  email: "info@j17performance.com",
  hours: "Mon–Sun",

  social: {
    instagram: "https://www.instagram.com/j17performance",
    xiaohongshu: "https://xhslink.com/m/6ZlxZcNF3ll",
  },

  /* ----------------------------------------------------------
     INTEGRATIONS
     ---------------------------------------------------------- */

  gtmId: "GTM-KN9BDMFD",
  youtubeHeroId: "KtlS5aSNiFs",

  /**
   * Assets still live on the client's S3 bucket. Referencing them
   * directly keeps the rebuild visually complete today.
   * TODO: replace with final assets — when new photography lands, drop
   * files in /public/img/ and set this to "" so paths resolve locally.
   */
  assetBase:
    "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/j17performance.com/j17main",

  /** The logo sits one level above the j17main/ folder on S3. */
  logoUrl:
    "https://dp-prod.s3.us-east-2.amazonaws.com/img/tmp/j17performance.com/logo-2.png",
} as const;

const localAssetOverrides: Record<string, string> = {
  "img/index/physique-overview.png": "/img/index/physique-overview.png",
};

/** Resolve an archive image path (e.g. "img/pilates-hero.jpg") to a full URL. */
export function asset(path: string): string {
  const clean = path.replace(/^\/+/, "");
  if (clean in localAssetOverrides) {
    return localAssetOverrides[clean];
  }
  return `${siteConfig.assetBase}/${clean}`;
}

/* ------------------------------------------------------------
   LOCATIONS
   Richmond Hill is the flagship and is not yet open. The other
   three are existing, operating gyms.
   ------------------------------------------------------------ */

export type Location = {
  slug: string;
  city: string;
  label: string;
  status: "flagship" | "open";
  statusLabel?: string;
  street: string;
  region: string;
  postalCode?: string;
  phone?: string;
  blurb?: string;
  coords?: { lat: number; lng: number };
  mapQuery?: string;
  image: string;
};

export const locations: Location[] = [
  {
    slug: "richmond-hill",
    city: "Richmond Hill",
    label: "Richmond Hill",
    status: "flagship",
    statusLabel: "Flagship · Opening soon",
    street: "Leslie St & 16th Ave",
    region: "Richmond Hill, ON",
    blurb:
      "The full club: strength floor, class studios, recovery zone (sauna, cold plunge, red light) and café.",
    image: "img/location4.jpg",
    // TODO: exact address + map embed once the Richmond Hill lease address is public.
  },
  {
    slug: "markham",
    city: "Markham",
    label: "Markham",
    status: "open",
    street: "170 Esna Park Dr Unit 12",
    region: "Markham, Ontario, Canada",
    postalCode: "L3R 1E3",
    phone: "+1-647-642-0077",
    coords: { lat: 43.8254935, lng: -79.3364046 },
    mapQuery: "J17 Performance, 170 Esna Park Dr Unit 12, Markham, ON L3R 1E3",
    image: "img/750x750/1.jpg",
  },
  {
    slug: "oakville",
    city: "Oakville",
    label: "Oakville",
    status: "open",
    street: "1290 Speers Rd Unit 12",
    region: "Oakville, Ontario, Canada",
    postalCode: "L6L 2X4",
    phone: "+1-416-826-6084",
    coords: { lat: 43.4244819, lng: -79.7145646 },
    mapQuery: "J17 Performance Oakville, 1290 Speers Rd Unit 12, Oakville, ON L6L 2X4",
    image: "img/750x750/2.jpg",
  },
  {
    slug: "mississauga",
    city: "Mississauga",
    label: "Mississauga",
    status: "open",
    street: "3413 Wolfedale Rd Unit 8",
    region: "Mississauga, Ontario, Canada",
    postalCode: "L5C 1V8",
    phone: "+1-416-826-6084",
    coords: { lat: 43.5711364, lng: -79.6495983 },
    mapQuery:
      "J17 Performance Mississauga, 3413 Wolfedale Rd Unit 8, Mississauga, ON L5C 1V8",
    image: "img/750x750/4.jpg",
  },
];

/** The three operating offices, as listed in the footer and on /contact-us. */
export const offices = locations.filter((l) => l.status === "open");
