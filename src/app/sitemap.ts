import type { MetadataRoute } from "next";
import { business } from "@/content/business";

// Required under `output: "export"` — Next needs to know this route is
// statically generated rather than dynamic.
export const dynamic = "force-static";

/** Emitted as a static file under `output: "export"`. */
export default function sitemap(): MetadataRoute.Sitemap {
  // Only routes that actually exist. The four service routes get added here
  // as they ship — submitting a sitemap full of 404s is worse than a short one.
  const routes = ["", "/quote"];

  return routes.map((route) => ({
    url: `${business.siteUrl}${route}/`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
