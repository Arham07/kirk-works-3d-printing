import type { SVGProps } from "react";

/**
 * Hand-authored single-stroke glyphs rather than an icon library. A generic
 * icon set would undercut the technical-drawing language and would not share a
 * stroke system with the diagrams — here everything is stroke-width 1.25 on a
 * 24-unit grid, icons and drawings alike.
 */
function Glyph({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M6.5 3.5h4l1.5 4-2.2 1.6a12 12 0 0 0 5.1 5.1l1.6-2.2 4 1.5v4a1.5 1.5 0 0 1-1.6 1.5C10.4 19.9 4.1 13.6 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z" />
  </Glyph>
);

export const MessageIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M20.5 12c0 4-3.8 7.2-8.5 7.2a9.8 9.8 0 0 1-2.7-.4L4 20.5l1.4-3.7A6.9 6.9 0 0 1 3.5 12c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2Z" />
  </Glyph>
);

export const ArrowRightIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Glyph>
);

export const ChevronDownIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="m5 9 7 7 7-7" />
  </Glyph>
);

export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </Glyph>
);

export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </Glyph>
);

export const DownloadIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M12 3.5v11M7.5 10l4.5 4.5L16.5 10M4 19.5h16" />
  </Glyph>
);

export const MailIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M3.5 6.5h17v11h-17z" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </Glyph>
);

export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <Glyph {...p}>
    <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0c0 5 6.5 11 6.5 11Z" />
    <circle cx="12" cy="10" r="2.25" />
  </Glyph>
);
