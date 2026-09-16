import { thesis, reassurance } from "@/content/home";
import { Container, Section } from "@/design/Section";

/**
 * Kirk's strongest single line, promoted from a buried H2 on the old site to
 * a full section. No competitor in the scan puts a named human at the centre
 * of the page — it is the one thing a one-person shop has that a bureau with
 * a warehouse structurally cannot copy.
 */
export function Thesis() {
  return (
    <Section label="Working with Kirk" id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <p className="mono-label flex items-center gap-3">
              <span className="text-ink-icon">01</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-40" />
              {thesis.eyebrow}
            </p>
            <h2 className="font-display text-display-2 text-ink mt-5 uppercase text-balance">
              {thesis.headline}
            </h2>
          </div>

          <div data-reveal className="space-y-6">
            {thesis.body.map((paragraph) => (
              <p key={paragraph} className="text-ink-muted text-pretty">
                {paragraph}
              </p>
            ))}

            {/* The objection this page actually has to clear. */}
            <blockquote className="border-alert text-ink mt-10 border-l-2 pl-6 text-xl leading-relaxed text-pretty">
              {reassurance}
            </blockquote>

            <p className="mono-label pt-2">
              Kirk Edmunds · Owner / 3D print specialist
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
