import { PKPass } from "passkit-generator";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type { Attendee } from "./user-filter";

// Resolve from the package folder, not the cwd, so this also works when imported by a Next app.
// The Docker image has no package folder, so APPLE_WALLET_DIR points it at /app instead.
// (Not `new URL("..", import.meta.url)`: Turbopack treats that as a module import and fails the build)
function getPackageDir() {
    return process.env.APPLE_WALLET_DIR ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

// Read on first use, not at import: the certs are only mounted at runtime, and `next build` imports this module
let certificates: {wwdr: Buffer; signerCert: Buffer; signerKey: Buffer; signerKeyPassphrase?: string} | undefined;

function getCertificates() {
    const certDir = path.join(getPackageDir(), "certificates");
    certificates ??= {
        wwdr: fs.readFileSync(path.join(certDir, "wwdr.pem")),
        signerCert: fs.readFileSync(path.join(certDir, "pass-cert.pem")),
        signerKey: fs.readFileSync(path.join(certDir, "wallet-pass-key-unencrypted.pem")),
        signerKeyPassphrase: process.env.PASS_KEY_PASSPHRASE,
    };
    return certificates;
}

//TODO: Make sure to not hard code this later
const EventInfo = {
    dates: "Nov 7–8",
    startDate: "2026-11-07T09:00:00-05:00",
    endDate: "2026-11-08T23:59:59-05:00",
    name: "TAMU Datathon",
    venueName: "Memorial Student Center (MSC)",
    latitude: 30.6122578,
    longitude: -96.3415443,
};

// The whole design (colors, fields, featured actions, artwork, logo, icon) lives in models/Event.pass,
// exported from Pass Designer. Its pass.json has {{placeholders}} that get filled per attendee here.
// Read once and cached: the model never changes while the server runs.
let modelFiles: Record<string, Buffer> | undefined;

function getModelFiles() {
    if (modelFiles) return modelFiles;
    const modelDir = path.join(getPackageDir(), "models/Event.pass");
    const files: Record<string, Buffer> = {};

    // Recursive so localized folders (en.lproj/...) come along too
    const walk = (dir: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (!entry.name.startsWith(".")) {
                files[path.relative(modelDir, full).split(path.sep).join("/")] = fs.readFileSync(full);
            }
        }
    };
    walk(modelDir);

    modelFiles = files;
    return files;
}

// Per-group thumbnails (shown beside the name on the classic layout) live next to models/Event.pass, not inside it,
// or every pass would get all of them. Names match the slot machine icons in team-website/public/slot-machine-icons.
const FOOD_GROUP_ICONS = ["cherry", "bell", "horseshoe", "lemon", "diamond", "seven"];
const ICON_FILES = ["thumbnail.png", "thumbnail@2x.png", "thumbnail@3x.png"];
const iconCache = new Map<string, Record<string, Buffer>>();

/** The thumbnail files for a food group, or nothing when the group (free-form, set per event) has no icon. */
function getFoodGroupIcon(group: string) {
    const key = group.trim().toLowerCase();
    if (!FOOD_GROUP_ICONS.includes(key)) return {};

    let files = iconCache.get(key);
    if (!files) {
        const dir = path.join(getPackageDir(), "models/food-group-icons", key);
        files = Object.fromEntries(ICON_FILES.map((name) => [name, fs.readFileSync(path.join(dir, name))]));
        iconCache.set(key, files);
    }
    return files;
}

/** Swaps every {{key}} in the template for its value, JSON-escaped so quotes in names can't break the file. */
function fillTemplate(template: string, values: Record<string, string>) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
        key in values ? JSON.stringify(values[key]).slice(1, -1) : match,
    );
}

export async function generateEventPass(a: Attendee): Promise<Buffer> {
    const { "pass.json": template, ...assets } = getModelFiles();
    if (!template) throw new Error("models/Event.pass/pass.json is missing");

    const passJson = fillTemplate(template.toString("utf8"), {
        name: a.name,
        group: a.group,
        id: a.id,
        dates: EventInfo.dates,
    });

    const pass = new PKPass(
        { ...assets, ...getFoodGroupIcon(a.group), "pass.json": Buffer.from(passJson) },
        getCertificates(),
        {
            passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID!,
            teamIdentifier: process.env.APPLE_TEAM_ID!,
            serialNumber: a.id,
            semantics: {
                eventName: EventInfo.name,
                eventStartDate: new Date(EventInfo.startDate).toISOString(),
                eventEndDate: new Date(EventInfo.endDate).toISOString(),
                venueName: EventInfo.venueName,
                venueLocation: { latitude: EventInfo.latitude, longitude: EventInfo.longitude },
                attendeeName: a.name,
            },
        },
    );

    // Same value as the QR on /apply (btoa(email)), which is what the check-in scanner decodes
    pass.setBarcodes({
        message: Buffer.from(a.email).toString("base64"),
        format: "PKBarcodeFormatQR",
        messageEncoding: "iso-8859-1",
    });

    pass.setLocations({
        latitude: EventInfo.latitude,
        longitude: EventInfo.longitude,
        relevantText: `Welcome to ${EventInfo.name}!`,
    });

    const startDate = new Date(EventInfo.startDate);
    const endDate = new Date(EventInfo.endDate);
    pass.setRelevantDates([{ startDate: startDate.toISOString(), endDate: endDate.toISOString() }]);
    pass.setExpirationDate(endDate);

    return pass.getAsBuffer();
}