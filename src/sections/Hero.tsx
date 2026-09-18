import { business, smsHref, telHref } from "@/content/business";
import { hero } from "@/content/home";
import { servicesIndex } from "@/content/services-index";
import { Photo } from "@/components/media/Photo";
import { LinkButton } from "@/design/Button";
import { Container } from "@/design/Section";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  MessageIcon,
  PhoneIcon,
} from "@/design/icons";

/**
 * The studio, then the masthead over it.
 *
 * This used to be typography alone, and the client's verdict was that nothing
 * on the first screen grabbed her. She was right, and the fix was already in
 * the repo: `studio-hero-wide` is the only landscape photograph in the set, it
 * carries both racing simulators, the printer rack, the filament shelves and
 * the desk in one frame, and nothing had ever used it.
 *
 * Rules that govern everything here:
 *
 * - The photograph is an <img>, not a CSS background, so it keeps its srcset,
 *   its sizes and fetchpriority. It is now the LCP element in place of the
 *   wordmark, which is the one real cost of this change and is why it carries
 *   `priority` — the only one on the site.
 * - The scrim is a GRADIENT, not a wash. Body copy needs 4.5:1, which over a
 *   photograph means roughly 90% of the page colour; a wash that strong would
 *   hide the room and defeat the point. So the scrim closes where the text is
 *   and opens where the room is. See "G — THE HERO PHOTOGRAPH" in globals.css.
 * - Nothing above the fold waits for GSAP. The load-in is CSS keyframes gated
 *   on the OS motion preference alone.
 *
 * The machines index that used to sit beside the headline is gone: the
 * photograph names the three printers better than a list of model numbers did,
 * and dropping it is what keeps the red CTA above the fold.
 */
export function Hero() {
  return (
    // `isolate` keeps the -z-10 photograph inside this section rather than
    // letting it slide under the page background. overflow-x-clip, not hidden:
    // it absorbs the wordmark's settle without making a scroll container.
    <section
      aria-label="Hero"
      className="bg-surface-0 relative isolate min-h-[calc(100svh-4rem)] overflow-x-clip pt-6 pb-16 lg:pt-8 lg:pb-24"
    >
      <div className="absolute inset-0 -z-10">
        <Photo
          slug="studio-hero-wide"
          alt="The KirkWorks3D studio in Helena: three printers on a rack beside shelves of filament, with two racing simulators and a desk."
          treatment="crop"
          priority
          // 66vw on a phone, not 100vw. The photograph is cover-cropped and
          // sits under a scrim that is 52-96% opaque there, so it is texture
          // rather than detail — and this is the difference between a 35 KB
          // rung and a 129 KB one on the cellular QR visit the site is built
          // around.
          sizes="(min-width: 48rem) 100vw, 66vw"
          className="h-full w-full"
          // Biased right so the racing rigs stay in frame once the text column
          // covers the left of the photograph.
          imgClassName="object-[62%_48%]"
        />
        <div aria-hidden data-hero-scrim />
      </div>

      <Container>
        {/*
          The wordmark is sized in container-query units against THIS box, so
          it spans the content column exactly — inside the gutter and under the
          90rem cap, which no vw value can express. Decorative: the header
          lockup already carries the brand name as a link, and repeating it
          here would make every screen reader say it twice.
        */}
        <div className="@container">
          <p aria-hidden data-wordmark className="font-display text-ink select-none">
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
          Capped rather than columned. The right of the frame is deliberately
          left to the photograph, and this measure is what the scrim gradient
          is tuned against.
        */}
        <div className="mt-10 lg:mt-12 lg:max-w-[58%]">
          {/*
            Reserved at two lines, which is what it is at every width: the
            break is manual and the longer line measures about 6.4em in mixed
            case, so it never becomes three. Reserving the real line count is
            what keeps the font swap from shifting the page.
          */}
          <h1
            data-hero-h1
            className="font-display text-display-2 text-ink [min-block-size:calc(2*1.02em)]"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>

          <div data-hero-in style={{ "--d": "400ms" } as React.CSSProperties}>
            <p className="text-deck text-ink-muted mt-6 max-w-xl text-pretty">
              {hero.deck}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
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
              44px target. On a site whose primary conversion is a phone call,
              the number cannot be a 28px inline link.
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

        <div
          data-hero-in
          style={{ "--d": "600ms" } as React.CSSProperties}
          className="mt-12 hidden justify-end lg:flex"
        >
          <a
            href="#about"
            // text-ink, not mono-label's muted default: this is the one piece
            // of small copy sitting where the scrim is thinnest, and muted
            // measured 4.01:1 against the room behind it.
            className="mono-label text-ink hover:text-alert inline-flex items-center gap-2 transition-colors duration-250"
          >
            {hero.scrollHint}
            <ArrowDownIcon width={16} height={16} />
          </a>
        </div>
      </Container>
    </section>
  );
}
