import type { NextConfig } from "next";

// Static export keeps hosting undecided: `out/` deploys to Vercel, Netlify,
// Cloudflare Pages or S3 with no adapter. It is also a guardrail — reaching for
// a route handler fails the build instead of silently binding us to one host.
// Reversible in one line once the form backend lands.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Emits about-kirk/index.html, which every static host resolves identically.
  trailingSlash: true,
};

export default nextConfig;
