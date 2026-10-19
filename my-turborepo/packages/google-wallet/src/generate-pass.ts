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
    startDay: "Nov 7",
    endDay: "Nov 8",
    startDate: "2026-11-07T09:00:00-05:00",
    endDate: "2026-11-08T23:59:59-05:00",
    name: "TAMU Datathon",
};

// TODO: Add the poster URL here (must be a public https image, Google fetches it itself).
// Google has no poster pass type, so this is shown as the large hero image across the pass.
const POSTER_URL: string = "";

// Google only allows [a-zA-Z0-9_.-] in the suffix of class/object ids
const toIdSuffix = (value: string) => value.replace(/[^\w.-]/g, "_");

const classId = `${issuerId}.${toIdSuffix(EventInfo.name.toLowerCase())}`;

// Shared layout for every attendee's pass (the Google equivalent of models/Event.pass)
const eventClass = {
    id: classId,
    classTemplateInfo: {
        cardTemplateOverride: {
            cardRowTemplateInfos: [
                {
                    twoItems: {
                        startItem: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["day-1"]' }] } },
                        endItem: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["day-2"]' }] } },
                    },
                },
                {
                    oneItem: {
                        item: { firstValue: { fields: [{ fieldPath: 'object.textModulesData["food-group"]' }] } },
                    },
                },
            ],
        },
    },
};

export async function generateEventPass(a: Attendee): Promise<string> {
    const objectId = `${issuerId}.${toIdSuffix(a.id)}`;

    const genericObject = {
        id: objectId,
        classId,
        genericType: "GENERIC_TYPE_UNSPECIFIED",
        hexBackgroundColor: "#1e1e3c",
        ...(process.env.GOOGLE_WALLET_LOGO_URL && {
            logo: { sourceUri: { uri: process.env.GOOGLE_WALLET_LOGO_URL } },
        }),
        ...(POSTER_URL && {
            heroImage: {
                sourceUri: { uri: POSTER_URL },
                contentDescription: { defaultValue: { language: "en-US", value: `${EventInfo.name} poster` } },
            },
        }),
        cardTitle: { defaultValue: { language: "en-US", value: EventInfo.name } },
        subheader: { defaultValue: { language: "en-US", value: "Hacker" } },
        header: { defaultValue: { language: "en-US", value: a.name } },

        textModulesData: [
            { id: "day-1", header: "Day 1", body: EventInfo.startDay },
            { id: "day-2", header: "Day 2", body: EventInfo.endDay },
            { id: "food-group", header: "Food Group", body: a.group },
        ],

        // Same value as the QR on /apply (btoa(email)), which is what the check-in scanner decodes
        barcode: {
            type: "QR_CODE",
            value: Buffer.from(a.email).toString("base64"),
        },

        // Equivalent of setRelevantDates / setExpirationDate on the Apple pass
        validTimeInterval: {
            start: { date: new Date(EventInfo.startDate).toISOString() },
            end: { date: new Date(EventInfo.endDate).toISOString() },
        },
    };

    const credentials = getCredentials();

    // Class + object ride along in the JWT, Google creates them when the pass is saved
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
