import { business, smsHref, telHref } from "@/content/business";
import { MessageIcon, PhoneIcon } from "@/design/icons";

/**
 * The primary conversion path on mobile, and the reason it exists: a large
 * share of this site's traffic arrives by scanning the QR code on a business
 * card Kirk just handed over. That visitor is holding a phone and often a
 * broken part. They want to send a photo, not complete a form.
 *
 * Coarse pointers only, so it never appears on desktop. Server Component.
 */
export function CallBar() {
  return (
    <div
      className="bg-surface-1/95 hairline fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t backdrop-blur-md [@media(pointer:fine)]:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={telHref}
        className="hairline text-ink flex min-h-14 items-center justify-center gap-2.5 border-r text-[0.9375rem] font-medium"
      >
        <PhoneIcon width={18} height={18} />
        Call Kirk
      </a>
      <a
        href={smsHref(`Hi Kirk, I'd like a quote for: `)}
        className="bg-alert flex min-h-14 items-center justify-center gap-2.5 text-[0.9375rem] font-medium text-white"
      >
        <MessageIcon width={18} height={18} />
        Text a photo
      </a>
      <span className="sr-only">{business.phoneDisplay}</span>
    </div>
  );
}
