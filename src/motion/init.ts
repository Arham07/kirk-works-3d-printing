import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * The heavy module. It statically imports GSAP and Lenis, and is ONLY ever
 * reached through `await import()` from MotionRoot — that is what keeps
 * ~46KB gzip out of the initial chunk, so the hero paints from static HTML and
 * CSS on cellular.
 *
 * Nothing in here is required for the site to work. Every section is finished
 * and readable before a single tween runs; this layer only adds motion on top.
 */

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let cleanup: (() => void) | null = null;

const EASE = "power3.out";

function initLenis() {
  // Fine pointers only. Lenis is deliberately inert on touch — phones keep
  // native iOS momentum and rubber-banding, which is what that audience
  // expects. Forcing syncTouch fights the OS compositor and is the fastest
  // way to make the site feel broken to someone who just scanned a QR code.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  lenis = new Lenis({
    autoRaf: false,
    duration: 1.1,
    lerp: 0.1,
    wheelMultiplier: 0.85,
    syncTouch: false,
    anchors: true,
  });

  const raf = (time: number) => lenis?.raf(time * 1000);

  // Order matters. Lenis must write the scroll position BEFORE GSAP reads it,
  // hence prioritize=true, and lagSmoothing must be off or ScrollTriggers lag
  // a frame or two and jump when the tab regains focus. The lenis/react README
  // example omits both of these.
  gsap.ticker.add(raf, false, true);
  gsap.ticker.lagSmoothing(0);
  lenis.on("scroll", ScrollTrigger.update);

  return () => {
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    lenis?.destroy();
    lenis = null;
  };
}

function initReveals() {
  // One coordinated batch rather than a ScrollTrigger per element. Elements
  // entering together animate together, which reads as one deliberate gesture
  // instead of twelve independent ones.
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    batchMax: 4,
    interval: 0.08,
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: EASE,
        overwrite: true,
      });
    },
  });
}

function initCounters() {
  // Scrub a proxy object and snap, rather than tweening textContent directly —
  // tweening a string property produces fractional garbage mid-flight.
  gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
    const target = Number(el.dataset.counter);
    if (!Number.isFinite(target)) return;
    const suffix = el.dataset.counterSuffix ?? "";
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: target,
      ease: "none",
      snap: { value: 1 },
      scrollTrigger: { trigger: el, start: "top 85%", end: "top 45%", scrub: 0.5 },
      onUpdate: () => {
        el.textContent = `${proxy.value}${suffix}`;
      },
    });
  });
}

function initDrawings() {
  // Manual stroke-dashoffset rather than DrawSVGPlugin. For single-stroke
  // paths the two are equivalent, and this keeps a plugin out of the bundle.
  gsap.utils.toArray<SVGElement>("[data-draw]").forEach((svg) => {
    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement | SVGLineElement>("path, line, circle, rect"),
    );
    if (!paths.length) return;

    paths.forEach((path) => {
      const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
      if (!length) return;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.1,
      stagger: 0.09,
      ease: "power2.inOut",
      scrollTrigger: { trigger: svg, start: "top 82%", once: true },
    });
  });
}

export function initMotion() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const stopLenis = initLenis();
    initReveals();
    initCounters();
    initDrawings();

    // Late-loading fonts and images change element positions, so trigger
    // positions measured before they settle are wrong. This is the single
    // most common cause of reveals firing at the wrong scroll offset.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

    return () => {
      stopLenis?.();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  });

  // WCAG 2.2 asks for motion to be removed, not shortened: in the reduce
  // branch nothing is created at all, and anything already hidden by the CSS
  // pre-state is snapped to its final state.
  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set("[data-reveal]", { opacity: 1, y: 0, clearProps: "all" });
    document.documentElement.dataset.motion = "off";
  });

  cleanup = () => mm.revert();

  // Tells the inline head script's failsafe that the motion layer arrived, so
  // it does not force everything visible out from under us.
  document.documentElement.setAttribute("data-motion-ready", "");

  return cleanup;
}

export function destroyMotion() {
  cleanup?.();
  cleanup = null;
}
