import type { MetadataRoute } from "next";
import { business } from "@/content/business";

// Required under `output: "export"` — Next needs to know this route is
// statically generated rather than dynamic.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The confirmation page is per-visitor and carries no search value.
      disallow: "/quote/thanks/",
    },
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
