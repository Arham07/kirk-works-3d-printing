import { TBD, type Machine } from "./types";

/**
 * The three-machine comparison grid is the highest-credibility-per-byte asset
 * on the site, and no small shop in the competitive scan publishes one. It
 * also answers the single most common pre-quote question — "how big can you
 * print?" — without a photograph.
 *
 * Machine NAMES come from Kirk's own copy and are confirmed. The SPECS are
 * TBD on purpose: published figures for these models disagree with each other,
 * and a wrong number inside the section whose entire job is precision would
 * undo the credibility it is there to build. Kirk reads them off the machines.
 */
export const machines = [
  {
    id: "h2c",
    name: "Bambu Lab H2C",
    buildVolume: TBD,
    nozzles: TBD,
    amsSlots: TBD,
    layerRange: TBD,
    bestFor: "Multicolor work and photo art, where color swaps run into the hundreds.",
    materials: TBD,
  },
  {
    id: "h2d",
    name: "Bambu Lab H2D",
    buildVolume: TBD,
    nozzles: TBD,
    amsSlots: TBD,
    layerRange: TBD,
    bestFor: "Dual-material prints and parts that need soluble or contrasting supports.",
    materials: TBD,
  },
  {
    id: "k2plus",
    name: "Creality K2 Plus",
    buildVolume: TBD,
    nozzles: TBD,
    amsSlots: TBD,
    layerRange: TBD,
    bestFor: "The large-format jobs — tall displays and single pieces that will not fit elsewhere.",
    materials: TBD,
  },
] as const satisfies readonly Machine[];

/**
 * The build-volume answer, in the words a non-technical visitor needs. The
 * drawing beside it puts a basketball inside the envelope at true scale.
 */
export const buildVolumeCopy = {
  headline: "How big can you print?",
  body:
    "Bigger than most people expect, and bigger than the printer if we plan for it. " +
    "Anything past the build envelope gets printed in sections and bonded — so size " +
    "is a cost-and-seam question, not a no.",
  seamNote:
    "On a sectioned piece I will tell you where the seam lands before you approve anything.",
} as const;
