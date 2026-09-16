import { business } from "@/content/business";
import type { QuotePayload, SubmitResult } from "./types";

/**
 * The v1 adapter, used while the server-side backend is deferred.
 *
 * It does NOT pretend to send anything. It composes a complete, formatted
 * message and hands it to the visitor's own mail or SMS client, then routes to
 * a confirmation page that also shows the message as copyable text and stores
 * it locally. Every path ends with the visitor holding their own words.
 *
 * This is the opposite of what the old site did. `<form action="mailto:">` is
 * not implemented by Safari at all and silently no-ops in most browsers, so
 * submissions vanished with no error and no record. A lead that disappears
 * quietly is worse than no form.
 *
 * Swapping to a real endpoint is one line in ./index.ts.
 */

export function validate(payload: QuotePayload) {
  const errors: Partial<Record<keyof QuotePayload, string>> = {};

  if (!payload.projectType) {
    errors.projectType = "Pick the closest one — “Not sure yet” is fine.";
  }
  if (payload.description.trim().length < 10) {
    errors.description = "A sentence or two is plenty, but we need something to go on.";
  }
  if (!payload.name.trim()) {
    errors.name = "What should Kirk call you?";
  }
  // One contact method is enough. Demanding both costs completions for nothing.
  const hasEmail = /\S+@\S+\.\S+/.test(payload.email.trim());
  const hasPhone = payload.phone.replace(/\D/g, "").length >= 10;
  if (!hasEmail && !hasPhone) {
    errors.email = "An email or a phone number — whichever you prefer.";
  }

  return errors;
}

export function composeMessage(payload: QuotePayload): string {
  return [
    `Project: ${payload.projectType}`,
    "",
    payload.description.trim(),
    "",
    "---",
    `Name: ${payload.name.trim()}`,
    payload.email.trim() ? `Email: ${payload.email.trim()}` : null,
    payload.phone.trim() ? `Phone: ${payload.phone.trim()}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function submitQuote(payload: QuotePayload): Promise<SubmitResult> {
  const errors = validate(payload);
  if (Object.keys(errors).length) return { ok: false, errors };

  const message = composeMessage(payload);
  const subject = `Quote request — ${payload.projectType}`;

  // Keep a copy client-side so nothing is lost if the handoff misfires or the
  // visitor backs out of their mail app.
  try {
    localStorage.setItem(
      "kw3d:last-quote",
      JSON.stringify({ message, subject, at: new Date().toISOString() }),
    );
  } catch {
    // Private browsing or blocked storage. The thanks page still renders the
    // message from navigation state, so this is genuinely optional.
  }

  // On a phone, texting is the path people actually take — and it is the one
  // that lets them attach a photo of the broken part in the next tap.
  const prefersSms = window.matchMedia("(pointer: coarse)").matches;

  if (prefersSms) {
    // `?&` is the separator both iOS and Android parse. Do not "tidy" it.
    window.location.href = `sms:${business.phoneE164}?&body=${encodeURIComponent(message)}`;
    return { ok: true, via: "sms" };
  }

  window.location.href =
    `mailto:${business.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(message)}`;
  return { ok: true, via: "email" };
}
