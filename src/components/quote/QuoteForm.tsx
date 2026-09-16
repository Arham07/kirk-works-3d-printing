"use client";

import { useEffect, useRef, useState } from "react";
import { submitQuote, validate, type QuotePayload } from "@/lib/submit";
import { Button } from "@/design/Button";
import { ArrowRightIcon } from "@/design/icons";

/**
 * The only genuinely interactive component on the site.
 *
 * Ordered easy-to-hard rather than split into a wizard: the enjoyable question
 * comes first and personal details last, which is the real benefit of a
 * multi-step form, without the state machine and its failure modes on five
 * fields.
 *
 * No 3D file is ever requested. Every large print bureau gates its funnel
 * behind a CAD upload, which is precisely the customer Kirk gets and they
 * cannot serve — someone holding a photo of a broken bracket.
 */

const PROJECT_TYPES = [
  "Custom 3D printing",
  "HueForge photo art",
  "Print my existing file",
  "A part that broke",
  "Private lesson",
  "Corporate project",
  "Not sure yet",
];

/** Tapping one writes an editable opening line, cursor left at the blank. */
const STARTERS = [
  { label: "A gift for someone", text: "I'd like a gift for " },
  { label: "A part that broke", text: "A part on my " },
  { label: "Turn a photo into art", text: "I have a photo of " },
];

const EMPTY: QuotePayload = {
  projectType: "",
  description: "",
  name: "",
  email: "",
  phone: "",
};

export function QuoteForm() {
  const [values, setValues] = useState<QuotePayload>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof QuotePayload, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuotePayload, boolean>>>({});
  const [pending, setPending] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // Rejects bots that submit instantly. Stamped in an effect rather than
  // during render, which would be an impure call.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const set = (field: keyof QuotePayload, value: string) =>
    setValues((previous) => ({ ...previous, [field]: value }));

  /** Validate on blur, never on keystroke — mid-typing errors read as nagging. */
  const blur = (field: keyof QuotePayload) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors(validate(values));
  };

  const insertStarter = (text: string) => {
    set("description", values.description ? `${values.description}\n${text}` : text);
    requestAnimationFrame(() => {
      const el = descriptionRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Honeypot: a real person cannot fill a field they cannot see or tab to.
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) return;
    if (Date.now() - mountedAt.current < 3000) return;

    const found = validate(values);
    setErrors(found);
    setTouched({ projectType: true, description: true, name: true, email: true, phone: true });

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      // Focus by field name, not by querying [aria-invalid] — React has not
      // re-rendered yet at this point, so that attribute is not in the DOM
      // and focus would fall back to the submit button.
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>(`#${CSS.escape(firstInvalid)}`)?.focus();
      });
      return;
    }

    setPending(true);
    const result = await submitQuote(values);
    if (result.ok) {
      // A full document navigation, not router.push. The site uses MPA
      // navigation throughout so every page is a fresh document and the
      // motion layer re-initialises cleanly — a client transition would leave
      // ScrollTriggers pointing at unmounted DOM.
      window.location.assign("/quote/thanks/");
    } else {
      setErrors(result.errors);
      setPending(false);
    }
  }

  const fieldError = (field: keyof QuotePayload) =>
    touched[field] && errors[field] ? errors[field] : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl">
      {/* Honeypot. Off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="border-0 p-0">
        <legend className="mb-6 w-full p-0">
          <span className="flex items-center gap-4">
            <span className="mono-wide text-alert-ink">01</span>
            <span className="mono-wide text-ink">What are we making?</span>
            <span aria-hidden className="hairline h-px flex-1 border-t" />
          </span>
        </legend>
        {/*
          Nothing is preselected. The old site's <select> defaulted every
          unattended submission to "Custom 3D Printing", quietly mislabelling
          the ones that mattered most.
        */}
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type, index) => {
            const active = values.projectType === type;
            return (
              <button
                key={type}
                /* The group has no input, so the first chip carries the id the
                   error-focus handler looks for. */
                id={index === 0 ? "projectType" : undefined}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  set("projectType", type);
                  setErrors((p) => ({ ...p, projectType: undefined }));
                }}
                className={
                  "min-h-11 rounded-control border px-4 text-[0.9375rem] transition-colors duration-250 " +
                  (active
                    ? "border-alert-surface bg-alert-surface text-white"
                    : "hairline text-ink-muted hover:border-line-strong hover:text-ink")
                }
              >
                {type}
              </button>
            );
          })}
        </div>
        {fieldError("projectType") && (
          <p className="text-alert-ink mt-3 text-sm">{errors.projectType}</p>
        )}
      </fieldset>

      <div className="mt-12">
        <label htmlFor="description" className="mb-6 flex items-center gap-4">
          <span className="mono-wide text-alert-ink">02</span>
          <span className="mono-wide text-ink">Tell Kirk about it</span>
          <span aria-hidden className="hairline h-px flex-1 border-t" />
        </label>
        <p className="text-ink-muted mt-2 text-sm">
          Two sentences is plenty — she&rsquo;ll ask the rest.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {STARTERS.map((starter) => (
            <button
              key={starter.label}
              type="button"
              onClick={() => insertStarter(starter.text)}
              className="hairline text-ink-muted hover:text-ink min-h-11 rounded-control border border-dashed px-3.5 text-sm transition-colors duration-250"
            >
              + {starter.label}
            </button>
          ))}
        </div>

        {/* Ruled like engineering paper: the one control that needs interior
            structure gets it, in the site's own drawing language. Single-line
            fields get one rule; this gets many. */}
        <div
          className="field-underline group relative mt-5"
          data-filled={values.description ? "" : undefined}
          data-invalid={fieldError("description") ? "" : undefined}
        >
          <textarea
            id="description"
            ref={descriptionRef}
            name="description"
            rows={6}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            onBlur={() => blur("description")}
            aria-invalid={fieldError("description") ? "true" : undefined}
            aria-describedby="description-error"
            className="field-lines text-ink caret-alert w-full bg-transparent text-base outline-none"
          />
          <span
            aria-hidden
            className="bg-ink absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 transition-transform duration-250 ease-out group-has-[:focus-visible]:scale-x-100 motion-reduce:transition-none"
          />
        </div>
        <p
          id="description-error"
          className={
            "text-alert-ink mt-2 min-h-6 text-sm transition-opacity duration-200 " +
            (fieldError("description") ? "opacity-100" : "opacity-0")
          }
        >
          {errors.description}
        </p>
        <p className="text-ink-icon text-sm">
          Got a photo? You can attach it in the next step, when your messaging
          app opens. No 3D file needed.
        </p>
      </div>

      <div className="mt-12">
        <p className="mb-6 flex items-center gap-4">
          <span className="mono-wide text-alert-ink">03</span>
          <span className="mono-wide text-ink">How should she reach you?</span>
          <span aria-hidden className="hairline h-px flex-1 border-t" />
        </p>

        <div className="grid gap-x-10 sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
            qualifier="required"
            value={values.name}
            onChange={(v) => set("name", v)}
            onBlur={() => blur("name")}
            error={fieldError("name")}
            autoComplete="name"
            autoCorrect="off"
          />
          <Field
            id="phone"
            label="Phone"
            qualifier="or email"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            onBlur={() => blur("phone")}
            error={fieldError("phone")}
            autoComplete="tel"
            autoCorrect="off"
          />
        </div>

        <div>
          <Field
            id="email"
            label="Email"
            qualifier="or phone"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={(v) => set("email", v)}
            onBlur={() => blur("email")}
            error={fieldError("email")}
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      </div>

      <Button
        type="submit"
        shape="square"
        disabled={pending}
        className="mt-10 min-h-14 w-full sm:w-auto sm:px-10"
      >
        {pending ? "Opening…" : "Send my quote request"}
        <ArrowRightIcon width={18} height={18} />
      </Button>

      <p className="text-ink-icon mt-5 text-sm">
        Your details are used only to answer your request. No obligation. Final
        pricing depends on design, size, material, quantity and shipping.
      </p>
    </form>
  );
}

/**
 * A boxless field: a persistent label over a full-width rule.
 *
 * The documented failure of boxless forms is placeholder-as-label, not the
 * absence of a border. Labels here are always visible, above the rule,
 * htmlFor-linked, and never move.
 *
 * This also fixes a measured contrast failure in the boxed version it
 * replaces. Every input carried `outline-none`, which killed the global
 * :focus-visible ring, and the replacement — focus:border-line-strong, or
 * #57574E on #1B1B19 — is 2.36:1. That fails WCAG 1.4.11 and 2.4.11 on the
 * single most important interaction on the site. Rest state here is 3.77:1
 * and focus is a 17.3:1 bar.
 */
function Field({
  id,
  label,
  qualifier,
  error,
  value,
  onChange,
  onBlur,
  ...props
}: {
  id: keyof QuotePayload & string;
  label: string;
  /** Right-aligned note on the label row. An asterisk cannot say "either/or". */
  qualifier?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  // Omit the DOM handlers we replace with value-based ones, or the two
  // signatures union and every call site becomes ambiguous.
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "onBlur">) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="mono-wide text-ink-muted group-has-[:focus-visible]:text-ink transition-colors duration-250"
        >
          {label}
        </label>
        {qualifier && <span className="mono-label text-ink-icon">{qualifier}</span>}
      </div>

      <div
        className="field-underline relative mt-3"
        data-filled={value ? "" : undefined}
        data-invalid={error ? "" : undefined}
      >
        <input
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? "true" : undefined}
          // Points at a node that is always in the DOM, so the association
          // never blinks in and out as validity changes.
          aria-describedby={`${id}-error`}
          /* 16px minimum, or iOS zooms the viewport on focus. */
          className="text-ink caret-alert min-h-11 w-full bg-transparent pb-2 text-base outline-none"
          {...props}
        />
        {/* The focus indicator. A 2px full-width bar at 17.3:1 — far past the
            192px² that SC 2.4.11 wants for a field this size. */}
        <span
          aria-hidden
          className="bg-ink absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 transition-transform duration-250 ease-out group-has-[:focus-visible]:scale-x-100 motion-reduce:transition-none"
        />
      </div>

      {/* Reserved slot, always present: the message fades in with zero reflow. */}
      <p
        id={`${id}-error`}
        className={
          "text-alert-ink mt-2 min-h-6 text-sm transition-opacity duration-200 " +
          (error ? "opacity-100" : "opacity-0")
        }
      >
        {error}
      </p>
    </div>
  );
}
