import {PassType, PKPass} from "passkit-generator";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { getAttendees, type Attendee } from "./user-filter";

//const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;


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

// export async function generateAllPasses(eventId: string, outDir = "passes") {
//   const tickets = await getTickets(eventId);
//   await fs.promises.mkdir(outDir, { recursive: true });

//   for (const ticket of tickets) {
//     const buffer = await generateEventPass(ticket);
//     await fs.promises.writeFile(path.join(outDir, `${ticket.ticketId}.pkpass`), buffer);
//   }

//   return tickets.length;
// }

//TODO: Make sure to not hard code this later
const EventInfo = {
    startDay: "Nov 7",
    endDay: "Nov 8",
    startDate: "2026-11-07T09:00:00-05:00",
    endDate: "2026-11-08T23:59:59-05:00",
    name: "TAMU Datathon",
    venueName: "TODO: venue name", // required by the poster layout
};

// Full-bleed poster artwork: a local path (relative to where the script runs) or an https:// URL.
// Leave it empty to use models/Event.pass/background.png instead.
const POSTER: string = "public/wallet_bg_a.png";


export async function generateEventPass(a: Attendee): Promise<Buffer>{
    const pass = await PKPass.from(
        {model: path.join(getPackageDir(), "models/Event.pass"), certificates: getCertificates()},
        {
            passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID!,
            teamIdentifier: process.env.APPLE_TEAM_ID!,
            serialNumber: a.id,
            description: `${EventInfo.name} ticket`,
            logoText: EventInfo.name,
            eventLogoText: EventInfo.name,
            // The poster layout is built from these semantic tags rather than the fields below
            semantics: {
                eventName: EventInfo.name,
                eventType: "PKEventTypeConvention",
                eventStartDate: new Date(EventInfo.startDate).toISOString(),
                eventEndDate: new Date(EventInfo.endDate).toISOString(),
                venueName: EventInfo.venueName,
                attendeeName: a.name,
            },
        }
    )

    if (POSTER) {
        const posterImage = POSTER.startsWith("http")
            ? Buffer.from(await (await fetch(POSTER)).arrayBuffer())
            : fs.readFileSync(path.join(getPackageDir(), POSTER));
        pass.addBuffer("background.png", posterImage);
    }

    // iOS 27+ Poster Generic layout: artwork background, logo + header on top, QR in the middle,
    // primary fields along the bottom, and a single footer line under them
    const posterGeneric = new PassType("posterGeneric");

    posterGeneric.headerFields.push(
        { key: "ticket", label: "TICKET", value: a.id },
    );

    posterGeneric.primaryFields.push(
        { key: "hacker", label: "Hacker", value: a.name },
        { key: "food-group", label: "Food Group", value: a.group, textAlignment: "PKTextAlignmentRight" },
    );

    // Only the first footer field is shown
    posterGeneric.footerFields.push(
        { key: "dates", value: `${EventInfo.startDay} – ${EventInfo.endDay}` },
    );

    // Fallback for iOS < 27. Poster tickets have to be an eventTicket (boardingPass can't use the poster style)
    const passType = new PassType("eventTicket");

    passType.headerFields.push({
        key: "date",
        label: "START",
        value: EventInfo.startDate,
        dateStyle: "PKDateStyleMedium",
        timeStyle: "PKDateStyleShort",
    });

    passType.primaryFields.push(
        { key: "day-1", label: "Day 1", value: EventInfo.startDay},
        { key: "day-2", label: "Day 2", value: EventInfo.endDay }
    );

    passType.auxiliaryFields.push(
        { key: "hacker", label: "Hacker", value: a.name },
    );

    passType.secondaryFields.push(
        { key: "food-group", label: "Food Group", value: a.group}
    );



    // add them after the fields are filled in; Wallet prefers posterGeneric when it's supported
    pass.types.push(posterGeneric);
    pass.types.push(passType);

    // iOS 18–26 shows the event poster; older iOS falls back to the regular event ticket
    pass.preferredStyleSchemes = ["posterEventTicket", "eventTicket"];

    pass.setBarcodes({
        message: a.id,
        format: "PKBarcodeFormatQR",
        messageEncoding: "iso-8859-1",
    });

    // pass.setLocations({
    //     latitude: t.venueLat,
    //     longitude: t.venueLng,
    //     relevantText: "Time to board",
    // });

    const startDate = new Date(EventInfo.startDate);
    const endDate = new Date(EventInfo.endDate);

    pass.setRelevantDates([
        {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        }
    ]);

    pass.setExpirationDate(endDate);
    //pass.setNFC()
    return pass.getAsBuffer();


}


