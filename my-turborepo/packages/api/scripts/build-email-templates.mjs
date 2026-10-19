// Bundles every src/emails/templates/<category>/<version>/email.html (plus its
// optional email.json) into src/emails/templates.generated.json, which the API
// imports. The HTML files are the source of truth; never edit the JSON by hand.
//
//   pnpm emails                       regenerate once
//   pnpm -F @vanni/api emails:watch   regenerate on every save
//
// `build` and `typecheck` run this first, so CI and Docker builds always use
// the current HTML.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const apiRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const templatesDir = path.join(apiRoot, "src/emails/templates");
const outFile = path.join(apiRoot, "src/emails/templates.generated.json");

// Keep in sync with the values `renderEmailTemplate` passes in src/emails/index.ts.
const KNOWN_SECTIONS = new Set(["invitationRequired"]);
const KNOWN_VARIABLES = new Set(["eventSeason", "eventYear"]);

/** Drop plain comments (Outlook `[if mso]` ones matter), collapse whitespace. */
function minify(html) {
  return html
    .replace(/<!--(?!\[if|<!\[endif\]|>)[\s\S]*?-->/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Throws on unknown tags or unbalanced {{#x}} / {{^x}} / {{/x}} sections. */
function checkTags(text, where) {
  const open = [];
  for (const [tag, kind, name] of text.matchAll(/{{\s*([#^/]?)\s*(\w+)\s*}}/g)) {
    if (kind === "#" || kind === "^") {
      if (!KNOWN_SECTIONS.has(name)) throw new Error(`${where}: unknown section ${tag}`);
      open.push(name);
    } else if (kind === "/") {
      const last = open.pop();
      if (last !== name) throw new Error(`${where}: ${tag} closes ${last ? `{{#${last}}}` : "nothing"}`);
    } else if (!KNOWN_VARIABLES.has(name)) {
      throw new Error(`${where}: unknown variable ${tag}`);
    }
  }
  if (open.length > 0) throw new Error(`${where}: {{#${open.at(-1)}}} is never closed`);
}

function build() {
  const templates = {};
  const htmlFiles = fs
    .readdirSync(templatesDir, { recursive: true })
    .map((file) => file.split(path.sep).join("/"))
    .filter((file) => path.posix.basename(file) === "email.html")
    .sort();

  for (const file of htmlFiles) {
    const id = path.posix.dirname(file);
    const [category, ...rest] = id.split("/");
    if (!category || rest.length === 0) {
      throw new Error(`${file}: expected <category>/<version>/email.html`);
    }

    const html = fs.readFileSync(path.join(templatesDir, file), "utf8");
    const jsonPath = path.join(templatesDir, id, "email.json");
    const meta = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf8"))
      : {};
    const subject = (meta.subject ?? html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").trim();
    if (!subject) throw new Error(`${id}: add a subject to email.json or a <title> to email.html`);

    const minified = minify(html);
    checkTags(minified, `${id}/email.html`);
    checkTags(subject, `${id}/email.json subject`);
    templates[id] = { category, version: rest.join("/"), subject, html: minified };
  }

  const output = `${JSON.stringify(
    {
      _comment:
        "Generated from src/emails/templates by scripts/build-email-templates.mjs. Edit the HTML, then run `pnpm emails`.",
      templates,
    },
    null,
    2,
  )}\n`;
  const previous = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
  if (output !== previous) fs.writeFileSync(outFile, output);
  console.log(
    `[emails] ${Object.keys(templates).length} templates ${output === previous ? "unchanged" : "written"}`,
  );
}

build();

if (process.argv.includes("--watch")) {
  let timer;
  fs.watch(templatesDir, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (err) {
        console.error(`[emails] ${err instanceof Error ? err.message : String(err)}`);
      }
    }, 100);
  });
  console.log(`[emails] watching ${path.relative(process.cwd(), templatesDir)}`);
}
