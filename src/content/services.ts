import type { Service } from "./types";

/**
 * Kirk's own service descriptions, kept close to verbatim — they are specific,
 * warm and credible, which is more than most agency copy manages.
 *
 * These are TEASERS. The full version of each lives on its own route. No
 * paragraph may appear on two URLs, or the pages compete and Google picks the
 * wrong one.
 */
/**
 * Revenue order, not alphabetical and not the order they were written. This
 * array drives the services index, the footer rail and the sitemap, so the
 * first row is the one that gets the most attention on the page.
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
    id: "corporate",
    slug: "corporate-3d-printing",
    title: "Corporate & Custom Projects",
    teaser:
      "Branded products, awards, prototypes, presentation models and custom production for organizations.",
  },
  {
    id: "lessons",
    slug: "3d-printing-lessons",
    title: "Private 3D Printing Lessons",
    teaser:
      "Friendly, personalized instruction covering printers, slicing, materials, Bambu Studio and HueForge.",
  },
] as const satisfies readonly Service[];

/**
 * `capabilities` used to live here — six use-case cards on the home page.
 * Deleted, for two reasons. Every one of the six strings was already said at
 * greater length in the `covers` array of the route it pointed at, and the
 * six cards between them linked to only three of the four routes, omitting
 * /3d-printing-lessons/ entirely. The services index replaces them.
 */

/**
 * Everything the services index needs, derived from data that already exists.
 * No new prose: the eyebrow and cover labels come from each route's own
 * content module, and the part numbers come from the pieces those routes
 * already reference.
 *
 * Only `covers[].name` crosses a URL boundary, and those are two-to-four-word
 * labels rather than sentences, so the no-duplicate-copy rule still holds.
 */
export type ServiceIndexEntry = Service & {
  eyebrow: string;
  covers: readonly string[];
  partNumbers: readonly string[];
  /** Row 04 only — the best sentence in the content directory. */
  pull?: string;
};

