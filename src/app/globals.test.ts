import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

/**
 * Guards a Tailwind v4 footgun that already shipped a black-on-black bug once.
 *
 * Tailwind generates a `text-{name}` colour utility from every `--color-*`
 * token in @theme. If a token is named after a built-in font-size (base, xs,
 * sm, lg, xl, …) the colour utility shadows the size utility, so writing
 * `text-base` silently sets a colour instead of a size. On this site that
 * painted text #0a0a0a on the #0a0a0a canvas — invisible, and no build error.
 */
describe("design tokens", () => {
  const FONT_SIZE_NAMES = [
    "base",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "6xl",
    "7xl",
    "8xl",
    "9xl",
  ];

  it("never names a colour token after a Tailwind font-size", () => {
    // Strip comments first. Prose inside them can contain braces (this file's
    // own warning mentions `text-{name}`), which would truncate the block.
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const start = stripped.indexOf("@theme");
    const themeBlock = stripped.slice(start, stripped.indexOf("}", start));
    const colourTokens = [...themeBlock.matchAll(/--color-([a-z0-9-]+):/g)].map(
      (m) => m[1],
    );

    expect(colourTokens.length).toBeGreaterThan(0);
    const collisions = colourTokens.filter((t) => FONT_SIZE_NAMES.includes(t));
    expect(collisions).toEqual([]);
  });
});

/*
 * Deliberately NOT tested: the `!utility` important prefix.
 *
 * An earlier version of this file banned it on the belief that Tailwind v4
 * only accepts a trailing `!`. That was wrong — verified in the browser, the
 * leading form is honoured (`!py-14` yields 56px where the base is 112px, and
 * `!px-6 !py-3` on the header button yields 24px/12px). The prefix is used
 * intentionally in several places to override the .btn-* and .type-* classes
 * in globals.css, which load after Tailwind's utilities and otherwise win.
 *
 * The real defect that prompted all this was the colour-token collision
 * guarded above, not the important syntax.
 */
