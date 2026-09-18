import { cn } from "@/lib/cn";

/**
 * Redrawn by hand from the printed business card, not auto-traced — the source
 * is a small JPEG of a chrome gradient, and a tracer would emit hundreds of
 * redundant nodes and nested banding shapes.
 *
 * The chrome in the original is a render effect. Here the mark is flat and
 * single-colour so it can invert, sit on any surface, and survive the header's
 * blend mode. Teeth are generated as a radial array rather than drawn
 * individually.
 *
 * NOTE: pending Kirk confirming whether the card designer still has the vector
 * source. If it turns up, swap this for the original geometry.
 */

const TEETH = 12;
const TOOTH_HALF_ANGLE = 7.5; // degrees either side of centre
const R_ROOT = 25;
const R_TIP = 30.5;

function toothPath(index: number) {
  const step = 360 / TEETH;
  const centre = index * step - 90;
  const a1 = ((centre - TOOTH_HALF_ANGLE) * Math.PI) / 180;
  const a2 = ((centre + TOOTH_HALF_ANGLE) * Math.PI) / 180;
  // Tip is slightly narrower than the root, which is what reads as a gear
  // rather than a cog-shaped flower.
  const t1 = ((centre - TOOTH_HALF_ANGLE * 0.62) * Math.PI) / 180;
  const t2 = ((centre + TOOTH_HALF_ANGLE * 0.62) * Math.PI) / 180;
  const p = (r: number, a: number) =>
    `${(32 + r * Math.cos(a)).toFixed(2)} ${(32 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(R_ROOT, a1)} L${p(R_TIP, t1)} L${p(R_TIP, t2)} L${p(R_ROOT, a2)} Z`;
}

export function LogoMark({
  className,
  flat = false,
}: {
  className?: string;
  /** Single-colour throughout. Required anywhere the mark sits on a blend mode. */
  flat?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10", className)}
      role="img"
      aria-label="KirkWorks3D"
    >
      <g fill="currentColor">
        {Array.from({ length: TEETH }, (_, i) => (
          <path key={i} d={toothPath(i)} />
        ))}
      </g>
      <circle
        cx="32"
        cy="32"
        r="25.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      {/* KW monogram. Stroked geometry, square terminals — the letterforms are
          industrial rather than typographic, matching the printed mark. */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="M18 23.5v17M18 32.2l7.8-8.7M18 32.2l8.4 8.3" />
      </g>
      <g
        fill="none"
        stroke={flat ? "currentColor" : "var(--color-alert)"}
        strokeWidth="3.6"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        <path d="m29.5 23.5 3.9 17 4.3-11 4.3 11 3.9-17" />
      </g>
    </svg>
  );
}

export function LogoLockup({
  className,
  flat = false,
}: {
  className?: string;
  flat?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark flat={flat} className="h-11 w-11 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.375rem] leading-none font-bold tracking-tight">
          Kirk
          <span className={flat ? undefined : "text-alert"}>Works</span>3D
        </span>
        <span className="mono-label mt-1.5 text-[0.5625rem] tracking-[0.34em]">
          Print Studio
        </span>
      </span>
    </span>
  );
}
