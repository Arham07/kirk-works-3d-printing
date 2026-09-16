import type { Metadata } from "next";
import { business, mailtoHref, smsHref, telHref } from "@/content/business";
import { quoteSection } from "@/content/home";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { Container } from "@/design/Section";
import { MailIcon, MessageIcon, PhoneIcon } from "@/design/icons";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell Kirk what you have in mind and get a clear price. No 3D file needed — a photo is enough. Custom 3D printing in Helena, Alabama.",
  alternates: { canonical: "/quote/" },
};

export default function QuotePage() {
  return (
    <div className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="mono-label">{quoteSection.eyebrow}</p>
            <h1 className="font-display text-display-2 text-ink mt-5 uppercase text-balance">
              {quoteSection.headline[0]}
              <br />
              <span className="text-outline-alert">{quoteSection.headline[1]}</span>
            </h1>
            <p className="text-deck text-ink-muted mt-7 text-pretty">
              {quoteSection.body}
            </p>

            <p className="border-alert text-ink mt-8 border-l-2 pl-5 text-pretty">
              {quoteSection.photoFirst}
            </p>

            {/*
              The direct routes sit beside the form, not beneath it. Plenty of
              people would rather just call — making them scroll past a form to
              find the number is a self-inflicted wound.
            */}
            <div className="hairline mt-10 space-y-1 border-t pt-8">
              <p className="mono-label mb-4">Or reach her directly</p>
              <a
                href={telHref}
                className="text-ink hover:text-alert flex items-center gap-3 py-2 text-lg font-medium transition-colors duration-250"
              >
                <PhoneIcon width={18} height={18} />
                {business.phoneDisplay}
              </a>
              <a
                href={smsHref("Hi Kirk, I'd like a quote for: ")}
                className="text-ink-muted hover:text-ink flex items-center gap-3 py-2 transition-colors duration-250"
              >
                <MessageIcon width={18} height={18} />
                Text a photo
              </a>
              <a
                href={mailtoHref("Quote request")}
                className="text-ink-muted hover:text-ink flex items-center gap-3 py-2 transition-colors duration-250"
              >
                <MailIcon width={18} height={18} />
                {business.email}
              </a>
            </div>
          </div>

          <div className="bg-surface-1 hairline rounded-media border p-6 sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
