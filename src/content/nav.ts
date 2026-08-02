/**
 * ONE nav tree and ONE footer link set for the whole site.
 *
 * The old site had three competing nav structures (the current one, an
 * "Our Programs" mega-dropdown, and a third on /contact-us that still
 * listed retired programs). This file replaces all three.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  /** Present on dropdown parents. The parent itself is a toggle, not a link. */
  children?: NavLink[];
};

export const mainNav: NavItem[] = [
  // "Home" is deliberately absent: the logo links there, which is the
  // established convention and buys back horizontal room in a crowded bar.
  {
    label: "Classes",
    href: "/classes",
    children: [
      { label: "All Classes", href: "/classes" },
      { label: "Reformer Pilates", href: "/classes/pilates" },
      { label: "Yoga", href: "/classes/yoga" },
      { label: "Strength Training", href: "/classes/strength" },
      { label: "HIIT", href: "/classes/hiit" },
      { label: "Ride", href: "/classes/ride" },
    ],
  },
  {
    label: "Training",
    href: "#",
    children: [
      { label: "Personal Training", href: "/personal-training" },
      { label: "Athletic Performance", href: "/athletic-performance" },
      { label: "Youth Athletic Development", href: "/youth" },
    ],
  },
  // Recovery stays top level. It is one of the four brand pillars and a
  // genuine differentiator, so demoting it to a dropdown would be a downgrade.
  { label: "Recovery", href: "/recovery" },
  // Shortened from "J17 Performance Index™", which was by far the widest item
  // in the bar. The full trademarked name still appears in page content,
  // headings and metadata.
  { label: "The Index", href: "/performance-index" },
  { label: "Memberships", href: "/memberships" },
  {
    label: "About",
    href: "#",
    children: [
      { label: "First Timers", href: "/first-timers" },
      { label: "Café", href: "/cafe" },
      { label: "Locations", href: "/locations" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Classes",
    links: [
      { label: "Reformer Pilates", href: "/classes/pilates" },
      { label: "Yoga", href: "/classes/yoga" },
      { label: "Strength Training", href: "/classes/strength" },
      { label: "HIIT", href: "/classes/hiit" },
      { label: "Ride", href: "/classes/ride" },
    ],
  },
  {
    heading: "Training",
    links: [
      { label: "Personal Training", href: "/personal-training" },
      { label: "Athletic Performance", href: "/athletic-performance" },
      { label: "Youth Athletic Development", href: "/youth" },
      { label: "J17 Performance Index™", href: "/performance-index" },
    ],
  },
  {
    heading: "The Club",
    links: [
      { label: "Recovery Club", href: "/recovery" },
      { label: "Café", href: "/cafe" },
      { label: "Founding Memberships", href: "/memberships" },
      { label: "First Timers", href: "/first-timers" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Locations", href: "/locations" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Join the Waitlist", href: "/mailing-list/founding" },
    ],
  },
];
