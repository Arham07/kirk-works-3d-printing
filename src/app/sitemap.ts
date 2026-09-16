import type { MetadataRoute } from "next";
import { business } from "@/content/business";

// Required under `output: "export"` — Next needs to know this route is
// statically generated rather than dynamic.
export const dynamic = "force-static";

/** Emitted as a static file under `output: "export"`. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/quote",
    "/custom-3d-printing",
    "/hueforge-photo-art",
    "/3d-printing-lessons",
    "/corporate-3d-printing",
  ];

  return routes.map((route) => ({
    url: `${business.siteUrl}${route}/`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.8,
  }));
}
