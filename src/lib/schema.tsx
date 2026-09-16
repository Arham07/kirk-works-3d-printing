import { business } from "@/content/business";
import { isTbd } from "@/content/types";

/**
 * LocalBusiness structured data. For a service business without a public
 * storefront this is one of the few levers that meaningfully affects local
 * discovery, alongside the Google Business Profile itself.
 *
 * areaServed and openingHours are omitted while unconfirmed rather than
 * guessed — wrong structured data is worse than absent structured data,
 * because it can contradict the Business Profile.
 */
export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${business.siteUrl}/#business`,
    name: business.legalName,
    description:
      "Owner-operated custom 3D printing studio in Helena, Alabama. Custom prints, HueForge photo art, private lessons and corporate projects. Ships nationwide.",
    url: business.siteUrl,
    telephone: business.phoneE164,
    email: business.email,
    founder: { "@type": "Person", name: business.owner },
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.stateCode,
      addressCountry: business.country,
    },
    knowsAbout: [
      "3D printing",
      "FDM printing",
      "HueForge photo art",
      "Multicolor 3D printing",
      "Rapid prototyping",
    ],
  };

  if (!isTbd(business.hours)) schema.openingHours = business.hours;
  if (!isTbd(business.serviceArea)) schema.areaServed = business.serviceArea;

  const sameAs = [business.social.facebook, business.social.instagram].filter(
    (url): url is string => !isTbd(url),
  );
  if (sameAs.length) schema.sameAs = sameAs;

  return schema;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered from our own typed content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
