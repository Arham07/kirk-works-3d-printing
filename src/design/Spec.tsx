import { isTbd, type Confirmed, type Spec } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * A value Kirk has not confirmed renders as a visible placeholder, never as a
 * plausible guess. In development it is loud on purpose — an unconfirmed
 * number reaching production would undo the credibility the spec layer exists
 * to build.
 */
export function SpecValue({ value }: { value: Confirmed<string> }) {
  if (isTbd(value)) {
    return (
      <span
        className="text-signal"
        title="Unconfirmed — pending Kirk"
        data-tbd
      >
        — —
      </span>
    );
  }
  return <>{value}</>;
}

/**
 * The mono spec strip. This is the site's core device: every image, card and
 * process step carries real measured values, because Kirk's expertise is
 * measurable and nobody else in her market publishes a single number.
 */
export function SpecList({
  specs,
  className,
  variant = "stacked",
}: {
  specs: readonly Spec[];
  className?: string;
  variant?: "stacked" | "inline";
}) {
  if (variant === "inline") {
    return (
      <p className={cn("mono-label flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
        {specs.map((spec, i) => (
          <span key={spec.label} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="text-ink-icon">·</span>}
            <span>
              <span className="text-ink-icon">{spec.label} </span>
              <span className="text-ink-muted">
                <SpecValue value={spec.value} />
              </span>
            </span>
          </span>
        ))}
      </p>
    );
  }

  return (
    <dl className={cn("mono-label", className)}>
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="hairline flex items-baseline justify-between gap-4 border-t py-2.5"
        >
          <dt className="text-ink-icon">{spec.label}</dt>
          {/* Tabular figures keep the value column from jittering row to row. */}
          <dd className="text-ink-muted text-right tabular-nums">
            <SpecValue value={spec.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Technique / machine chip. Amber marks a demonstration piece, not client work. */
export function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "demo";
}) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center border px-2.5 py-1.5",
        tone === "demo"
          ? "border-signal/40 text-signal"
          : "hairline text-ink-muted",
      )}
    >
      {children}
    </span>
  );
}
