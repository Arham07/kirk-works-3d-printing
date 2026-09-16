"use client";

import { useEffect, useState } from "react";
import { business } from "@/content/business";

/**
 * Kirk's local time, so a visitor in Seattle can tell whether it is a
 * reasonable hour to call a one-man shop.
 *
 * The second client component on the site, and justified on the same grounds
 * as StackScrubber: the alternative is WRONG OUTPUT, not merely less
 * convenient output. This is a static export, so a server-rendered clock
 * would bake the build time into the HTML and be wrong forever.
 *
 * Starting at null means the server render and the first client render emit
 * the same honest string, so React reconciles identical trees — no hydration
 * mismatch, no suppressHydrationWarning masking a stale build-time value, and
 * a correct result with JavaScript off.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // WCAG 2.2.2: render once and never tick for anyone who asked for less
    // motion. The information is still there; only the animation of it goes.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const read = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-US", {
            timeZone: business.timeZone,
            hour: "numeric",
            minute: "2-digit",
          }).format(new Date()),
        );
      } catch {
        // Missing ICU timezone data. Leave the static string in place.
      }
    };

    read();
    if (still) return;

    let interval: number | undefined;
    // Align to the next minute boundary first. A bare 60s interval drifts and
    // ends up displaying a minute it is already most of the way through.
    const align = window.setTimeout(
      () => {
        read();
        interval = window.setInterval(read, 60_000);
      },
      (60 - new Date().getSeconds()) * 1000,
    );

    // A backgrounded tab throttles timers, so catch up on return.
    const onVisible = () => {
      if (document.visibilityState === "visible") read();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(align);
      if (interval) window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // No aria-live: a polite region here would announce the time every minute,
  // forever, to anyone using a screen reader.
  return <span>{time ? `${time} her time` : "Central time"}</span>;
}
