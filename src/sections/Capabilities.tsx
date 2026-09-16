import { capabilities } from "@/content/services";
import { Container, Section, SectionHead } from "@/design/Section";
import { ArrowRightIcon } from "@/design/icons";

/**
 * Organised by use case rather than by object, so a visitor recognises their
 * own need in a category Kirk may never have literally printed. "Functional
 * parts & repairs" converts the person holding a broken bracket; a grid of
 * six photographs of finished trinkets does not.
 */
export function Capabilities() {
  return (
    <Section label="What can be made" id="capabilities">
      <Container>
        <SectionHead
          number="03"
          eyebrow="What can be made"
          headline="Ideas become something you can hold."
          deck="From one meaningful custom piece to larger corporate projects — combining modern equipment with genuine, down-home service."
        />

        <ul className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <li key={capability.id} data-reveal>
              <a
                href={`/${capability.service}/`}
                className="hairline hover:bg-surface-1 hover:border-line-strong group flex h-full flex-col border p-7 transition-colors duration-250"
              >
                <span className="mono-label text-ink-icon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-ink mt-5 text-2xl uppercase">
                  {capability.name}
                </h3>
                <p className="text-ink-muted mt-3 flex-1 text-[0.9375rem] text-pretty">
                  {capability.body}
                </p>
                <span className="text-ink-muted group-hover:text-alert mt-7 inline-flex items-center gap-2 text-sm transition-colors duration-250">
                  Discuss your project
                  <ArrowRightIcon width={15} height={15} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
