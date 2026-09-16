import { materialWarning, materials, orientationCopy } from "@/content/materials";
import { Container, Section, SectionHead } from "@/design/Section";

/**
 * The section that earns the site a forward, and it contains no photography
 * at all — which is the proof that the whole "type and data carry this" thesis
 * holds up.
 *
 * The pull quote is the real mechanic: volunteering a constraint nobody asked
 * about ("your part will slump on a dashboard") is what an expert does and
 * what a sales page never does.
 */
export function Materials() {
  return (
    <Section label="Materials" id="materials" surface="raised">
      <Container>
        <SectionHead
          number="05"
          eyebrow="Materials"
          headline="Which plastic, and why it matters."
          deck="You don't need to pick one. Tell me where the piece is going to live and I'll tell you what it should be made of."
        />

        <div className="mt-14 hidden md:block" data-reveal>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Typical properties of the filaments used at KirkWorks3D
            </caption>
            <thead>
              <tr>
                {["Material", "Good for", "Heat", "Outdoors", "Feel"].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="mono-label hairline border-b py-4 pr-6"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <th
                    scope="row"
                    className="hairline border-b py-5 pr-6 align-top"
                  >
                    <span className="font-display text-ink text-2xl uppercase">
                      {material.name}
                    </span>
                  </th>
                  {[material.goodFor, material.maxTemp, material.outdoors, material.feel].map(
                    (cell) => (
                      <td
                        key={cell}
                        className="hairline text-ink-muted border-b py-5 pr-6 align-top text-[0.9375rem]"
                      >
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-12 space-y-px md:hidden">
          {materials.map((material) => (
            <li key={material.id} className="hairline border p-6" data-reveal>
              <h3 className="font-display text-ink text-2xl uppercase">
                {material.name}
              </h3>
              <dl className="mono-label mt-4">
                {[
                  ["Good for", material.goodFor],
                  ["Heat", material.maxTemp],
                  ["Outdoors", material.outdoors],
                  ["Feel", material.feel],
                ].map(([label, value]) => (
                  <div key={label} className="hairline border-t py-2.5">
                    <dt className="text-ink-icon">{label}</dt>
                    <dd className="text-ink-muted mt-1 normal-case tracking-normal">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <figure className="mt-16 max-w-3xl" data-reveal>
          <blockquote className="border-alert text-ink border-l-2 pl-6 text-2xl leading-snug text-pretty md:text-3xl">
            &ldquo;{materialWarning.quote}&rdquo;
          </blockquote>
          <figcaption className="mono-label mt-5 pl-6">
            {materialWarning.attribution}
          </figcaption>
        </figure>

        <div
          className="hairline mt-16 grid gap-8 border-t pt-10 lg:grid-cols-[1fr_1.2fr]"
          data-reveal
        >
          <h3 className="font-display text-ink text-3xl uppercase text-balance">
            {orientationCopy.headline}
          </h3>
          <p className="text-ink-muted text-pretty">{orientationCopy.body}</p>
        </div>
      </Container>
    </Section>
  );
}
