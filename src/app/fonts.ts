import localFont from "next/font/local";

/**
 * Self-hosted rather than loaded from the Google CDN: first paint on cellular
 * is the most important moment on this site, and a cross-origin round trip
 * before any text renders is the wrong trade.
 *
 * next/font/local (not hand-rolled @font-face) because it generates
 * metric-adjusted fallback faces — size-adjust plus ascent/descent overrides
 * computed by reading the woff2 — which is the single largest CLS reduction
 * available here, and because it emits preload links with crossorigin set
 * correctly. Getting that wrong causes a silent double-download.
 *
 * All three families are free for commercial use: Sofia Sans Condensed and
 * IBM Plex Mono under SIL OFL, Switzer under the Fontshare licence.
 */

/** The display face. One variable file covers the whole weight range. */
export const display = localFont({
  src: "./fonts/SofiaSansCondensed-Variable.woff2",
  weight: "600 700",
  variable: "--font-display-face",
  display: "swap",
  preload: true,
  fallback: ["Arial Narrow", "Helvetica Neue", "Helvetica", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const body = localFont({
  src: [
    { path: "./fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body-face",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
});

/**
 * Mono only ever appears on spec labels, all of which are below the fold.
 * preload: false keeps it off the critical path.
 */
export const mono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-mono-face",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
