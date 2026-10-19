import { AUTOMATED_EMAILS, renderEmailTemplate } from "../../emails";
import { queueBulkEmail } from "./queue_bulk";

// The automated emails, rendered from src/emails/templates/**/email.html.
// Edit the HTML (and `pnpm emails`), not this file.
const confirmation = renderEmailTemplate(AUTOMATED_EMAILS.confirmation);
const accepted = renderEmailTemplate(AUTOMATED_EMAILS.accepted);
const rejected = renderEmailTemplate(AUTOMATED_EMAILS.rejected);
const waitlisted = renderEmailTemplate(AUTOMATED_EMAILS.waitlisted);

export default function sendConfirmationEmail(
  addresses: (string | undefined | null)[],
) {
  void queueBulkEmail(addresses, confirmation.subject, confirmation.html).then();
}

export const accepted_title = accepted.subject;
export const accepted_content = accepted.html;

export const rejected_title = rejected.subject;
export const rejected_content = rejected.html;

export const waitlisted_title = waitlisted.subject;
export const waitlisted_content = waitlisted.html;
