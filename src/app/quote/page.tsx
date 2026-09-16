import type { Metadata } from "next";
import { quoteSection } from "@/content/home";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { ContactHeadline, DirectRoutes } from "@/design/ContactHead";
import { Container } from "@/design/Section";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell Kirk what you have in mind and get a clear price. No 3D file needed — a photo is enough. Custom 3D printing in Helena, Alabama.",
  alternates: { canonical: "/quote/" },
};

/**
 * One centred column, contents left-aligned inside it.
 *
 * The two-column layout this replaces existed for a good reason — people who
 * would rather call should not have to scroll past a form to find the number.
 * Putting the direct routes ABOVE the form solves that better than a sidebar
 * does: they are higher in reading order at every viewport, and on mobile the
 * grid collapsed anyway, so the sidebar bought nothing.
 */
export default function QuotePage() {
  return (
    <div className="py-16 lg:py-24">
      <Container>
        <p className="mono-wide text-ink-icon text-center">{quoteSection.eyebrow}</p>

        {/* rise={false}: this is the page's LCP element, and an element inside
            an overflow-clip mask is disqualified from LCP entirely. It paints
            finished from static HTML, exactly as the hero does. */}
        <ContactHeadline as="h1" rise={false} className="mt-8" />

        <p className="text-deck text-ink-muted mx-auto mt-10 max-w-2xl text-center text-pretty">
          {quoteSection.body}
        </p>

        <DirectRoutes className="mx-auto mt-14 max-w-4xl" />

        <div className="mx-auto mt-20 w-full max-w-[46rem]">
          <QuoteForm />
        </div>
      </Container>
    </div>
  );
}
