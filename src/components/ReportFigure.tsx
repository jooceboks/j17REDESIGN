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
    <Reveal>
      <figure className="m-0" style={maxWidth ? { maxWidth } : undefined}>
        <div className="overflow-hidden border border-[var(--bg-elevated)] bg-[var(--bg-base)]">
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
        <figcaption className="type-eyebrow mt-5 border-l-4 border-[var(--accent-lime)] pl-5">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
