"use client";

import { useSyncExternalStore } from "react";

/**
 * Dark is the brand default: Kirk's printed business card is near-black, and
 * the QR visitor is often holding it while the page loads. The toggle exists
 * because the reference this design borrows from is light, and the two are
 * worth comparing on a real screen before committing to one.
 *
 * The source of truth is <html data-theme>, written by an inline script in
 * the head BEFORE first paint (see layout.tsx). This component subscribes to
 * that attribute rather than mirroring it into state — owning the initial
 * value here would mean a flash of the wrong theme on every load.
 *
 * Dark is represented by the ABSENCE of the attribute, so there is exactly
 * one way to express the default.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/** The server has no DOM; it renders the default. */
const getServerSnapshot = () => "dark" as const;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const next = theme === "light" ? "dark" : "light";

  const toggle = () => {
    if (next === "light") {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("kw3d:theme", next);
    } catch {
      // Private mode. The choice simply will not persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="hairline text-ink-muted hover:text-ink hover:border-line-strong flex size-11 items-center justify-center rounded-control border transition-colors duration-250"
    >
      {/* One glyph that reads as both states: a circle, half filled. No icon
          swap, so nothing shifts or flickers when the theme changes. */}
      <svg
        viewBox="0 0 24 24"
        width={17}
        height={17}
        aria-hidden
        focusable="false"
        className="transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{ transform: theme === "light" ? "rotate(180deg)" : undefined }}
      >
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth={1.25} />
        <path d="M12 4.5a7.5 7.5 0 0 0 0 15Z" fill="currentColor" />
      </svg>
    </button>
  );
}
