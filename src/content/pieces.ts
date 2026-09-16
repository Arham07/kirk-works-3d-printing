import { TBD, type Piece } from "./types";

/**
 * Real pieces Kirk has printed. Alt text is carried over from his own site
 * almost unchanged — it was unusually descriptive and did not need rewriting.
 *
 * Every spec is TBD until Kirk reads it off the project file. That is the
 * whole credibility mechanism: the site's claim is that this work is
 * measurable, so an invented layer count here would do more damage than a
 * blank one.
 *
 * `clientWork: false` marks a piece Kirk made for himself. It renders an amber
 * DEMONSTRATION chip so nothing on the page implies a commission that did not
 * happen.
 */
export const pieces = [
  {
    id: "red-bull-wheel",
    partNumber: "KW-0118",
    name: "Red Bull Racing steering wheel",
    caption: "Full-size replica — multicolour, printed in one piece per section",
    photo: {
      slug: "personalized-red-bull-display",
      alt: "Custom Red Bull Racing steering wheel display printed by KirkWorks3D",
    },
    specs: [
      { label: "Colours", value: TBD },
      { label: "Print time", value: TBD },
      { label: "Layer height", value: TBD },
      { label: "Material", value: TBD },
    ],
    chips: ["Multicolour", "Display piece"],
    clientWork: false,
  },
  {
    id: "low-n-slow",
    partNumber: "KW-0247",
    name: "Low N Slow — 1982 Chevrolet C10",
    caption: "A photograph rebuilt in layers of filament, then framed",
    photo: {
      slug: "real-low-n-slow",
      alt: "Real Low N Slow automotive HueForge art print by KirkWorks3D",
    },
    specs: [
      { label: "Filaments", value: TBD },
      { label: "Layers", value: TBD },
      { label: "Thickness", value: TBD },
      { label: "Colour swaps", value: TBD },
    ],
    chips: ["HueForge", "Photo art"],
    clientWork: false,
  },
  {
    id: "articulated-figure",
    partNumber: "KW-0203",
    name: "Print-in-place articulated figure",
    caption: "Every joint moves straight off the plate — no assembly",
    photo: {
      slug: "articulated-figure",
      alt: "Articulated 3D printed figure with movable joints on a display plinth",
    },
    specs: [
      { label: "Print time", value: TBD },
      { label: "Material", value: TBD },
      { label: "Supports", value: "None" },
    ],
    chips: ["Print-in-place", "Functional"],
    clientWork: false,
  },
  {
    id: "f1-calendar",
    partNumber: "KW-0161",
    name: "Formula One track calendar",
    caption: "Every circuit of the season, in relief",
    photo: {
      slug: "f1-calendar",
      alt: "2026 Formula One track calendar printed in multiple colours",
    },
    specs: [
      { label: "Colours", value: TBD },
      { label: "Print time", value: TBD },
    ],
    chips: ["Multicolour", "Display piece"],
    clientWork: false,
  },
  {
    id: "functional-containers",
    partNumber: "KW-0092",
    name: "Threaded storage containers",
    caption: "Lids that actually thread — printed, not machined",
    photo: {
      slug: "functional-containers",
      alt: "Functional 3D printed containers and accessories in multiple colours",
    },
    specs: [
      { label: "Material", value: TBD },
      { label: "Tolerance", value: TBD },
    ],
    chips: ["Functional", "Threaded"],
    clientWork: false,
  },
  {
    id: "helmet",
    partNumber: "KW-0134",
    name: "Black Panther helmet",
    caption: "Large-format cosplay piece, printed in sections and bonded",
    photo: {
      slug: "black-panther-helmet",
      alt: "Black and grey 3D printed Black Panther helmet showing layer detail",
    },
    specs: [
      { label: "Sections", value: TBD },
      { label: "Print time", value: TBD },
      { label: "Finish", value: TBD },
    ],
    chips: ["Large format", "Cosplay"],
    clientWork: false,
  },
] as const satisfies readonly Piece[];

/** The one that opens the page. The most impressive object in the library. */
export const featuredPiece = pieces[0];
