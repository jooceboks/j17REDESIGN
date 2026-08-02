import Image from "next/image";
import { Reveal } from "./Reveal";

/**
 * Displays a Performance Index™ report panel.
 *
 * These are dense infographics with real type in them, so they are rendered
 * `object-contain` at generous width rather than cropped to fit a layout box.
 * Cropping them would cut off axis labels and score bars.
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
    // The Reveal wrapper is the actual flex/grid item on the pages that use
    // this, so min-w-0 has to live here too — not just on the <figure>.
    <Reveal className="w-full min-w-0">
      {/* min-w-0 matters: as a flex item this would otherwise default to
          min-width:auto and refuse to shrink below the panel's intrinsic
          width, pushing the whole page into horizontal scroll on mobile. */}
      <figure
        className="m-0 w-full min-w-0"
        style={maxWidth ? { maxWidth } : undefined}
      >
        {/*
          These panels carry real type at small sizes. Squeezed into a 375px
          phone they become unreadable, so below `sm` the panel keeps a
          legible minimum width and pans inside its own scroll container.
          The page body never scrolls sideways as a result.
        */}
        <div className="overflow-x-auto border border-[var(--bg-elevated)] bg-[var(--bg-base)]">
          <div className="min-w-[42rem] sm:min-w-0">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              sizes={
                maxWidth
                  ? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
                  : "(max-width: 1280px) 100vw, 1280px"
              }
              className="h-auto w-full"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)] sm:hidden">
          Swipe the panel to see all of it
        </p>
        <figcaption className="type-eyebrow mt-5 border-l-4 border-[var(--accent-lime)] pl-5">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
