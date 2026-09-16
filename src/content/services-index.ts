import { pieces } from "./pieces";
import { services, type ServiceIndexEntry } from "./services";
import { corporate } from "./services/corporate";
import { custom } from "./services/custom";
import { hueforge } from "./services/hueforge";
import { lessons } from "./services/lessons";

const PAGES = { custom, hueforge, corporate, lessons } as const;

/**
 * Derived, never authored. Everything here already exists somewhere else in
 * the content directory — this file only assembles it for the index, so there
 * is exactly one place to edit a service name or a cover label.
 */
export const servicesIndex: readonly ServiceIndexEntry[] = services.map((service) => {
  const page = PAGES[service.id];
  return {
    ...service,
    eyebrow: page.eyebrow,
    covers: page.covers.map((cover) => cover.name),
    // The evidence line: real part numbers of real pieces. Costs nothing,
    // invents nothing, and applies the site's spec-strip thesis to navigation.
    // No explicit type predicate: the piece ids are literal unions, so a
    // `x is string` guard is wider than the value being narrowed. TS infers
    // the narrowing from the !== check on its own.
    partNumbers: page.pieceIds
      .map((id) => pieces.find((piece) => piece.id === id)?.partNumber)
      .filter((partNumber) => partNumber !== undefined),
    // Preserves the strongest single line in the content directory, which
    // would otherwise have died with the deleted Lessons section.
    pull: service.id === "lessons" ? lessons.h1.join(" ") : undefined,
  };
});
