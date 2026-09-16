import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-control px-6 py-3.5 " +
  "font-body text-[0.9375rem] font-medium tracking-tight " +
  "transition-[background-color,border-color,color] duration-250 ease-out " +
  "min-h-11"; // 44px minimum touch target

const tones = {
  /**
   * Red is rationed; this is one of the few places it appears. The fill uses
   * alert-surface rather than the brand red so white label text clears AA —
   * on the brand red it lands at 4.38:1, just under.
   */
  primary: "bg-alert-surface text-white hover:bg-alert",
  outline: "hairline border text-ink hover:border-line-strong hover:bg-surface-1",
  quiet: "text-ink-muted hover:text-ink",
} as const;

export function LinkButton({
  children,
  tone = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <a className={cn(base, tones[tone], className)} {...props}>
      {children}
    </a>
  );
}

export function Button({
  children,
  tone = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <button className={cn(base, tones[tone], className)} {...props}>
      {children}
    </button>
  );
}
