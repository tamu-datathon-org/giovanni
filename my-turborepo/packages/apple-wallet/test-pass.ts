import fs from "node:fs";
import { generateEventPass } from "./src/generate-pass"

async function main() {
  const buffer = await generateEventPass();
  fs.writeFileSync("test.pkpass", buffer);
  console.log("Wrote test.pkpass,", buffer.length, "bytes");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});