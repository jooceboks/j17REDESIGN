import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Displays a Performance Index™ report panel.
 *
 * The panel always fits the width it is given — it scales down on small
 * screens rather than panning inside a horizontal scroller. That keeps the
 * layout static and predictable on mobile.
 *
 * Trade-off, stated plainly: these are dense infographics, so at phone widths
 * the type inside them is small. The alternative (a fixed-width scroller) was
 * legible but introduced horizontal-overflow bugs and an awkward swipe
 * interaction, so fitting won.
 *
 * Assets are local (`/public/img/index/`) rather than on the client's S3
 * bucket, because they were supplied directly and are already on-brand: dark
 * canvas, lime and cyan. The previous S3 versions were the same report on a
 * white background with pink accents, which clashed with the whole site.
 */
export function ReportFigure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  maxWidth,
}: {
  src: string;
  /** Describe what the panel shows. Screen readers cannot read the image. */
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
  /**
   * Cap the rendered width, in px. Wide dashboard panels want the full
   * container, but near-square panels (the radar is 1470x1600) become
   * absurdly tall at full width and get upscaled past their natural size.
   */
  maxWidth?: number;
}) {
  return (
    // min-w-0 on both the Reveal wrapper and the figure: whichever of them is
    // the flex or grid item on a given page would otherwise default to
    // min-width:auto and refuse to shrink, overflowing the page.
    <Reveal className="w-full min-w-0">
      <figure
        className="m-0 w-full min-w-0"
        style={maxWidth ? { maxWidth } : undefined}
      >
        <div className="border border-[var(--bg-elevated)] bg-[var(--bg-base)]">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            /*
             * The panel now fills whatever width its container has, so the
             * viewport-relative hints are accurate. Getting this wrong makes
             * next/image serve a file too small and the browser upscale it —
             * `npm run check:mobile` fails on that.
             */
            sizes={
              maxWidth
                ? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
                : "(max-width: 1280px) 100vw, 1280px"
            }
            className="h-auto w-full"
          />
        </div>
        <figcaption className="type-eyebrow mt-5 border-l-4 border-[var(--accent-lime)] pl-5">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
