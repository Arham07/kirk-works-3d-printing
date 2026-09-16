import type { Material } from "./types";

/**
 * The section that gets the site sent to a friend, and it needs zero
 * photography. These are published typical properties for FDM filaments, not
 * measurements of Kirk's specific spools — the copy frames them as typical.
 *
 * Which of these Kirk actually stocks is a question for him; the table should
 * only list what he can genuinely print today.
 */
export const materials = [
  {
    id: "pla",
    name: "PLA",
    goodFor: "Display pieces, models, indoor decor, anything detailed",
    maxTemp: "Softens around 60°C / 140°F",
    outdoors: "No — sunlight and heat both get to it",
    feel: "Rigid and crisp, holds fine detail, snaps rather than bends",
  },
  {
    id: "petg",
    name: "PETG",
    goodFor: "Parts that get handled, light-duty functional pieces",
    maxTemp: "Softens around 80°C / 175°F",
    outdoors: "Short stints are fine",
    feel: "Tougher than PLA, slight flex before it gives",
  },
  {
    id: "asa",
    name: "ASA",
    goodFor: "Anything living outside or in a car",
    maxTemp: "Softens around 100°C / 210°F",
    outdoors: "Yes — this is the UV-stable one",
    feel: "Strong, matte, mildly flexible",
  },
  {
    id: "tpu",
    name: "TPU",
    goodFor: "Gaskets, grips, bumpers, anything that needs to squish",
    maxTemp: "Varies by blend",
    outdoors: "Generally fine",
    feel: "Genuinely rubbery — bends and springs back",
  },
] as const satisfies readonly Material[];

/**
 * The unprompted warning, in first person. Volunteering a constraint nobody
 * asked about is the cheapest credibility on the page — it is the thing an
 * expert says and a sales page never does.
 */
export const materialWarning = {
  quote:
    "A PLA part on your dashboard in a Helena July will slump. That is why I would print that one in ASA, even though PLA is cheaper and prints nicer.",
  attribution: "Kirk Edmunds",
} as const;

/**
 * Print orientation is genuinely counterintuitive, takes fifteen seconds to
 * understand, and is pure expertise. It gets a drawing, not a photo.
 */
export const orientationCopy = {
  headline: "Which way a part is printed decides how strong it is",
  body:
    "A printed part is many thin layers fused together. Pull along those layers and " +
    "it is strong. Pull across them and it fails at a layer line, well below what the " +
    "same shape would take in molded plastic. Orientation is the first thing I work " +
    "out on a functional part, before anything else.",
} as const;
