import {
  business,
  mailtoHref,
  smsHref,
  telHref,
} from "@/content/business";
import { services } from "@/content/services";
import { isTbd } from "@/content/types";
import { LocalTime } from "@/components/LocalTime";
import { Container } from "@/design/Section";
import { ArrowUpIcon, ArrowUpRightIcon } from "@/design/icons";

/**
 * The contact details ARE the footer.
 *
 * What this replaces had five defects, four of them measurable. It was
 * bg-surface-1 and so is QuoteCta above it, so the last ~1,600px of the page
 * was one continuous #131312 divided by a single 16%-alpha hairline — it did
 * not read as a different place. The phone number was 15px on a site whose
 * whole thesis is that the primary conversion is a phone call. It was a
 * three-column grid, which is the wrong data structure when both socials are
 * unconfirmed: a grid makes absence look like breakage. It emitted two
 * <h2 class="mono-label"> elements, putting 11px labels at real heading level
 * on every page. And its copyright called new Date().getFullYear() in a
 * Server Component under output: "export", freezing the year at build time.
 */

/**
 * Channels, not socials. Kirk has four real ones today and they are exactly
 * what a visitor holding her business card wants. A centred flex-wrap CANNOT
 * have a hole; a grid column can. When the socials arrive this grows from
 * four to six and nothing about the layout changes.
 */
const channels = [
  { label: "Call", href: telHref, hideOnTouch: true },
  {
    label: "Text a photo",
    href: smsHref("Hi Kirk, I'd like a quote for: "),
    hideOnTouch: true,
  },
  { label: "Email", href: mailtoHref("Quote request — KirkWorks3D") },
  { label: "Save contact", href: "/kirk.vcf", download: true },
  ...(isTbd(business.social.facebook)
    ? []
    : [{ label: "Facebook", href: business.social.facebook, external: true }]),
  ...(isTbd(business.social.instagram)
    ? []
    : [{ label: "Instagram", href: business.social.instagram, external: true }]),
] as {
  label: string;
  href: string;
  hideOnTouch?: boolean;
  download?: boolean;
  external?: boolean;
}[];

export function SiteFooter() {
  const email =
    business.emailApproved && !isTbd(business.preferredEmail)
      ? business.preferredEmail
      : business.email;

  return (
    <footer className="bg-surface-0 hairline clears-callbar border-t pt-18 lg:pt-28">
      {/* 1 — the row device at footer scale, echoing the services index. */}
      <Container>
        <nav aria-label="Services" className="hairline grid border-b sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <a
              key={service.id}
              href={`/${service.slug}/`}
              className="hairline group hover:bg-surface-1 flex items-center gap-4 border-t px-1 py-6 transition-colors duration-250 sm:border-t-0 sm:border-r sm:last:border-r-0 sm:px-5"
            >
              <span className="mono-label text-ink-icon transition-colors duration-250 group-hover:text-alert-ink">
                00-{index + 1}
              </span>
              <span className="font-display text-ink text-[1.375rem] leading-none uppercase md:text-[1.625rem]">
                <span className="link-rule">{service.title}</span>
              </span>
            </a>
          ))}
        </nav>
      </Container>

      {/* 2 — the centrepiece. */}
      <Container className="py-20 text-center lg:py-28">
        <p className="mono-wide text-ink-icon tracking-[0.3em]">
          One person · one phone · she answers it
        </p>

        {/*
          display-2, not display-1. Three display-1s already exist on the site
          and the contact headline is roughly one screen above this; two at
          that scale so close together fight each other. At 76px underlined
          and centred, in a footer where everything else is 11px mono, this is
          unmistakably the largest object — that contrast IS the composition.
        */}
        <p className="mt-6" data-rise-mask>
          <a
            href={telHref}
            data-rise
            className="font-display text-display-2 text-ink contact-rule inline-block uppercase"
          >
            {business.phoneDisplay}
          </a>
        </p>

        <p className="mono-wide text-ink-icon mt-10 tracking-[0.34em]">Or email</p>
        {/*
          Deliberately smaller and muted. Phone ≫ email is the truth of how
          Kirk gets work. padding-block expands the hit box without moving the
          line box, which is what gets this to a 44px target inline.
        */}
        <p className="mt-4">
          <a
            href={mailtoHref()}
            className="text-ink-muted hover:text-ink link-rule text-[clamp(1.125rem,2.6vw,1.75rem)] transition-colors duration-250 [padding-block:0.6em]"
          >
            {email}
          </a>
        </p>
      </Container>

      {/* 3 — channels. */}
      <Container>
        <nav
          aria-label="Ways to reach Kirk"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              download={channel.download}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener noreferrer" : undefined}
              className={
                "mono-wide text-ink-muted hover:text-ink group inline-flex min-h-11 items-center " +
                "transition-colors duration-250 " +
                // Same media feature CallBar uses, not a breakpoint. Hiding
                // tel: on touch loses nothing — the phone number 40px above
                // is already a tel: link.
                (channel.hideOnTouch ? "[@media(pointer:coarse)]:hidden" : "")
              }
            >
              <span
                aria-hidden
                className="mr-2 inline-block transition-transform duration-250 motion-safe:group-hover:-translate-x-0.5"
              >
                [
              </span>
              <span className="link-rule">{channel.label}</span>
              {channel.external && (
                <ArrowUpRightIcon width={13} height={13} className="ml-1.5" />
              )}
              <span
                aria-hidden
                className="ml-2 inline-block transition-transform duration-250 motion-safe:group-hover:translate-x-0.5"
              >
                ]
              </span>
            </a>
          ))}
        </nav>
      </Container>

      {/* 4 — meta. Unconfirmed values are omitted rather than rendered as the
          amber sentinel, which would otherwise appear on every page. */}
      <Container className="mt-14">
        <p className="mono-label text-ink-icon flex flex-wrap justify-center gap-x-3 gap-y-2 text-center">
          <span>{business.locality}</span>
          <span aria-hidden>·</span>
          <span>Ships nationwide</span>
          <span aria-hidden>·</span>
          <LocalTime />
          {!isTbd(business.hours) && (
            <>
              <span aria-hidden>·</span>
              <span>{business.hours}</span>
            </>
          )}
        </p>
      </Container>

      {/* 5 — baseline. grid, not flex justify-between: with flex the middle
          item is only optically centred when the outer two happen to match. */}
      <Container className="hairline mt-16 border-t py-7">
        <div className="text-ink-icon grid gap-4 text-sm sm:grid-cols-3 sm:gap-0">
          {/* No year. A wrong year is a stronger stale-site signal than none,
              and under static export it would freeze at build time. */}
          <p className="sm:justify-self-start">&copy; {business.legalName}</p>
          <p className="mono-label text-center tracking-[0.3em] sm:justify-self-center">
            {business.cardLine}
          </p>
          <a
            href="#top"
            className="hover:text-ink inline-flex items-center gap-1.5 transition-colors duration-250 sm:justify-self-end"
          >
            Back to top
            <ArrowUpIcon width={14} height={14} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
