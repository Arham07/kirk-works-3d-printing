import { featuredPiece, pieces } from "@/content/pieces";
import { PhotoCard } from "@/components/media/Photo";
import { Chip, SpecList } from "@/design/Spec";
import { Container, Section, SectionHead } from "@/design/Section";

/**
 * One piece large, the rest small.
 *
 * A six-up grid of equal tiles would advertise exactly how few finished pieces
 * exist. Leading with the single most impressive object and demoting the
 * others to a strip reads as editing rather than as a thin portfolio.
 */
export function FeaturedWork() {
  const rest = pieces.filter((piece) => piece.id !== featuredPiece.id);

  return (
    <Section label="Selected work" id="work">
      <Container>
        <SectionHead
          number="02"
          eyebrow="Printed in Helena"
          headline="Every piece here came off one of three machines."
          deck="Photographed as it came out — no renders, no stock, no borrowed portfolio."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div data-reveal>
            <PhotoCard
              slug={featuredPiece.photo.slug}
              alt={featuredPiece.photo.alt}
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority
            />
          </div>

          <div data-reveal className="lg:pt-6">
            <p className="mono-label text-ink-icon">{featuredPiece.partNumber}</p>
            <h3 className="font-display text-ink mt-3 text-4xl uppercase text-balance">
              {featuredPiece.name}
            </h3>
            <p className="text-ink-muted mt-4 text-pretty">{featuredPiece.caption}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {featuredPiece.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
              {!featuredPiece.clientWork && <Chip tone="demo">Studio piece</Chip>}
            </div>

            <SpecList specs={featuredPiece.specs} className="mt-8" />
          </div>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {rest.map((piece) => (
            <li key={piece.id} data-reveal>
              <PhotoCard
                slug={piece.photo.slug}
                alt={piece.photo.alt}
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 100vw"
                caption={
                  <>
                    <p className="mono-label text-ink-icon">{piece.partNumber}</p>
                    <p className="text-ink mt-2 text-[0.9375rem] leading-snug text-pretty">
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
  );
}
