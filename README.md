# kirk-works-3d-printing

Website for **KirkWorks3D Print Studio** — an owner-operated custom 3D printing
studio in Helena, Alabama. Custom prints, HueForge photo art, private lessons
and corporate work.

The site's only job is to turn a visitor into a quote request, a call or a text.
A large share of traffic arrives by scanning a QR code on a printed business
card, so mobile and first paint on cellular are the primary constraints — not an
afterthought.

## Running it

Requires Node 22 (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

| Script | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static export to `out/` |
| `npm run media` | Regenerate image derivatives from `assets/photos/` |
| `npm run check:tbd` | List values still awaiting confirmation from the client |
| `npm run lint` | ESLint |

## How it is put together

**Next.js 16, App Router, `output: "export"`.** Every route is pure content with
no request-time input, so the build is a static `out/` directory that deploys to
Vercel, Netlify, Cloudflare Pages or S3 with no adapter. That is also a
guardrail: reaching for a route handler fails the build rather than quietly
binding the project to one host.

**Six runtime dependencies.** `next`, `react`, `react-dom`, `clsx`, plus `gsap`
and `lenis`, which are lazy-loaded and never in the initial chunk.

### Content lives outside components

Everything a non-developer might want to change — copy, prices, machine specs,
FAQ answers, contact details — is in `src/content/`, typed. No component
contains a user-visible string. `src/content/business.ts` is the single source
for name, phone, email and address; those must match the Google Business Profile
character for character or local search treats it as a different business.

### Unconfirmed values are visible, never invented

The site's argument is that this work is *measurable*, so a single invented
figure would discredit every real one. Values the client has not confirmed are
the `TBD` sentinel from `src/content/types.ts`, and they render as an amber
placeholder rather than a plausible guess.

```bash
npm run check:tbd            # report
npm run check:tbd -- --strict  # exit 1 if any remain — run before deploying
```

There is a related rule in the media pipeline: **no AI-generated imagery of
printers, parts or the studio.** Molten-polymer extrusion is something every
current model gets subtly wrong, and every lessons customer would spot it.

### Images

Sources in `assets/photos/` are never served. `npm run media` grades, crops and
resizes them into AVIF/WebP ladders in `public/media/` plus a typed manifest,
and both are committed — which keeps `sharp` off the deploy critical path, so
any host can build with no native dependencies. `<Photo>` reads width and height
from the manifest, so layout shift is zero by construction.

The global colour grade is one function in `scripts/lib/grade.mjs`. Bump
`GRADE_VERSION` when changing it.

### Motion

`src/motion/MotionRoot.tsx` is the entire client boundary: it renders nothing
and only decides *whether* to fetch GSAP. Because `src/motion/init.ts` is
reached solely through `await import()`, it lands in its own chunk that the
initial HTML never references. It is never fetched at all for reduced-motion,
Save-Data or 2G visitors.

Sections stay Server Components and opt in by attribute — `data-reveal`,
`data-plate`, `data-rule` — so nothing in the page tree imports GSAP.

The two scroll chapters — the HueForge stack and the Selected Work deck — do
not use GSAP at all. `StackScrubber` writes one `--progress` custom property
onto a sticky rail and CSS does the rest, so the pinned deck is six cards and
an index driven by arithmetic in `globals.css` rather than by per-element
JavaScript. Both sections are the same DOM in their unpinned form.

Two hard rules:

- **Nothing on the LCP path animates.** Chrome computes LCP from the painted,
  unclipped intersection, so a fade or a clip mask disqualifies an element
  while `transform` does not. The LCP element on `/` is the hero wordmark; it
  and the headlines paint finished and only ever move.
- **Every animated state has a valid finished state on the other side.** With
  JavaScript off, reduced motion on, or the chunk failing to load, the page is
  complete. An inline head script flips `data-motion="off"` after 2.5s if the
  motion layer never initialises.

### Themes

Dark is the default and matches the client's printed business card. Light is a
single remapped block of semantic tokens in `globals.css` — components never
reference the raw colour ramp, which is what makes the inversion one block
rather than a grep. The choice is applied before first paint by the inline head
script, so there is no flash.

## Still open

- The quote form composes a message and hands it to the visitor's mail or SMS
  client. Swapping in a real endpoint is one line in `src/lib/submit/index.ts`;
  `http.adapter.ts` is already written against that interface.
- Hosting is undecided, which is why the build is host-agnostic.
- `npm run check:tbd` lists what is still needed from the client.
