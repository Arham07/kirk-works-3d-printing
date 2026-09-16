import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // This site navigates as an MPA on purpose: plain <a href> everywhere,
      // every route a fresh document. It is a small static export, so the
      // pages are tiny and edge-cached, and in exchange the scroll layer never
      // has to reason about lifecycle — no stale ScrollTriggers pointing at
      // unmounted DOM, no Lenis rebinding, no scroll-restoration fights on
      // client transitions. Revisit if the site ever grows app-like state.
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-location-assign-relative-destination": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
