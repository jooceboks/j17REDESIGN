"use client";

import { useId, useState } from "react";
import { submitForm, type FormKind } from "@/lib/submitForm";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full border border-[var(--bg-elevated)] bg-[var(--bg-elevated)] px-4 py-3.5 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-colors duration-150 focus:border-[var(--accent-lime)] focus:outline-none";

const labelClass =
  "mb-2 block type-label text-[var(--text-secondary)]";

function useFormSubmit(kind: FormKind) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(
      new FormData(form).entries(),
    ) as Record<string, string>;

    const result = await submitForm(kind, data);

    if (result.ok) {
      setStatus("success");
      setMessage(
        kind === "waitlist"
          ? "You're on the list. We'll be in touch with founding-member details before we open."
          : "Thanks — we've got your message and will reply within 24 hours on business days.",
      );
      form.reset();
    } else {
      setStatus("error");
      setMessage(result.error);
    }
  }

  return { status, message, handleSubmit };
}

/** Status text announced to screen readers when a submission resolves. */
function FormStatus({ status, message }: { status: Status; message: string }) {
  return (
    <p
      role="status"
      aria-live="polite"
      className={`mt-5 text-sm ${
        status === "error"
          ? "text-red-400"
          : "text-[var(--accent-lime)]"
      } ${status === "success" || status === "error" ? "" : "sr-only"}`}
    >
      {message}
    </p>
  );
}

export function ContactForm() {
  const { status, message, handleSubmit } = useFormSubmit("contact");
  // Unique per instance so labels stay correctly associated even if two
  // forms render on the same page.
  const uid = useId();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-contact-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${uid}-contact-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-contact-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${uid}-contact-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-contact-phone`} className={labelClass}>
            Phone <span className="font-normal normal-case">(optional)</span>
          </label>
          <input
            id={`${uid}-contact-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="(647) 000-0000"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-contact-location`} className={labelClass}>
            Location
          </label>
          <select
            id={`${uid}-contact-location`}
            name="location"
            defaultValue=""
            className={fieldClass}
          >
            <option value="">No preference</option>
            <option value="richmond-hill">Richmond Hill (opening soon)</option>
            <option value="markham">Markham</option>
            <option value="oakville">Oakville</option>
            <option value="mississauga">Mississauga</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-contact-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${uid}-contact-message`}
          name="message"
          required
          rows={6}
          className={`${fieldClass} resize-y`}
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      <FormStatus status={status} message={message} />
    </form>
  );
}

export function WaitlistForm() {
  const { status, message, handleSubmit } = useFormSubmit("waitlist");
  // Unique per instance: /locations renders this twice (tour + story).
  const uid = useId();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-waitlist-name`} className={labelClass}>
            Name
          </label>
          <input
            id={`${uid}-waitlist-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-waitlist-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${uid}-waitlist-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-waitlist-interest`} className={labelClass}>
          What are you most interested in?
        </label>
        <select
          id={`${uid}-waitlist-interest`}
          name="interest"
          defaultValue=""
          className={fieldClass}
        >
          <option value="">Everything</option>
          <option value="classes">Coached classes</option>
          <option value="strength">The strength floor</option>
          <option value="recovery">The recovery club</option>
          <option value="personal-training">Personal training</option>
          <option value="youth">Youth athletic development</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Joining…" : "Join the Founding Waitlist"}
      </button>

      <FormStatus status={status} message={message} />
    </form>
  );
}
