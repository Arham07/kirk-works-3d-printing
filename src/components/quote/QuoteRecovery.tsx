"use client";

import { useEffect, useState } from "react";
import { business, mailtoHref, smsHref, telHref } from "@/content/business";
import { Button } from "@/design/Button";

/**
 * The safety net. The composed message is handed to the visitor's mail or SMS
 * app, and that handoff can fail invisibly — no mail client configured, the
 * app opens empty, they tap back. So the message is also shown here, in full,
 * copyable, alongside the phone number.
 *
 * No path through this flow ends with a lead silently lost. That is the whole
 * point of the rebuild.
 */
export function QuoteRecovery() {
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kw3d:last-quote");
      if (stored) setMessage(JSON.parse(stored).message ?? null);
    } catch {
      // Storage blocked. The direct contact routes below still work.
    }
  }, []);

  async function copy() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard denied — the textarea below is selectable by hand.
    }
  }

  return (
    <div className="mt-12">
      {message && (
        <div className="hairline bg-surface-1 rounded-media border p-6 sm:p-8">
          <h2 className="mono-label">Your message, in case it didn&rsquo;t send</h2>
          <textarea
            readOnly
            value={message}
            rows={9}
            aria-label="Your quote request"
            className="hairline bg-surface-2 text-ink-muted mt-4 w-full rounded-control border p-4 font-mono text-sm"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" tone="outline" onClick={copy}>
              {copied ? "Copied" : "Copy message"}
            </Button>
            <Button
              type="button"
              tone="outline"
              onClick={() => {
                window.location.href = smsHref(message);
              }}
            >
              Send as text
            </Button>
            <Button
              type="button"
              tone="outline"
              onClick={() => {
                window.location.href = mailtoHref("Quote request", message);
              }}
            >
              Send as email
            </Button>
          </div>
        </div>
      )}

      <div className="hairline mt-10 border-t pt-8">
        <p className="mono-label mb-4">Rather just call?</p>
        <a
          href={telHref}
          className="text-ink hover:text-alert text-2xl font-medium transition-colors duration-250"
        >
          {business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
