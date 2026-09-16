import type { Metadata } from "next";
import { QuoteRecovery } from "@/components/quote/QuoteRecovery";
import { Container } from "@/design/Section";

export const metadata: Metadata = {
  title: "Request sent",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div className="py-20 lg:py-28">
      <Container width="narrow">
        <p className="mono-label">Quote request</p>
        <h1 className="font-display text-display-2 text-ink mt-5 uppercase text-balance">
          That&rsquo;s on its way.
        </h1>
        <p className="text-deck text-ink-muted mt-6 text-pretty">
          Your messaging app should have opened with the details filled in — send
          it and Kirk will get back to you, usually the same day. If it
          didn&rsquo;t open, everything you wrote is below.
        </p>
        <QuoteRecovery />
      </Container>
    </div>
  );
}
