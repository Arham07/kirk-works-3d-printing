import { smsHref } from "@/content/business";
import { servicesIndex } from "@/content/services-index";
import { Container, Section } from "@/design/Section";
import { ArrowRightIcon } from "@/design/icons";

/**
 * The services INDEX — the keystone of the craft pass, and the only
 * full-bleed block on the site.
 *
 * It replaces a three-column grid of six small bordered cards whose largest
 * type was 32px, smaller than its own section heading. Nothing in that grid
 * was bigger, louder or slower than anything else in it, which is the literal
 * definition of no hierarchy. This is not a better grid; it is a different
 * structure — four rows at 56px that you can open.
 *
 * Native <details>/<summary>, so it stays a Server Component and gets
 * keyboard operation, Escape, and find-in-page for free. The summary toggles
 * and the route link lives INSIDE the panel: a row that both expands and
 * navigates is a keyboard trap and an ambiguous target for everyone.
 */
export function ServicesIndex() {
  return (
    <Section label="Services" id="services" space="loose" bleed>
      <Container>
        <div className="flex items-end justify-between gap-8">
          <h2
            data-rise-mask
            className="font-display text-display-1 text-ink uppercase"
          >
            <span data-rise className="block">
              Services
            </span>
          </h2>
          {/* The reference's "dsgn/4" device, with Kirk's own prefix. */}
          <p className="mono-wide text-ink-icon pb-3 whitespace-nowrap">
            kw3d/{servicesIndex.length}
          </p>
        </div>
      </Container>

      {/* Edge to edge. The gutter moves inside each row so the hairlines run
          the full width of the viewport — that is the whole gesture. */}
      <ul className="mt-14 border-t border-[color-mix(in_srgb,currentcolor_16%,transparent)]">
        {servicesIndex.map((service, index) => (
          <li
            key={service.id}
            className="border-b border-[color-mix(in_srgb,currentcolor_16%,transparent)]"
          >
            <details name="services" className="group/row">
              <summary
                className={
                  "page-gutter relative mx-auto flex max-w-[90rem] cursor-pointer list-none " +
                  "items-center gap-6 py-9 marker:hidden md:min-h-34 md:gap-10"
                }
              >
                {/* Wash. surface-2, not surface-1: #131312 on #0C0C0B is a
                    ~1.05:1 change and simply invisible on a laptop at an
                    angle. Scales from the right at rest so it retreats the
                    way it arrived. */}
                <span
                  aria-hidden
                  className={
                    "bg-surface-2 absolute inset-0 -z-10 origin-right scale-x-0 " +
                    "transition-transform duration-500 ease-out " +
                    "group-hover/row:origin-left group-hover/row:scale-x-100 " +
                    "group-focus-within/row:origin-left group-focus-within/row:scale-x-100"
                  }
                />
                {/* The red rule rides on top of the static hairline. */}
                <span
                  aria-hidden
                  className={
                    "bg-alert absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 " +
                    "transition-transform duration-600 ease-out " +
                    "group-hover/row:scale-x-100 group-focus-within/row:scale-x-100 " +
                    "motion-reduce:transition-none"
                  }
                />

                <span className="mono-label text-ink-icon w-12 shrink-0 transition-colors duration-250 group-hover/row:text-alert-ink">
                  00-{index + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={
                      "font-display text-display-3 text-ink block uppercase " +
                      "transition-transform duration-450 ease-out " +
                      "motion-safe:group-hover/row:translate-x-3"
                    }
                  >
                    {service.title}
                  </span>
                  <span className="text-ink-muted mt-2 block max-w-xl text-[0.9375rem] text-pretty md:hidden lg:block">
                    {service.teaser}
                  </span>
                </span>

                {/* Plus that becomes a cross. Two rules, no icon swap. */}
                <span
                  aria-hidden
                  className="relative grid size-11 shrink-0 place-items-center"
                >
                  <span className="bg-ink-icon absolute h-px w-4" />
                  <span
                    className={
                      "bg-ink-icon absolute h-4 w-px transition-transform duration-300 ease-out " +
                      "group-open/row:rotate-90 motion-reduce:transition-none"
                    }
                  />
                </span>
              </summary>

              <div className="page-gutter mx-auto max-w-[90rem] pb-12">
                <div className="grid gap-8 pl-0 md:grid-cols-[12rem_1fr_auto] md:gap-12 md:pl-18">
                  {/* The reference's duplicate second title. */}
                  {/* The braces are required: a bare // in JSX children is
                      parsed as a comment, not as text. */}
                  <p className="mono-wide text-ink-icon">
                    {"// "}
                    {service.eyebrow.toLowerCase()}
                  </p>

                  <div>
                    <ul className="text-ink-muted grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {service.covers.map((cover) => (
                        <li key={cover} className="text-[0.9375rem]">
                          <span aria-hidden className="text-ink-icon mr-2">
                            /
                          </span>
                          {cover}
                        </li>
                      ))}
                    </ul>
                    {service.pull && (
                      <p className="text-ink mt-7 max-w-lg text-xl leading-snug text-pretty">
                        {service.pull}
                      </p>
                    )}
                    {service.partNumbers.length > 0 && (
                      <p className="mono-label text-ink-icon mt-7">
                        Pieces on this page: {service.partNumbers.join(" · ")}
                      </p>
                    )}
                  </div>

                  <a
                    href={`/${service.slug}/`}
                    className="text-ink hover:text-alert group/link inline-flex h-fit items-center gap-2.5 text-[0.9375rem] font-medium transition-colors duration-250"
                  >
                    <span className="link-rule">Read more</span>
                    <ArrowRightIcon
                      width={17}
                      height={17}
                      className="transition-transform duration-250 motion-safe:group-hover/link:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>

      <Container className="mt-14">
        <p className="text-ink-muted max-w-2xl text-pretty" data-reveal>
          Not sure which one? The bracket that broke, the gift nobody sells, the
          photograph on the wall —{" "}
          <a
            href={smsHref("Hi Kirk, I'd like a quote for: ")}
            className="text-ink link-rule font-medium"
          >
            send a photo
          </a>{" "}
          and I&rsquo;ll tell you.
        </p>
      </Container>
    </Section>
  );
}
