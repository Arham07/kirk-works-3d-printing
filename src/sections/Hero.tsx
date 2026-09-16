import { business, smsHref, telHref } from "@/content/business";
import { hero } from "@/content/home";
import { LinkButton } from "@/design/Button";
import { Container } from "@/design/Section";
import { ArrowRightIcon, MessageIcon, PhoneIcon } from "@/design/icons";

/**
 * Deliberately NOT 100vh and deliberately NOT animated.
 *
 * The H1 is the LCP element, so nothing here starts at opacity 0 or
 * transparent — a QR visitor standing in a parking lot on cellular should see
 * the headline on first paint. The site's motion budget is spent on one
 * scroll chapter further down, not here.
 *
 * Height is clamped rather than viewport-locked so mobile browser chrome can't
 * crop it, and so a sliver of the next section shows as a scroll affordance.
 */
export function Hero() {
  return (
    <section aria-label="Hero" className="bg-surface-0 pt-10 pb-16 lg:pt-16 lg:pb-24">
      <Container>
        <p className="mono-label flex flex-wrap items-center gap-x-3 gap-y-2">
          {hero.eyebrow.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-ink-icon">
                  ·
                </span>
              )}
              {item}
            </span>
          ))}
        </p>

        {/*
          Full width, because the display face is the whole visual argument and
          a two-column hero strangles it into four lines.

          The two lines are manual and must stay two lines: min-block-size
          reserves the space so the font swap — which changes glyph widths,
          harmlessly — can never change the line count and shift the page.
        */}
        <h1 className="font-display text-display-1 text-ink mt-7 uppercase [min-block-size:calc(2*0.92em)]">
          {hero.headline[0]}
          <br />
          <span className="text-outline-alert">{hero.headline[1]}</span>
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-deck text-ink-muted max-w-xl text-pretty">
              {hero.deck}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href="/quote/">
                {hero.primaryCta}
                <ArrowRightIcon width={18} height={18} />
              </LinkButton>
              <LinkButton href={smsHref("Hi Kirk, I'd like a quote for: ")} tone="outline">
                <MessageIcon width={18} height={18} />
                {hero.secondaryCta}
              </LinkButton>
            </div>

            {/* Visible phone number, not hidden behind an icon. */}
            <a
              href={telHref}
              className="text-ink hover:text-alert mt-7 inline-flex items-center gap-2.5 text-lg font-medium transition-colors duration-250"
            >
              <PhoneIcon width={18} height={18} />
              {business.phoneDisplay}
            </a>
          </div>

          {/*
            The counterweight is data, not a photograph — which is the whole
            thesis in miniature. Every value is confirmed from Kirk's own copy.
          */}
          <dl className="hairline grid grid-cols-3 border-t">
            {[
              { k: "Machines", v: business.machineCount },
              { k: "Filaments", v: business.filamentChoices },
              { k: "People", v: "1" },
            ].map((stat) => (
              <div key={stat.k} className="pt-5">
                <dd className="font-display text-ink text-5xl leading-none tabular-nums lg:text-6xl">
                  {stat.v}
                </dd>
                <dt className="mono-label mt-2.5">{stat.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
