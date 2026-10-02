import {PassType, PKPass} from "passkit-generator";
import * as fs from "node:fs";
import * as path from "node:path";
import { promises } from "node:dns";

//const googleSheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API_URL;


const certDir = path.resolve("certificates");

export const certificates = {
    wwdr: fs.readFileSync(path.join(certDir, "wwdr.pem")),
    signerCert: fs.readFileSync(path.join(certDir, "pass-cert.pem")),
    signerKey: fs.readFileSync(path.join(certDir, "wallet-pass-key-unencrypted.pem")),
    signerKeyPassphrase: process.env.PASS_KEY_PASSPHRASE,
};

const modelPath = path.resolve("models/Event.pass");
/* ---- Whatever your DB returns ---- */

interface Ticket {
  ticketId: string;
  attendeeName: string;
  foodGroup: string;

};

const TestTick = {
    ticketId: "1093488839",
    attendeeName: "John Dough",
    foodGroup: "Blue"
};

//TODO: Make sure to not hard code this later
const EventInfo = {
    startDay: "Nov 7",
    endDay: "Nov 8",
    startDate: "2026-11-07T09:00:00-05:00",
    endDate: "2026-11-08T23:59:59-05:00"
};

//export async function generateEventPass(t: Ticket): Promise<Buffer> {
export async function generateEventPass(): Promise<Buffer>{
    const pass = await PKPass.from(
        {model: modelPath, certificates},
        {
            passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID!,
            teamIdentifier: process.env.APPLE_TEAM_ID!,
            serialNumber: TestTick.ticketId, // this needs to generated with the acceptance
            description: "Tamu Datathon",
        }
    )
    const passType = new PassType("boardingPass");
    passType.transitType = "PKTransitTypeGeneric";
    //pass.types.push(passType);

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
        { key: "hacker", label: "Hacker", value: TestTick.attendeeName },
    );

    passType.secondaryFields.push(
        { key: "food-group", label: "Food Group", value: TestTick.foodGroup }
    );



    pass.types.push(passType); // add it after the fields are filled in

    pass.setBarcodes({
        message: TestTick.ticketId,
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

    return pass.getAsBuffer();


}


