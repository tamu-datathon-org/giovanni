import jwt from "jsonwebtoken";
import * as fs from "node:fs";

// Same shape as Attendee in apple-wallet/src/user-filter.ts
export type Attendee = {
  id: string;
  name: string;
  email: string;
  group: string;
};

type Credentials = { client_email: string; private_key: string };

// Service account key downloaded from Google Cloud (see README.txt).
// Read on first use, not at import: the key is only there at runtime, and `next build` imports this module
let credentials: Credentials | undefined;

function getCredentials(): Credentials {
  credentials ??= JSON.parse(
    fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "utf8"),
  ) as Credentials;
  return credentials;
}

const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID!;

//TODO: Make sure to not hard code this later
const EventInfo = {
    dates: "Nov 7–8",
    startDate: "2026-11-07T09:00:00-05:00",
    endDate: "2026-11-08T23:59:59-05:00",
    name: "TAMU Datathon",
    venueName: "Memorial Student Center (MSC)",
    placeId: "ChIJSYHRVJiDRoYRHSLC-CcTMZA",
    scheduleUrl: "https://tamudatathon.com/#schedule",
    siteUrl: "https://tamudatathon.com",
};

// Slot machine icons in team-website/public/slot-machine-icons, served from the site root.
const FOOD_GROUP_ICONS = ["cherry", "bell", "horseshoe", "lemon", "diamond", "seven"];

// Food groups are free-form strings set per event, so a name without an icon just gets no image
const foodGroupIconUrl = (group: string) => {
  const key = group.trim().toLowerCase();
  return FOOD_GROUP_ICONS.includes(key) ? `${EventInfo.siteUrl}/slot-machine-icons/${key}_icon.png` : "";
};

// Same colors as the Apple pass (rgb(36,80,66))
const BACKGROUND_COLOR = "#245042";

// Google downloads these itself, so they must be public https URLs (e.g. files in your site's /public).
// Logo: square, 660x660 px or larger; Google crops it to a circle, so the poker chip fits well.
const LOGO_URL = process.env.GOOGLE_WALLET_LOGO_URL ?? "";
// Hero: wide banner under the fields, about 1032x336 px (3:1). The Apple artwork is portrait, so make a wide crop of it.
const HERO_URL = process.env.GOOGLE_WALLET_HERO_URL ?? "";

// Google only allows [a-zA-Z0-9_.-] in the suffix of class/object ids
const toIdSuffix = (value: string) => value.replace(/[^\w.-]/g, "_");

// IMPORTANT: a class sent in the save JWT is only created if it doesn't exist yet; it is never updated.
// So while you're tweaking the layout, bump this version each time, or your changes won't show up.
const CLASS_VERSION = "v1";
const classId = `${issuerId}.${toIdSuffix(EventInfo.name.toLowerCase())}_${CLASS_VERSION}`;

const text = (value: string) => ({ defaultValue: { language: "en-US", value } });
const field = (id: string) => ({ firstValue: { fields: [{ fieldPath: `object.textModulesData["${id}"]` }] } });

// Shared layout for every attendee's pass (the Google equivalent of models/Event.pass).
// Card front, top to bottom: logo + "TAMU Datathon", "Hacker" / attendee name, Date | Food Group row,
// QR code, then the hero image.
const eventClass = {
    id: classId,
    classTemplateInfo: {
        cardTemplateOverride: {
            cardRowTemplateInfos: [
                { twoItems: { startItem: field("date"), endItem: field("food-group") } },
            ],
        },
    },
    // Equivalent of featuredActions on the Apple pass; shown in the pass details
    linksModuleData: {
        uris: [
            { id: "schedule", uri: EventInfo.scheduleUrl, description: "View schedule" },
            {
                id: "directions",
                uri: `https://www.google.com/maps/place/?q=place_id:${EventInfo.placeId}`,
                description: `Directions to ${EventInfo.venueName}`,
            },
        ],
    },
};

export async function generateEventPass(a: Attendee): Promise<string> {
    const objectId = `${issuerId}.${toIdSuffix(a.id)}`;

    const iconUrl = foodGroupIconUrl(a.group);

    const genericObject = {
        id: objectId,
        classId,
        genericType: "GENERIC_TYPE_UNSPECIFIED",
        hexBackgroundColor: BACKGROUND_COLOR,
        ...(LOGO_URL && {
            logo: { sourceUri: { uri: LOGO_URL }, contentDescription: text(`${EventInfo.name} logo`) },
        }),
        ...(HERO_URL && {
            heroImage: { sourceUri: { uri: HERO_URL }, contentDescription: text(`${EventInfo.name} banner`) },
        }),
        cardTitle: text(EventInfo.name),
        subheader: text("Hacker"),
        header: text(a.name),

        textModulesData: [
            { id: "date", header: "Date", body: EventInfo.dates },
            { id: "food-group", header: "Food Group", body: a.group },
            // Not in the card rows above, so these only show in the details (like Apple's back fields)
            { id: "venue", header: "Venue", body: EventInfo.venueName },
            { id: "ticket", header: "Ticket", body: a.id },
        ],

        // On the object, not the class, so each attendee gets their own group's icon without bumping CLASS_VERSION
        ...(iconUrl && {
            imageModulesData: [
                {
                    id: "food-group-icon",
                    mainImage: { sourceUri: { uri: iconUrl }, contentDescription: text(`${a.group} icon`) },
                },
            ],
        }),

        // Same value as the QR on /apply (btoa(email)), which is what the check-in scanner decodes
        barcode: {
            type: "QR_CODE",
            value: Buffer.from(a.email).toString("base64"),
            alternateText: a.name,
        },

        // Equivalent of setRelevantDates / setExpirationDate on the Apple pass
        validTimeInterval: {
            start: { date: new Date(EventInfo.startDate).toISOString() },
            end: { date: new Date(EventInfo.endDate).toISOString() },
        },
    };

    const credentials = getCredentials();

    // Class + object ride along in the JWT; Google creates them when the pass is saved
    const claims = {
        iss: credentials.client_email,
        aud: "google",
        origins: [],
        typ: "savetowallet",
        payload: {
            genericClasses: [eventClass],
            genericObjects: [genericObject],
        },
    };

    const token = jwt.sign(claims, credentials.private_key, { algorithm: "RS256" });
    return `https://pay.google.com/gp/v/save/${token}`;
}