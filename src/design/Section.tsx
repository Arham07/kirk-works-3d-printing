import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Section rhythm.
 *
 * This used to hardcode one vertical space and one width for all twelve
 * sections, which is the single largest reason the page read as a document
 * rather than a composition. Space and width are now deliberate choices per
 * section: most stay `default`, two peaks get `loose` or `vast`, and the
 * narrow column exists so one section can act as a breath after the hero.
 */
const SPACE = {
  tight: "py-12 lg:py-16",
  default: "py-18 lg:py-28",
  loose: "py-28 lg:py-44",
  vast: "py-36 lg:py-60",
} as const;

export function Section({
  children,
  id,
  label,
  surface = "base",
  space = "default",
  bleed = false,
  className,
}: {
  children: ReactNode;
  id?: string;
  /** Becomes the section's accessible name. Write these first — they are the sitemap. */
  label: string;
  surface?: "base" | "raised";
  space?: keyof typeof SPACE;
  /** Full-bleed sections opt out of Container themselves; this only drops the gutter. */
  bleed?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        SPACE[space],
        surface === "raised" ? "bg-surface-1" : "bg-surface-0",
        bleed && "overflow-x-clip",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow";
}) {
  return (
    <div
      className={cn(
        "page-gutter mx-auto w-full",
        width === "narrow" ? "max-w-3xl" : "max-w-[90rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A full-width hairline that draws itself in from the left as it enters.
 * Cheap, and it is the connective tissue that makes a page of separate blocks
 * read as one document — more visible at 1440px than any text effect.
 */
export function SectionRule({ className }: { className?: string }) {
  return (
    <hr
      aria-hidden
      data-rule
      className={cn("h-px w-full border-0 bg-current opacity-20", className)}
    />
  );
}

/**
 * The sticky left rail: a section's number and label stay put while its
 * content scrolls beside them. Replaces SectionHead wherever a section has
 * enough body to be worth anchoring — which is most of them.
 */
export function SectionMeta({
  number,
  label,
  className,
}: {
  number?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("lg:sticky lg:top-28 lg:self-start", className)} data-reveal>
      <p className="mono-label flex items-center gap-3">
        {number && <span className="text-ink-icon">{number}</span>}
        {number && <span aria-hidden className="h-px w-6 bg-current opacity-40" />}
        <span>{label}</span>
      </p>
    </div>
  );
}

/**
 * The original section opener. After the rhythm pass this survives on exactly
 * ONE section — it is the device that made everything look the same, so it
 * stops being the default.
 */
export function SectionHead({
  number,
  eyebrow,
  headline,
  deck,
  className,
}: {
  number?: string;
  eyebrow?: string;
  headline: ReactNode;
  deck?: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-3xl", className)} data-reveal>
      {(number || eyebrow) && (
        <p className="mono-label mb-5 flex items-center gap-3">
          {number && <span className="text-ink-icon">{number}</span>}
          {number && eyebrow && (
            <span aria-hidden className="h-px w-6 bg-current opacity-40" />
          )}
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <h2 className="font-display text-display-2 text-ink uppercase text-balance">
        {headline}
      </h2>
      {deck && <p className="text-deck text-ink-muted mt-6 text-pretty">{deck}</p>}
    </header>
  );
}
