/**
 * The eight service pages — 5 classes + 3 training programs.
 *
 * They all share one shape (hero, headline, intro, content sections,
 * founding checklist, "serving" line, two CTAs), so they all render
 * through <ServicePage>. To edit page copy, edit it here. To change
 * how those pages look, edit the template, not this file.
 *
 * Copy is verbatim from the archive. Do not invent new marketing claims.
 */

export type ServiceSection = {
  heading: string;
  /** Optional lead paragraph before the items. */
  intro?: string;
  /** Renders as 1..n instead of bullets. */
  numbered?: boolean;
  items?: { title?: string; body: string }[];
};

export type Service = {
  slug: string;
  /** Route this page lives at. Classes are nested, training pages are top level. */
  href: string;
  /** Nav/card label. */
  name: string;
  group: "classes" | "training";

  title: string;
  description: string;
  keywords: string[];

  heroImage: string;
  heroAlt: string;

  h1: string;
  headline: string;
  intro: string;

  sections: ServiceSection[];

  /** The "founding checklist" — four short proof points. */
  checklist: string[];

  /**
   * Serving line. The archive splits these deliberately: classes serve the
   * flagship catchment (Richmond Hill / Markham / Vaughan), training serves
   * the existing business (Markham / Oakville / Mississauga / Richmond Hill).
   * Preserve the split — it is doing real local-SEO work.
   */
  serving: string;

  /**
   * What the Performance Index™ measures for this specific activity.
   *
   * Sourced from copy already in the archive. Left undefined where the archive
   * makes no Index claim — Ride is the only such case. Do not invent one.
   */
  indexMetric?: string;

  /** Booking CTA label. Routes through siteConfig.bookingUrl. */
  bookingLabel: string;

  /**
   * Which action this page leads with.
   *
   * Class pages sell the Richmond Hill flagship, which has not opened, so the
   * only conversion we can honestly offer is the waitlist. Training pages sell
   * a service the Markham, Oakville and Mississauga gyms deliver today, so the
   * enquiry leads there instead.
   */
  primaryAction: "waitlist" | "enquiry";
  /** Short teaser used on home page cards. */
  cardBlurb: string;
};

export const services: Service[] = [
  /* ========================= CLASSES ========================= */
  {
    slug: "pilates",
    href: "/classes/pilates",
    name: "Reformer Pilates",
    group: "classes",
    title: "Reformer Pilates Studio in Richmond Hill | J17 Fitness",
    description:
      "Reformer and mat Pilates in Richmond Hill, coached in small groups. Build core strength, control and mobility. Founding memberships open now at J17 Fitness.",
    keywords: [
      "pilates richmond hill",
      "pilates markham",
      "Reformer Pilates vaughan",
      "Reformer Pilates",
      "mat pilates",
      "small group pilates",
      "core strength",
      "mobility training",
      "J17 Fitness",
    ],
    heroImage: "img/pilates-hero.jpg",
    heroAlt: "A coached reformer Pilates session at J17 Fitness",
    h1: "Reformer Pilates",
    headline: "Reformer Pilates, properly coached.",
    intro:
      "Long, strong and mobile — Pilates on the reformer builds the kind of control your body actually uses. In small, coached groups, not a packed room where nobody watches your form.",
    sections: [
      {
        heading: "Why Pilates here",
        items: [
          {
            title: "Small groups, real eyes on you",
            body: "Coaches adjust and correct — that's where the results live.",
          },
          {
            title: "Core, control, mobility",
            body: "The foundation that makes every other kind of training safer and stronger.",
          },
          {
            title: "Measured",
            body: "Mobility and movement quality are part of your Performance Index™ retests.",
          },
        ],
      },
      {
        heading: "What to expect",
        intro:
          "Reformer and mat options, from first-timer to advanced. New to the reformer? Start with our intro session and a coach walks you through every spring and strap.",
      },
    ],
    checklist: [
      "Small coached groups",
      "Core strength, control and mobility",
      "First-timer to advanced",
      "Progress tracked with the Performance Index™",
    ],
    serving: "Richmond Hill, Markham, and Vaughan",
    indexMetric: "Mobility and movement quality",
    bookingLabel: "Book a Reformer Class",
    primaryAction: "waitlist",
    cardBlurb:
      "Core, control and mobility on the reformer, in small coached groups.",
  },
  {
    slug: "yoga",
    href: "/classes/yoga",
    name: "Yoga",
    group: "classes",
    title: "Yoga & Hot Yoga Studio in Richmond Hill | J17 Fitness",
    description:
      "Yoga in Richmond Hill — from slow flow to power and hot yoga, coached in a purpose-built studio. All levels welcome. Founding memberships open now.",
    keywords: [
      "yoga richmond hill",
      "hot yoga richmond hill",
      "yoga markham",
      "hot yoga vaughan",
      "power yoga",
      "flow yoga",
      "hot yoga studio",
      "mobility training",
      "J17 Fitness",
    ],
    heroImage: "img/yoga-hero.jpg",
    heroAlt: "A yoga class in the purpose-built studio at J17 Fitness",
    h1: "Yoga",
    headline: "Yoga that meets you where you are.",
    intro:
      "From slow, grounding flow to sweat-through-your-shirt power and hot yoga — a full range in one studio, led by teachers who actually teach.",
    sections: [
      {
        heading: "The styles",
        items: [
          { title: "Flow", body: "Move and breathe; build mobility and calm." },
          { title: "Power", body: "Stronger, faster, hotter — a real workout." },
          { title: "Hot Yoga", body: "Heated sessions to loosen, sweat and reset." },
        ],
      },
      {
        heading: "Why it fits the bigger picture",
        intro:
          "Yoga isn't a side dish here — it's part of how you recover and stay mobile so your harder training holds up. Mobility gains show up in your Performance Index™ retests, too.",
      },
    ],
    checklist: [
      "Slow flow to power and hot yoga",
      "Purpose-built studio",
      "All levels welcome",
      "Mobility tracked with the Performance Index™",
    ],
    serving: "Richmond Hill, Markham, and Vaughan",
    indexMetric: "Mobility",
    bookingLabel: "View the Yoga Schedule",
    primaryAction: "waitlist",
    cardBlurb: "Slow flow, power, and hot yoga.",
  },
  {
    slug: "strength",
    href: "/classes/strength",
    name: "Strength Training",
    group: "classes",
    title: "Strength Training in Richmond Hill | J17 Fitness",
    description:
      "A coached strength gym in Richmond Hill. Programmed lifting, real coaching, and the Performance Index to prove you're getting stronger.",
    keywords: [
      "gym richmond hill",
      "strength training richmond hill",
      "strength gym markham",
      "strength training vaughan",
      "programmed lifting",
      "strength coaching",
      "weightlifting",
      "J17 Fitness",
    ],
    heroImage: "img/strength-hero.jpg",
    heroAlt: "The coached strength floor at J17 Fitness",
    h1: "Strength Training",
    headline: "Get strong on a plan, not by accident.",
    intro:
      "A full strength floor plus programmed strength classes — so you're lifting with structure and a coach, not wandering between machines hoping it adds up.",
    sections: [
      {
        heading: "What makes it different",
        items: [
          {
            title: "Programmed",
            body: "Every block builds on the last toward a real goal.",
          },
          {
            title: "Coached",
            body: "Form, load and progression handled by someone who knows what they're doing.",
          },
          {
            title: "Measured",
            body: "Your strength numbers are tracked in the Performance Index™.",
          },
        ],
      },
      {
        heading: "Who it's for",
        intro:
          "Beginners who want to be shown how, and experienced lifters who want structure and accountability instead of guesswork.",
      },
    ],
    checklist: [
      "Full strength floor",
      "Programmed strength classes",
      "Beginners to experienced lifters",
      "Strength tracked with the Performance Index™",
    ],
    serving: "Richmond Hill, Markham, and Vaughan",
    indexMetric: "Strength numbers",
    bookingLabel: "Start Training",
    primaryAction: "waitlist",
    cardBlurb:
      "Programmed lifting on a full strength floor. Get strong on a plan, not by accident.",
  },
  {
    slug: "hiit",
    href: "/classes/hiit",
    name: "HIIT",
    group: "classes",
    title: "HIIT Classes in Richmond Hill | J17 Fitness",
    description:
      "High-intensity interval training in Richmond Hill — short, hard, coached conditioning that fits a real schedule. Founding memberships open now.",
    keywords: [
      "hiit classes richmond hill",
      "hiit markham",
      "hiit vaughan",
      "interval training",
      "high intensity interval training",
      "conditioning classes",
      "J17 Fitness",
    ],
    heroImage: "img/hiit-hero.jpg",
    heroAlt: "A high-intensity interval training class at J17 Fitness",
    h1: "HIIT",
    headline: "Short. Hard. Effective.",
    intro:
      "Interval conditioning that gets in, does the work, and gets out — the most result per minute you'll find, coached so the intensity is real but the movement is safe.",
    sections: [
      {
        heading: "Why HIIT here",
        items: [
          {
            title: "Time-efficient",
            body: "Big conditioning gains without living at the gym.",
          },
          {
            title: "Coached intensity",
            body: "Push hard without pushing into injury.",
          },
          {
            title: "Measured",
            body: "Conditioning progress is part of your Performance Index™.",
          },
        ],
      },
    ],
    checklist: [
      "Time-efficient sessions",
      "Coached, safe intensity",
      "Fits a real schedule",
      "Conditioning tracked with the Performance Index™",
    ],
    serving: "Richmond Hill, Markham, and Vaughan",
    indexMetric: "Conditioning",
    bookingLabel: "View the HIIT Schedule",
    primaryAction: "waitlist",
    cardBlurb: "Short, hard, effective conditioning.",
  },
  {
    slug: "ride",
    href: "/classes/ride",
    name: "Ride",
    group: "classes",
    title: "Indoor Cycling in Richmond Hill | J17 Fitness",
    description:
      "High-energy indoor cycling in Richmond Hill. Coached rides with real playlists and real conditioning. Founding memberships open now at J17 Fitness.",
    keywords: [
      "spin class richmond hill",
      "indoor cycling richmond hill",
      "spin class markham",
      "indoor cycling vaughan",
      "indoor cycling",
      "spin class",
      "ride",
      "conditioning",
      "J17 Fitness",
    ],
    heroImage: "img/ride-hero.jpg",
    heroAlt: "A high-energy indoor cycling studio at J17 Fitness",
    h1: "Ride",
    headline: "Ride hard. Leave better.",
    intro:
      "High-energy indoor cycling with the lights, the sound and a coach setting the pace — conditioning that feels like the best part of your day.",
    sections: [],
    checklist: [
      "Lights, sound and real playlists",
      "A coach setting the pace",
      "Real conditioning, best part of your day",
      "All levels welcome",
    ],
    serving: "Richmond Hill, Markham, and Vaughan",
    bookingLabel: "Book a Ride",
    primaryAction: "waitlist",
    cardBlurb: "High-energy indoor cycling.",
  },

  /* ========================= TRAINING ========================= */
  {
    slug: "personal-training",
    href: "/personal-training",
    name: "Personal Training",
    group: "training",
    title: "Personal Training Across the GTA | J17 Fitness",
    description:
      "One-on-one personal training in Markham, Oakville, Mississauga and Richmond Hill — built on assessment and measured with the Performance Index. Real coaching toward a real goal.",
    keywords: [
      "personal trainer richmond hill",
      "personal training markham",
      "personal training oakville",
      "personal training mississauga",
      "one-on-one training",
      "Performance Index",
      "J17 Fitness",
    ],
    heroImage: "img/personal-training-hero.jpg",
    heroAlt: "A one-on-one personal training session at J17 Fitness",
    h1: "Personal Training",
    headline: "A trainer, a plan, and the proof it's working.",
    intro:
      "Personal training that starts with a real assessment, runs on a plan built for your goal, and gets retested so you can see it working — not just hope it is. Available at all four J17 locations.",
    sections: [
      {
        heading: "How it works",
        numbered: true,
        items: [
          {
            title: "Assess",
            body: "Benchmark strength, mobility and movement with the Performance Index™.",
          },
          {
            title: "Plan",
            body: "Your coach builds a program around your goal and your body.",
          },
          {
            title: "Train",
            body: "One-on-one sessions, real coaching, form and progression.",
          },
          {
            title: "Prove",
            body: "Retest on a schedule, and we show you the numbers.",
          },
        ],
      },
      {
        heading: "Who it's for",
        intro:
          "Anyone tired of guessing — strength, recovery from injury, a sport, or just finally getting somewhere.",
      },
    ],
    checklist: [
      "Starts with a real assessment",
      "A plan built for your goal",
      "Retested with the Performance Index™",
      "Available at all four J17 locations",
    ],
    serving: "Markham, Oakville, Mississauga, and Richmond Hill",
    indexMetric: "Strength, mobility and movement",
    bookingLabel: "Book Your Assessment",
    primaryAction: "enquiry",
    cardBlurb:
      "One-on-one coaching on a plan built for your goal, assessed and retested.",
  },
  {
    slug: "athletic-performance",
    href: "/athletic-performance",
    name: "Athletic Performance",
    group: "training",
    title: "Athletic Performance Training | J17 Fitness",
    description:
      "Performance training for competitive athletes across the GTA — Markham, Oakville, Mississauga and Richmond Hill. Strength, speed and power, benchmarked and retested with the J17 Performance Index.",
    keywords: [
      "sports performance training",
      "athletic performance training markham",
      "sports performance training gta",
      "athletic performance oakville",
      "athletic performance mississauga",
      "athletic performance richmond hill",
      "J17 Performance Index",
      "J17 Fitness",
    ],
    heroImage: "img/athletic-performance-hero.jpg",
    heroAlt: "An athlete training for strength, speed and power at J17 Fitness",
    h1: "Athletic Performance",
    headline: "Train for the result. See the result.",
    intro:
      "Performance training built for athletes who compete — strength, speed, power and resilience, programmed by coaches and tracked with the J17 Performance Index™ so every gain is on the record.",
    sections: [
      {
        heading: "The J17 Performance Index™",
        intro:
          "The system at the center of everything we do. We benchmark your athletic markers — strength, power, speed, mobility, movement quality — then retest on a schedule and give you and your coaches the data.",
      },
      {
        heading: "What you get",
        items: [
          { body: "Individual assessment and a program built on it" },
          { body: "Coaching that develops the qualities your sport demands" },
          { body: "Scheduled retests and a clear progress report" },
          {
            body: "Recovery (sauna, cold plunge, red light, mobility) built into the plan",
          },
        ],
      },
    ],
    checklist: [
      "Strength, speed and power",
      "Benchmarked and retested",
      "Measured with the J17 Performance Index™",
      "Available at all four J17 locations",
    ],
    serving: "Markham, Oakville, Mississauga, and Richmond Hill",
    indexMetric: "Strength, power, speed, mobility and movement quality",
    bookingLabel: "Book a Performance Assessment",
    primaryAction: "enquiry",
    cardBlurb:
      "For competitive athletes: strength, speed and power, tracked with the Performance Index™.",
  },
  {
    slug: "youth",
    href: "/youth",
    name: "Youth Athletic Development",
    group: "training",
    title: "Youth Athletic Development | J17 Fitness",
    description:
      "Long-term athletic development for young athletes across the GTA — Markham, Oakville, Mississauga and Richmond Hill. Coached strength, speed and movement, measured with the Performance Index.",
    keywords: [
      "youth athletic development",
      "youth sports training markham",
      "youth athletic training gta",
      "youth athletic development oakville",
      "youth athletic development mississauga",
      "youth athletic development richmond hill",
      "long-term athletic development",
      "J17 Fitness",
    ],
    heroImage: "img/youth-hero.jpg",
    heroAlt: "A young athlete being coached through movement work at J17 Fitness",
    h1: "Youth Athletic Development",
    headline: "Build the athlete, the right way.",
    intro:
      "Youth athletic development that puts long-term growth ahead of quick wins — coached strength, speed and movement, with progress you (and your kid) can actually see.",
    sections: [
      {
        heading: "For parents",
        intro:
          "You get more than a workout — you get the data. Through the J17 Performance Index™, we benchmark and retest your young athlete's strength, speed and movement quality. No hype, just progress you can track.",
      },
      {
        heading: "Our approach",
        items: [
          {
            body: "Age-appropriate, long-term development — not shrunk-down adult training",
          },
          { body: "Coaching on movement quality first, load second" },
          { body: "Regular Performance Index™ retests and honest reporting" },
          { body: "A foundation that carries into any sport" },
        ],
      },
    ],
    checklist: [
      "Coached strength, speed and movement",
      "Age-appropriate, long-term approach",
      "Measured with the Performance Index™",
      "Available at all four J17 locations",
    ],
    serving: "Markham, Oakville, Mississauga, and Richmond Hill",
    indexMetric: "Strength, speed and movement quality",
    bookingLabel: "Book a Youth Assessment",
    primaryAction: "enquiry",
    cardBlurb:
      "Long-term development for young athletes, with progress parents can actually see.",
  },
];

export const classes = services.filter((s) => s.group === "classes");
export const training = services.filter((s) => s.group === "training");

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
