/**
 * Text contrast audit.
 *
 * Why this exists: a design-token collision once made `text-base` paint text
 * #0a0a0a on the #0a0a0a canvas. It compiled, linted, built and passed every
 * check, because reading `textContent` proves content EXISTS — not that a
 * human can SEE it. Only looking at the page caught it.
 *
 * This walks every rendered text node on every route, resolves the effective
 * background (climbing ancestors past transparent layers), and fails on
 * anything below the WCAG AA threshold. It catches the whole class of bug,
 * not just the one token that caused it.
 *
 * Usage:
 *   npm run build && npm run start -- -p 4321   # in one shell
 *   npm run check:contrast                      # in another
 *
 * Uses the system Chrome via `channel: "chrome"`, so no Chromium download.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";

const ROUTES = [
  "/",
  "/classes",
  "/classes/pilates",
  "/classes/yoga",
  "/classes/strength",
  "/classes/hiit",
  "/classes/ride",
  "/personal-training",
  "/athletic-performance",
  "/youth",
  "/performance-index",
  "/recovery",
  "/memberships",
  "/first-timers",
  "/locations",
  "/contact-us",
  "/cafe",
  "/mailing-list/founding",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

/** WCAG AA: 4.5:1 for normal text, 3:1 for large (>=24px, or >=18.66px bold). */
const AA_NORMAL = 4.5;
const AA_LARGE = 3;

/**
 * Runs in the page. Returns one entry per visible text node whose contrast
 * against its effective background falls below the AA threshold.
 */
function auditContrast() {
  const parseColor = (str) => {
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
  };

  const luminance = ({ r, g, b }) => {
    const f = (c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };

  const ratio = (fg, bg) => {
    const a = luminance(fg);
    const b = luminance(bg);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };

  /** Composite a possibly-translucent colour over an opaque backdrop. */
  const over = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a),
    g: top.g * top.a + bottom.g * (1 - top.a),
    b: top.b * top.a + bottom.b * (1 - top.a),
    a: 1,
  });

  /** Climb ancestors until an opaque background is found. */
  const effectiveBg = (el) => {
    let acc = null;
    let node = el;
    while (node && node !== document.documentElement.parentNode) {
      const c = parseColor(getComputedStyle(node).backgroundColor);
      if (c && c.a > 0) {
        acc = acc ? over(acc, c) : c;
        if (acc.a >= 1) return acc;
      }
      node = node.parentElement;
    }
    // Fall back to the documented page canvas.
    return acc && acc.a >= 1 ? acc : { r: 10, g: 10, b: 10, a: 1 };
  };

  const failures = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const text = n.textContent.trim();
    if (!text) continue;

    const el = n.parentElement;
    if (!el) continue;

    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none") continue;
    if (Number(cs.opacity) === 0) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    // Screen-reader-only text is intentionally offscreen; skip it.
    if (el.closest(".sr-only")) continue;
    // Elements mid-reveal are transparent by design; they settle opaque.
    if (el.closest('.reveal:not([data-visible="true"])')) continue;
    // Decorative watermark text is deliberately near-invisible.
    if (el.closest(".watermark")) continue;

    const fg = parseColor(cs.color);
    if (!fg || fg.a === 0) continue;

    const bg = effectiveBg(el);
    const composited = fg.a < 1 ? over(fg, bg) : fg;
    const r = ratio(composited, bg);

    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    const isLarge = size >= 24 || (size >= 18.66 && weight >= 700);
    const threshold = isLarge ? 3 : 4.5;

    if (r < threshold) {
      failures.push({
        text: text.slice(0, 60),
        tag: el.tagName.toLowerCase(),
        cls: el.className?.toString?.().slice(0, 60) ?? "",
        color: cs.color,
        background: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
        ratio: Number(r.toFixed(2)),
        threshold,
        fontSize: cs.fontSize,
      });
    }
  }
  return failures;
}

const browser = await chromium.launch({ channel: "chrome" });
let total = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    // Reveal animations are disabled, so nothing is mid-transition.
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    // Sanity gate. An unstyled page (stylesheet 404/500, stale server holding
    // the port) reports every text node as a contrast failure, which reads as
    // hundreds of design bugs instead of one broken request. Catch it here and
    // say what actually went wrong.
    const styled = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    if (styled !== "rgb(10, 10, 10)") {
      console.error(
        `\nAborting: ${route} rendered unstyled (body background is ${styled}, expected rgb(10, 10, 10)).\n` +
          `The stylesheet did not load. Usual cause: a stale 'next start' still\n` +
          `holding the port while .next was rebuilt underneath it. Fix with:\n` +
          `  lsof -ti :${new URL(BASE).port || "<port>"} | xargs kill -9\n` +
          `then rebuild and restart before re-running this audit.`,
      );
      await browser.close();
      process.exit(2);
    }

    // Reveal everything: the audit must see content below the fold too.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll(".reveal")) {
        el.dataset.visible = "true";
      }
    });
    await page.waitForTimeout(150);

    const failures = await page.evaluate(auditContrast);
    total += failures.length;

    const label = `${vp.name.padEnd(7)} ${route}`;
    if (failures.length === 0) {
      console.log(`  ok    ${label}`);
    } else {
      console.log(`  FAIL  ${label}  (${failures.length})`);
      for (const f of failures) {
        console.log(
          `          "${f.text}" ${f.color} on ${f.background} = ${f.ratio}:1 (needs ${f.threshold}) <${f.tag} class="${f.cls}">`,
        );
      }
    }
  }
  await context.close();
}

await browser.close();

console.log(
  total === 0
    ? `\nAll text meets WCAG AA across ${ROUTES.length} routes x ${VIEWPORTS.length} viewports.`
    : `\n${total} contrast failure(s).`,
);
process.exit(total === 0 ? 0 : 1);
