import type { FaqItem } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * FAQ as a grid of cards rather than a single tall list.
 *
 * Twelve stacked full-width rows made the Common Questions section the tallest
 * thing on the page for the least reason. Two columns halves its height, and
 * a card per question gives each one an edge so the eye can skip rather than
 * read every line to find the one it wants.
 *
 * Native <details>: keyboard operation, Escape, find-in-page and zero
 * JavaScript. The smooth open comes from ::details-content in globals.css,
 * which is what normally costs a JS accordion and a measured height.
 *
 * No `name` attribute, so several can be open at once — in a two-column grid,
 * exclusive accordions cause the other column to jump as you read.
 */
export function FaqList({
  items,
  columns = 2,
  className,
}: {
  items: readonly FaqItem[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid items-start gap-3",
        columns === 2 && "lg:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.question}>
          <details className="disclosure bg-surface-1 hairline group rounded-media border">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-5 pr-5 pl-6 marker:hidden">
              <span className="text-ink min-w-0 flex-1 text-[1.0625rem] leading-snug font-medium tracking-tight lg:text-[1.125rem]">
                {item.question}
              </span>
              {/* Plus that becomes a cross — one glyph, two rules, no icon
                  swap, so nothing reflows when it opens. */}
              <span
                aria-hidden
                className="hairline text-ink-muted grid size-9 shrink-0 place-items-center rounded-control border"
              >
                <span className="relative block size-3.5">
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out group-open:rotate-90 motion-reduce:transition-none" />
                </span>
              </span>
            </summary>
            <div>
              <div aria-hidden className="mr-5 mb-5 ml-6 h-px bg-current opacity-15" />
              <p className="text-ink-muted pr-5 pb-5 pl-6 text-pretty">{item.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
