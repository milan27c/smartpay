"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** How fast the element drifts relative to scroll. Negative = upward. */
  speed?: number;
};

/**
 * Subtle scroll parallax using transform only (rAF-throttled).
 * Disabled entirely under `prefers-reduced-motion` (see `.parallax` in
 * globals.css, plus the matchMedia check here to skip the listener).
 */
export default function Parallax({
  children,
  className = "",
  speed = -0.08,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`parallax will-change-transform ${className}`}>
      {children}
    </div>
  );
}
