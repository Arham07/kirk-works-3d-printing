/**
 * THE global colour grade. One function, one place to tune.
 *
 * Every usable photograph on this site is a handheld iPhone snapshot taken in
 * the same beige-carpeted room under mixed window light. Individually they are
 * fine; side by side they read as a pile of phone pictures because the white
 * balance and contrast wander. One identical grade across all of them is what
 * makes them look like a set.
 *
 * Baked into the exported file rather than applied as a CSS filter: a runtime
 * filter on a large image is a real compositing cost on exactly the mid-range
 * Android that scans a QR code, and it cannot be tuned per photograph.
 */
export function applyGrade(pipeline) {
  return (
    pipeline
      // Barely pull back the phone camera's default oversaturation — just
      // enough to stop the set looking oversold.
      //
      // NOT sharp's .tint(): despite the name it replaces the image's chroma
      // rather than warming it, so it greyscales the photograph. On a site
      // whose most distinctive service is about colour accuracy, and whose
      // best asset is a multicolour print, that is self-defeating. Warmth
      // comes from the surrounding surface tokens instead.
      .modulate({ saturation: 0.95 })
      // Gentle contrast lift, and pull the blacks toward the page background
      // so contained images sit in the surface rather than glowing off it.
      .linear(1.05, -6)
  );
}

/** Bump when the grade changes so cached derivatives are regenerated. */
export const GRADE_VERSION = 2;
