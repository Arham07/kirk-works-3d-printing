"use client";

import { useEffect, useRef } from "react";

/**
 * Writes a single `--progress` custom property (0 → 1) onto the rail as it
 * scrolls past. That is the entire scroll mechanism for THE STACK.
 *
 * Deliberately not GSAP and not a canvas:
 *  - 21 vector polygons driven by one custom property stay sharp at any DPR
 *    and cost nothing but compositing, where a canvas would need DPR handling,
 *    offscreen pre-rendering and a redraw every frame.
 *  - CSS `position: sticky` does the pinning, so there is no pin-spacer, no
 *    layout thrash, and the section degrades to an ordinary scrolling block.
 *
 * One passive listener sets a dirty flag; one rAF does the single write per
 * frame. It never reads layout inside the scroll handler.
 */
export function StackScrubber({ railId }: { railId: string }) {
  const frame = useRef(0);

  useEffect(() => {
    const rail = document.getElementById(railId);
    if (!rail) return;

    // Respect the OS setting and leave the diagram in its explained state.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    // The sticky rail only exists at lg and up. Below that the diagram is a
    // plain block, so scrubbing it would collapse the stack with nothing
    // holding it in view — the reader would scroll past a closed box. Narrow
    // viewports get the fully-exploded static state instead.
    const wide = window.matchMedia("(min-width: 64rem)");
    if (!wide.matches) return;

    const update = () => {
      frame.current = 0;
      const rect = rail.getBoundingClientRect();
      // How far through the rail's own scroll distance we are.
      const travel = rect.height - window.innerHeight;
      const progress = travel <= 0 ? 1 : Math.min(Math.max(-rect.top / travel, 0), 1);
      // Hold fully exploded through the last third rather than snapping shut
      // the instant the rail ends — the collapse should feel like a decision.
      const eased = progress < 0.75 ? progress / 0.75 : 1;
      rail.style.setProperty("--progress", eased.toFixed(4));
    };

    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(update);
    };

    const onScroll = schedule;

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
      // Leave it in the state that reads correctly without JavaScript.
      rail.style.setProperty("--progress", "1");
    };
  }, [railId]);

  return null;
}
