"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [values, setValues] = useState<QuotePayload>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof QuotePayload, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuotePayload, boolean>>>({});
  const [pending, setPending] = useState(false);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // Rejects bots that submit instantly. Rendered at mount, checked on submit.
  const mountedAt = useRef(Date.now());

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
      router.push("/quote/thanks/");
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
        <legend className="mono-label text-ink-icon mb-4">
          01 — What are we making?
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
                    ? "border-alert bg-alert text-white"
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
        <label htmlFor="description" className="mono-label text-ink-icon block">
          02 — Tell Kirk about it
        </label>
        <p className="text-ink-muted mt-2 text-sm">
          Two sentences is plenty — he&rsquo;ll ask the rest.
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

        <textarea
          id="description"
          ref={descriptionRef}
          name="description"
          rows={6}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          onBlur={() => blur("description")}
          aria-invalid={fieldError("description") ? "true" : undefined}
          aria-describedby={fieldError("description") ? "description-error" : undefined}
          className="hairline bg-surface-2 text-ink focus:border-line-strong mt-4 w-full rounded-control border p-4 text-base outline-none"
        />
        {fieldError("description") && (
          <p id="description-error" className="text-alert-ink mt-2 text-sm">
            {errors.description}
          </p>
        )}
        <p className="text-ink-icon mt-3 text-sm">
          Got a photo? You can attach it in the next step, when your messaging
          app opens. No 3D file needed.
        </p>
      </div>

      <div className="mt-12">
        <p className="mono-label text-ink-icon">03 — How should he reach you?</p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
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
            hint="Optional if you give an email"
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

        <div className="mt-5">
          <Field
            id="email"
            label="Email"
            hint="Optional if you give a phone number"
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

      <Button type="submit" disabled={pending} className="mt-10 w-full sm:w-auto">
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

function Field({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  onBlur,
  ...props
}: {
  id: keyof QuotePayload & string;
  label: string;
  hint?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  // Omit the DOM handlers we replace with value-based ones, or the two
  // signatures union and every call site becomes ambiguous.
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "onBlur">) {
  return (
    <div>
      {/* Labels sit above the field. Placeholder-only labels disappear the
          moment someone starts typing, which is the one place a cleaner look
          measurably costs completions. */}
      <label htmlFor={id} className="text-ink block text-sm font-medium">
        {label}
      </label>
      {hint && <p className="text-ink-icon mt-1 text-sm">{hint}</p>}
      <input
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        /* 16px minimum, or iOS zooms the viewport on focus. */
        className="hairline bg-surface-2 text-ink focus:border-line-strong mt-2 min-h-11 w-full rounded-control border px-4 text-base outline-none"
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-alert-ink mt-2 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
