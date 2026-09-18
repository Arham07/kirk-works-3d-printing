import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
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

gsap.registerPlugin(ScrollTrigger, CustomEase);

let lenis: Lenis | null = null;
let cleanup: (() => void) | null = null;

/**
 * One curve for the whole site, matching --ease-out in globals.css exactly.
 *
 * Previously JS reveals decelerated on power3.out while every CSS transition
 * used cubic-bezier(.22,1,.36,1) — close enough to look like a mistake rather
 * than a choice. A card that revealed and then responded to hover was moving
 * in two different languages.
 */
CustomEase.create("kw", "0.22, 1, 0.36, 1");
const EASE = "kw";

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

/*
 * B — the masked line rise — is deliberately NOT here. It is pure CSS, via
 * animation-timeline: view(), in globals.css.
 *
 * It was built with ScrollTrigger first and the trigger would not fire. Lenis
 * owns the scroll position, and a trigger element displaced by its own
 * pre-state transform measures its start against the moved box, so the
 * headline stayed parked in its from-state through every scroll.
 *
 * A scroll-driven CSS animation has no measurement step, no dependency on
 * Lenis, and cannot get stuck: where view() is unsupported the text is simply
 * visible, which is the correct fallback anyway.
 */


/** C — section rules draw in from the left as they enter. */
function initRules() {
  gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
    gsap.to(rule, {
      scaleX: 1,
      duration: 0.9,
      ease: EASE,
      scrollTrigger: { trigger: rule, start: "top 90%", once: true },
    });
  });
}

/**
 * D — the print-head wipe, and the one gesture that is specific to this
 * business: the photograph reveals bottom-to-top the way a print grows off
 * the build plate, with a red line riding the leading edge.
 *
 * power2.inOut deliberately, not the house curve — a print head moves at
 * near-constant speed, and an ease-out makes it look like a slide.
 */
function initPlates() {
  gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((plate) => {
    gsap.to(plate, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: { trigger: plate, start: "top 80%", once: true },
      // clip-path clips the element's own focus ring, so it must be removed
      // once the wipe is done. clearProps is WRONG here: it would strip the
      // inline style and revert to the CSS pre-state, hiding it forever.
      onComplete: () => {
        plate.style.clipPath = "none";
      },
    });
  });
}

function initParallax() {
  /*
    Two photographs side by side at different offsets read as one flat block
    until they move at different rates. This is what makes a staggered pair
    look deliberate rather than like a grid that failed to line up.

    Deliberately small: `data-parallax` is the pixel offset each element
    starts and ends at, and anything past about 40 sells the gimmick rather
    than the depth. Transform only, so it costs a composite and never a
    layout, and the element sits at its authored position when this never
    runs.
  */
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const shift = Number(el.dataset.parallax);
    if (!Number.isFinite(shift) || shift === 0) return;

    gsap.fromTo(
      el,
      { y: shift },
      {
        y: -shift,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      },
    );
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
    initRules();
    initPlates();
    initParallax();
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
    gsap.set("[data-rule]", { scaleX: 1, clearProps: "all" });
    gsap.set("[data-plate]", { clipPath: "none" });
    gsap.set("[data-parallax]", { y: 0, clearProps: "all" });
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
