/**
 * Mobile UI audit.
 *
 * Checks the things that actually break a phone layout and that no type
 * checker or linter can see:
 *
 *   1. Horizontal page overflow (the single most common mobile defect).
 *   2. Tap targets below 24x24 CSS px (WCAG 2.5.8 Target Size (Minimum), AA).
 *      44x44 is WCAG 2.5.5, which is AAA and unreasonable for short inline
 *      text links like a footer "Yoga" — 24 is the level actually required.
 *      Primary controls (buttons, the hamburger, the logo) are separately
 *      held to 44 tall below.
 *   3. Body text below 12px, which is unreadable on a phone.
 *   4. Content wider than the viewport, naming the offending element.
 *
 * Wide panels that pan inside their own `overflow-x` container are fine and
 * are exempted — that is a deliberate pattern here for the Index report
 * images and the classes comparison table.
 *
 * Usage:
 *   npm run build && npm run start -- -p 4321
 *   npm run check:mobile
 */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4321";

const ROUTES = [
  "/",
  "/classes",
  "/classes/pilates",
  "/classes/ride",
  "/personal-training",
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

// iPhone SE is the narrowest phone worth supporting; iPhone 14 is typical.
const DEVICES = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14", width: 390, height: 844 },
];

const MIN_TAP = 24;   // WCAG 2.5.8 AA
const MIN_PRIMARY = 44; // buttons and header controls, Apple HIG
const MIN_FONT = 12;

function auditMobile({ minTap, minPrimary, minFont }) {
  const vw = window.innerWidth;
  const issues = [];

  const label = (el) => {
    const cls = el.className?.toString?.().slice(0, 40) ?? "";
    const txt = (el.textContent ?? "").trim().slice(0, 30);
    return `<${el.tagName.toLowerCase()}${cls ? ` class="${cls}"` : ""}>${txt ? ` "${txt}"` : ""}`;
  };

  // 1 + 4. Anything sticking out past the viewport, ignoring elements that
  // live inside a deliberate horizontal scroller.
  if (document.documentElement.scrollWidth > vw + 1) {
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right <= vw + 1 && r.left >= -1) continue;
      let p = el.parentElement;
      let inScroller = false;
      while (p) {
        const ox = getComputedStyle(p).overflowX;
        if (ox === "auto" || ox === "scroll") {
          inScroller = true;
          break;
        }
        p = p.parentElement;
      }
      if (!inScroller) issues.push({ type: "overflow", el: label(el) });
    }
    if (issues.length === 0) {
      issues.push({
        type: "overflow",
        el: `page scrollWidth ${document.documentElement.scrollWidth} > ${vw} (no single culprit)`,
      });
    }
  }

  // 2. Tap targets.
  const seen = new Set();
  for (const el of document.querySelectorAll(
    'a[href], button, input, select, textarea, [role="button"]',
  )) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (el.closest(".sr-only")) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Inline links inside a paragraph are exempt; the rule targets controls.
    const isInlineLink =
      el.tagName === "A" && cs.display === "inline" && el.closest("p, address, li");
    if (isInlineLink) continue;
    // Buttons and header controls are primary targets and held to 44.
    // Inline-ish text links only need the AA minimum.
    const isPrimary =
      el.tagName === "BUTTON" ||
      el.getAttribute("role") === "button" ||
      /btn-(primary|secondary)/.test(el.className?.toString?.() ?? "") ||
      !!el.closest("header");
    const min = isPrimary ? minPrimary : minTap;
    if (r.width < min || r.height < min) {
      const key = label(el);
      if (seen.has(key)) continue;
      seen.add(key);
      issues.push({
        type: "tap",
        el: key,
        size: `${Math.round(r.width)}x${Math.round(r.height)} (needs ${min})`,
      });
    }
  }

  // 3. Tiny text.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const tiny = new Set();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest(".sr-only")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const size = parseFloat(cs.fontSize);
    if (size < minFont) {
      const key = `${label(el)} @ ${cs.fontSize}`;
      if (!tiny.has(key)) {
        tiny.add(key);
        issues.push({ type: "font", el: key });
      }
    }
  }

  return issues;
}

const browser = await chromium.launch({ channel: "chrome" });
let total = 0;

for (const device of DEVICES) {
  const context = await browser.newContext({
    viewport: { width: device.width, height: device.height },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });

    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor,
    );
    if (bg !== "rgb(10, 10, 10)") {
      console.error(
        `\nAborting: ${route} rendered unstyled (body background ${bg}).\n` +
          `Stylesheet did not load — usually a stale 'next start' holding the port.\n` +
          `  lsof -ti :${new URL(BASE).port || "<port>"} | xargs kill -9`,
      );
      await browser.close();
      process.exit(2);
    }

    await page.evaluate(() => {
      for (const el of document.querySelectorAll(".reveal")) {
        el.dataset.visible = "true";
      }
    });
    await page.waitForTimeout(120);

    const issues = await page.evaluate(auditMobile, {
      minTap: MIN_TAP,
      minPrimary: MIN_PRIMARY,
      minFont: MIN_FONT,
    });
    total += issues.length;

    const tag = `${device.name.padEnd(10)} ${route}`;
    if (issues.length === 0) {
      console.log(`  ok    ${tag}`);
    } else {
      console.log(`  FAIL  ${tag}  (${issues.length})`);
      for (const i of issues) {
        console.log(
          `          [${i.type}]${i.size ? ` ${i.size}` : ""} ${i.el}`,
        );
      }
    }
  }
  await context.close();
}

await browser.close();
console.log(
  total === 0
    ? `\nMobile checks pass across ${ROUTES.length} routes x ${DEVICES.length} devices.`
    : `\n${total} mobile issue(s).`,
);
process.exit(total === 0 ? 0 : 1);
