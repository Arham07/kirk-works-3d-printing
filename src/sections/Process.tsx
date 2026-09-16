import { process } from "@/content/home";
import { isTbd } from "@/content/types";
import { Container, Section, SectionHead } from "@/design/Section";

/**
 * Step 04 is the one that matters. "You see photos of the actual print before
 * you pay the balance" is the mechanic that answers the unspoken objection —
 * can I trust a man with printers in his house — and no bureau offers it,
 * because no bureau can.
 */
export function Process() {
  return (
    <Section label="Process" id="process">
      <Container>
        <SectionHead
          number="06"
          eyebrow="Simple from start to finish"
          headline="How your idea comes to life."
        />

        <ol className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-5">
          {process.map((step, i) => (
            <li
              key={step.number}
              data-reveal
              /* Sequence stagger — read by the motion layer, ignored without it. */
              style={{ "--reveal-index": i } as React.CSSProperties}
              className="hairline flex flex-col border p-7"
            >
              <span
                className={
                  "font-display text-5xl leading-none " +
                  (i === 3 ? "text-alert" : "text-ink-icon")
                }
              >
                {step.number}
              </span>
              <h3 className="font-display text-ink mt-6 text-xl uppercase text-balance">
                {step.title}
              </h3>
              <p className="text-ink-muted mt-3 flex-1 text-[0.9375rem] text-pretty">
                {step.body}
              </p>
              {!isTbd(step.duration) && (
                <p className="mono-label hairline mt-6 border-t pt-4">
                  {step.duration}
                </p>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
