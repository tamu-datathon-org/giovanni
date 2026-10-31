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

/**
 * Whether accepted applicants must confirm their spot (accept/decline on
 * /apply) before they count as attending. Off by default: an organizer's
 * acceptance is final. Set NEXT_PUBLIC_REQUIRE_INVITATION_ACCEPTANCE=true on
 * both the team and organizer sites to bring the confirm step back.
 */
export function isInvitationAcceptanceRequired(): boolean {
  return process.env.NEXT_PUBLIC_REQUIRE_INVITATION_ACCEPTANCE === "true";
}
