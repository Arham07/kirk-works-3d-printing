import { stack } from "@/content/home";
import { PhotoCard } from "@/components/media/Photo";
import { HueforgeStack } from "@/drawings/HueforgeStack";
import { StackScrubber } from "@/sections/stack/StackScrubber";
import { SpecValue } from "@/design/Spec";
import { Container, Section } from "@/design/Section";

/** Shared between the rail element and the scrubber that drives it. */
const RAIL_ID = "stack-rail";

/**
 * THE STACK — the section people should remember.
 *
 * This is the static version, and it is deliberately shipped first. It is also
 * the reduced-motion and no-JS state, so it is never throwaway: the scrubbed
 * canvas version layers on top of exactly this composition rather than
 * replacing it.
 *
 * Every counter is TBD until Kirk reads the real values off the project file.
 * Inventing a layer count inside the most technical, most credibility-
 * dependent element on the site would be a worse version of the mistake this
 * rebuild exists to fix.
 */
export function Stack() {
  return (
    <Section label="How a HueForge is made" id="stack" surface="raised">
      <Container>
        <div className="max-w-3xl" data-reveal>
          <p className="mono-label flex items-center gap-3">
            <span className="text-ink-icon">03</span>
            <span aria-hidden className="h-px w-6 bg-current opacity-40" />
            {stack.eyebrow}
          </p>
          <h2 className="font-display text-display-1 text-ink mt-6 uppercase text-balance">
            {stack.headline}
          </h2>
          <p className="text-deck text-ink-muted mt-7 text-pretty">{stack.body}</p>
        </div>

        {/*
          A CSS sticky rail, not a ScrollTrigger pin: no pin-spacer, no layout
          thrash, and if the scrubber never loads this collapses to an ordinary
          section with the diagram in its fully-exploded, fully-labelled state.
          The tall rail only exists on pointer-fine viewports with room for it.
        */}
        <div id={RAIL_ID} className="mt-16 lg:relative lg:h-[260vh]">
          <StackScrubber railId={RAIL_ID} />
          <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-8rem)] lg:items-center">
            <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              {/* The object, so the diagram is anchored to something real. */}
              <div data-reveal>
                <PhotoCard
                  slug="real-low-n-slow"
                  alt="The finished Low N Slow HueForge print, a 1982 Chevrolet C10 reproduced in layers of coloured filament"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  caption={
                    <>
                      <p className="mono-label text-ink-icon">The object</p>
                      <p className="text-ink mt-2 text-[0.9375rem]">
                        {stack.piece.name} — {stack.piece.subject}
                      </p>
                    </>
                  }
                />
              </div>

              {/* The mechanism, which no photograph of a flat print can show. */}
              <div data-reveal>
                <HueforgeStack className="text-ink w-full" />
              </div>
            </div>
          </div>
        </div>

        <dl
          className="hairline mt-16 grid grid-cols-2 gap-px border-t md:grid-cols-5"
          data-reveal
        >
          {stack.counters.map((counter) => (
            <div key={counter.label} className="pt-6">
              <dd className="font-display text-ink text-4xl tabular-nums lg:text-5xl">
                <SpecValue value={counter.value} />
              </dd>
              <dt className="mono-label mt-2.5">{counter.label}</dt>
            </div>
          ))}
        </dl>

        <ol className="mt-16 grid gap-px md:grid-cols-2 lg:grid-cols-4">
          {stack.phases.map((phase, index) => (
            <li key={phase.id} className="hairline border p-6" data-reveal>
              <span className="mono-label text-ink-icon">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-ink mt-4 text-xl uppercase">
                {phase.label}
              </h3>
              <p className="text-ink-muted mt-2.5 text-[0.9375rem] text-pretty">
                {phase.caption}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
