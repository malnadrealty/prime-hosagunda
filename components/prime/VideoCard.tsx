"use client";

import { useState } from "react";
import { usePrime } from "./PrimeContext";
import Slot from "./ui/Slot";
import { track } from "@/lib/analytics";
import { PlayIcon } from "./ui/Icons";

function embedUrl(video: { type: string; url: string; id?: string }): string | null {
  if (video.type === "youtube") {
    const id = video.id || extractYouTubeId(video.url);
    return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null;
  }
  if (video.type === "vimeo") {
    const id = video.id || video.url.split("/").pop();
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
  }
  return null;
}

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function VideoCard({ className = "" }: { className?: string }) {
  const { property } = usePrime();
  const video = property.video;
  const [playing, setPlaying] = useState(false);
  const embed = video.available ? embedUrl(video) : null;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-xl2 ring-1 ring-forest-900/10 ${className}`}>
      {playing && embed ? (
        <iframe
          src={embed}
          title="Property video"
          className="absolute inset-0 h-full w-full"
          allow="accelerated-download; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : playing && video.type === "mp4" && video.available ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video src={video.url} poster={video.poster} controls autoPlay className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <Slot
            src={video.poster}
            alt="Property video poster"
            label="PROPERTY WALKTHROUGH"
            className="absolute inset-0 h-full w-full"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
          <div className="absolute inset-0 bg-forest-950/35" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
            {video.available ? (
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  track("prime_video_play", { property_id: property.propertyId });
                }}
                aria-label="Play property video"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/95 text-forest-700 shadow-float ring-1 ring-white/40 transition-transform hover:scale-105"
              >
                <PlayIcon width={22} height={22} className="ml-0.5" />
              </button>
            ) : (
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/20 text-ivory/80 ring-1 ring-white/30">
                <PlayIcon width={22} height={22} className="ml-0.5" />
              </span>
            )}
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory">
              Watch Property Video
            </span>
            {!video.available && (
              <p className="max-w-xs text-[12px] leading-snug text-ivory/70">
                Video currently unavailable. Please contact Malnad Realty for a property walkthrough.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
