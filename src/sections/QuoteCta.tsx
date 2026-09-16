import { quoteSection } from "@/content/home";
import { ContactHeadline, DirectRoutes } from "@/design/ContactHead";
import { Container } from "@/design/Section";
import { ArrowRightIcon } from "@/design/icons";

/**
 * The page's closing conversion block, and the second of the page's two
 * visual peaks — the most vertical air anywhere on the site by a factor of
 * two, which is what makes it read as an arrival rather than another section.
 *
 * It bypasses <Section> the way Hero does: `cn` is bare clsx, so a py- value
 * passed through className would sit alongside Section's own and let source
 * order decide the winner.
 *
 * It stays a link rather than embedding the first field. Everything on this
 * page below MotionRoot is a Server Component, and pulling the form's four
 * useStates into a section most visitors never reach is the wrong trade on a
 * site built for someone on cellular in a parking lot. A decoy input that
 * discards what you typed would also be a small lie.
 */
export function QuoteCta() {
  return (
    <section
      id="quote"
      aria-label="Request a quote"
      className="bg-surface-1 py-36 lg:py-60"
    >
      <Container>
        <p className="mono-wide text-ink-icon text-center">{quoteSection.eyebrow}</p>

        <ContactHeadline className="mt-8" />

        <p className="text-deck text-ink-muted mx-auto mt-10 max-w-2xl text-center text-pretty">
          {quoteSection.body}
        </p>

        {/* One ruled link in the form's own language, so the click feels like
            the page opened rather than navigated somewhere else. */}
        <div className="mx-auto mt-16 max-w-2xl" data-reveal>
          <a href="/quote/" className="group hairline block border-t pt-6">
            <span className="mono-wide text-ink-icon">Start here</span>
            <span className="text-ink mt-3 flex items-center justify-between gap-6 text-h3">
              Tell Kirk what you have in mind
              <ArrowRightIcon
                width={22}
                height={22}
                className="shrink-0 transition-transform duration-250 motion-safe:group-hover:translate-x-1"
              />
            </span>
          </a>
        </div>

        <DirectRoutes className="mx-auto mt-16 max-w-4xl" />
      </Container>
    </section>
  );
}
