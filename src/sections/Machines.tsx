import { buildVolumeCopy, machines } from "@/content/machines";
import { isTbd } from "@/content/types";
import { Photo } from "@/components/media/Photo";
import { SpecValue } from "@/design/Spec";
import { Container, Section, SectionHead } from "@/design/Section";

const allRows = [
  { key: "buildVolume", label: "Build volume" },
  { key: "nozzles", label: "Nozzles" },
  { key: "amsSlots", label: "AMS slots" },
  { key: "layerRange", label: "Layer range" },
  { key: "materials", label: "Materials" },
  { key: "bestFor", label: "Best for" },
] as const;

/*
  A row where not one of the three machines has a confirmed value is thirty
  dashes wide and tells the reader nothing except that the site is unfinished.
  Drop it. The sentinel stays in the content module and `npm run check:tbd`
  stays the channel that says what is still missing — that report is for Kirk,
  not for her customers.
*/
const rows = allRows.filter((row) =>
  machines.some((machine) => !isTbd(machine[row.key])),
);

/**
 * The highest-credibility-per-byte section on the site, and it needs zero
 * photography. No small shop in the competitive scan publishes a machine
 * comparison; every large bureau does. Publishing one puts Kirk on the same
 * footing as companies with a warehouse.
 *
 * The table is swapped for stacked cards below lg rather than scaled down —
 * a six-row, four-column table inside a horizontal scroller on a phone is
 * worse than no table.
 *
 * The photograph carries what the table currently cannot. Until Kirk reads the
 * specs off the machines there are no numbers here, and a picture of the three
 * of them on one rack — each with its own filament system above it — is a
 * better answer to "how big an operation is this?" than three columns of
 * dashes ever was.
 */
export function Machines() {
  return (
    <Section label="Machines" id="machines">
      <Container>
        <SectionHead
          number="05"
          eyebrow="The equipment"
          headline="Three machines. One person running them."
          deck="Every job is matched to the printer that suits it — which is a decision, not a default."
        />

        <figure
          className="hairline rounded-media mt-12 overflow-hidden border lg:mt-14"
          data-reveal
        >
          {/*
            Cropped to a band, not run at its native 3:4. The source is a
            portrait phone photograph, so full width put it at 1870px tall on
            a desktop — two screens of scrolling for one shelf. The subject is
            a horizontal row of three machines, which is the one thing a
            portrait frame is wrong for, so the crop takes the row and drops
            the ceiling above it and the storage bins below.
          */}
          <Photo
            slug="printer-rack-straight"
            alt="The three printers on one rack in the Helena studio: a Creality K2 Plus and two Bambu Lab machines, each with its filament system on the shelf above."
            treatment="crop"
            sizes="(min-width: 64rem) 84vw, 100vw"
            className="aspect-4/3 w-full sm:aspect-16/9 lg:aspect-[21/9]"
            imgClassName="object-[50%_58%]"
          />
          <figcaption className="hairline mono-label border-t p-5">
            {machines.map((machine) => machine.name).join(" · ")}
          </figcaption>
        </figure>

        {/* Desktop: comparison grid. */}
        <div className="mt-14 hidden lg:block" data-reveal>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparison of the three printers in the KirkWorks3D studio
            </caption>
            <thead>
              <tr>
                <th scope="col" className="mono-label hairline border-b py-4 pr-6 align-bottom">
                  Specification
                </th>
                {machines.map((machine) => (
                  <th
                    key={machine.id}
                    scope="col"
                    className="hairline border-b py-4 pr-6 align-bottom"
                  >
                    <span className="font-display text-ink block text-2xl">
                      {machine.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <th
                    scope="row"
                    className="mono-label hairline border-b py-4 pr-6 align-top font-normal"
                  >
                    {row.label}
                  </th>
                  {machines.map((machine) => (
                    <td
                      key={machine.id}
                      className="hairline text-ink-muted border-b py-4 pr-6 align-top text-[0.9375rem] tabular-nums"
                    >
                      <SpecValue value={machine[row.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per machine. A different component, not a shrunk table. */}
        <ul className="mt-12 space-y-px lg:hidden">
          {machines.map((machine) => (
            <li key={machine.id} className="hairline border p-6" data-reveal>
              <h3 className="font-display text-ink text-2xl">
                {machine.name}
              </h3>
              <dl className="mono-label mt-5">
                {rows.map((row) => {
                  // "Best for" is a sentence, not a measurement. Left in mono
                  // uppercase it collides with its own label and is painful to
                  // read, so prose rows stack and drop back to body casing.
                  const isProse = row.key === "bestFor";
                  return (
                    <div
                      key={row.key}
                      className={
                        "hairline border-t py-2.5 " +
                        (isProse
                          ? ""
                          : "flex items-baseline justify-between gap-4")
                      }
                    >
                      <dt className="text-ink-icon">{row.label}</dt>
                      <dd
                        className={
                          isProse
                            ? "text-ink-muted mt-1.5 font-body text-[0.9375rem] leading-relaxed normal-case tracking-normal"
                            : "text-ink-muted text-right"
                        }
                      >
                        <SpecValue value={machine[row.key]} />
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </li>
          ))}
        </ul>

        <div
          className="hairline mt-14 grid gap-8 border-t pt-10 lg:grid-cols-[1fr_1.2fr]"
          data-reveal
        >
          <h3 className="font-display text-ink text-3xl text-balance">
            {buildVolumeCopy.headline}
          </h3>
          <div className="space-y-4">
            <p className="text-ink-muted text-pretty">{buildVolumeCopy.body}</p>
            <p className="mono-label text-ink-icon">{buildVolumeCopy.seamNote}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
