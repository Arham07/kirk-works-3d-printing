"use client";

import { useEffect } from "react";

/**
 * The entire client boundary for motion: renders nothing, takes no children,
 * holds no state, and imports neither GSAP nor Lenis at module scope.
 *
 * Its only job is deciding WHETHER and WHEN to fetch the motion chunk. Because
 * `@/motion/init` is reached solely through await import(), the bundler emits
 * it as a separate async chunk that never lands in the initial page JS.
 *
 * Sections stay Server Components and opt in by attribute — data-reveal,
 * data-counter, data-draw — so nothing in the page tree has to become a client
 * component to animate.
 */
export function MotionRoot() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Never downloaded at all for reduced-motion, Save-Data or 2G visitors.
    type NetworkInfo = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const frugal =
      connection?.saveData === true || /(^|-)2g$/.test(connection?.effectiveType ?? "");

    if (reduce.matches || frugal) {
      document.documentElement.dataset.motion = "off";
      return;
    }

    let cancelled = false;
    let destroy: (() => void) | undefined;

    const start = () => {
      import("@/motion/init").then((module) => {
        if (cancelled) return;
        destroy = module.initMotion();
      });
    };

    // Idle so it never competes with the hero paint. Safari only shipped
    // requestIdleCallback recently, so the timeout fallback still earns its
    // place on the phones this site is actually opened on.
    const canIdle = typeof window.requestIdleCallback === "function";
    const idle = canIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 200);

    // Honour the OS setting changing mid-session without a reload.
    const onPreferenceChange = () => {
      if (reduce.matches) {
        destroy?.();
        document.documentElement.dataset.motion = "off";
      }
    };
    reduce.addEventListener("change", onPreferenceChange);

    return () => {
      cancelled = true;
      reduce.removeEventListener("change", onPreferenceChange);
      if (canIdle) {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
      destroy?.();
    };
  }, []);

  return null;
}
