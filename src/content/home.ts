import { TBD, type PriceBand, type ProcessStep } from "./types";

export const hero = {
  /** Mono eyebrow. Every value here is confirmed from Kirk's own copy. */
  eyebrow: ["Helena, Alabama", "3 machines", "100+ filaments"],
  /**
   * Manually broken, because the line break is a design decision and must not
   * reflow with the viewport. Place and a checkable claim — not an abstraction.
   */
  headline: ["Custom 3D printing", "in Helena, Alabama"],
  deck: "Kirk Edmunds. Three printers, one person, and the phone number below is mine.",
  primaryCta: "Request a quote",
  secondaryCta: "Text Kirk a photo",
  /** Bottom-right of the hero split, desktop only — the scroll affordance. */
  scrollHint: "Scroll to explore",
} as const;

export const thesis = {
  eyebrow: "What you actually get",
  headline: "You work directly with Kirk.",
  body: [
    "KirkWorks3D is an owner-operated 3D print studio serving individuals, small businesses, schools, organizations and corporate clients. You won't be passed from one department to another.",
    "From your first idea through the finished print, you get thoughtful recommendations, clear communication and personal attention.",
  ],
} as const;

/**
 * Kirk's own line, and the single best piece of copy on the original site.
 * It answers the real objection — "I don't know how to ask for this" — which
 * is the objection every large print bureau structurally ignores.
 */
/**
 * The three photographs in the "Working with Kirk" section. Captions rather
 * than bare images: the point of this section is that one person does all of
 * it, and naming each bench is what turns three pictures of a spare room into
 * an account of how the work actually moves through it.
 */
export const studioShots = {
  setup: {
    slug: "design-workstation",
    alt: "Kirk's computer setup in the Helena studio: one chair, two monitors and a laptop with the slicer open.",
    caption: "The computer setup — where every job is modelled and sliced",
  },
  assembly: {
    slug: "assembly-desk",
    alt: "The assembly desk: a laptop, two filament dryers and finished prints waiting on the bench, with shelves of filament alongside.",
    caption: "The assembly desk",
  },
  shelf: {
    slug: "f1-display-pair",
    alt: "Finished pieces on the studio shelf: the Formula One track calendar and the Red Bull steering wheel, above the filament store.",
    caption: "Finished work, before it is packed",
  },
} as const;

export const reassurance =
  "You don't need to understand 3D printing or have every detail figured out. Tell me what you have in mind and I'll help work out the best way forward.";

export const process = [
  {
    number: "01",
    title: "Tell me your idea",
    body: "Describe your project and send any helpful photos, drawings, logos or 3D files. A photo of the broken part is plenty to start.",
    duration: TBD,
  },
  {
    number: "02",
    title: "Receive your quote",
    body: "I review the details, make recommendations and give you clear pricing before anything is committed.",
    duration: TBD,
  },
  {
    number: "03",
    title: "Approve the plan",
    body: "For custom designs, you approve the important details — size, color, material, finish — before production starts.",
    duration: TBD,
  },
  {
    /**
     * The trust step. Publishing "you see the actual print before you pay the
     * balance" as a named stage is the mechanic that closes the credibility
     * gap against a bureau with a warehouse.
     */
    number: "04",
    title: "See it before you pay the balance",
    body: "I send photos of your actual finished print. You approve it, then settle the balance — not before.",
    duration: TBD,
  },
  {
    number: "05",
    title: "Delivered",
    body: "Inspected by hand, packaged, and ready for local pickup or shipping nationwide.",
    duration: TBD,
  },
] as const satisfies readonly ProcessStep[];

/**
 * "No prices" must not become "no pricing information". Silence on cost is the
 * most common reason a service-site visitor leaves without enquiring, and
 * every commission craftsman worth studying publishes a range.
 *
 * Kirk sets these bands. They ship as TBD until she does.
 */
export const pricing = {
  headline: "What it costs",
  body: "Every piece is quoted individually, because the same shape can differ five-fold depending on size, material and color count. Tell me what you have in mind and you get a clear number before anything is committed.",
  /**
   * Shown in place of a starting figure until Kirk sets one. It is not a
   * placeholder: it is the truthful answer, and it reads as a policy rather
   * than as a missing value.
   */
  unsetNote: "Quoted per project",
  bands: [
    { label: "Small custom print", from: TBD, note: "A single piece from an existing model" },
    { label: "HueForge photo art", from: TBD, note: "Framed, from your photograph" },
    { label: "Custom design work", from: TBD, note: "Modelled from scratch to your spec" },
    { label: "Private lesson", from: TBD, note: "One-on-one, in the Helena studio" },
  ] satisfies PriceBand[],
  drivers: {
    headline: "Four things move the price",
    items: [
      "Print time — hours on the machine, driven by size and detail",
      "Material — how much filament, and which one the job needs",
      "Color count — each additional color adds swaps, waste and time",
      "Design time — whether a printable file exists, or I model it first",
    ],
  },
  /**
   * The two-tier framing is standard for commission fabrication and prevents
   * the awkward conversation about file ownership happening after the invoice.
   */
  fileOwnership: {
    headline: "Two ways to buy design work",
    options: [
      {
        name: "Design to Print",
        body: "Lower rate. I design it, print it, and keep the working file.",
      },
      {
        name: "Design to Keep",
        body: "Higher rate. You receive a print-ready file you can take anywhere.",
      },
    ],
  },
} as const;

/**
 * THE STACK — the signature moment.
 *
 * A finished HueForge photographed flat is indistinguishable from a poster,
 * which actively undersells it. The astonishing part is the mechanism: the
 * entire image is a couple of millimetres of stacked plastic, and the color
 * comes from light passing THROUGH the layers rather than pigment sitting on
 * top of them.
 *
 * Every number below must be Kirk's real number for this real piece. Shipping
 * an invented spec inside the most technical, most credibility-dependent
 * element on the site would be a worse version of the mistake this rebuild is
 * fixing. They stay TBD until she reads them off the project file.
 */
export const stack = {
  eyebrow: "How a HueForge is made",
  headline: "A photograph, taken apart.",
  body: "This is not printed ink. It is a photograph rebuilt as a physical object, one layer of colored plastic at a time — and the color you see is light passing through those layers, the way a painter builds a tone in translucent glazes.",
  piece: {
    name: "Low N Slow",
    subject: "1982 Chevrolet C10",
  },
  counters: [
    { label: "Layers", value: TBD },
    { label: "Thickness", value: TBD },
    { label: "Filaments", value: TBD },
    { label: "Color swaps", value: TBD },
    { label: "Print time", value: TBD },
  ],
  phases: [
    { id: "photograph", label: "The photograph", caption: "Where it starts: an ordinary picture." },
    { id: "explode", label: "The layers", caption: "Each plane is one filament's contribution to the image." },
    { id: "light", label: "The light", caption: "Color comes from light transmitted through the stack, not printed on it." },
    { id: "object", label: "The object", caption: "Lit from four angles. The relief is real — you can feel it." },
  ],
} as const;

export const lessons = {
  eyebrow: "Private lessons",
  headline: "The person teaching other people to do this is the person doing yours.",
  body: "One-on-one instruction in the Helena studio, on the actual machines — printers, slicing, materials, Bambu Studio and HueForge. You leave able to run a print start to finish on your own.",
} as const;

/**
 * The contact headline, as a big / tiny / big stack.
 *
 * The tiny middle line is a grammatical hinge, so the three elements read as
 * one sentence — which is also what makes a three-part heading accessible
 * with no ARIA at all. The second big line is deliberately longer than the
 * first so the stack widens as it goes.
 *
 * This states the site's strategic core at the moment it matters. Every large
 * bureau — Xometry, Protolabs, Shapeways, Craftcloud, Slant3D — gates its
 * funnel behind a CAD upload. Not one offers a path for a visitor holding a
 * photo of a broken part, and that visitor is Kirk's entire market. The claim
 * used to live in a 17px aside; it belongs at 132px.
 */
export const quoteSection = {
  eyebrow: "Let's start there",
  headline: {
    lead: "All it takes",
    hinge: "to start is",
    /** The middle fragment gets the hollow red stroke — one word, not the line. */
    tail: ["A ", "photo", " and a sentence"],
  },
  body: reassurance,
} as const;
