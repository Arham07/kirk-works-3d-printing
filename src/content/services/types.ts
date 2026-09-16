import type { FaqItem } from "../types";

/**
 * A service route's full content.
 *
 * Every string here must be unique to this route. The home page carries only a
 * one-line teaser for each service — if the same paragraph appears on two URLs
 * the pages compete for the same query and Google picks the wrong one, which
 * for a local business usually means the weaker page wins.
 */
export type ServicePage = {
  slug: string;
  /** Page <title>. Carries the service AND the geography. */
  title: string;
  metaDescription: string;
  /** The visible H1. Shorter and more human than the title. */
  h1: string[];
  eyebrow: string;
  /** Two or three paragraphs. First-person, in Kirk's voice. */
  intro: string[];
  /** "What this covers" — concrete, scannable. */
  covers: { name: string; body: string }[];
  /** The part that demonstrates expertise rather than listing features. */
  insight: { headline: string; body: string; quote?: string };
  /** Piece ids from content/pieces.ts to show on this route. */
  pieceIds: string[];
  /** Questions specific to this service, not repeated from the general FAQ. */
  faq: FaqItem[];
  /** What the quote form should be pre-seeded with from this page. */
  ctaLabel: string;
};
