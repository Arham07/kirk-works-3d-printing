import { thesis, reassurance, studioShots } from "@/content/home";
import { Photo } from "@/components/media/Photo";
import { Container, Section } from "@/design/Section";

/**
 * Kirk's strongest single line, promoted from a buried H2 on the old site to
 * a full section. No competitor in the scan puts a named human at the centre
 * of the page — it is the one thing a one-person shop has that a bureau with
 * a warehouse structurally cannot copy.
 *
 * The photographs are the proof of that sentence. "You work directly with
 * Kirk" is a claim; one chair at one desk, a bench with the dryers on it and
 * a shelf of finished work in a spare room in Helena is the evidence. It is
 * also the second and third time the visitor sees the studio, which was the
 * whole point of the client's note about the first screen.
 *
 * The right-hand pair is offset rather than aligned, and the two drift in
 * opposite directions on scroll (`data-parallax`). Two portraits set level
 * read as one flat block; staggered and moving apart they read as one bench
 * seen past another. The offsets are small — it should be felt, not watched.
 */
export function Thesis() {
  return (
    <Section label="Working with Kirk" id="about">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <p className="mono-label flex items-center gap-3">
              <span className="text-ink-icon">01</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-40" />
              {thesis.eyebrow}
            </p>
            <h2 className="font-display text-display-2 text-ink mt-5 text-balance">
              {thesis.headline}
            </h2>

            {/* Native 3:4, not cropped to a band: every one of these sources is
                a portrait phone photograph, and a 16:9 slice through one throws
                away the part that carries the argument. */}
            <figure className="hairline rounded-media mt-10 overflow-hidden border">
              <Photo
                slug={studioShots.setup.slug}
                alt={studioShots.setup.alt}
                sizes="(min-width: 64rem) 40vw, 100vw"
                className="w-full"
              />
              <figcaption className="hairline mono-label border-t p-5">
                {studioShots.setup.caption}
              </figcaption>
            </figure>
          </div>

          <div data-reveal className="space-y-6">
            {thesis.body.map((paragraph) => (
              <p key={paragraph} className="text-ink-muted text-pretty">
                {paragraph}
              </p>
            ))}

            {/* The objection this page actually has to clear. */}
            <blockquote className="border-alert text-ink mt-10 border-l-2 pl-6 text-xl leading-relaxed text-pretty">
              {reassurance}
            </blockquote>

            <p className="mono-label pt-2">
              Kirk Edmunds · Owner / 3D print specialist
            </p>

            {/*
              The staggered pair. The second column starts lower and the two
              drift apart as they pass, which is what fills the dead space
              beside the tall photograph without simply repeating it.
            */}
            <div className="grid grid-cols-2 gap-4 pt-4 lg:gap-6">
              <figure
                data-parallax="-22"
                className="hairline rounded-media overflow-hidden border"
              >
                <Photo
                  slug={studioShots.assembly.slug}
                  alt={studioShots.assembly.alt}
                  sizes="(min-width: 64rem) 22vw, 45vw"
                  className="w-full"
                />
                <figcaption className="hairline mono-label border-t p-4">
                  {studioShots.assembly.caption}
                </figcaption>
              </figure>

              <figure
                data-parallax="16"
                className="hairline rounded-media mt-10 overflow-hidden border lg:mt-16"
              >
                <Photo
                  slug={studioShots.shelf.slug}
                  alt={studioShots.shelf.alt}
                  sizes="(min-width: 64rem) 22vw, 45vw"
                  className="w-full"
                />
                <figcaption className="hairline mono-label border-t p-4">
                  {studioShots.shelf.caption}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
