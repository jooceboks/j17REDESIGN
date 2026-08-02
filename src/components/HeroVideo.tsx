"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Lazy YouTube embed. Renders the poster frame only, and swaps in the iframe
 * on click, so the homepage does not pay for the YouTube player on first load.
 */
export function HeroVideo({
  videoId,
  caption,
  poster,
}: {
  videoId: string;
  caption?: string;
  /**
   * Poster image URL. Pass a real brand asset — this video has no
   * maxresdefault on YouTube, and the only thumbnail that exists
   * (hqdefault) is 480x360, which is too soft to run full width.
   */
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const posterSrc =
    poster ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <figure className="m-0">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&rel=0`}
            title="J17 Fitness"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label="Play the J17 Fitness video"
          >
            <Image
              src={posterSrc}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center bg-[var(--accent-lime)] transition-transform duration-150 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="ml-1 h-8 w-8 fill-[var(--bg-base)]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>

      {caption && (
        <figcaption className="type-eyebrow mt-6 border-l-4 border-[var(--accent-lime)] pl-5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
