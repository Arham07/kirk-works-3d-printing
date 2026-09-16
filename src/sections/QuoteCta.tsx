import { business, smsHref, telHref } from "@/content/business";
import { quoteSection } from "@/content/home";
import { LinkButton } from "@/design/Button";
import { Container, Section } from "@/design/Section";
import { ArrowRightIcon, MessageIcon, PhoneIcon } from "@/design/icons";

/**
 * The page's closing conversion block. Plain anchors — tel:, sms: and a link
 * to the quote page — so the primary path works with zero JavaScript.
 */
export function QuoteCta() {
  return (
    <Section label="Request a quote" id="quote" surface="raised">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div data-reveal>
            <p className="mono-label">{quoteSection.eyebrow}</p>
            <h2 className="font-display text-display-2 text-ink mt-5 uppercase text-balance">
              {quoteSection.headline[0]}
              <br />
              <span className="text-outline-alert">{quoteSection.headline[1]}</span>
            </h2>
            <p className="text-deck text-ink-muted mt-7 max-w-xl text-pretty">
              {quoteSection.body}
            </p>
            <p className="border-alert text-ink mt-7 border-l-2 pl-5 text-pretty">
              {quoteSection.photoFirst}
            </p>
          </div>

          <div data-reveal className="lg:pt-16">
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/quote/">
                Request a quote
                <ArrowRightIcon width={18} height={18} />
              </LinkButton>
              <LinkButton href={smsHref("Hi Kirk, I'd like a quote for: ")} tone="outline">
                <MessageIcon width={18} height={18} />
                Text a photo
              </LinkButton>
            </div>

            <a
              href={telHref}
              className="hairline text-ink hover:text-alert mt-9 flex items-center gap-3 border-t pt-8 text-2xl font-medium transition-colors duration-250"
            >
              <PhoneIcon width={20} height={20} />
              {business.phoneDisplay}
            </a>
            <p className="mono-label mt-4">{business.locality} · Ships nationwide</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
