import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Uniform section rhythm with exactly one tonal shift on the page. Varied
 * section heights read as indecision; one rhythm plus one shift reads as
 * confidence, and it is far less work to keep consistent.
 */
export function Section({
  children,
  id,
  label,
  surface = "base",
  className,
}: {
  children: ReactNode;
  id?: string;
  /** Becomes the section's accessible name. Write these first — they are the sitemap. */
  label: string;
  surface?: "base" | "raised";
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "py-18 lg:py-30",
        surface === "raised" ? "bg-surface-1" : "bg-surface-0",
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
 * The section-opening block: numeral, eyebrow, headline, deck. Consistent
 * everywhere, so the page reads as one document rather than a stack of
 * unrelated blocks.
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
