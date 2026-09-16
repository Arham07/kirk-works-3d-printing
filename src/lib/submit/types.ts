export type QuotePayload = {
  /** Which service, or "not-sure". Never defaulted — the visitor picks. */
  projectType: string;
  description: string;
  name: string;
  email: string;
  phone: string;
};

export type SubmitResult =
  | { ok: true; /** How the message actually left the browser. */ via: "email" | "sms" }
  | { ok: false; errors: Partial<Record<keyof QuotePayload, string>> };

export type SubmitAdapter = (payload: QuotePayload) => Promise<SubmitResult>;
