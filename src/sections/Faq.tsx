import { faq, willNotPrint } from "@/content/faq";
import { Container, Section, SectionHead } from "@/design/Section";
import { ChevronDownIcon } from "@/design/icons";

/**
 * Native <details>/<summary>, not an accordion component. Keyboard handling,
 * screen-reader semantics and find-in-page all work for free, it stays a
 * Server Component, and it ships zero JavaScript — strictly better than a
 * JS accordion for a list of static answers.
 */
export function Faq() {
  return (
    <Section label="Common questions" id="faq">
      <Container>
        <SectionHead
          number="09"
          eyebrow="Before you ask"
          headline="The questions everyone has."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div data-reveal>
            {faq.map((item) => (
              <details
                key={item.question}
                name="faq"
                className="hairline group border-t"
              >
                <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg marker:hidden">
                  {item.question}
                  <ChevronDownIcon className="text-ink-icon shrink-0 transition-transform duration-250 group-open:rotate-180" />
                </summary>
                <p className="text-ink-muted pr-10 pb-6 text-pretty">{item.answer}</p>
              </details>
            ))}
          </div>

          {/*
            Publishing what he will not take on reads as expertise rather than
            limitation, and it pre-filters the enquiries that would waste an
            evening.
          */}
          <aside data-reveal className="hairline h-fit border p-7">
            <h3 className="font-display text-ink text-2xl uppercase">
              {willNotPrint.headline}
            </h3>
            <ul className="mt-6 space-y-4">
              {willNotPrint.items.map((item) => (
                <li key={item} className="text-ink-muted flex gap-3 text-[0.9375rem] text-pretty">
                  <span aria-hidden className="text-alert mt-2.5 h-px w-4 shrink-0 bg-current" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
