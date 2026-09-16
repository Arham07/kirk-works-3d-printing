import type { Service } from "./types";

/**
 * Kirk's own service descriptions, kept close to verbatim — they are specific,
 * warm and credible, which is more than most agency copy manages.
 *
 * These are TEASERS. The full version of each lives on its own route. No
 * paragraph may appear on two URLs, or the pages compete and Google picks the
 * wrong one.
 */
export const services = [
  {
    id: "custom",
    slug: "custom-3d-printing",
    title: "Custom 3D Printing",
    teaser:
      "Personalized gifts, functional parts, displays, signs, prototypes and one-of-a-kind creations.",
  },
  {
    id: "hueforge",
    slug: "hueforge-photo-art",
    title: "HueForge Photo Art",
    teaser:
      "Transform a favorite photograph into remarkable layered artwork with color, depth and texture.",
  },
  {
    id: "lessons",
    slug: "3d-printing-lessons",
    title: "Private 3D Printing Lessons",
    teaser:
      "Friendly, personalized instruction covering printers, slicing, materials, Bambu Studio and HueForge.",
  },
  {
    id: "corporate",
    slug: "corporate-3d-printing",
    title: "Corporate & Custom Projects",
    teaser:
      "Branded products, awards, prototypes, presentation models and custom production for organizations.",
  },
] as const satisfies readonly Service[];

/**
 * Capability categories are deliberately organised by USE CASE, not by object.
 * A visitor needs to recognise their own need in a category Kirk may never
 * have literally printed before.
 */
export const capabilities = [
  {
    id: "gifts",
    name: "Personalized gifts",
    body: "Something made for one person, that cannot be bought anywhere.",
    service: "custom-3d-printing",
  },
  {
    id: "repairs",
    name: "Functional parts & repairs",
    body: "The bracket, knob or clip that broke and is no longer sold. Send a photo.",
    service: "custom-3d-printing",
  },
  {
    id: "displays",
    name: "Displays & signs",
    body: "Stands, plaques, lettering and shelf pieces built around what you care about.",
    service: "custom-3d-printing",
  },
  {
    id: "prototypes",
    name: "Prototypes",
    body: "A physical version of the thing you are trying to explain to someone.",
    service: "corporate-3d-printing",
  },
  {
    id: "awards",
    name: "Awards & corporate",
    body: "Branded pieces, recognition awards and presentation models, in quantity.",
    service: "corporate-3d-printing",
  },
  {
    id: "photoart",
    name: "Photo art",
    body: "A photograph rebuilt as a physical object in layers of colored filament.",
    service: "hueforge-photo-art",
  },
] as const;
