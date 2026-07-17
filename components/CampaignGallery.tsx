"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import Reveal from "./Reveal";

// ---- Content ----
// Swap `src` (and `alt`) per entry when the approved artwork files arrive —
// stock placeholders for now.
const SECTION = {
  eyebrow: "SmartPay Campaign",
  titleLead: "The artworks of the",
  titleGradient: "SmartPay campaign",
  intro:
    "Swipe or scroll through the visuals created for this campaign. Stock placeholders for now, with final artwork on the way.",
};

type Artwork = { name: string; alt: string; src: string };

const ARTWORKS: Artwork[] = [
  { name: "Artwork 01", alt: "Smartphone on a desk beside a laptop", src: "/images/artworks/artwork-1.jpg" },
  { name: "Artwork 02", alt: "Smartphone held in a hand", src: "/images/artworks/artwork-2.jpg" },
  { name: "Artwork 03", alt: "Smartphone with colourful screen", src: "/images/artworks/artwork-3.jpg" },
  { name: "Artwork 04", alt: "Modern smartphone close-up", src: "/images/artworks/artwork-4.jpg" },
  { name: "Artwork 05", alt: "Smartphone on a blue background", src: "/images/artworks/artwork-5.jpg" },
  { name: "Artwork 06", alt: "Person browsing on a smartphone", src: "/images/artworks/artwork-6.jpg" },
  { name: "Artwork 07", alt: "Smartphone being used for payments", src: "/images/artworks/artwork-7.jpg" },
  { name: "Artwork 08", alt: "Smartphone lifestyle shot", src: "/images/artworks/artwork-8.jpg" },
];

/**
 * Dark, horizontally scrollable gallery. Cards fan out in a subtle 3D arc:
 * each tile rotates/scales based on its distance from the strip's center,
 * recalculated on scroll (rAF-throttled, transform-only). Under
 * `prefers-reduced-motion` the strip is a plain flat scroller.
 */
export default function CampaignGallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const frame = useRef(0);

  const applyArc = useCallback(() => {
    frame.current = 0;
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    for (const card of Array.from(track.children) as HTMLElement[]) {
      const rect = card.getBoundingClientRect();
      const delta = (rect.left + rect.width / 2 - trackCenter) / trackRect.width;
      const rotate = Math.max(-16, Math.min(16, delta * -22));
      const scale = 1 - Math.min(Math.abs(delta) * 0.22, 0.16);
      const lift = Math.min(Math.abs(delta) * 60, 26);
      card.style.transform = `rotateY(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)}) translateY(${lift.toFixed(1)}px)`;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(applyArc);
    };

    applyArc();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [applyArc]);

  const scrollByCards = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <section id="artworks" className="scroll-mt-16 overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 md:pt-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            {SECTION.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            {SECTION.titleLead}{" "}
            <span className="gradient-text">{SECTION.titleGradient}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            {SECTION.intro}
          </p>
        </Reveal>
      </div>

      <Reveal delay={150} className="relative mt-10 pb-16 md:mt-14 md:pb-24">
        {/* Edge fades so the strip melts into the section background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24"
        />

        <ul
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-[12vw] py-6 sm:gap-7"
          style={{ perspective: "1200px" }}
          aria-label="Campaign artwork gallery"
        >
          {ARTWORKS.map((artwork) => (
            <li
              key={artwork.name}
              className="relative w-52 shrink-0 snap-center overflow-hidden rounded-2xl shadow-lg shadow-primary-950/10 ring-1 ring-black/5 will-change-transform sm:w-64 lg:w-72"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={artwork.src}
                  alt={artwork.alt}
                  fill
                  sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 208px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-sm font-semibold text-white/90">
                  {artwork.name}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop arrows */}
        <div className="mt-2 hidden items-center justify-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="btn h-11 w-11 border border-gray-300 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            aria-label="Scroll gallery left"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="btn h-11 w-11 border border-gray-300 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            aria-label="Scroll gallery right"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
