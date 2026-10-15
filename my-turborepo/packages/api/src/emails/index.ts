import { isInvitationAcceptanceRequired } from "@vanni/validators";

// Built from ./templates/<category>/<version>/email.html by
// scripts/build-email-templates.mjs (`pnpm emails`).
import generated from "./templates.generated.json";

const templates = generated.templates;

export type EmailTemplateId = keyof typeof templates;

/**
 * Which template each automated email sends. When next year's emails land in
 * new version folders, point these at them. Typechecking fails if a folder
 * here doesn't exist.
 */
export const AUTOMATED_EMAILS = {
  confirmation: "confirmation-email/2026-fall",
  accepted: "acceptance/2026-fall",
  rejected: "rejection/2026-fall",
  waitlisted: "waitlist/2026-fall",
} as const satisfies Record<string, EmailTemplateId>;

export type AutomatedEmail = keyof typeof AUTOMATED_EMAILS;

// What `{{#section}}` / `{{variable}}` tags resolve to. Keep the names in sync
// with KNOWN_SECTIONS / KNOWN_VARIABLES in scripts/build-email-templates.mjs.
function templateContext() {
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME;
  return {
    sections: {
      invitationRequired: isInvitationAcceptanceRequired(),
    } as Record<string, boolean>,
    variables: {
      eventSeason: eventName?.endsWith("Spring") ? "Spring" : "Fall",
      eventYear: String(new Date().getFullYear()),
    } as Record<string, string>,
  };
}

const SECTION = /{{\s*([#^])\s*(\w+)\s*}}([\s\S]*?){{\s*\/\s*\2\s*}}/g;
const VARIABLE = /{{\s*(\w+)\s*}}/g;

/** Resolve sections and variables, then re-collapse the whitespace around them. */
function fill(text: string, ctx: ReturnType<typeof templateContext>) {
  let out = text;
  // Repeat so a section nested inside another one is resolved too.
  for (let previous = ""; previous !== out; ) {
    previous = out;
    out = out.replace(SECTION, (_match, kind: string, name: string, body: string) =>
      ctx.sections[name] === (kind === "#") ? body : "",
    );
  }
  return out
    .replace(VARIABLE, (_match, name: string) => ctx.variables[name] ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isEmailTemplateId(id: string): id is EmailTemplateId {
  return Object.prototype.hasOwnProperty.call(templates, id);
}

/** Subject + HTML exactly as they'd be sent right now. */
export function renderEmailTemplate(id: EmailTemplateId) {
  const ctx = templateContext();
  const template = templates[id];
  return { subject: fill(template.subject, ctx), html: fill(template.html, ctx) };
}

/** "2026-fall" > "2026-spring" > "2026" > "2025-fall" …; anything else last. */
function versionRank(version: string) {
  const match = /^(\d{4})(?:-(spring|fall))?$/.exec(version);
  if (!match) return -1;
  const season = match[2] === "fall" ? 2 : match[2] === "spring" ? 1 : 0;
  return Number(match[1]) * 10 + season;
}

/** Every template file without its HTML, newest version first per category. */
export function listEmailTemplates() {
  const ctx = templateContext();
  const automatedAs = new Map<string, AutomatedEmail>(
    Object.entries(AUTOMATED_EMAILS).map(
      ([kind, id]) => [id, kind as AutomatedEmail] as const,
    ),
  );

  const ids = (Object.keys(templates) as EmailTemplateId[]).sort(
    (a, b) =>
      templates[a].category.localeCompare(templates[b].category) ||
      versionRank(templates[b].version) - versionRank(templates[a].version) ||
      a.localeCompare(b),
  );

  return ids.map((id) => ({
    id,
    category: templates[id].category,
    version: templates[id].version,
    subject: fill(templates[id].subject, ctx),
    automatedAs: automatedAs.get(id) ?? null,
  }));
}
