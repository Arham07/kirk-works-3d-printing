import { lessons } from "@/content/home";
import { LinkButton } from "@/design/Button";
import { Container, Section } from "@/design/Section";
import { ArrowRightIcon } from "@/design/icons";

/**
 * Teaching is presented as a credibility signal first and a service second.
 * The headline does the work: someone who teaches other people to run these
 * machines is a different proposition from someone who merely owns them, and
 * that is the argument for commission pricing.
 */
export function Lessons() {
  return (
    <Section label="Private lessons" id="lessons" surface="raised">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div data-reveal>
            <p className="mono-label flex items-center gap-3">
              <span className="text-ink-icon">07</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-40" />
              {lessons.eyebrow}
            </p>
            <h2 className="font-display text-display-2 text-ink mt-5 uppercase text-balance">
              {lessons.headline}
            </h2>
          </div>

          <div data-reveal className="lg:pt-20">
            <p className="text-ink-muted text-pretty">{lessons.body}</p>
            <LinkButton href="/quote/" tone="outline" className="mt-8">
              Ask about lessons
              <ArrowRightIcon width={18} height={18} />
            </LinkButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
