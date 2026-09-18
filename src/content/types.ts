/**
 * The credibility of this whole site rests on every published number being
 * Kirk's real number. TBD is the escape hatch: a value we know we need but
 * have not had confirmed yet. It renders as a visible placeholder rather than
 * a plausible-looking guess, and `npm run check:tbd` fails the build if one
 * reaches a production bundle.
 */
export const TBD = "__TBD__" as const;
export type Tbd = typeof TBD;

/** A value that must be confirmed by Kirk before it can ship. */
export type Confirmed<T> = T | Tbd;

export function isTbd<T>(value: Confirmed<T>): value is Tbd {
  return value === TBD;
}

/** One row of the mono spec strip that hangs off every image and card. */
export type Spec = {
  /** Short label, sentence case, e.g. "Layer height". */
  label: string;
  /** The measured value, e.g. "0.08mm". TBD until Kirk confirms it. */
  value: Confirmed<string>;
};

export type Photo = {
  /** Slug into the generated media manifest. */
  slug: string;
  /** Descriptive alt text. The old site's alt text was unusually good; reuse it. */
  alt: string;
};

export type Piece = {
  id: string;
  /** Revision-style part number, e.g. "KW-0247". */
  partNumber: string;
  name: string;
  /** One line under the name. */
  caption: string;
  photo: Photo;
  specs: Spec[];
  /** Technique and machine chips. */
  chips: string[];
  /**
   * True only for pieces Kirk actually made for a client. Demonstration prints
   * carry an amber chip so nothing on the page implies commissioned work that
   * does not exist.
   */
  clientWork: boolean;
};

export type CaseStudy = Piece & {
  /** What the client asked for. */
  ask: string;
  /** The constraint that made it hard. This is the part that reads as expertise. */
  constraint: string;
  /** The decision Kirk made, and why. The teaching content. Never collapsed. */
  decision: string;
  /** What shipped. */
  result: string;
};

export type Machine = {
  id: string;
  name: string;
  buildVolume: Confirmed<string>;
  nozzles: Confirmed<string>;
  amsSlots: Confirmed<string>;
  layerRange: Confirmed<string>;
  bestFor: string;
  materials: Confirmed<string>;
};

export type Material = {
  id: string;
  name: string;
  goodFor: string;
  /** Glass transition / max service temperature. The number that matters. */
  maxTemp: string;
  outdoors: string;
  feel: string;
};

export type Service = {
  id: string;
  /** Route segment, e.g. "hueforge-photo-art". */
  slug: string;
  title: string;
  /** Teaser shown on the home page. The full version lives on the route. */
  teaser: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
  /** How long this stage typically takes. */
  duration: Confirmed<string>;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type PriceBand = {
  label: string;
  from: Confirmed<string>;
  note: string;
};
