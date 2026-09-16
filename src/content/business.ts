import { TBD, type Confirmed } from "./types";

/**
 * Every fact about the business, in one place. NAP (name / address / phone)
 * must match Kirk's Google Business Profile character for character — local
 * search treats inconsistency as a different business.
 */
export const business = {
  name: "KirkWorks3D",
  legalName: "KirkWorks3D Print Studio",
  owner: "Kirk Edmunds",
  ownerRole: "Owner / 3D Print Specialist",
  tagline: "Bringing Your Ideas to Life — One Layer at a Time.",

  city: "Helena",
  state: "Alabama",
  stateCode: "AL",
  country: "US",
  locality: "Helena, Alabama",

  /** Display form. Keep the parentheses — it is how Americans read a number. */
  phoneDisplay: "(205) 229-2772",
  /** E.164. The leading +1 matters: bare "12052292772" is unreliable on iOS. */
  phoneE164: "+12052292772",

  /**
   * A yahoo.com address on the contact line of her own domain quietly
   * undercuts every other trust signal. Kirk to approve the domain address;
   * until then the reachable one ships.
   */
  email: "KirkEdmunds@yahoo.com",
  preferredEmail: "kirk@kirkworks3d.com" as Confirmed<string>,
  emailApproved: false,

  domain: "kirkworks3d.com",
  siteUrl: "https://www.kirkworks3d.com",

  /** IANA zone for the footer clock. Helena is US Central. */
  timeZone: "America/Chicago",
  /** Printed on the back of her business card. */
  cardLine: "Design · Print · Create · Repeat",

  /** Confirmed from the existing site copy. */
  machineCount: 3,
  filamentChoices: "100+",

  /** Kirk to confirm. Every one of these is published-facing. */
  hours: TBD as Confirmed<string>,
  serviceArea: TBD as Confirmed<string>,
  typicalTurnaround: TBD as Confirmed<string>,
  googleBusinessProfileUrl: TBD as Confirmed<string>,

  social: {
    facebook: TBD as Confirmed<string>,
    instagram: TBD as Confirmed<string>,
  },
} as const;

/**
 * Tap-to-text is the primary conversion path on mobile — someone holding a
 * business card and a broken bracket wants to send a photo, not fill a form.
 *
 * The `?&` separator is deliberate and must not be "cleaned up": iOS
 * historically expects `&` before the body param, Android expects `?`, and
 * `?&` is the one form both parse correctly.
 */
export function smsHref(body?: string): string {
  if (!body) return `sms:${business.phoneE164}`;
  return `sms:${business.phoneE164}?&body=${encodeURIComponent(body)}`;
}

export const telHref = `tel:${business.phoneE164}`;

/**
 * mailto: is safe and correct as a LINK. It is broken as a <form action>,
 * which is exactly the defect this rebuild replaces — Safari does not
 * implement form-to-mailto at all and most browsers silently no-op. Do not
 * "restore" the old behaviour.
 */
export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${business.email}${query ? `?${query}` : ""}`;
}
