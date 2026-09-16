import { business, smsHref, telHref } from "@/content/business";
import { hero } from "@/content/home";
import { machines } from "@/content/machines";
import { servicesIndex } from "@/content/services-index";
import { LinkButton } from "@/design/Button";
import { Container } from "@/design/Section";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  MessageIcon,
  PhoneIcon,
} from "@/design/icons";

/**
 * Wordmark, rule, meta row, then the split. The masthead of a printed thing
 * rather than a web hero, which is the whole reason the reference reads the
 * way it does.
 *
 * Two rules survive from the previous build and still govern everything here:
 *
 * - The LCP element paints FINISHED on the first frame. That is now the
 *   wordmark — it is the largest painted block on the page — so its load-in is
 *   transform-only. Chrome computes LCP from the painted, unclipped
 *   intersection, and a transform does not disqualify an element while a fade
 *   or a clip mask does. Same for the H1 under it. Only the small supporting
 *   blocks fade, and none of them is a candidate.
 * - No GSAP. These are CSS keyframes gated on the same `.js[data-motion="on"]`
 *   the head script sets before first paint, so nothing above the fold waits
 *   for an idle-time chunk to arrive. If that chunk never arrives, the failsafe
 *   flips the attribute and the identity state — the one authored here — is
 *   what stays on screen.
 *
 * Height is clamped rather than viewport-locked so mobile browser chrome can't
 * crop it, and so a sliver of the next section shows as a scroll affordance.
 */
export function Hero() {
  return (
    // overflow-x-clip, not hidden: it absorbs the wordmark's 4% settle and any
    // overshoot from the wider fallback face during the font swap, without
    // making the section a scroll container.
    <section
      aria-label="Hero"
      className="bg-surface-0 overflow-x-clip pt-6 pb-16 lg:pt-8 lg:pb-20"
    >
      <Container>
        {/*
          The wordmark is sized in container-query units against THIS box, so
          it spans the content column exactly — inside the gutter and under the
          90rem cap, which no vw value can express. Decorative: the header
          lockup already carries the brand name as a link, and repeating it
          here would make every screen reader say it twice.
        */}
        <div className="@container">
          <p aria-hidden data-wordmark className="font-display text-ink uppercase select-none">
            Kirk
            <span data-outline className="text-outline-alert">
              Works
            </span>
            3D
          </p>
        </div>

        {/* The bar under the wordmark. Its own keyframe, not [data-rule] —
            that one is drawn by GSAP, which lands on idle and would leave the
            heaviest element in the masthead missing for up to two seconds. */}
        <div aria-hidden data-bar className="bg-ink mt-2 h-5 lg:mt-3 lg:h-7" />

        {/*
          The meta row. Complements the fixed header rather than repeating it:
          the header carries page anchors, this carries the four service
          ROUTES.

          The two right-hand items swap rather than sharing the line. Kirk's
          four service names measure 690px set in mono, so below 80rem they
          would wrap the row onto a second line — and they are her own names,
          not to be abbreviated to fit a layout. The card line holds the slot
          until there is room for them.
        */}
        <div
          data-hero-in
          style={{ "--d": "300ms" } as React.CSSProperties}
          className="hairline mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-b pb-4 lg:mt-6"
        >
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

          <nav
            aria-label="Service pages"
            className="ml-auto hidden items-center gap-x-6 xl:flex"
          >
            {servicesIndex.map((service) => (
              <a
                key={service.slug}
                href={`/${service.slug}/`}
                className="mono-label link-rule hover:text-ink transition-colors duration-250"
              >
                {service.eyebrow}
              </a>
            ))}
          </nav>

          <p className="mono-label ml-auto hidden md:block xl:hidden">
            {business.cardLine}
          </p>
        </div>

        {/*
          DOM order is the reading order: headline, deck, buttons, phone, then
          the machine index. The index only moves to the left column at lg,
          where there is room for it beside the headline.
        */}
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="lg:col-start-2 lg:row-start-1">
            {/*
              Reserved at two lines, which is what it is at every width: the
              break is manual and the longest line measures ~7.6em, so it never
              becomes three. Reserving the real line count is what keeps the
              font swap from shifting the page.
            */}
            <h1
              data-hero-h1
              className="font-display text-display-2 text-ink uppercase [min-block-size:calc(2*0.95em)]"
            >
              {hero.headline[0]}
              <br />
              {hero.headline[1]}
            </h1>

            <div data-hero-in style={{ "--d": "400ms" } as React.CSSProperties}>
              <p className="text-deck text-ink-muted mt-7 max-w-xl text-pretty">
                {hero.deck}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <LinkButton href="/quote/">
                  {hero.primaryCta}
                  <ArrowRightIcon width={18} height={18} />
                </LinkButton>
                <LinkButton
                  href={smsHref("Hi Kirk, I'd like a quote for: ")}
                  tone="outline"
                >
                  <MessageIcon width={18} height={18} />
                  {hero.secondaryCta}
                </LinkButton>
              </div>

              {/*
                Visible phone number, not hidden behind an icon — and a full
                44px target. On a site whose primary conversion is a phone
                call, the number cannot be a 28px inline link.
              */}
              <a
                href={telHref}
                className="text-ink hover:text-alert mt-5 -ml-1 inline-flex min-h-11 items-center gap-2.5 px-1 text-lg font-medium transition-colors duration-250"
              >
                <PhoneIcon width={18} height={18} />
                {business.phoneDisplay}
              </a>
            </div>
          </div>

          {/*
            The counterweight is an index, not a photograph — the three
            machines by name, which is the same claim the eyebrow makes in
            numbers and the only one a competitor cannot copy off a spec sheet.
          */}
          <div
            data-hero-in
            style={{ "--d": "500ms" } as React.CSSProperties}
            className="lg:col-start-1 lg:row-start-1 lg:self-end"
          >
            <p className="mono-label">
              <a href="#machines" className="link-rule hover:text-ink transition-colors duration-250">
                Machines
              </a>
            </p>
            <ol className="mt-5 space-y-2.5">
              {machines.map((machine, i) => (
                <li key={machine.id} className="flex items-baseline gap-3">
                  <span className="mono-label text-ink-icon tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink text-[0.9375rem] leading-snug">
                    {machine.name}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div
          data-hero-in
          style={{ "--d": "600ms" } as React.CSSProperties}
          className="mt-14 hidden justify-end lg:flex"
        >
          <a
            href="#about"
            className="mono-label hover:text-ink inline-flex items-center gap-2 transition-colors duration-250"
          >
            {hero.scrollHint}
            <ArrowDownIcon width={16} height={16} />
          </a>
        </div>
      </Container>
    </section>
  );
}
