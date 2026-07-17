"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollScaleProps = {
  children: ReactNode;
  className?: string;
  /** Scale when the element is far from the viewport center. */
  from?: number;
  /** Scale when the element sits exactly at the viewport center. */
  to?: number;
};

/**
 * Grows the element as it approaches the vertical center of the viewport
 * (transform-only, rAF-throttled). Disabled under `prefers-reduced-motion`
 * via the matchMedia check and the `.scroll-scale` override in globals.css.
 */
export default function ScrollScale({
  children,
  className = "",
  from = 0.88,
  to = 1,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      // 0 at the center of the viewport → 1 when far away
      const distance = Math.min(
        Math.abs(elementCenter - viewportCenter) / (window.innerHeight * 0.75),
        1,
      );
      const eased = 1 - distance * distance; // ease-out toward the center
      const scale = from + (to - from) * eased;
      el.style.transform = `scale(${scale.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [from, to]);

  return (
    <div ref={ref} className={`scroll-scale will-change-transform ${className}`}>
      {children}
    </div>
  );
}
