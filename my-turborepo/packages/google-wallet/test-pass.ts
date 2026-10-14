import { generateEventPass } from "./src/generate-pass"

async function main() {
  const saveUrl = await generateEventPass({
    id: "test-attendee-1",
    name: "John Dough",
    email: "john@example.com",
    group: "Caesars Palace",
  });
  console.log("Save to Google Wallet:", saveUrl);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
