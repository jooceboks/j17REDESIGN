/**
 * The single submit path for every form on the site (contact + waitlist).
 *
 * TODO: connect form backend.
 * No provider has been chosen yet, so this deliberately does not assume one.
 * When J17 picks a destination, implement it here and nothing else changes:
 *
 *   - Formspree / Basin:  POST to their endpoint
 *   - Serverless route:   POST to /api/forms and handle it in a route handler
 *   - Booking platform:   POST founding-waitlist signups into the provider's
 *                         lead API (see j17-booking-integration-brief.md)
 *
 * Until then this resolves successfully after a short delay so the UI can be
 * built and reviewed end to end. It does NOT store anything — do not launch
 * without wiring this up.
 */

export type FormKind = "contact" | "waitlist";

export type FormResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitForm(
  kind: FormKind,
  data: Record<string, string>,
): Promise<FormResult> {
  // TODO: replace this block with a real submission.
  if (process.env.NODE_ENV === "development") {
    console.warn(
      `[submitForm] No backend connected. "${kind}" submission discarded:`,
      data,
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return { ok: true };
}
