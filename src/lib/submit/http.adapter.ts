import type { QuotePayload, SubmitResult } from "./types";
import { composeMessage, validate } from "./compose.adapter";

/**
 * The v2 adapter. Written now, deliberately unused — writing it alongside the
 * v1 adapter is what proves the swap really is one line rather than a
 * refactor discovered under deadline.
 *
 * To activate: set NEXT_PUBLIC_QUOTE_ENDPOINT and change the single export in
 * ./index.ts to point here. Works with any HTTP form endpoint (Web3Forms,
 * Formspree, or our own handler once a host is chosen).
 *
 * Note that turning this on means the site is no longer purely static if the
 * endpoint is ours — at that point `output: "export"` comes out of
 * next.config.ts and a Server Action becomes the better implementation,
 * because it degrades without JavaScript.
 */
export async function submitQuote(payload: QuotePayload): Promise<SubmitResult> {
  const errors = validate(payload);
  if (Object.keys(errors).length) return { ok: false, errors };

  const endpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;
  if (!endpoint) {
    return { ok: false, errors: { description: "Quote endpoint is not configured." } };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: `Quote request — ${payload.projectType}`,
      message: composeMessage(payload),
      ...payload,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      errors: { description: "That didn't send. Try again, or text Kirk directly." },
    };
  }

  return { ok: true, via: "email" };
}
