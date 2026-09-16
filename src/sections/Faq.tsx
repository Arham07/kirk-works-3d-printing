import { faq, willNotPrint } from "@/content/faq";
import { FaqList } from "@/components/FaqList";
import { Container, Section } from "@/design/Section";

/**
 * Opens with the count rather than a headline — the reference's "dsgn/4"
 * device applied honestly, and it tells the reader up front how much is here.
 *
 * The questions run two-up. Twelve stacked full-width rows made this the
 * tallest section on the page for the least reason.
 */
export function Faq() {
  return (
    <Section label="Common questions" id="faq">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <h2 className="flex items-baseline gap-5">
            <span className="font-display text-display-2 text-ink leading-none">
              {faq.length}
            </span>
            <span className="mono-wide text-ink-muted">
              Questions people actually ask
            </span>
          </h2>
          <p className="text-ink-icon max-w-md text-[0.9375rem] text-pretty">
            Short answers. If yours isn&rsquo;t here, text it — no obligation.
          </p>
        </div>

        <FaqList items={faq} className="mt-12" />

        {/*
          Publishing the limits reads as expertise rather than as a shortfall,
          and it pre-filters the enquiries that would waste an evening. Full
          width beneath the grid, no border — it is a statement, not a card.
        */}
        <div className="hairline mt-14 border-t pt-10" data-reveal>
          <h3 className="mono-wide text-ink-muted">{willNotPrint.headline}</h3>
          <ul className="mt-6 grid gap-x-12 gap-y-3 md:grid-cols-2">
            {willNotPrint.items.map((item) => (
              <li key={item} className="text-ink-muted flex gap-3 text-pretty">
                <span aria-hidden className="text-alert mt-2.5 h-px w-4 shrink-0 bg-current" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
