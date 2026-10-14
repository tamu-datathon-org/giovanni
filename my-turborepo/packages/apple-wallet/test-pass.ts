import fs from "node:fs";
import { generateEventPass } from "./src/generate-pass";
import type { Attendee } from "./src/user-filter";

const fakeAttendee: Attendee = {
  id: "test-0001",              // becomes the serialNumber and the QR code text
  name: "John Dough",           // shown in the "Hacker" field and semantics.attendeeName
  email: "john@example.com",    // not used on the pass yet
  group: "Caesars Palace",      // shown in the "Food Group" field
};

async function main() {
  const buffer = await generateEventPass(fakeAttendee);
  fs.writeFileSync("test.pkpass", buffer);
  console.log("Wrote test.pkpass,", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
