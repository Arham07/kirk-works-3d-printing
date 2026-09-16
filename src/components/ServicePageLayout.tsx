import { business, smsHref, telHref } from "@/content/business";
import { pieces } from "@/content/pieces";
import type { ServicePage } from "@/content/services/types";
import { PhotoCard } from "@/components/media/Photo";
import { LinkButton } from "@/design/Button";
import { Container, Section } from "@/design/Section";
import { JsonLd } from "@/lib/schema";
import { ArrowRightIcon, ChevronDownIcon, MessageIcon, PhoneIcon } from "@/design/icons";

/**
 * One layout, four routes. Every string comes from the service's own content
 * module — nothing here is shared copy, because two URLs carrying the same
 * paragraphs compete for the same query and the weaker page tends to win.
 */
export function ServicePageLayout({ service }: { service: ServicePage }) {
  const shown = service.pieceIds
    .map((id) => pieces.find((piece) => piece.id === id))
    .filter((piece) => piece !== undefined);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          serviceType: service.eyebrow,
          provider: { "@id": `${business.siteUrl}/#business` },
          areaServed: { "@type": "State", name: business.state },
          url: `${business.siteUrl}/${service.slug}/`,
        }}
      />

      <Section label={service.eyebrow} className="pb-0">
        <Container>
          <nav aria-label="Breadcrumb" className="mono-label">
            <a href="/" className="hover:text-ink transition-colors duration-250">
              KirkWorks3D
            </a>
            <span aria-hidden className="text-ink-icon mx-2">
              /
            </span>
            <span className="text-ink-muted">{service.eyebrow}</span>
          </nav>

          <h1 className="font-display text-display-1 text-ink mt-7 uppercase">
            {service.h1[0]}
            <br />
            <span className="text-outline-alert">{service.h1[1]}</span>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div className="space-y-5">
              {service.intro.map((paragraph) => (
                <p key={paragraph} className="text-ink-muted text-deck text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="lg:pt-2">
              <div className="flex flex-wrap gap-3">
                <LinkButton href="/quote/">
                  {service.ctaLabel}
                  <ArrowRightIcon width={18} height={18} />
                </LinkButton>
                <LinkButton
                  href={smsHref(`Hi Kirk, about ${service.eyebrow.toLowerCase()}: `)}
                  tone="outline"
                >
                  <MessageIcon width={18} height={18} />
                  Text a photo
                </LinkButton>
              </div>
              <a
                href={telHref}
                className="hairline text-ink hover:text-alert mt-7 flex items-center gap-3 border-t pt-6 text-xl font-medium transition-colors duration-250"
              >
                <PhoneIcon width={18} height={18} />
                {business.phoneDisplay}
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section label="What this covers">
        <Container>
          <h2 className="mono-label">What this covers</h2>
          <dl className="mt-8 grid gap-px sm:grid-cols-2">
            {service.covers.map((item) => (
              <div key={item.name} className="hairline border p-7" data-reveal>
                <dt className="font-display text-ink text-2xl uppercase text-balance">
                  {item.name}
                </dt>
                <dd className="text-ink-muted mt-3 text-[0.9375rem] text-pretty">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* The section that demonstrates judgement rather than listing features.
          It is the reason to pick a person over a web form. */}
      <Section label="In practice" surface="raised">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <h2
              className="font-display text-display-2 text-ink uppercase text-balance"
              data-reveal
            >
              {service.insight.headline}
            </h2>
            <div data-reveal>
              <p className="text-ink-muted text-pretty">{service.insight.body}</p>
              {service.insight.quote && (
                <blockquote className="border-alert text-ink mt-8 border-l-2 pl-6 text-xl leading-relaxed text-pretty">
                  {service.insight.quote}
                </blockquote>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {shown.length > 0 && (
        <Section label="Examples">
          <Container>
            <h2 className="mono-label">Pieces off these machines</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((piece) => (
                <li key={piece.id} data-reveal>
                  <PhotoCard
                    slug={piece.photo.slug}
                    alt={piece.photo.alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    caption={
                      <>
                        <p className="mono-label text-ink-icon">{piece.partNumber}</p>
                        <p className="text-ink mt-2 text-[0.9375rem] leading-snug">
                          {piece.name}
                        </p>
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section label="Questions" surface="raised">
        <Container>
          <h2 className="font-display text-display-2 text-ink uppercase" data-reveal>
            Questions about this
          </h2>
          <div className="mt-10 max-w-3xl" data-reveal>
            {service.faq.map((item) => (
              <details key={item.question} name="service-faq" className="hairline group border-t">
                <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg marker:hidden">
                  {item.question}
                  <ChevronDownIcon className="text-ink-icon shrink-0 transition-transform duration-250 group-open:rotate-180" />
                </summary>
                <p className="text-ink-muted pr-10 pb-6 text-pretty">{item.answer}</p>
              </details>
            ))}
          </div>

          <div className="hairline mt-14 flex flex-wrap items-center gap-4 border-t pt-10">
            <LinkButton href="/quote/">
              {service.ctaLabel}
              <ArrowRightIcon width={18} height={18} />
            </LinkButton>
            <p className="text-ink-muted">
              or call{" "}
              <a href={telHref} className="text-ink hover:text-alert underline-offset-4">
                {business.phoneDisplay}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
