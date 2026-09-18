import { Fragment } from "react";
import { hero } from "@/content/home";
import { pieces } from "@/content/pieces";
import { isTbd } from "@/content/types";
import { PhotoCard } from "@/components/media/Photo";
import { StackScrubber } from "@/sections/stack/StackScrubber";
import { Chip, SpecList } from "@/design/Spec";
import { Container, Section, SectionHead } from "@/design/Section";
import { ArrowRightIcon } from "@/design/icons";

const RAIL_ID = "work-rail";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * One section, two layouts, one DOM tree.
 *
 * Below lg — or with motion off, or reduced motion on — this is an ordinary
 * list: a photograph and its details, six times. On a wide viewport with
 * motion enabled the same markup becomes a pinned deck: the cards stack into a
 * single slot and rise as you scroll, while the index and the active piece's
 * details cross-fade beside them. Block F in globals.css does all of it.
 *
 * Nothing is duplicated to achieve that. The details a screen reader hears are
 * the same nodes the deck shows, in the same order, so every piece is
 * announced exactly once in both layouts. The index is the only extra, and it
 * is aria-hidden — every string in it is already in an h3 below.
 *
 * Deliberately NOT data-reveal. GSAP writes inline transform and opacity, so a
 * reveal on a card would fight the deck for the same two properties.
 */
export function FeaturedWork() {
  return (
    <Section label="Selected work" id="work" space="loose">
      <Container>
        <div id={RAIL_ID} data-deck-rail>
          <StackScrubber railId={RAIL_ID} ease="linear" />

          <div
            data-deck
            style={{ "--n": pieces.length } as React.CSSProperties}
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:items-start"
          >
            <div data-deck-lead className="sm:col-span-2">
              <SectionHead
                number="02"
                eyebrow="Printed in Helena"
                headline="Every piece here came off one of three machines."
                deck="Photographed as it came out — no renders, no stock, no borrowed portfolio."
              />
              <a
                href="/quote/"
                className="text-ink hover:text-alert mt-9 inline-flex items-center gap-2.5 transition-colors duration-250"
                data-reveal
              >
                <span className="link-rule text-lg font-medium">{hero.primaryCta}</span>
                <ArrowRightIcon width={18} height={18} />
              </a>
            </div>

            {/*
              The counter and the name index. Visible only in deck mode, and
              hidden from assistive technology in both — it is a position
              readout for the eye, and every name in it is a heading below.
            */}
            <div data-deck-index aria-hidden className="hidden">
              <p className="font-display text-display-2 text-ink flex items-baseline gap-3 tabular-nums">
                <span className="inline-grid">
                  {pieces.map((piece, i) => (
                    <span
                      key={piece.id}
                      data-deck-num
                      style={{ "--i": i } as React.CSSProperties}
                      className="[grid-area:1/1]"
                    >
                      {pad(i + 1)}
                    </span>
                  ))}
                </span>
                <span className="text-ink-icon">—</span>
                <span className="text-ink-icon">{pad(pieces.length)}</span>
              </p>

              <ol className="mt-7 space-y-2">
                {pieces.map((piece, i) => (
                  <li
                    key={piece.id}
                    data-deck-name
                    style={{ "--i": i } as React.CSSProperties}
                    className="text-ink text-[0.9375rem] leading-snug"
                  >
                    {piece.name}
                  </li>
                ))}
              </ol>
            </div>

            {pieces.map((piece, i) => {
              // Only values Kirk has confirmed. A spec strip of placeholders
              // beside a photograph reads as an unfinished site rather than as
              // honesty, which is the opposite of what the sentinel is for.
              const confirmed = piece.specs.filter((spec) => !isTbd(spec.value));

              return (
                <Fragment key={piece.id}>
                  <div data-deck-card style={{ "--i": i } as React.CSSProperties}>
                    <PhotoCard
                      slug={piece.photo.slug}
                      alt={piece.photo.alt}
                      sizes="(min-width: 1024px) 34vw, (min-width: 640px) 48vw, 100vw"
                    />
                  </div>

                  <div data-deck-detail style={{ "--i": i } as React.CSSProperties}>
                    <p className="mono-label text-ink-icon">{piece.partNumber}</p>
                    <h3
                      data-deck-title
                      className="font-display text-ink mt-3 text-3xl text-balance"
                    >
                      {piece.name}
                    </h3>
                    <p className="text-ink-muted mt-4 text-pretty">{piece.caption}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {piece.chips.map((chip) => (
                        <Chip key={chip}>{chip}</Chip>
                      ))}
                      {!piece.clientWork && <Chip tone="demo">Studio piece</Chip>}
                    </div>

                    {confirmed.length > 0 && (
                      <SpecList specs={confirmed} className="mt-8" />
                    )}
                  </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
