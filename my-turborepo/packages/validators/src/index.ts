const TAMU_EMAIL_REGEX = /^[^\s@]+@tamu\.edu$/i;
const GENERIC_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Whether an email is allowed to apply/authenticate as an applicant.
 * Restricted to @tamu.edu by default; set
 * NEXT_PUBLIC_ALLOW_NON_TAMU_APPLICANTS=true (per-app) to open it to any
 * syntactically valid email for a given event.
 */
export function isAllowedApplicantEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  if (process.env.NEXT_PUBLIC_ALLOW_NON_TAMU_APPLICANTS === "true") {
    return GENERIC_EMAIL_REGEX.test(email);
  }
  return TAMU_EMAIL_REGEX.test(email);
}
