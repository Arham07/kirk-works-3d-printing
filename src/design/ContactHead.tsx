import { business, mailtoHref, smsHref, telHref } from "@/content/business";
import { quoteSection } from "@/content/home";
import { cn } from "@/lib/cn";
import { MailIcon, MessageIcon, PhoneIcon } from "@/design/icons";

/**
 * Shared between /quote and the home page's closing section. This markup was
 * duplicated across both files before, and duplicated markup for the same
 * idea drifts within about two commits.
 */

export function ContactHeadline({
  as: Tag = "h2",
  rise = true,
  className,
}: {
  as?: "h1" | "h2";
  /**
   * /quote passes false: the headline is that page's LCP element, and an
   * element inside an overflow-clip mask is disqualified from LCP entirely.
   * The home page's copy is eleven sections down, so it can animate.
   */
  rise?: boolean;
  className?: string;
}) {
  const { lead, hinge, tail } = quoteSection.headline;
  const [before, highlight, after] = tail;

  return (
    <Tag
      className={cn("font-display text-ink text-center uppercase", className)}
      {...(rise ? { "data-rise-mask": "" } : {})}
    >
      <span className="text-display-1 block" {...(rise ? { "data-rise": "" } : {})}>
        {lead}
      </span>
      {/* The hinge. Tiny and widely tracked against the two big lines — the
          contrast between them is the whole device. */}
      <span className="mono-wide text-ink-muted my-4 block tracking-[0.34em] lg:my-6">
        {hinge}
      </span>
      <span className="text-display-1 block" {...(rise ? { "data-rise": "" } : {})}>
        {before}
        {/* One hollow word at the climax, not the whole line. Red stays
            rationed and the emphasis lands where the argument is. */}
        <span className="text-outline-alert">{highlight}</span>
        {after}
      </span>
    </Tag>
  );
}

const routes = [
  { label: "Call", value: business.phoneDisplay, href: telHref, Icon: PhoneIcon },
  {
    label: "Text a photo",
    value: "Fastest way",
    href: smsHref("Hi Kirk, I'd like a quote for: "),
    Icon: MessageIcon,
  },
  { label: "Email", value: business.email, href: mailtoHref("Quote request"), Icon: MailIcon },
];

/**
 * The direct routes, at label size rather than display size. The footer
 * already carries the loud phone number a screen below; two of those shouting
 * at each other is not emphasis, it is noise.
 *
 * Placed ABOVE the form on /quote. Plenty of people would rather just call,
 * and making them scroll past a form to find the number is a self-inflicted
 * wound — solved better by reading order than by a sidebar.
 */
export function DirectRoutes({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "hairline grid border-t sm:grid-cols-3 sm:border-b",
        className,
      )}
    >
      {routes.map(({ label, value, href, Icon }) => (
        <li key={label} className="hairline border-b sm:border-r sm:border-b-0 sm:last:border-r-0">
          <a
            href={href}
            className="group hover:bg-surface-1 flex min-h-16 items-center gap-4 px-1 py-4 transition-colors duration-250 sm:justify-center sm:px-4"
          >
            <Icon width={17} height={17} className="text-ink-icon shrink-0" />
            <span className="flex flex-col gap-1">
              <span className="mono-wide text-ink-icon">{label}</span>
              <span className="text-ink text-[0.9375rem]">
                <span className="link-rule">{value}</span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
