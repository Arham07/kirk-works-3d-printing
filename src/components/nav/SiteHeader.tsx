import { business, telHref } from "@/content/business";
import { LinkButton } from "@/design/Button";
import { LogoLockup } from "@/design/Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/design/icons";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#machines", label: "Machines" },
  { href: "/#materials", label: "Materials" },
  { href: "/#process", label: "Process" },
];

/**
 * A Server Component. The mobile menu uses the native Popover API, which gives
 * light-dismiss, Escape-to-close, top-layer stacking and focus management for
 * free — no useState, no hydration, no client boundary. The old site made its
 * entire 424-line page a client component to toggle a five-link menu.
 */
export function SiteHeader() {
  return (
    <header className="bg-surface-0/92 hairline fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="page-gutter mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4">
        <a href="/" aria-label={`${business.name} home`} className="shrink-0">
          <LogoLockup />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink-muted hover:text-ink text-[0.9375rem] transition-colors duration-250"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* The phone number is visible text on desktop, not hidden behind an
              icon. Someone who just met Kirk is looking for exactly this. */}
          <a
            href={telHref}
            className="text-ink hover:text-alert hidden items-center gap-2 text-[0.9375rem] font-medium transition-colors duration-250 md:flex"
          >
            <PhoneIcon width={16} height={16} />
            {business.phoneDisplay}
          </a>
          <LinkButton href="/quote/" className="hidden px-5 py-2.5 sm:inline-flex">
            Get a quote
          </LinkButton>

          <button
            popoverTarget="mobile-nav"
            aria-label="Open menu"
            className="hairline text-ink flex size-11 items-center justify-center rounded-control border lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        popover="auto"
        className="bg-surface-1 text-ink m-0 h-full max-h-none w-full max-w-none border-0 p-0 backdrop:bg-black/70"
      >
        <div className="page-gutter flex h-16 items-center justify-between">
          <LogoLockup />
          <button
            popoverTarget="mobile-nav"
            popoverTargetAction="hide"
            aria-label="Close menu"
            className="hairline text-ink flex size-11 items-center justify-center rounded-control border"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile" className="page-gutter flex flex-col pt-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hairline font-display border-b py-5 text-3xl uppercase"
            >
              {item.label}
            </a>
          ))}
          <a
            href={telHref}
            className="text-alert mt-8 flex items-center gap-3 text-xl font-medium"
          >
            <PhoneIcon />
            {business.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
