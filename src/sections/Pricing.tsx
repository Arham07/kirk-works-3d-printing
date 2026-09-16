import { pricing } from "@/content/home";
import { SpecValue } from "@/design/Spec";
import { Container, Section, SectionHead } from "@/design/Section";

/**
 * "No prices on the site" must not become "no pricing information".
 * Silence on cost is the most common reason a service-site visitor leaves
 * without enquiring, and every commission craftsman worth studying publishes
 * a range and the factors behind it.
 *
 * The bands are TBD until Kirk sets them, and they render as visible
 * placeholders rather than invented figures.
 */
export function Pricing() {
  return (
    <Section label="Pricing" id="pricing">
      <Container>
        <SectionHead
          number="08"
          eyebrow="What it costs"
          headline={pricing.headline}
          deck={pricing.body}
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <dl data-reveal>
            {pricing.bands.map((band) => (
              <div
                key={band.label}
                className="hairline flex items-baseline justify-between gap-6 border-t py-5"
              >
                <div>
                  <dt className="text-ink text-lg">{band.label}</dt>
                  <p className="text-ink-icon mt-1 text-sm">{band.note}</p>
                </div>
                <dd className="font-display text-ink shrink-0 text-3xl tabular-nums">
                  <SpecValue value={band.from} />
                </dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="space-y-12">
            <div>
              <h3 className="mono-label">{pricing.drivers.headline}</h3>
              <ul className="mt-5 space-y-3">
                {pricing.drivers.items.map((item) => (
                  <li key={item} className="text-ink-muted flex gap-3 text-pretty">
                    <span aria-hidden className="text-alert mt-2.5 h-px w-4 shrink-0 bg-current" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mono-label">{pricing.fileOwnership.headline}</h3>
              <dl className="mt-5 space-y-5">
                {pricing.fileOwnership.options.map((option) => (
                  <div key={option.name}>
                    <dt className="text-ink font-medium">{option.name}</dt>
                    <dd className="text-ink-muted mt-1 text-pretty">{option.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
